const LANGUAGES = [
 {id:"html",name:"HTML",badge:"H",tone:"orange",category:"Web",description:"Structure websites with accessible, meaningful content.",levels:["HTML elements and page structure","Forms, links, images and tables","Semantic HTML, accessibility and SEO","Accessible forms and document structure","Reusable page patterns and validation"],skills:"Elements, attributes, forms, semantic markup, accessibility",project:"Personal profile page"},
 {id:"css",name:"CSS",badge:"#",tone:"blue",category:"Web",description:"Create responsive layouts, design systems and polished interfaces.",levels:["Selectors, colours, box model","Flexbox, Grid and responsive design","Animations, variables and architecture","Accessible responsive design systems","Performance, maintainability and component styling"],skills:"Selectors, cascade, box model, Flexbox, Grid, responsive layouts",project:"Responsive portfolio"},
 {id:"javascript",name:"JavaScript",badge:"JS",tone:"yellow",category:"Web",description:"Add interaction, logic and dynamic behaviour to websites.",levels:["Variables, values and operators","Conditions, loops, arrays and functions","DOM, events, modules and async code","Promises, APIs, testing and architecture","Performance, security and design patterns"],skills:"Variables, functions, arrays, objects, DOM, async, modules",project:"Interactive quiz app"},
 {id:"python",name:"Python",badge:"Py",tone:"blue",category:"General",description:"Start with readable syntax, then build automation and applications.",levels:["print, variables, types and input","Conditions, loops, collections and functions","Files, exceptions, modules and classes","Testing, APIs, environments and data handling","Packaging, profiling, concurrency and architecture"],skills:"Types, control flow, collections, functions, files, OOP, testing",project:"Study planner CLI"},
 {id:"typescript",name:"TypeScript",badge:"TS",tone:"blue",category:"Web",description:"Write more reliable JavaScript with static types.",levels:["Types, inference and annotations","Unions, interfaces and functions","Generics, narrowing and modules","Strict projects, type-safe APIs and testing","Advanced type design and library authoring"],skills:"Types, interfaces, unions, generics, narrowing",project:"Typed task tracker"},
 {id:"java",name:"Java",badge:"J",tone:"red",category:"General",description:"Learn object-oriented programming and robust application design.",levels:["Syntax, variables and control flow","Methods, arrays and classes","Collections, exceptions and interfaces","Generics, streams, tests and concurrency","JVM, profiling, architecture and secure services"],skills:"OOP, collections, exceptions, generics, streams, testing",project:"Library management app"},
 {id:"c",name:"C",badge:"C",tone:"dark",category:"Systems",description:"Understand memory, data representation and systems fundamentals.",levels:["Types, expressions and console I/O","Conditions, loops, functions and arrays","Pointers, strings, structs and files","Dynamic memory, debugging and modular code","Undefined behaviour, performance and portability"],skills:"Pointers, arrays, structs, memory, files, compilation",project:"Command-line grade book"},
 {id:"cpp",name:"C++",badge:"C++",tone:"blue",category:"Systems",description:"Build efficient software while learning modern C++ practices.",levels:["Syntax, types and control flow","Functions, references and classes","STL containers, algorithms and RAII","Templates, smart pointers and concurrency","Profiling, API design and modern C++ idioms"],skills:"Classes, STL, RAII, templates, smart pointers",project:"Console inventory system"},
 {id:"csharp",name:"C#",badge:"C#",tone:"purple",category:"General",description:"Build applications with modern C# and the .NET ecosystem.",levels:["Types, variables and control flow","Methods, classes, collections and LINQ","Interfaces, exceptions, async and files","ASP.NET basics, testing and dependency injection","Performance, security and application architecture"],skills:"OOP, LINQ, async, .NET, testing, APIs",project:"Task tracker"},
 {id:"php",name:"PHP",badge:"PHP",tone:"purple",category:"Web",description:"Build server-rendered websites and backend web features.",levels:["Syntax, variables and output","Conditions, loops, arrays and functions","Forms, validation, sessions and files","PDO, secure database access and testing","Architecture, caching and deployment"],skills:"Functions, arrays, HTTP, sessions, PDO, security",project:"Contact form with validation"},
 {id:"sql",name:"SQL",badge:"SQL",tone:"green",category:"Data",description:"Query, organise and understand relational data.",levels:["Tables, SELECT, WHERE and sorting","INSERT, UPDATE, DELETE and constraints","JOINs, grouping and aggregate functions","Indexes, transactions and query plans","Schema design, optimisation and access control"],skills:"SELECT, joins, aggregates, schema, indexes, transactions",project:"Student results database"},
 {id:"go",name:"Go",badge:"Go",tone:"blue",category:"Systems",description:"Build simple, fast backend services and command-line tools.",levels:["Packages, variables and functions","Slices, maps, structs and interfaces","Errors, files, JSON and HTTP","Goroutines, channels and tests","Profiling, service design and deployment"],skills:"Types, interfaces, errors, goroutines, HTTP, tests",project:"Simple URL status checker"},
 {id:"rust",name:"Rust",badge:"Rs",tone:"orange",category:"Systems",description:"Explore memory safety, ownership and reliable systems code.",levels:["Variables, types and control flow","Ownership, borrowing and references","Structs, enums, pattern matching and traits","Lifetimes, error handling and modules","Concurrency, performance and API design"],skills:"Ownership, borrowing, enums, traits, lifetimes, Result",project:"Safe command-line note tool"},
 {id:"kotlin",name:"Kotlin",badge:"Kt",tone:"purple",category:"Apps",description:"Learn concise modern programming for Android and beyond.",levels:["Variables, types and control flow","Functions, collections and null safety","Classes, data classes and extension functions","Coroutines, testing and app architecture","Performance, modularity and secure app design"],skills:"Null safety, collections, classes, coroutines",project:"Habit tracker prototype"},
 {id:"swift",name:"Swift",badge:"Sw",tone:"orange",category:"Apps",description:"Learn Swift fundamentals and the foundations of Apple apps.",levels:["Values, types and control flow","Functions, collections and optionals","Structs, classes, protocols and errors","Concurrency, testing and SwiftUI foundations","Architecture, performance and accessibility"],skills:"Optionals, structs, protocols, async, SwiftUI basics",project:"Daily checklist prototype"},
 {id:"ruby",name:"Ruby",badge:"Rb",tone:"red",category:"Web",description:"Explore readable syntax, scripting and web application foundations.",levels:["Syntax, variables and strings","Collections, blocks and methods","Classes, modules and exceptions","Testing, HTTP and Rails concepts","Performance, security and maintainable architecture"],skills:"Collections, blocks, classes, modules, testing",project:"Reading list manager"},
 {id:"bash",name:"Bash & Shell",badge:"$_",tone:"dark",category:"Tools",description:"Automate repetitive tasks and understand the command line.",levels:["Terminal navigation and commands","Variables, quoting and pipes","Conditions, loops and functions","Exit codes, safe scripts and debugging","Automation, portability and robust tooling"],skills:"Commands, pipes, variables, scripts, permissions",project:"File organiser script"}
];

