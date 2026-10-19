# VORTEX v1.3 — Website + Windows desktop + billing integration starter

VORTEX is a programming-learning starter with multi-language roadmaps, quizzes, projects, a career toolkit, saved lessons, a Python Learning Lab, and a subscription page. This version adds a **server-side IntaSend integration starter** for one-time monthly M-Pesa payments and recurring monthly card subscriptions.

## Important status

- The billing code is an integration starter, **not live/production-ready** until you register with IntaSend, configure sandbox keys, deploy over HTTPS, configure the webhook, test real provider responses, complete security review, and verify feature access is enforced server-side.
- Do not switch to live keys or collect real money until all sandbox tests pass and the payment provider has approved your merchant account.
- M-Pesa currently means a one-time monthly payment that the learner manually repeats next month.
- Card subscriptions are configured for up to 12 monthly billing cycles in this starter. Confirm renewal terms in the provider dashboard and present them clearly to customers.
- The existing lesson content is still static in the frontend. A verified subscription status is returned by the server, but **the actual paid learning content is not yet protected by server authorization**. Users could inspect the frontend files. Do not advertise a secure paywall until paid features/content are served or authorized by the backend.
- The desktop wrapper loads local files, so billing requests need a deployed API base URL/configuration before billing works inside the packaged desktop app. This guide currently activates billing in the browser-hosted website.

## 1. Create an IntaSend account

1. Open the [IntaSend developer documentation](https://developers.intasend.com/getting-started/) and use its sandbox dashboard link.
2. Register and complete the account steps requested by the provider. Before live payments, complete merchant/business verification and check fees, settlement timing, refunds, and supported payment methods.
3. In the sandbox dashboard, open **Settings → API Keys**. Copy the **publishable test key** and **secret test key**. Never put the secret key in `index.html`, `app.js`, GitHub, or a chat message.
4. The same provider supports a hosted KES checkout page for M-Pesa/card payments and a separate recurring-card subscriptions API. M-Pesa is not treated as automatic recurring billing here.

## 2. Install and configure the server

Install Node.js LTS from [nodejs.org](https://nodejs.org/). Extract the project ZIP. Open a terminal in the `VORTEX-v1` project folder.

Copy the example environment file to a root-level `.env` file:

**Windows PowerShell:**

```powershell
Copy-Item server/.env.example .env
```

Open `.env` with a text editor and set:

```env
NODE_ENV=development
PORT=3000
APP_ORIGIN=http://localhost:3000
DB_FILE=./server/vortex.sqlite
SESSION_SECRET=put-a-long-random-secret-here-at-least-32-characters
INTASEND_PUBLISHABLE_KEY=ISPubKey_test_your_real_sandbox_key
INTASEND_SECRET_KEY=ISSecretKey_test_your_real_sandbox_key
INTASEND_WEBHOOK_CHALLENGE=make-a-different-long-random-secret
```

Use only your own sandbox keys. Generate a session secret locally, for example with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`. The webhook challenge must be the exact same value configured in the IntaSend dashboard. Do not add `.env` to source control; it is covered by `.gitignore`.

Install packages:

```bash
npm install
```

Start the VORTEX server:

```bash
npm run start:server
```

Open `http://localhost:3000`. Use **Plans & subscriptions**, create a VORTEX account, then select Plus or Pro and choose a payment method. The account form creates a local user account; it does not email-verify the address in this starter, so do not treat it as sufficient for production identity assurance.

## 3. Configure the IntaSend webhook (sandbox)

1. Keep the local server running for UI testing, but note that IntaSend cannot reach `localhost` from its servers. For webhook tests, deploy the server to an HTTPS host or use a trusted HTTPS development tunnel.
2. In the IntaSend dashboard, open **Settings → Webhooks → New**.
3. Set the endpoint to `https://YOUR-HTTPS-DOMAIN/api/webhooks/intasend`.
4. Enter exactly the value of `INTASEND_WEBHOOK_CHALLENGE` as the challenge.
5. Subscribe to `collection_event` and `subscription_event`.
6. Use test keys and provider test tools to verify pending, completed, failed, duplicate, and canceled events. The app does not grant access on browser redirects; the webhook must confirm the payment and expected KES amount.

Provider docs: [M-Pesa STK Push](https://developers.intasend.com/guides/collections/mpesa-stk-push/), [Subscriptions](https://developers.intasend.com/guides/subscriptions/), [Webhooks](https://developers.intasend.com/guides/webhooks/).

## 4. Test before considering live payments

Run syntax and smoke tests:

```bash
npm test
npm run test:billing
```

Then test these flows with sandbox credentials:

- Register and sign in; wrong passwords are rejected.
- Request an M-Pesa payment; verify the prompt and check that no access is granted before a `COMPLETE` webhook.
- Complete a sandbox payment; verify the expected plan and amount are recorded.
- Start a card subscription; complete card setup and confirm the first successful billing event before granting access.
- Test failed/canceled payments, webhook replays, cancellation, expired subscriptions, and a plan/amount mismatch.
- Confirm secret keys are never sent to the browser, and that HTTPS, backups, monitoring, account recovery, email verification, privacy notice, terms, refund policy and support contact are ready.

## 5. Before going live

1. Deploy to a Node.js host with HTTPS and persistent storage. For production, move user/session/payment data to a managed PostgreSQL database and a durable session store; SQLite is a starter choice only.
2. Set `NODE_ENV=production`, `APP_ORIGIN` to the exact HTTPS site origin, a strong `SESSION_SECRET`, and live keys through the host's secret manager (not a committed `.env` file).
3. Configure the webhook URL and challenge in the live dashboard, then repeat tests with provider-approved live procedures.
4. Implement server-side authorization around every Plus/Pro resource. Static client files are not a secure paywall.
5. Verify provider subscription ID/reference mapping, webhook idempotency, renewal and cancellation timing, refund/chargeback handling, and amount/currency checks in a production-grade database transaction.
6. Build and test the Windows installer separately. Desktop billing must point to the deployed HTTPS API, not `file://` or localhost.

## Architecture notes

- `server/index.cjs`: Express API, password hashing, cookie sessions, M-Pesa STK requests, recurring-card setup, cancellation, and webhook handler.
- `server/.env.example`: server configuration template. Copy to `.env` in the project root.
- `server/vortex.sqlite` and `server/sessions.sqlite`: local test databases generated at runtime; do not commit these.
- `index.html`, `styles.css`, `app.js`, `python-lab.js`: existing VORTEX frontend and subscription checkout forms.

This is not a substitute for a professional security review. Do not accept real payments until account access control and paid-content enforcement are completed.
