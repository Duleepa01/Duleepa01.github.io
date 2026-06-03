// Custom cursor (desktop only)
const cur = document.getElementById('cur'), cr = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;
if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    cr.style.left = rx + 'px'; cr.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
} else {
  if (cur) cur.style.display = 'none';
  if (cr) cr.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// Scroll reveal
const els = document.querySelectorAll('.ao');
const obs = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
}, { threshold: .1 });
els.forEach(el => obs.observe(el));

// Mobile menu
const burger = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobile-menu');
burger && burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
  burger && burger.classList.remove('open');
  mobileMenu && mobileMenu.classList.remove('open');
}

// ─── PROJECT DATA ───────────────────────────────────────────────────────────
const projects = {
  servify: {
    name: 'Servify', idx: 'SYS · 001', type: 'Android Marketplace + Admin Web Panel', status: 'Completed',
    github: 'https://github.com/Duleepa01/Servify',
    demo: null,
    stats: [
      { value: '3', label: 'Components' },
      { value: '79', label: 'Unit Tests' },
      { value: '100%', label: 'Pass Rate' },
      { value: '5', label: 'Booking States' },
    ],
    problem: 'Home services in Sri Lanka are fragmented and informal - customers rely on word-of-mouth, providers have no channel to reach new clients, and there is no trust, transparency, or reliable booking layer. No administrative oversight exists to vet providers before they interact with customers.',
    solution: 'A three-component platform: a Customer Android App for browsing and booking services; a Provider Android App for receiving jobs and managing a work lifecycle; and an Admin Web Panel (HTML/CSS/JS + Firebase JS SDK) for approving providers, monitoring bookings, and managing users - all backed by a shared Firebase cloud backend.',
    role: 'Solo developer - requirements analysis, system architecture, both Android apps (Java + Material Design 3), Admin Web Panel (HTML5/CSS3/JS), Firebase Auth/Firestore/Storage/FCM integration, Google Maps SDK, Telephony API, light sensor integration, PayHere Sandbox payment flow, and JUnit unit testing.',
    arch: [
      { label: 'Customer Android App', layer: 'Presentation', highlight: true },
      { label: 'Provider Android App', layer: 'Presentation', highlight: true },
      { label: 'Admin Web Panel', layer: 'Governance', highlight: false },
      { label: 'Firebase Auth + Firestore', layer: 'Backend', highlight: false },
      { label: 'FCM + Storage', layer: 'Services', highlight: false },
    ],
    stack: [
      { name: 'Java', type: 'core' }, { name: 'Android SDK', type: 'core' },
      { name: 'Material Design 3', type: 'core' },
      { name: 'Firebase Auth', type: 'data' }, { name: 'Firestore', type: 'data' },
      { name: 'Firebase Storage', type: 'data' }, { name: 'FCM', type: 'tool' },
      { name: 'Google Maps SDK', type: 'tool' }, { name: 'PayHere Sandbox', type: 'tool' },
      { name: 'HTML5 / CSS3 / JS', type: 'tool' }, { name: 'JUnit', type: 'tool' },
    ],
    lessons: [
      { title: 'Provider vetting needed to be in the data model', body: 'The admin approval gate wasn\'t an afterthought - the approvalStatus field, watched by a real-time Firestore listener in the provider app, was designed in from the start. Adding it later would have meant reworking authentication logic across all three components.' },
      { title: 'Shared backend means shared assumptions', body: 'All three components read and write to the same Firestore project. An approval action in the web panel immediately affects what the provider app allows. That only works cleanly if the data structure is agreed before building any of them.' },
      { title: 'Android background task restrictions are stricter than expected', body: 'The 24-hour auto-confirmation couldn\'t use a basic background thread on API 26+. WorkManager was the right tool, but understanding deferred task scheduling took more time than the actual confirmation logic.' },
      { title: 'Concurrent writes need explicit transactions', body: 'With two Android apps and a web panel all updating the same booking documents, partial writes were a real risk. Firestore transactions made the critical updates atomic, which wasn\'t something I\'d needed to think about on single-client projects.' },
    ],
    features: [
      'Customer App - service browsing, booking with Maps address picker, real-time status tracking',
      'Provider App - job acceptance, start/complete lifecycle, before/after photo upload, earnings dashboard',
      'Admin Web Panel - provider approval/rejection, booking oversight, user management',
      'Firebase Auth + Firestore real-time sync across all three components',
      'FCM push notifications, Google Maps SDK, Telephony API, light sensor brightness control',
      'PayHere Sandbox payment integration · 79 JUnit tests · 100% pass rate',
    ]
  },
  beverage: {
    name: 'BeverageHub', idx: 'SYS · 002', type: 'Java Web Application', status: 'Completed',
    github: 'https://github.com/Duleepa01/BeverageHub',
    demo: null,
    stats: [
      { value: '2', label: 'User Roles' },
      { value: '5+', label: 'Report Types' },
      { value: 'MVC', label: 'Architecture' },
      { value: 'Live', label: 'Payment Flow' },
    ],
    problem: 'Beverage Hub ran entirely on in-person sales and manual ordering - no online presence, no inventory visibility, and no way to reach customers outside walk-in traffic. Order errors were common and there was no data to inform restocking decisions.',
    solution: 'A full-featured online beverage store built with Java Servlets and Hibernate ORM. Customers browse a categorised drink catalogue, manage a persistent cart, and check out via PayHere. Admins get a dashboard with product CRUD, order management, and printable sales, customer, and stock reports.',
    role: 'Solo developer - business research (interviews, observation, record searching), requirements analysis, database schema design, Hibernate ORM entity mapping, Servlet routing, PayHere payment integration, JavaMail notifications, and frontend SPA-style flow with Gson + Fetch API.',
    arch: [
      { label: 'Browser (HTML/CSS/JS + Fetch API)', layer: 'Presentation', highlight: true },
      { label: 'Java Servlets (WAR / GlassFish)', layer: 'Controller', highlight: false },
      { label: 'Hibernate ORM + Gson', layer: 'Persistence', highlight: true },
      { label: 'MySQL Database', layer: 'Data Layer', highlight: false },
      { label: 'PayHere + JavaMail', layer: 'External Services', highlight: false },
    ],
    stack: [
      { name: 'Java', type: 'core' }, { name: 'Java Servlets', type: 'core' },
      { name: 'Hibernate ORM', type: 'core' }, { name: 'MySQL', type: 'data' },
      { name: 'PayHere', type: 'tool' }, { name: 'JavaMail (SMTP)', type: 'tool' },
      { name: 'Gson', type: 'tool' }, { name: 'GlassFish / Tomcat', type: 'tool' },
      { name: 'HTML / CSS / JS', type: 'tool' },
    ],
    lessons: [
      { title: 'Error message placement matters more than wording', body: 'During UAT, users consistently missed validation errors in the checkout flow even when the messages were accurate. Placing them inline next to the relevant field fixed the issue. The problem wasn\'t what the messages said.' },
      { title: 'Cart merge logic has more edge cases than expected', body: 'Session cart for guests, database cart for logged-in users, merge on sign-in. The straightforward part was building each; the tricky part was deciding what happens when a guest item already exists in the saved cart.' },
      { title: 'Webhook callbacks can arrive more than once', body: 'PayHere integration required handling duplicate callback delivery. Without checking whether an order already existed before creating a new one, the same booking could be written twice. Idempotency checks were necessary, not optional.' },
      { title: 'Database transactions matter when writes span multiple tables', body: 'An order creation touches orders, order_items, invoice, and stock tables. Without Hibernate transaction management and proper rollback handling, a failure partway through left the database in an inconsistent state.' },
    ],
    features: [
      'Product catalogue with search, category filters & pagination',
      'User registration, login, email verification & profile management',
      'Hybrid cart - session-backed for guests, DB-backed for authenticated users',
      'Checkout with address management, delivery charge calculation & PayHere integration',
      'PDF invoice generation & confirmation email via JavaMail',
      'Admin dashboard - product CRUD, order management, sales/customer/stock reports',
    ]
  },
  pharmacy: {
    name: 'Pharmacy System', idx: 'SYS · 003', type: 'Java Desktop Management System', status: 'Completed',
    github: 'https://github.com/Duleepa01/PharmacyManagementSystem',
    demo: null,
    stats: [
      { value: 'DAO', label: 'Pattern' },
      { value: 'Full', label: 'Audit Trail' },
      { value: 'Auto', label: 'Expiry Alerts' },
      { value: 'PDF', label: 'Reports' },
    ],
    problem: 'A pharmacy handling prescriptions, stock, and expiry tracking manually. In a healthcare context, inventory errors have direct consequences for patients, which made correctness a harder requirement than in previous projects.',
    solution: 'A Java Swing desktop application covering drug inventory, dispensing records, prescription tracking, and automated expiry alerts. JasperReports handles PDF report generation. The system was designed with auditability in mind from the start.',
    role: 'Solo developer - domain research, Java Swing UI, business logic, MySQL schema design, JDBC and DAO implementation, and JasperReports integration.',
    arch: [
      { label: 'Java Swing UI', layer: 'Presentation', highlight: true },
      { label: 'Business Logic', layer: 'Domain', highlight: false },
      { label: 'JDBC / DAO Layer', layer: 'Persistence', highlight: true },
      { label: 'MySQL Database', layer: 'Data Layer', highlight: false },
      { label: 'JasperReports', layer: 'Reporting', highlight: false },
    ],
    stack: [
      { name: 'Java', type: 'core' }, { name: 'Java Swing', type: 'core' },
      { name: 'MySQL', type: 'data' }, { name: 'JDBC', type: 'core' },
      { name: 'JasperReports', type: 'tool' }, { name: 'DAO Pattern', type: 'tool' },
    ],
    lessons: [
      { title: 'The domain changes what you validate and where', body: 'On previous projects I validated at the UI and considered it done. For a pharmacy system, a direct database insert bypassing the UI is a real risk. Validation at the business logic and database layers wasn\'t optional here.' },
      { title: 'Expiry tracking needed a different data model than basic inventory', body: 'I initially modelled stock as a simple quantity. Expiry tracking required treating stock as batches with individual dates, which meant reworking the schema partway through. Should have accounted for it in the initial design.' },
      { title: 'Logging state changes made testing and debugging easier', body: 'Recording who dispensed what, when, and from which batch made it straightforward to trace problems during testing. It also meant the system produced meaningful audit reports without extra effort later.' },
      { title: 'Spending more time on requirements reduced surprises during build', body: 'This project had the most detailed requirements phase of any I\'d done. The healthcare context forced more specific questions upfront. Fewer things came up unexpectedly during implementation as a result.' },
    ],
    features: [
      'Drug inventory with automated expiry alerts',
      'Prescription & dispensing records with patient history',
      'Patient & supplier management',
      'Full audit trail - every dispensing event is attributable and loggable',
      'JasperReports PDF generation for audit and stock reports',
    ]
  },
  student: {
    name: 'Student Management System', idx: 'SYS · 004', type: 'Java Web Application', status: 'Completed',
    github: 'https://github.com/Duleepa01/student-management-system',
    demo: null,
    stats: [
      { value: 'MVC', label: 'Architecture' },
      { value: 'ORM', label: 'Hibernate' },
      { value: 'Full', label: 'Attendance' },
      { value: 'Admin', label: 'Dashboard' },
    ],
    problem: 'Managing student records, course enrolments, and attendance across spreadsheets and paper forms creates data inconsistency, version conflicts, and no reliable way to produce institutional reports. Administrative overhead grows directly with intake size.',
    solution: 'A web-based student management system handling student registration, course and batch assignment, attendance tracking, and academic reporting. Built with Java Servlets and Hibernate ORM, giving administrators a centralised interface to manage all student data with consistent state and audit-ready records.',
    role: 'Solo developer - requirements gathering, database schema design, Hibernate entity mapping, Servlet-based MVC routing, business logic implementation, and reporting.',
    arch: [
      { label: 'Browser (HTML/CSS/JS)', layer: 'Presentation', highlight: true },
      { label: 'Java Servlets', layer: 'Controller', highlight: false },
      { label: 'Hibernate ORM', layer: 'Persistence', highlight: true },
      { label: 'MySQL Database', layer: 'Data Layer', highlight: false },
    ],
    stack: [
      { name: 'Java', type: 'core' }, { name: 'Java Servlets', type: 'core' },
      { name: 'Hibernate ORM', type: 'core' }, { name: 'MySQL', type: 'data' },
      { name: 'HTML / CSS / JS', type: 'tool' }, { name: 'MVC Architecture', type: 'tool' },
    ],
    lessons: [
      { title: 'ER diagram decisions carry through to the whole codebase', body: 'Students, batches, courses, and attendance sessions are all related. Getting those relationships wrong in the schema meant refactoring Hibernate mappings, query logic, and UI forms together. I treat the ER diagram as something to finalise before writing any code now.' },
      { title: 'Admin workflows and individual record views need different layouts', body: 'The first version of the UI was built around individual student records. Admins mostly work with cohorts and batches. Rebuilding the main views around how admins actually work made a noticeable difference in how usable the system was.' },
      { title: 'Reporting requirements should inform schema design', body: 'When I tried to generate an attendance summary, the schema didn\'t support the aggregation I needed. I had to add columns and adjust queries to make it work. Report requirements need to be considered during schema design, not after.' },
      { title: 'UI validation alone is not enough', body: 'Course codes and batch assignments had constraints enforced at the form level but not at the database level. A direct insert would break referential integrity. Added database-level constraints after catching this during testing.' },
    ],
    features: [
      'Student registration and profile management',
      'Course and batch enrolment with relationship tracking',
      'Attendance recording and session management',
      'Academic records and grade management',
      'Admin dashboard with institutional reporting',
      'Hibernate ORM with full relational mapping',
    ]
  }
};

