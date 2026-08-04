/* ============================================================
   KALYAN ELEVATORS — layout build step
   ------------------------------------------------------------
   Bakes the header, menu, footer and product cross-link strip
   into every page as real HTML.

   Why this exists: the layout used to be injected at runtime by
   js/main.js. If that file was slow, blocked or served stale by
   the service worker, visitors got a page with no navigation at
   all — and because the stylesheet also hid <body> until main.js
   ran, sometimes a blank screen. Navigation is now in the HTML.
   main.js only wires up behaviour.

   Run after editing site-data.js or any partial below:
     node build/build-layout.js
   Idempotent — safe to run repeatedly.
   ============================================================ */

'use strict';

const fs = require('fs');
const path = require('path');
const { PRODUCTS, NAV, CONTACT, PAGES } = require('./site-data');

const ROOT = path.join(__dirname, '..');

/* ---- helpers ---------------------------------------------- */

const slug = v => v.toLowerCase().replace(/\.html$/, '');
const pad = i => ('0' + i).slice(-2);

/* Marker-delimited regions so a rebuild replaces its own output
   instead of appending to it. */
function region(name, html) {
  return `<!-- KE:${name} -->\n${html}\n<!-- /KE:${name} -->`;
}

function replaceRegion(source, name, html, legacySelector) {
  const marked = new RegExp(
    `<!-- KE:${name} -->[\\s\\S]*?<!-- \\/KE:${name} -->`
  );
  if (marked.test(source)) {
    return source.replace(marked, region(name, html));
  }
  /* First run: swap out the old runtime placeholder. */
  if (legacySelector && source.includes(legacySelector)) {
    return source.replace(legacySelector, region(name, html));
  }
  return source;
}

/* ---- header + desktop nav --------------------------------- */

function headerHTML(current) {
  const isCurrent = href => slug(href) === slug(current);
  const cur = href => (isCurrent(href) ? ' aria-current="page"' : '');
  const onProduct = PRODUCTS.some(p => isCurrent(p[0]));
  const rangeOpen = onProduct || isCurrent('elevators.html');

  const navLinks = NAV.map(([href, label]) => {
    /* The Elevators dropdown is inserted after About. */
    const link = `<a href="${href}"${cur(href)}>${label}</a>`;
    if (href !== 'about.html') return link;
    return link + dropdownHTML(rangeOpen, isCurrent);
  }).join('');

  return `<header class="site-header" id="siteHeader">
  <div class="header-inner">
    <button class="burger" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="menuOverlay"><span><i></i><i></i></span></button>
    <a class="brand" href="index.html"><img src="logo.png" alt="Kalyan Elevators" width="1166" height="205"></a>
    <nav class="primary-nav" aria-label="Main">${navLinks}</nav>
    <div class="header-actions">
      <a class="phone-pill" href="${CONTACT.phoneHref}">${CONTACT.phoneDisplay}</a>
      <a class="btn btn-gold btn-quote" href="contact.html"><span>Get a Quote</span></a>
    </div>
  </div>
</header>`;
}

function dropdownHTML(rangeOpen, isCurrent) {
  const items = PRODUCTS.map(([href, name, img], i) =>
    `        <a href="${href}"${isCurrent(href) ? ' aria-current="page"' : ''}>
          <span class="np-thumb"><img src="${img}" alt="" loading="lazy" width="80" height="60"></span>
          <span class="np-text"><span class="np-num">${pad(i + 1)}</span><span class="np-name">${name}</span></span>
        </a>`
  ).join('\n');

  return `<div class="nav-drop">
      <button class="nav-drop-trigger${rangeOpen ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="navPanelRange">Elevators<span class="caret" aria-hidden="true">▾</span></button>
      <div class="nav-panel" id="navPanelRange">
        <div class="nav-panel-grid">
${items}
        </div>
        <a class="nav-panel-all" href="elevators.html"><span>View the full range</span><span class="arr" aria-hidden="true">&rarr;</span></a>
      </div>
    </div>`;
}

/* ---- mobile menu overlay ----------------------------------
   Products come first and carry the visual weight. Previously the
   four utility links sat on top at 30px serif and the nine
   products underneath at 14px grey, which read as fine print. */