const QUESTIONS = [
 {q:"Which HTML element represents a paragraph?",opts:["<section>","<p>","<head>","<style>"],a:1,why:"The <p> element represents a paragraph."},
 {q:"Which CSS layout system is designed for one-dimensional rows or columns?",opts:["Flexbox","SQL","JSON","HTTP"],a:0,why:"Flexbox is designed to lay out items along a row or a column."},
 {q:"Which JavaScript keyword declares a block-scoped variable that can be reassigned?",opts:["define","const only","let","echo"],a:2,why:"let declares a block-scoped variable that may be reassigned."},
 {q:"What does Python's print() function do?",opts:["Deletes a variable","Displays output","Installs Python","Creates a class automatically"],a:1,why:"print() writes text or other values to the output stream."},
 {q:"In programming, what is a loop commonly used for?",opts:["Repeating instructions","Naming a file only","Changing a monitor","Encrypting every value automatically"],a:0,why:"Loops repeat a block of instructions while a condition or sequence calls for it."},
 {q:"What does SQL SELECT do?",opts:["Styles a page","Retrieves data","Compiles C code","Creates a browser tab"],a:1,why:"SELECT queries data from one or more database tables or views."},
 {q:"What is a function?",opts:["A reusable block of code","A computer cable","A type of screen","A database password"],a:0,why:"A function packages instructions that can be called when needed."},
 {q:"What is Git mainly used for?",opts:["Image editing","Version control","Charging a laptop","Writing CSS only"],a:1,why:"Git records changes to files so developers can review and manage versions."},
 {q:"What does an array or list usually store?",opts:["A collection of values","Only one keyboard key","An internet connection","A programming language"],a:0,why:"Arrays and lists store ordered collections of values, though exact behaviour varies by language."},
 {q:"What should you do with user input before using it in a database query?",opts:["Trust it automatically","Validate it and use parameterized queries","Make it public","Ignore all errors"],a:1,why:"Validation and parameterized queries help prevent invalid data and SQL injection."}
];

const PROJECTS = [
 {id:"profile",title:"Personal portfolio page",level:"Beginner",language:"HTML · CSS",symbol:"▣",description:"Create a simple page introducing yourself, your skills, and two projects.",steps:["Create an index.html file with a heading, about section and project list.","Style the page with CSS colours, spacing and responsive layout.","Add contact links and test it on a phone-sized screen."],accept:"The page loads, links work, text is readable on a small screen, and no horizontal scrolling is needed."},
 {id:"quiz",title:"Interactive quiz",level:"Beginner",language:"JavaScript",symbol:"?",description:"Build a quiz that checks answers and shows a final score.",steps:["Write five questions with answer choices.","Use JavaScript to check the selected answer.","Show feedback and calculate the final score."],accept:"Every question can be answered once, feedback is correct, and the final score matches the answers."},
 {id:"python-planner",title:"Study planner",level:"Beginner",language:"Python",symbol:"Py",description:"Make a command-line planner that records tasks and their due dates.",steps:["Ask the user for a task and due date.","Store tasks in a list while the program runs.","Add a menu to list and mark tasks complete."],accept:"The program accepts input, lists tasks clearly, and handles an empty task list without crashing."},
 {id:"weather",title:"Weather dashboard",level:"Intermediate",language:"JavaScript · API",symbol:"☼",description:"Practise API requests and display data from a permitted weather API.",steps:["Choose an API and read its usage and key rules.","Request data and handle loading or error states.","Display the returned information accessibly."],accept:"Loading, success, invalid input, and API error states are all handled."},
 {id:"inventory",title:"Inventory tracker",level:"Intermediate",language:"Python · SQL",symbol:"▤",description:"Track items, quantities and changes using a small database.",steps:["Design an items table with an ID, name and quantity.","Add create, read and update operations.","Validate input and use parameterized SQL queries."],accept:"Items can be added and updated, invalid quantities are rejected, and queries use parameters."},
 {id:"api",title:"Task API",level:"Advanced",language:"Backend",symbol:"⌘",description:"Design a small REST API with validation, tests and clear error responses.",steps:["Define endpoints and request/response shapes.","Validate input and add automated tests.","Document setup, authentication decisions and error codes."],accept:"Tests cover success and failure paths, secrets are not committed, and API behaviour is documented."}
];

