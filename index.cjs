require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit').rateLimit;
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');
const path = require('node:path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const APP_ORIGIN = process.env.APP_ORIGIN || `http://localhost:${PORT}`;
if (process.env.NODE_ENV === 'production' && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32 || !APP_ORIGIN.startsWith('https://'))) {
  throw new Error('Production requires SESSION_SECRET (32+ characters) and an HTTPS APP_ORIGIN.');
}
const db = new Database(process.env.DB_FILE || path.join(__dirname, 'vortex.sqlite'));
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, first_name TEXT NOT NULL,
  last_name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS payments (
  api_ref TEXT PRIMARY KEY, user_id TEXT NOT NULL, plan TEXT NOT NULL, amount INTEGER NOT NULL,
  provider TEXT NOT NULL, invoice_id TEXT, state TEXT NOT NULL DEFAULT 'PENDING', created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS subscriptions (
  reference TEXT PRIMARY KEY, user_id TEXT NOT NULL, plan TEXT NOT NULL, provider_id TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING', paid_until TEXT, next_date TEXT, created_at TEXT NOT NULL
);
`);

app.disable('x-powered-by');
app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : false);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '20kb' }));
app.use(session({
  name: 'vortex.sid', secret: process.env.SESSION_SECRET || 'DEV_ONLY_CHANGE_THIS_SESSION_SECRET',
  resave: false, saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.sqlite', dir: __dirname }),
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 }
}));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false }));
app.use('/api/billing', rateLimit({ windowMs: 15 * 60 * 1000, limit: 12, standardHeaders: true, legacyHeaders: false }));

// Same-origin guard for browser mutation requests. Webhooks use their own challenge check below.
app.use('/api', (req, res, next) => {
  if (req.path === '/webhooks/intasend' || !['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next();
  const origin = req.get('origin');
  if (origin && origin !== APP_ORIGIN) return res.status(403).json({ error: 'Request origin rejected.' });
  next();
});

const plans = {
  plus: { name: 'VORTEX Plus', amount: 299 },
  pro: { name: 'VORTEX Pro', amount: 699 }
};
const nowIso = () => new Date().toISOString();
function requireUser(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Please create an account or sign in first.' });
  req.user = db.prepare('SELECT id,email,first_name,last_name FROM users WHERE id = ?').get(req.session.userId);
  if (!req.user) { req.session.destroy(() => {}); return res.status(401).json({ error: 'Please sign in again.' }); }
  next();
}
function apiKeyReady() { return Boolean(process.env.INTASEND_SECRET_KEY && process.env.INTASEND_PUBLISHABLE_KEY); }
async function intasend(endpoint, body, method = 'POST') {
  if (!process.env.INTASEND_SECRET_KEY) throw new Error('INTASEND_SECRET_KEY is not configured on the server.');
  const response = await fetch(`https://api.intasend.com/api/v1/${endpoint}`, {
    method, headers: { Authorization: `Bearer ${process.env.INTASEND_SECRET_KEY}`, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data.message || data.detail || `Payment provider returned HTTP ${response.status}`);
    err.status = 502; throw err;
  }
  return data;
}
function publicUser(req) {
  if (!req.session.userId) return null;
  return db.prepare('SELECT id,email,first_name,last_name FROM users WHERE id=?').get(req.session.userId) || null;
}

app.get('/api/health', (_req, res) => res.json({ ok: true, billingConfigured: apiKeyReady(), mode: process.env.NODE_ENV || 'development' }));
app.get('/api/me', requireUser, (req, res) => {
  const sub = db.prepare(`SELECT plan,status,paid_until,next_date FROM subscriptions WHERE user_id=? ORDER BY created_at DESC LIMIT 1`).get(req.user.id);
  const payment = db.prepare(`SELECT plan,state,created_at FROM payments WHERE user_id=? ORDER BY created_at DESC LIMIT 1`).get(req.user.id);
  const paid = Boolean(sub && ['ACTIVE','CANCELED'].includes(sub.status) && sub.paid_until && Date.parse(sub.paid_until) > Date.now());
  res.json({ user: req.user, subscription: sub || null, lastPayment: payment || null, effectivePlan: paid ? sub.plan : 'free' });
});

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const firstName = String(req.body.firstName || '').trim().slice(0, 80);
    const lastName = String(req.body.lastName || '').trim().slice(0, 80);
    const password = String(req.body.password || '');
    if (!/^\S+@\S+\.\S+$/.test(email) || !firstName || !lastName || password.length < 12) {
      return res.status(400).json({ error: 'Provide a valid email, first and last name, and a password of at least 12 characters.' });
    }
    const id = crypto.randomUUID();
    const hash = await bcrypt.hash(password, 12);
    try { db.prepare('INSERT INTO users(id,email,first_name,last_name,password_hash,created_at) VALUES(?,?,?,?,?,?)').run(id,email,firstName,lastName,hash,nowIso()); }
    catch (e) { if (String(e.code).includes('SQLITE_CONSTRAINT')) return res.status(409).json({ error: 'An account with that email already exists.' }); throw e; }
    req.session.regenerate(err => {
      if (err) return next(err);
      req.session.userId = id;
      req.session.save(saveErr => saveErr ? next(saveErr) : res.status(201).json({ user: publicUser(req) }));
    });
  } catch (e) { next(e); }
});
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const user = db.prepare('SELECT * FROM users WHERE email=?').get(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: 'Email or password is incorrect.' });
    req.session.regenerate(err => {
      if (err) return next(err);
      req.session.userId = user.id;
      req.session.save(saveErr => saveErr ? next(saveErr) : res.json({ user: publicUser(req) }));
    });
  } catch (e) { next(e); }
});
app.post('/api/auth/logout', (req, res) => req.session.destroy(() => { res.clearCookie('vortex.sid', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }); res.json({ ok: true }); }));