function menuHTML(current) {
  const isCurrent = href => slug(href) === slug(current);

  const products = PRODUCTS.map(([href, name, img], i) =>
    `        <a href="${href}"${isCurrent(href) ? ' aria-current="page"' : ''}>
          <span class="mp-thumb"><img src="${img}" alt="" loading="lazy" width="88" height="66"></span>
          <span class="mp-text"><span class="mp-num">${pad(i + 1)}</span><span class="mp-name">${name}</span></span>
          <span class="arr" aria-hidden="true">&rarr;</span>
        </a>`
  ).join('\n');

  const nav = NAV.map(([href, label]) =>
    `<a href="${href}"${isCurrent(href) ? ' aria-current="page"' : ''}>${label}</a>`
  ).join('');

  return `<nav class="menu-overlay" id="menuOverlay" aria-label="Main navigation" aria-hidden="true">
  <div class="menu-inner">
    <div class="menu-col menu-col-products">
      <span class="mono-label">Our Elevator Range</span>
      <div class="menu-products">
${products}
      </div>
      <a class="menu-all" href="elevators.html"><span>View the full range</span><span class="arr" aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="menu-col menu-col-nav">
      <span class="mono-label">Navigate</span>
      <div class="menu-main">${nav}</div>
    </div>
    <div class="menu-foot">
      <a class="phone-pill" href="${CONTACT.phoneHref}">${CONTACT.phoneDisplay}</a>
      <a class="btn btn-gold" href="contact.html"><span>Get a Quote</span></a>
    </div>
  </div>
</nav>`;
}

/* ---- footer ----------------------------------------------- */