const LESSON_CONTENT = {
 html:[
  {title:"Meet HTML",intro:"HTML (HyperText Markup Language) describes the structure and meaning of web content. It is a markup language, not a general-purpose programming language.",code:"<!doctype html>\n<html lang=\"en\">\n  <body>\n    <h1>Hello, world!</h1>\n    <p>My first page.</p>\n  </body>\n</html>",tip:"Use headings in a logical order and give meaningful images alternative text."},
  {title:"Links, images and forms",intro:"Links connect pages, images add visual information, and forms collect user input. Always label form fields and describe images when they convey meaning.",code:'<a href="about.html">About me</a>\n<img src="cat.jpg" alt="A cat sleeping">\n<label for="email">Email</label>\n<input id="email" type="email">',tip:"Never put passwords, private tokens, or secret keys in public HTML."},
  {title:"Semantic and accessible HTML",intro:"Semantic elements describe purpose. Use header, nav, main, section, article and footer where appropriate. Accessibility helps people navigate with keyboards and assistive technology.",code:"<main>\n  <article>\n    <h2>My project</h2>\n    <p>What it does and who it helps.</p>\n  </article>\n</main>",tip:"Test keyboard navigation and use buttons for actions and links for navigation."}
 ],
 css:[
  {title:"CSS rules and the box model",intro:"CSS controls presentation. A rule combines a selector with declarations. The box model describes content, padding, borders and margins.",code:"* { box-sizing: border-box; }\n.card {\n  padding: 1rem;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n}",tip:"Use consistent spacing and readable contrast; do not rely on colour alone to communicate meaning."},
  {title:"Flexbox and Grid",intro:"Flexbox is useful for arranging items in one dimension. Grid is useful for rows and columns. Both can adapt to different screen sizes.",code:".row { display: flex; gap: 1rem; }\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n}",tip:"Test layouts at narrow widths, not only on your own computer."},
  {title:"Responsive design systems",intro:"Use reusable variables, flexible units, responsive layouts and media queries. Check focus states, reduced motion and contrast as part of the design.",code:":root { --brand: #6d4aff; }\n.button { background: var(--brand); }\n@media (max-width: 600px) {\n  .row { flex-direction: column; }\n}",tip:"Avoid fixed widths for main content and check for horizontal scrolling on mobile."}
 ],
 javascript:[
  {title:"Variables and values",intro:"JavaScript runs behaviour in the browser and on other runtimes. Use const by default and let when reassignment is needed. Values include strings, numbers, booleans, arrays and objects.",code:'const learner = "Sam";\nlet lessonsCompleted = 0;\nlessonsCompleted += 1;\nconsole.log(learner, lessonsCompleted);',tip:"Use descriptive names and === for strict equality in most comparisons."},
  {title:"Conditions, loops and functions",intro:"Conditions choose a path, loops repeat work, and functions package reusable behaviour. Break a problem into small steps you can test.",code:"function passed(score) {\n  if (score >= 50) return true;\n  return false;\n}\nconsole.log(passed(72));",tip:"Try edge cases such as 0, 49, 50, and 100 when testing a score function."},
  {title:"DOM, events and asynchronous code",intro:"The DOM represents a page as objects. Events respond to user actions. Promises and async/await help handle work that completes later, such as network requests.",code:'const button = document.querySelector("#go");\nbutton.addEventListener("click", () => {\n  document.querySelector("#message").textContent = "Nice work!";\n});',tip:"Treat user-provided text as textContent, not HTML, unless you carefully sanitize it."}
 ],
 python:[
  {title:"Your first Python program",intro:"Python is a general-purpose programming language known for readable syntax. Run this example with a Python interpreter to see its output.",code:'name = "Learner"\nprint("Hello,", name)\n\nminutes = 15\nprint("Practice minutes:", minutes)',tip:"Indentation is part of Python syntax. Use consistent four-space indentation."},
  {title:"Conditions, loops and collections",intro:"Use if/elif/else to make decisions, for and while to repeat work, and lists or dictionaries to organise values.",code:"scores = [65, 82, 49]\nfor score in scores:\n    if score >= 50:\n        print(score, \"passed\")\n    else:\n        print(score, \"needs practice\")",tip:"Choose a for loop when iterating through a collection; avoid changing a list while iterating over it."},
  {title:"Functions, files and errors",intro:"Functions make code reusable. Files store information between runs. Exceptions let you handle expected failures without hiding every error.",code:'def average(numbers):\n    if not numbers:\n        raise ValueError("Provide at least one number")\n    return sum(numbers) / len(numbers)\n\nprint(average([70, 80, 90]))',tip:"Learn virtual environments, packages and unit tests before building larger Python projects."}
 ],
 typescript:[
  {title:"Types and inference",intro:"TypeScript adds static type checking to JavaScript and is commonly compiled to JavaScript. Types help detect certain mistakes before runtime.",code:'let learner: string = "Sam";\nlet completed: number = 2;\nconst isReady: boolean = completed > 0;',tip:"TypeScript types do not automatically validate untrusted data received from an API."},
  {title:"Interfaces and unions",intro:"Interfaces describe object shapes. Union types represent values that may have more than one allowed type.",code:'interface Course {\n  title: string;\n  lessons: number;\n}\ntype Status = "new" | "learning" | "complete";',tip:"Prefer clear domain types over using any everywhere."},
  {title:"Generics and safe boundaries",intro:"Generics preserve relationships between input and output types. Validate external data at runtime even when using TypeScript.",code:'function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\nconst item = first<number>([10, 20]);',tip:"Strict compiler settings and tests make type checking more useful."}
 ],
 java:[
  {title:"Your first Java class",intro:"Java code is commonly organised into classes and compiled to bytecode for the Java Virtual Machine.",code:'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}',tip:"The public class name normally matches the source file name, for example Main.java."},
  {title:"Methods and classes",intro:"Methods group behaviour and classes define state and operations. Keep responsibilities focused and use clear names.",code:'class Counter {\n  private int value = 0;\n  public void increment() { value++; }\n  public int getValue() { return value; }\n}',tip:"Learn access modifiers and object construction before making large class hierarchies."},
  {title:"Collections and exceptions",intro:"Collections hold groups of objects. Exceptions represent exceptional conditions. Use generics to preserve type information.",code:'List<String> topics = List.of("HTML", "CSS");\nfor (String topic : topics) {\n  System.out.println(topic);\n}',tip:"Practise unit tests and understand resource handling before building production services."}
 ],
 sql:[
  {title:"Select and filter data",intro:"SQL is used to query relational databases. SELECT reads rows and columns from tables.",code:"SELECT name, score\nFROM learners\nWHERE score >= 50\nORDER BY score DESC;",tip:"Use explicit column names rather than SELECT * in production queries where practical."},
  {title:"Joins and grouping",intro:"JOIN combines related rows from tables. GROUP BY groups rows for aggregate calculations such as COUNT and AVG.",code:"SELECT course_id, COUNT(*) AS learner_count\nFROM enrollments\nGROUP BY course_id;",tip:"Understand primary keys and foreign keys so your tables represent relationships accurately."},
  {title:"Transactions and query safety",intro:"Transactions help keep related changes consistent. Parameterized queries keep data separate from SQL syntax in application code.",code:"BEGIN;\nUPDATE inventory\nSET quantity = quantity - 1\nWHERE item_id = 42;\nCOMMIT;",tip:"Exact transaction syntax varies by database. Use parameters in application code and grant only required permissions."}
 ]
};