// One-time monthly payment via M-Pesa STK push. Learner renews manually each month.
app.post('/api/billing/mpesa', requireUser, async (req, res, next) => {
  try {
    if (!apiKeyReady()) return res.status(503).json({ error: 'Payment provider is not configured. Finish the sandbox setup in .env first.' });
    const planKey = String(req.body.plan || '');
    const plan = plans[planKey];
    const phone = String(req.body.phone || '').replace(/[\s+-]/g, '');
    if (!plan) return res.status(400).json({ error: 'Choose Plus or Pro.' });
    if (!/^(2547|2541)\d{8}$/.test(phone)) return res.status(400).json({ error: 'Enter a Kenyan mobile number like 254712345678.' });
    const apiRef = `vortex-${planKey}-${crypto.randomUUID()}`;
    db.prepare('INSERT INTO payments(api_ref,user_id,plan,amount,provider,state,created_at) VALUES(?,?,?,?,?,?,?)').run(apiRef, req.user.id, planKey, plan.amount, 'MPESA', 'PENDING', nowIso());
    const data = await intasend('payment/mpesa-stk-push/', { amount: plan.amount, phone_number: phone, api_ref: apiRef });
    const invoiceId = data.invoice && data.invoice.invoice_id;
    db.prepare('UPDATE payments SET invoice_id=? WHERE api_ref=?').run(invoiceId || null, apiRef);
    res.json({ ok: true, message: 'Approve the M-Pesa prompt on your phone. Access is granted only after the payment webhook confirms success.', reference: apiRef, invoiceId: invoiceId || null });
  } catch (e) { next(e); }
});