function footerHTML() {
  const productLinks = PRODUCTS.map(([href, name]) =>
    `<li><a href="${href}">${name}</a></li>`
  ).join('');

  const navLinks = NAV.map(([href, label]) =>
    `<li><a href="${href}">${label}</a></li>`
  ).join('');

  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="index.html"><img src="logo.png" alt="Kalyan Elevators" width="1166" height="205"></a>
        <p>Bespoke vertical transportation systems, engineered for architectural harmony and whisper-quiet mobility.</p>
        <a class="footer-wa" href="${CONTACT.whatsapp}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.177-1.355A9.95 9.95 0 0012.01 22c5.51 0 9.99-4.48 9.99-9.986C22 6.507 17.519 2.002 12.012 2zm0 18.294c-1.636 0-3.238-.429-4.646-1.243l-.333-.198-3.457.906.924-3.37-.217-.346a8.254 8.254 0 01-1.267-4.498c.001-4.563 3.717-8.274 8.284-8.274 4.56 0 8.271 3.712 8.273 8.277-.002 4.569-3.719 8.286-8.288 8.286zm4.543-6.196c-.249-.125-1.472-.725-1.7-.808-.228-.083-.393-.125-.558.125-.166.249-.641.808-.787.975-.145.166-.29.187-.539.062-.25-.125-1.05-.387-2.001-1.234-.74-.66-1.24-1.475-1.385-1.725-.145-.249-.015-.385.11-.51.112-.112.249-.29.373-.436.124-.146.166-.25.249-.415.083-.167.042-.312-.021-.437-.062-.125-.558-1.349-.764-1.848-.201-.484-.403-.418-.558-.426-.145-.007-.31-.009-.477-.009a.919.919 0 00-.663.312c-.228.249-.87.851-.87 2.076 0 1.226.892 2.41 1.016 2.577.125.166 1.758 2.685 4.258 3.764.595.257 1.06.41 1.423.525.597.19 1.141.163 1.572.099.48-.072 1.472-.601 1.679-1.183.207-.582.207-1.08.145-1.183-.063-.105-.228-.167-.478-.292z"/></svg>
          <span>Chat on WhatsApp</span>
        </a>
      </div>
      <div><h4>Elevator Range</h4><ul>${productLinks}</ul></div>
      <div>
        <h4>Company</h4><ul>${navLinks}<li><a href="elevators.html">All Elevators</a></li></ul>
      </div>
      <div class="footer-contact">
        <h4>Get in Touch</h4>
        <ul>
          <li><strong>Head Office — Kochi</strong><br>${CONTACT.headOffice}</li>
          <li><strong>Branch — Thrissur</strong><br>${CONTACT.branchOffice}</li>
          <li><a href="${CONTACT.phoneHref}">${CONTACT.phoneDisplay}</a></li>
          <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        </ul>
        <div class="footer-map"><iframe title="Kalyan Elevators head office location, Kochi" loading="lazy" src="https://www.google.com/maps?q=Kalyan+Elevators,Kochi,Kerala&output=embed"></iframe></div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Kalyan Elevators Pvt. Ltd. Engineered with precision.</span>
      <span>Kochi &middot; Thrissur &middot; Kerala</span>
    </div>
  </div>
</footer>
<a class="whatsapp-fab" href="${CONTACT.whatsapp}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.177-1.355A9.95 9.95 0 0012.01 22c5.51 0 9.99-4.48 9.99-9.986C22 6.507 17.519 2.002 12.012 2zm0 18.294c-1.636 0-3.238-.429-4.646-1.243l-.333-.198-3.457.906.924-3.37-.217-.346a8.254 8.254 0 01-1.267-4.498c.001-4.563 3.717-8.274 8.284-8.274 4.56 0 8.271 3.712 8.273 8.277-.002 4.569-3.719 8.286-8.288 8.286zm4.543-6.196c-.249-.125-1.472-.725-1.7-.808-.228-.083-.393-.125-.558.125-.166.249-.641.808-.787.975-.145.166-.29.187-.539.062-.25-.125-1.05-.387-2.001-1.234-.74-.66-1.24-1.475-1.385-1.725-.145-.249-.015-.385.11-.51.112-.112.249-.29.373-.436.124-.146.166-.25.249-.415.083-.167.042-.312-.021-.437-.062-.125-.558-1.349-.764-1.848-.201-.484-.403-.418-.558-.426-.145-.007-.31-.009-.477-.009a.919.919 0 00-.663.312c-.228.249-.87.851-.87 2.076 0 1.226.892 2.41 1.016 2.577.125.166 1.758 2.685 4.258 3.764.595.257 1.06.41 1.423.525.597.19 1.141.163 1.572.099.48-.072 1.472-.601 1.679-1.183.207-.582.207-1.08.145-1.183-.063-.105-.228-.167-.478-.292z"/></svg>
</a>`;
}

/* ---- product cross-link strip ------------------------------ */

function rangeStripHTML(current) {
  const items = PRODUCTS.map(([href, name, img], i) => {
    if (slug(href) === slug(current)) return '';
    return `    <a href="${href}">
      <span class="rs-thumb"><img src="${img}" alt="" loading="lazy" width="80" height="60"></span>
      <span class="rs-text"><span class="mono-label">${pad(i + 1)}</span><span class="rs-name">${name}</span></span>
      <span class="arr" aria-hidden="true">&rarr;</span>
    </a>`;
  }).filter(Boolean).join('\n');

  return `<div class="range-strip" id="range-strip">
${items}
</div>`;
}

/* ---- run -------------------------------------------------- */

let changed = 0;
const missing = [];

PAGES.forEach(page => {
  const file = path.join(ROOT, page);
  if (!fs.existsSync(file)) { missing.push(page); return; }

  const before = fs.readFileSync(file, 'utf8');
  let after = before;

  after = replaceRegion(after, 'HEADER', headerHTML(page), '<div id="site-header"></div>');
  after = replaceRegion(after, 'MENU', menuHTML(page), null);
  after = replaceRegion(after, 'FOOTER', footerHTML(), '<div id="site-footer"></div>');
  after = replaceRegion(after, 'RANGESTRIP', rangeStripHTML(page),
    '<div class="range-strip" id="range-strip"></div>');

  /* The header region is written first; the menu belongs immediately
     after it and has no legacy placeholder of its own. */
  if (!after.includes('<!-- KE:MENU -->')) {
    after = after.replace('<!-- /KE:HEADER -->',
      '<!-- /KE:HEADER -->\n' + region('MENU', menuHTML(page)));
  }

  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('  built  ' + page);
  } else {
    console.log('  ok     ' + page);
  }
});

console.log(`\nLayout build complete — ${changed} of ${PAGES.length} page(s) rewritten.`);
if (missing.length) console.log('Not found (skipped): ' + missing.join(', '));