const STORE = "vortex-v1-local";
const defaultState = {name:"",completed:[],saved:[],scores:[],projects:[],goal:3,selectedPlan:"free"};
let state = readState();
let currentPath = "python";
let currentLevel = "Beginner";
let currentQuiz = 0;
let quizAnswered = false;
let quizCorrect = 0;
let quizCount = 5;
let toastTimer;

function readState(){
 try{
  const raw=JSON.parse(localStorage.getItem(STORE)||"null");
  if(raw&&typeof raw==="object") return {...defaultState,...raw,
    completed:Array.isArray(raw.completed)?raw.completed:[],
    saved:Array.isArray(raw.saved)?raw.saved:[],
    scores:Array.isArray(raw.scores)?raw.scores:[],
    projects:Array.isArray(raw.projects)?raw.projects:[]};
 }catch(e){console.warn("Could not read local progress",e);}
 return {...defaultState};
}
function saveState(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch(e){notify("Browser storage is unavailable; progress may not persist.");}}
function notify(message){
 const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);
}
function lessonId(lang,level,index){return `${lang}:${level.toLowerCase()}:${index}`;}
function langById(id){return LANGUAGES.find(l=>l.id===id)||LANGUAGES[0];}
function completedCount(){return state.completed.length;}
function pathProgress(lang){const total=lang.levels.length*3;const count=state.completed.filter(id=>id.startsWith(`${lang.id}:`)).length;return Math.round(count/total*100);}
function renderPathCard(lang){
 const progress=pathProgress(lang);
 return `<article class="path-card"><div class="path-card-top"><span class="lang-badge lang-${lang.tone}">${esc(lang.badge)}</span><span class="pill">${esc(lang.category)}</span></div><h3>${esc(lang.name)}</h3><p>${esc(lang.description)}</p><div class="mini-track" style="margin-top:15px"><span style="width:${progress}%;display:block;height:100%;background:var(--purple);border-radius:20px"></span></div><div class="path-card-bottom"><span>${progress}% · 3 stages</span><button class="path-open" data-open-path="${lang.id}">Explore path →</button></div></article>`;
}
function renderFeatured(){
 document.getElementById("featured-paths").innerHTML=["python","javascript","html","css","sql","java"].map(id=>renderPathCard(langById(id))).join("");
 document.getElementById("featured-projects").innerHTML=PROJECTS.slice(0,3).map(renderProjectCard).join("");
 bindPathButtons();
 bindProjectButtons();
}
function renderAllPaths(){
 const search=(document.getElementById("path-search").value||"").trim().toLowerCase();
 const filtered=LANGUAGES.filter(l=>(l.name+" "+l.description+" "+l.category).toLowerCase().includes(search));
 document.getElementById("all-paths").innerHTML=filtered.length?filtered.map(renderPathCard).join(""):'<p class="empty-state">No matching paths. Try another search.</p>';
 bindPathButtons();
}
function bindPathButtons(){document.querySelectorAll("[data-open-path]").forEach(b=>b.addEventListener("click",()=>openPath(b.dataset.openPath)));}
function renderProjectCard(p){
 const done=state.projects.includes(p.id);
 return `<article class="project-card"><div class="project-art">${esc(p.symbol)}</div><div class="project-copy"><span class="pill">${esc(p.level)}</span><h3>${esc(p.title)} ${done?"✓":""}</h3><p>${esc(p.description)}</p><div class="project-tags"><span>${esc(p.language)}</span><span>Portfolio practice</span></div><button class="button ${done?"secondary":"primary"}" data-project="${p.id}">${done?"Review project":"View project brief"} →</button></div></article>`;
}
function renderProjects(){
 document.getElementById("all-projects").innerHTML=PROJECTS.map(renderProjectCard).join("");
 document.getElementById("featured-projects").innerHTML=PROJECTS.slice(0,3).map(renderProjectCard).join("");
 bindProjectButtons();
}
function bindProjectButtons(){document.querySelectorAll("[data-project]").forEach(b=>b.addEventListener("click",()=>openProject(b.dataset.project)));}
function openProject(id){
 const p=PROJECTS.find(x=>x.id===id);if(!p)return;
 const body=`<div class="lesson-hero"><span class="lang-badge lang-purple">${esc(p.symbol)}</span><div><p class="eyebrow">${esc(p.level)} PROJECT</p><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p></div></div><div class="lesson-body"><article class="panel lesson-article"><h2>Build steps</h2><ol>${p.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol><h3>Acceptance test</h3><p>${esc(p.accept)}</p><p><strong>Suggested habit:</strong> write down what you tried, what failed, and what you learned. That explanation is useful in a portfolio.</p></article><aside class="panel lesson-aside"><h3>Project checklist</h3><p>Use this brief to build the project in your own editor. VORTEX does not execute or submit your code.</p><button class="button primary" id="mark-project">${state.projects.includes(id)?"Mark as not completed":"Mark project explored"}</button><button class="button secondary" id="back-projects" style="width:100%;margin-top:8px">Back to projects</button></aside></div>`;
 showPage("lesson-page","Project brief");document.getElementById("lesson-detail").innerHTML=body;
 document.getElementById("mark-project").addEventListener("click",()=>{if(state.projects.includes(id))state.projects=state.projects.filter(x=>x!==id);else state.projects.push(id);saveState();renderStats();renderProjects();openProject(id);notify("Project progress updated.");});
 document.getElementById("back-projects").addEventListener("click",()=>showPage("projects","Projects"));
}
function openPath(id){
 currentPath=id;currentLevel="Beginner";renderPathDetail();showPage("lesson-page",langById(id).name);
}
function renderPathDetail(){
 const lang=langById(currentPath);
 const lessons=lang.levels.map((title,i)=>({id:lessonId(lang.id,currentLevel,i),title,description:lessonDescription(lang.id,currentLevel,i),index:i}));
 const html=`<div class="lesson-hero"><span class="lang-badge lang-${lang.tone}">${esc(lang.badge)}</span><div><p class="eyebrow">${esc(lang.category)} · LEARNING PATH</p><h1>${esc(lang.name)}</h1><p>${esc(lang.description)}</p></div></div><div class="level-tabs">${["Beginner","Intermediate","Advanced"].map(level=>`<button class="level-tab ${level===currentLevel?"active":""}" data-level="${level}">${level}</button>`).join("")}</div><div class="panel" style="padding:18px;margin-bottom:15px"><strong>${currentLevel} roadmap</strong><p class="muted" style="margin:5px 0 0;font-size:.82rem">Core skills: ${esc(lang.skills)}. These are roadmap topics; lesson depth will expand in future releases.</p></div><div class="lesson-list">${lessons.map((l,i)=>`<article class="lesson-row"><span class="lesson-number">${state.completed.includes(l.id)?"✓":String(i+1).padStart(2,"0")}</span><div class="lesson-row-main"><h3>${esc(l.title)}</h3><p>${esc(l.description)}</p></div><div class="lesson-row-actions"><button class="save-button ${state.saved.includes(l.id)?"saved":""}" title="${state.saved.includes(l.id)?"Unsave":"Save"} lesson" data-save="${l.id}">${state.saved.includes(l.id)?"★":"☆"}</button><button class="button secondary" data-open-lesson="${l.id}">Open lesson</button></div></article>`).join("")}</div><div id="lesson-detail-body"></div>`;
 document.getElementById("lesson-detail").innerHTML=html;
 document.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>{currentLevel=b.dataset.level;renderPathDetail();}));
 document.querySelectorAll("[data-save]").forEach(b=>b.addEventListener("click",()=>toggleSaved(b.dataset.save)));
 document.querySelectorAll("[data-open-lesson]").forEach(b=>b.addEventListener("click",()=>renderLesson(b.dataset.openLesson)));
}
function lessonDescription(lang,level,index){
 const general={
 Beginner:["Start with the basic vocabulary and a tiny working example.","Learn the syntax and practise the most common patterns.","Combine the basics and check your understanding."],
 Intermediate:["Use core concepts to solve a practical problem.","Organise code into reusable pieces and handle common errors.","Build a small feature with clearer structure and testing."],
 Advanced:["Explore reliable design, testing, and maintainability.","Learn how to handle edge cases, security, and performance.","Plan a larger solution and explain your technical choices."]
 };
 return (general[level]||general.Beginner)[index%3];
}
function contentFor(lang,level,index){
 const specific=(LESSON_CONTENT[lang]||LESSON_CONTENT.javascript)[index%3];
 if(level==="Beginner")return specific;
 const label=level==="Intermediate"?"Build beyond the basics":"Advanced practice";
 return {title:`${label}: ${specific.title}`,intro:`${specific.intro} At this stage, focus on design choices, edge cases, tests, and explaining why your solution works.`,code:specific.code,tip:level==="Intermediate"?"Add at least three tests, including one edge case, and refactor duplicated logic.":"Document assumptions, measure performance where relevant, review security implications, and compare at least two possible designs."};
}
function renderLesson(id){
 const parts=id.split(":");const lang=langById(parts[0]);const level=parts[1].charAt(0).toUpperCase()+parts[1].slice(1);const index=Number(parts[2]);const lesson=contentFor(lang.id,level,index);
 const done=state.completed.includes(id);
 const html=`<div class="lesson-body"><article class="panel lesson-article"><p class="eyebrow">${esc(lang.name.toUpperCase())} · ${esc(level.toUpperCase())}</p><h2>${esc(lesson.title)}</h2><p>${esc(lesson.intro)}</p><h3>Example</h3><pre><code>${esc(lesson.code)}</code></pre><h3>Practise this</h3><ol><li>Read the example and explain what each important line does in your own words.</li><li>Type it into your own editor rather than only copying it.</li><li>Change one value or feature and observe what changes.</li><li>Write down one question you still have.</li></ol><div class="notice"><strong>Remember:</strong> ${esc(lesson.tip)}</div></article><aside class="panel lesson-aside"><h3>Lesson checklist</h3><p>Mark this lesson complete after you have tried the example and can explain the main idea.</p><p><strong>Stage:</strong> ${esc(level)}</p><p><strong>Language:</strong> ${esc(lang.name)}</p><button class="button primary" id="complete-current">${done?"Completed ✓":"Mark lesson complete"}</button><button class="button secondary" id="save-current" style="width:100%;margin-top:8px">${state.saved.includes(id)?"★ Saved lesson":"☆ Save for later"}</button></aside></div>`;
 const holder=document.getElementById("lesson-detail-body");holder.innerHTML=html;
 document.getElementById("complete-current").addEventListener("click",()=>{if(!state.completed.includes(id)){state.completed.push(id);saveState();renderStats();renderPathDetail();renderLesson(id);notify("Lesson completed. Keep going!");}});
 document.getElementById("save-current").addEventListener("click",()=>toggleSaved(id));
 holder.scrollIntoView({behavior:"smooth",block:"start"});
}
function toggleSaved(id){
 if(state.saved.includes(id))state.saved=state.saved.filter(x=>x!==id);else state.saved.push(id);
 saveState();renderSaved();if(currentPath)renderPathDetail();notify(state.saved.includes(id)?"Lesson saved.":"Lesson removed from saved items.");
}
function renderSaved(){
 const holder=document.getElementById("saved-lessons");
 if(!state.saved.length){holder.innerHTML="";document.getElementById("saved-empty").classList.remove("hidden");return;}
 document.getElementById("saved-empty").classList.add("hidden");
 holder.innerHTML=state.saved.map(id=>{const [langId,level,index]=id.split(":");const lang=langById(langId);const title=lang.levels[Number(index)]||"Lesson";return `<article class="path-card"><div class="path-card-top"><span class="lang-badge lang-${lang.tone}">${esc(lang.badge)}</span><span class="pill">${esc(level)}</span></div><h3>${esc(title)}</h3><p>${esc(lang.name)} learning path</p><div class="path-card-bottom"><button class="path-open" data-saved-open="${id}">Open lesson →</button><button class="path-open" data-unsave="${id}">Remove</button></div></article>`}).join("");
 holder.querySelectorAll("[data-saved-open]").forEach(b=>b.addEventListener("click",()=>{const [langId,level]=b.dataset.savedOpen.split(":");currentPath=langId;currentLevel=level.charAt(0).toUpperCase()+level.slice(1);renderPathDetail();showPage("lesson-page",langById(langId).name);renderLesson(b.dataset.savedOpen);}));
 holder.querySelectorAll("[data-unsave]").forEach(b=>b.addEventListener("click",()=>toggleSaved(b.dataset.unsave)));
}
function renderStats(){
 document.getElementById("stat-lessons").textContent=completedCount();
 document.getElementById("stat-lesson-sub").textContent=completedCount()?"Keep your momentum going":"Start your first lesson";
 const total=state.scores.reduce((a,s)=>a+s.total,0),correct=state.scores.reduce((a,s)=>a+s.correct,0);
 document.getElementById("stat-accuracy").textContent=total?`${Math.round(correct/total*100)}%`:"—";
 document.getElementById("stat-points").textContent=completedCount()*10+correct*10;
 document.getElementById("stat-projects").textContent=state.projects.length;
 const pp=pathProgress(langById("python"));document.getElementById("python-progress-bar").style.width=`${pp}%`;document.getElementById("python-progress-label").textContent=`${pp}% completed`;
 const goal=Math.max(1,Number(state.goal)||3),done=completedCount();document.getElementById("goal-progress-bar").style.width=`${Math.min(100,done/goal*100)}%`;document.getElementById("goal-progress-label").textContent=`${Math.min(done,goal)} of ${goal} lessons`;
}
function startQuiz(){
 currentQuiz=0;quizAnswered=false;quizCorrect=0;quizCount=5;renderQuizQuestion();
}
function renderQuizQuestion(){
 const question=QUESTIONS[currentQuiz%QUESTIONS.length];quizAnswered=false;
 document.getElementById("quiz-counter").textContent=`Question ${currentQuiz+1} of ${quizCount}`;
 document.getElementById("quiz-track-fill").style.width=`${currentQuiz/quizCount*100}%`;
 document.getElementById("quiz-question").textContent=question.q;
 document.getElementById("quiz-feedback").className="quiz-feedback hidden";
 document.getElementById("quiz-feedback").textContent="";
 document.getElementById("quiz-next").disabled=true;
 document.getElementById("quiz-next").textContent=currentQuiz===quizCount-1?"Finish quiz":"Next question →";
 document.getElementById("quiz-answers").innerHTML=question.opts.map((o,i)=>`<button class="quiz-answer" data-answer="${i}">${esc(o)}</button>`).join("");
 document.querySelectorAll("[data-answer]").forEach(b=>b.addEventListener("click",()=>answerQuiz(Number(b.dataset.answer))));
}
function answerQuiz(selected){
 if(quizAnswered)return;quizAnswered=true;
 const q=QUESTIONS[currentQuiz%QUESTIONS.length],correct=selected===q.a;if(correct)quizCorrect++;
 document.querySelectorAll("[data-answer]").forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct");else if(i===selected)b.classList.add("incorrect");});
 const feedback=document.getElementById("quiz-feedback");feedback.className=`quiz-feedback ${correct?"good":"bad"}`;feedback.textContent=`${correct?"Correct!":"Not quite."} ${q.why}`;
 document.getElementById("quiz-track-fill").style.width=`${(currentQuiz+1)/quizCount*100}%`;
 document.getElementById("quiz-next").disabled=false;
}
function nextQuiz(){
 if(!quizAnswered)return;
 if(currentQuiz<quizCount-1){currentQuiz++;renderQuizQuestion();return;}
 state.scores.push({correct:quizCorrect,total:quizCount,date:new Date().toISOString()});if(state.scores.length>50)state.scores=state.scores.slice(-50);
 saveState();renderStats();
 document.getElementById("quiz-counter").textContent="Quiz complete";
 document.getElementById("quiz-question").textContent=`You scored ${Math.round(quizCorrect/quizCount*100)}% (${quizCorrect} out of ${quizCount}).`;
 document.getElementById("quiz-answers").innerHTML="";
 const feedback=document.getElementById("quiz-feedback");feedback.className="quiz-feedback good";feedback.textContent=quizCorrect>=4?"Excellent work. Try a project to apply what you learned.":"Good effort. Review a lesson and take the quiz again.";
 document.getElementById("quiz-track-fill").style.width="100%";document.getElementById("quiz-next").disabled=true;document.getElementById("quiz-next").textContent="Quiz complete";
 const restart=document.createElement("button");restart.className="button secondary";restart.textContent="Try again";restart.addEventListener("click",startQuiz);document.querySelector(".quiz-footer").appendChild(restart);
}
function showPage(id,label){
 document.querySelectorAll(".page-section").forEach(s=>s.classList.add("hidden"));
 document.getElementById(id).classList.remove("hidden");
 document.getElementById("breadcrumb-current").textContent=label;
 document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active",a.dataset.nav===id));
 document.getElementById("sidebar").classList.remove("open");
 window.scrollTo({top:0,behavior:"smooth"});
 if(id==="paths")renderAllPaths();if(id==="saved")renderSaved();if(id==="projects")renderProjects();if(id==="subscriptions")renderSubscriptionSelection();
}
function navigateFromHash(){
 const id=(location.hash||"#home").slice(1);
 const known=["home","paths","python-lab","practice","projects","career","saved","subscriptions","profile"];
 if(known.includes(id)){showPage(id,id==="home"?"Overview":id==="paths"?"Learning paths":id==="python-lab"?"Python Learning Lab":id==="practice"?"Practice lab":id==="projects"?"Projects":id==="career"?"Career toolkit":id==="saved"?"Saved lessons":id==="subscriptions"?"Plans & subscriptions":"Profile");}
 else showPage("home","Overview");
}
function esc(value){return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}