// Automatic recurring CARD subscription. IntaSend sends the learner to a hosted card setup page.
app.post('/api/billing/card-subscription', requireUser, async (req, res, next) => {
  try {
    if (!apiKeyReady()) return res.status(503).json({ error: 'Payment provider is not configured. Finish the sandbox setup in .env first.' });
    const planKey = String(req.body.plan || '');
    const plan = plans[planKey];
    if (!plan) return res.status(400).json({ error: 'Choose Plus or Pro.' });
    const reference = `vortex-sub-${crypto.randomUUID()}`;
    const customerData = await intasend('subscriptions-customers/', {
      email: req.user.email, first_name: req.user.first_name, last_name: req.user.last_name,
      country: 'KE', reference: req.user.id
    });
    const customerId = customerData.customer_id || customerData.id || (customerData.customer && customerData.customer.customer_id);
    if (!customerId) throw new Error('Payment provider did not return a customer ID; check its dashboard/API response.');
    const planData = await intasend('subscriptions-plans/', {
      name: `VORTEX ${planKey.toUpperCase()} monthly KES ${plan.amount}`, amount: plan.amount,
      currency: 'KES', frequency: 1, frequency_unit: 'M', billing_cycles: 12
    });
    const planId = planData.plan_id || planData.id || (planData.plan && planData.plan.plan_id);
    if (!planId) throw new Error('Payment provider did not return a plan ID; check its dashboard/API response.');
    const subData = await intasend('subscriptions/', {
      customer_id: customerId, plan_id: planId, reference,
      redirect_url: `${APP_ORIGIN}/?billing=return`
    });
    const providerId = subData.subscription_id || subData.id || null;
    const setupUrl = subData.setup_url;
    if (!setupUrl || !/^https:\/\//.test(setupUrl)) throw new Error('Payment provider did not return a valid secure card setup URL.');
    db.prepare('INSERT INTO subscriptions(reference,user_id,plan,provider_id,status,created_at) VALUES(?,?,?,?,?,?)').run(reference, req.user.id, planKey, providerId, 'PENDING', nowIso());
    res.json({ ok: true, setupUrl, message: 'Finish card setup on the payment provider page. Access is activated only after a verified subscription webhook.' });
  } catch (e) { next(e); }
});

app.post('/api/billing/cancel-card', requireUser, async (req, res, next) => {
  try {
    const sub = db.prepare("SELECT * FROM subscriptions WHERE user_id=? AND provider_id IS NOT NULL AND status IN ('PENDING','ACTIVE') ORDER BY created_at DESC LIMIT 1").get(req.user.id);
    if (!sub || !sub.provider_id) return res.status(404).json({ error: 'No cancellable card subscription was found.' });
    await intasend(`subscriptions/${encodeURIComponent(sub.provider_id)}/unsubscribe/`, {});
    db.prepare("UPDATE subscriptions SET status='CANCELED' WHERE reference=?").run(sub.reference);
    res.json({ ok: true, message: 'Cancellation requested. Check your provider dashboard for the final status.' });
  } catch (e) { next(e); }
});

// IntaSend webhook challenge is configured in its dashboard. Never grant access from a browser redirect.
app.post('/api/webhooks/intasend', (req, res) => {
  const expected = process.env.INTASEND_WEBHOOK_CHALLENGE || '';
  const supplied = String(req.body.challenge || '');
  if (!expected || !supplied || expected.length !== supplied.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(supplied))) {
    return res.status(401).json({ error: 'Invalid webhook challenge.' });
  }
  const event = req.body;
  try {
    if (event.topic === 'collection_event' && event.api_ref) {
      const payment = db.prepare('SELECT * FROM payments WHERE api_ref=?').get(String(event.api_ref));
      if (payment && event.state === 'COMPLETE' && String(event.currency || 'KES') === 'KES' && Math.round(Number(event.value)) === payment.amount) {
        db.prepare("UPDATE payments SET state='COMPLETE', invoice_id=COALESCE(?,invoice_id) WHERE api_ref=?").run(event.invoice_id || null, payment.api_ref);
        const until = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        const reference = `mpesa-${payment.api_ref}`;
        db.prepare(`INSERT INTO subscriptions(reference,user_id,plan,status,paid_until,created_at) VALUES(?,?,?,'ACTIVE',?,?)
          ON CONFLICT(reference) DO UPDATE SET status='ACTIVE',paid_until=excluded.paid_until`).run(reference, payment.user_id, payment.plan, until, nowIso());
      } else if (payment && ['FAILED','CANCELED'].includes(event.state)) {
        db.prepare("UPDATE payments SET state=? WHERE api_ref=? AND state <> 'COMPLETE'").run(event.state, payment.api_ref);
      }
    }
    if (event.topic === 'subscription_event' && event.reference) {
      const sub = db.prepare('SELECT * FROM subscriptions WHERE reference=?').get(String(event.reference));
      if (sub) {
        const paidCycle = Number(event.completed_cycles || 0) > 0 || (Array.isArray(event.payments) && event.payments.some(p => p.invoice && p.invoice.state === 'COMPLETE'));
        let status = String(event.status || 'PENDING');
        if (status === 'ACTIVE' && !paidCycle) status = 'PENDING';
        const nextDate = event.next_date || null;
        const paidUntil = paidCycle ? (nextDate ? new Date(`${nextDate}T23:59:59+03:00`).toISOString() : new Date(Date.now() + 30*24*60*60*1000).toISOString()) : null;
        db.prepare('UPDATE subscriptions SET status=?,paid_until=COALESCE(?,paid_until),next_date=? WHERE reference=?').run(status, paidUntil, nextDate, sub.reference);
      }
    }
    return res.status(200).json({ received: true });
  } catch (e) {
    console.error('Webhook processing failed:', e.message);
    return res.status(500).json({ error: 'Webhook processing failed.' });
  }
});

// Serve the same VORTEX frontend for local development. In production, host behind HTTPS.
app.use(['/server', '/node_modules'], (_req, res) => res.sendStatus(404));
app.use(express.static(path.join(__dirname, '..'), { dotfiles: 'deny', index: 'index.html' }));
app.get(/.*/, (_req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Unexpected server error. Check server logs.' });
});
app.listen(PORT, () => console.log(`VORTEX server listening at ${APP_ORIGIN}`));