// ─── BUILDERS ───────────────────────────────────────────────────────────────
function buildStats(stats) {
  return `<div class="pd-stats">${stats.map(s => `
    <div class="pd-stat">
      <div class="pd-stat-value">${s.value}</div>
      <div class="pd-stat-label">${s.label}</div>
    </div>`).join('<div class="pd-stat-divider"></div>')}</div>`;
}

function buildArch(arch) {
  return arch.map((n, i) => `
    <div class="paf-node${n.highlight ? ' highlight' : ''}">
      <div class="paf-node-box">${n.label}</div>
      <div class="paf-node-layer">${n.layer}</div>
    </div>${i < arch.length - 1 ? '<div class="paf-connector"><span class="paf-arr">&#8594;</span></div>' : ''}`
  ).join('');
}

function buildStack(stack) {
  return stack.map(s => `<span class="pd-stack-badge ${s.type}">${s.name}</span>`).join('');
}

function buildLessons(lessons) {
  return lessons.map(l => `<li class="pd-lesson"><span class="pd-lesson-icon">&#8594;</span><div><strong>${l.title}</strong>${l.body}</div></li>`).join('');
}

function buildGithubPanel(p) {
  const tags = p.features.map(f => `<span class="pd-github-tag">${f}</span>`).join('');
  const ghIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(139,148,158,.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
  const slug = p.name.toLowerCase().replace(/\s+/g, '-');
  return `<div class="pd-github"><div class="pd-github-icon">${ghIcon}</div><div class="pd-github-info"><div class="pd-github-name">${p.name} - Source Repository</div><div class="pd-github-meta">github.com / duleepa-k / ${slug}</div><div class="pd-github-tags">${tags}</div></div></div>`;
}

// ─── RENDER PROJECT ─────────────────────────────────────────────────────────
function showProj(key) {
  const p = projects[key];
  document.querySelectorAll('.pn-item').forEach(el => el.classList.toggle('active', el.dataset.p === key));
  const ghSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
  const demoBtn = p.demo ? `<a href="${p.demo}" class="pd-btn-ghost" target="_blank">Live Demo &#8599;</a>` : '';
  document.getElementById('pdetail').innerHTML = `
    <div class="pd-header">
      <div class="pd-header-left">
        <div class="pd-idx">${p.idx}</div>
        <div class="pd-name">${p.name}</div>
        <div class="pd-type">${p.type}</div>
      </div>
      <div class="pd-header-right">
        <div class="pd-badge">${p.status}</div>
        <div class="pd-actions">
          <a href="${p.github}" class="pd-btn-ghost" target="_blank">${ghSvg} GitHub</a>
          ${demoBtn}
        </div>
      </div>
    </div>
    ${buildStats(p.stats)}
    <div class="pd-body">
      <div class="pd-section-title">Project Overview</div>
      <div class="pd-overview-grid">
        <div class="pd-overview-card"><div class="pd-oc-label">Problem</div><div class="pd-oc-text">${p.problem}</div></div>
        <div class="pd-overview-card"><div class="pd-oc-label">Solution</div><div class="pd-oc-text">${p.solution}</div></div>
      </div>
      <div style="margin-top:.75rem">
        <div class="pd-overview-card" style="background:var(--navy);border:1px solid var(--border)">
          <div class="pd-oc-label">My Role</div>
          <div class="pd-oc-text">${p.role}</div>
          <div class="pd-role-badge">&#8599; Solo Project</div>
        </div>
      </div>
      <div class="pd-section-title">Technology Stack</div>
      <div class="pd-stack">${buildStack(p.stack)}</div>
      <div class="pd-section-title">System Architecture</div>
      <div class="pd-arch"><div class="pd-arch-flow">${buildArch(p.arch)}</div></div>
      <div class="pd-section-title">Repository &amp; Key Features</div>
      ${buildGithubPanel(p)}
      <div class="pd-section-title">Lessons Learned</div>
      <ul class="pd-lessons">${buildLessons(p.lessons)}</ul>
    </div>`;
}
showProj('servify');