const subscriptionPlans = {
 free:{name:"Free Explorer",description:"Core learning paths and practice tools."},
 plus:{name:"VORTEX Plus",description:"Structured study plans and expanded learning packs (proposed plan)."},
 pro:{name:"VORTEX Pro",description:"Portfolio-focused roadmaps and interview preparation (proposed plan)."}
};
function renderSubscriptionSelection(){
 const plan=subscriptionPlans[state.selectedPlan]||subscriptionPlans.free;
 const name=document.getElementById("current-plan-name");
 if(!name)return;
 name.textContent=plan.name;
 document.getElementById("current-plan-description").textContent=plan.description;
 document.querySelectorAll("[data-select-plan]").forEach(button=>{
  const active=button.dataset.selectPlan===state.selectedPlan;
  button.textContent=active?"Selected for demo":(button.dataset.selectPlan==="free"?"Choose Free":button.dataset.selectPlan==="plus"?"Select Plus":"Select Pro");
  button.classList.toggle("primary",active);
  button.classList.toggle("secondary",!active);
 });
}
document.querySelectorAll("[data-select-plan]").forEach(button=>button.addEventListener("click",()=>{
 state.selectedPlan=button.dataset.selectPlan;
 saveState();renderSubscriptionSelection();
 const plan=subscriptionPlans[state.selectedPlan];
 document.getElementById("plan-selection-message").textContent=`${plan.name} selected for preview only. No payment was taken and no subscription was created.`;
 notify(`${plan.name} selected for demo.`);
}));

// Real billing calls are made only to the VORTEX server. Never place IntaSend secret keys here.
const billingMessage = document.getElementById("plan-selection-message");
const billingStatus = document.getElementById("billing-account-status");
const authMode = document.getElementById("billing-auth-mode");
function setBillingMessage(message){ if(billingMessage) billingMessage.textContent=message; }
function updateAuthFields(){
 const register=authMode.value==="register";
 ["billing-first-name","billing-last-name"].forEach(id=>{const field=document.getElementById(id);field.required=register;field.disabled=!register;field.style.opacity=register?"1":".55";});
 document.getElementById("billing-password").autocomplete=register?"new-password":"current-password";
}
async function billingApi(url,body){
 const response=await fetch(url,{method:body?"POST":"GET",credentials:"same-origin",headers:body?{"Content-Type":"application/json"}:{},body:body?JSON.stringify(body):undefined});
 const data=await response.json().catch(()=>({}));
 if(!response.ok) throw new Error(data.error||`Request failed (${response.status}).`);
 return data;
}
async function refreshBillingStatus(){
 try{
  const data=await billingApi("/api/me");
  billingStatus.textContent=`Signed in as ${data.user.email}. Current server plan: ${data.effectivePlan.toUpperCase()}.`;
  document.getElementById("billing-signout").disabled=false;
  document.getElementById("billing-cancel-card").disabled=false;
  if(data.effectivePlan!=="free") {document.getElementById("current-plan-name").textContent=data.effectivePlan==="pro"?"VORTEX Pro":"VORTEX Plus";document.getElementById("subscription-status").textContent="Verified server entitlement";}
 }catch(_){billingStatus.textContent="Not signed in. Create an account or sign in below.";}
}
authMode.addEventListener("change",updateAuthFields);updateAuthFields();
document.getElementById("billing-auth-form").addEventListener("submit",async e=>{
 e.preventDefault();const mode=authMode.value;
 const payload={email:document.getElementById("billing-email").value.trim(),password:document.getElementById("billing-password").value};
 if(mode==="register"){payload.firstName=document.getElementById("billing-first-name").value.trim();payload.lastName=document.getElementById("billing-last-name").value.trim();}
 try{await billingApi(`/api/auth/${mode}`,payload);await refreshBillingStatus();setBillingMessage(mode==="register"?"Account created. You can now start checkout.":"Signed in. You can now start checkout.");}
 catch(err){setBillingMessage(err.message);}
});
document.getElementById("billing-signout").addEventListener("click",async()=>{try{await billingApi("/api/auth/logout",{});await refreshBillingStatus();setBillingMessage("You have signed out.");}catch(err){setBillingMessage(err.message);}});
document.getElementById("billing-method").addEventListener("change",()=>{document.getElementById("billing-phone-wrap").hidden=document.getElementById("billing-method").value!=="mpesa";});
document.querySelectorAll("[data-buy-plan]").forEach(button=>button.addEventListener("click",()=>{
 document.getElementById("billing-plan").value=button.dataset.buyPlan;
 document.getElementById("billing-checkout-form").scrollIntoView({behavior:"smooth",block:"center"});
 setBillingMessage(`Selected ${subscriptionPlans[button.dataset.buyPlan].name}. Sign in, choose a payment method, then continue to secure checkout.`);
}));
document.getElementById("billing-checkout-form").addEventListener("submit",async e=>{
 e.preventDefault();const plan=document.getElementById("billing-plan").value;const method=document.getElementById("billing-method").value;
 const payload={plan};if(method==="mpesa")payload.phone=document.getElementById("billing-phone").value.trim();
 setBillingMessage("Contacting the secure VORTEX server…");
 try{
  const result=await billingApi(method==="mpesa"?"/api/billing/mpesa":"/api/billing/card-subscription",payload);
  if(result.setupUrl){setBillingMessage("Opening the payment provider's secure card setup page. Return to VORTEX after setup.");window.location.assign(result.setupUrl);return;}
  setBillingMessage(result.message||"Payment request created. Approve the prompt on your phone. VORTEX will activate access only after verified confirmation.");
 }catch(err){setBillingMessage(err.message);}
});
document.getElementById("billing-cancel-card").addEventListener("click",async()=>{
 if(!confirm("Request cancellation of your latest card subscription?"))return;
 try{const result=await billingApi("/api/billing/cancel-card",{});setBillingMessage(result.message);await refreshBillingStatus();}catch(err){setBillingMessage(err.message);}
});
if(location.search.includes("billing=return")){history.replaceState({},"",location.pathname+location.hash);setBillingMessage("You returned from checkout. We are checking your server-side subscription status; the redirect itself is not proof of payment.");}
refreshBillingStatus();

document.querySelectorAll("[data-nav]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();const id=a.dataset.nav;location.hash=id;showPage(id,a.textContent.trim());}));
document.getElementById("path-search").addEventListener("input",renderAllPaths);
document.getElementById("level-filter").addEventListener("change",()=>{const value=document.getElementById("level-filter").value;if(value!=="all"){const target=langById(currentPath);notify(`Open a learning path and choose the ${value.toLowerCase()} tab to view that stage.`);}renderAllPaths();});
document.getElementById("quiz-next").addEventListener("click",nextQuiz);
document.getElementById("back-to-paths").addEventListener("click",()=>showPage("paths","Learning paths"));
document.getElementById("menu-toggle").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("profile-button").addEventListener("click",()=>{document.getElementById("learner-name").value=state.name||"";location.hash="profile";showPage("profile","Profile");});
document.getElementById("save-profile").addEventListener("click",()=>{state.name=document.getElementById("learner-name").value.trim().slice(0,40);saveState();document.getElementById("settings-message").textContent="Display name saved on this device.";notify("Profile updated.");});
document.getElementById("clear-data").addEventListener("click",()=>{if(!confirm("Clear all VORTEX progress, scores, saved lessons, projects, and display name from this browser?"))return;state={...defaultState,completed:[],saved:[],scores:[],projects:[]};saveState();renderStats();renderFeatured();renderAllPaths();renderProjects();renderSaved();document.getElementById("settings-message").textContent="Local VORTEX data cleared.";notify("Local data cleared.");});
document.getElementById("set-goal").addEventListener("click",()=>{const value=prompt("How many lessons do you want as your next goal? Enter a number from 1 to 20.",String(state.goal));if(value===null)return;const n=Number(value);if(!Number.isInteger(n)||n<1||n>20){notify("Choose a whole number from 1 to 20.");return;}state.goal=n;saveState();renderStats();notify("Learning goal updated.");});
document.getElementById("footer-year").textContent=new Date().getFullYear();
renderFeatured();renderAllPaths();renderProjects();renderSaved();renderStats();startQuiz();
window.addEventListener("hashchange",navigateFromHash);
function runInitialHash(){const id=(location.hash||"#home").slice(1);if(id==="home")showPage("home","Overview");else navigateFromHash();}
runInitialHash();
