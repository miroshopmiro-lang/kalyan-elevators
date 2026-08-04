/* ============================================================
   KALYAN ELEVATORS — page transforms
   ------------------------------------------------------------
   Mechanical edits applied across every page:
     - asset cache-bust versions kept in one place
     - per-family accent class on product pages
     - the product cross-link strip moved up, directly beneath the
       spec strip, instead of sitting near the bottom of the page
     - section skins re-balanced for the light-first palette
     - shared <head> metadata (canonical, Open Graph, JSON-LD)

   Run:  node build/build-pages.js
   Idempotent.
   ============================================================ */

'use strict';

const fs = require('fs');
const path = require('path');
const { PRODUCTS, PAGES, CONTACT } = require('./site-data');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://kalyanelevators.in';
const CSS_V = '1.1.0';
const JS_V = '1.1.0';

const FAMILY = {};
PRODUCTS.forEach(([href, , , family]) => { FAMILY[href] = family; });

const HERO_IMG = {};
PRODUCTS.forEach(([href, , img]) => { HERO_IMG[href] = img; });
HERO_IMG['index.html'] = 'images/commercial-hero.webp';
HERO_IMG['about.html'] = 'images/about-hero.webp';
HERO_IMG['gallery.html'] = 'gallery/gallery-1.webp';
HERO_IMG['contact.html'] = 'images/contact-hero.webp';
HERO_IMG['elevators.html'] = 'images/commercial-hero.webp';

/* ---- helpers ---------------------------------------------- */

function getTag(src, re) {
  const m = src.match(re);
  return m ? m[1] : '';
}

/* Split a document body into top-level <section> blocks. These pages
   never nest sections, so a flat scan is safe. */
function splitSections(html) {
  const parts = [];
  const re = /<section\b[\s\S]*?<\/section>/g;
  let m, last = 0;
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) parts.push({ text: html.slice(last, m.index), section: false });
    parts.push({ text: m[0], section: true });
    last = m.index + m[0].length;
  }
  if (last < html.length) parts.push({ text: html.slice(last), section: false });
  return parts;
}

/* ---- transforms ------------------------------------------- */

function bumpVersions(src) {
  return src
    .replace(/css\/style\.css\?v=[\d.]+/g, `css/style.css?v=${CSS_V}`)
    .replace(/js\/main\.js\?v=[\d.]+/g, `js/main.js?v=${JS_V}`);
}

function familyClass(src, page) {
  const family = FAMILY[page];
  if (!family) return src;
  const cls = 'fam-' + family;
  if (src.includes(`<body class="${cls}"`)) return src;
  if (/<body class="fam-[a-z]+"/.test(src)) {
    return src.replace(/<body class="fam-[a-z]+"/, `<body class="${cls}"`);
  }
  return src.replace('<body>', `<body class="${cls}">`);
}

/* Assign a skin per section by what the section contains, so the
   light/grey/dark rhythm never leaves two identical bands adjacent.
   Keyed on content rather than on the previous class string, so this
   stays correct however many times it runs. */
const PRODUCT_SKINS = [
  ['spec-strip',      'dark'],
  ['KE:RANGESTRIP',   'linen'],
  ['img-duo',         'light'],
  ['card-grid',       'linen'],
  ['faq-layout',      'light'],
  ['consult',         'dark']
];

function reskinSections(src, page) {
  if (!FAMILY[page]) return src;

  const headEnd = src.indexOf('<main>');
  if (headEnd === -1) return src;
  const head = src.slice(0, headEnd);
  const rest = src.slice(headEnd);
  const mainEnd = rest.indexOf('</main>');
  if (mainEnd === -1) return src;

  const parts = splitSections(rest.slice(0, mainEnd));
  const tail = rest.slice(mainEnd);

  parts.forEach(part => {
    if (!part.section) return;
    /* The product hero keeps its own class. */
    if (/<section class="p-hero/.test(part.text)) return;

    const match = PRODUCT_SKINS.find(([needle]) => part.text.includes(needle));
    if (!match) return;

    part.text = part.text.replace(
      /^<section class="(?:dark|darker|light|linen)((?:\s+[\w-]+)*)"/,
      `<section class="${match[1]}$1"`
    );
  });

  return head + parts.map(p => p.text).join('') + tail;
}

/* Move the section holding the cross-link strip so it follows the
   spec strip. Reason: on mobile it previously sat at 62% page depth,
   so a visitor had to scroll roughly 4,900px to discover that eight
   other elevator types existed. */
function relocateRangeStrip(src) {
  const headEnd = src.indexOf('<main>');
  if (headEnd === -1) return src;
  const head = src.slice(0, headEnd);
  const rest = src.slice(headEnd);

  const mainEnd = rest.indexOf('</main>');
  if (mainEnd === -1) return src;
  const mainInner = rest.slice(0, mainEnd);
  const tail = rest.slice(mainEnd);

  const parts = splitSections(mainInner);
  const specIdx = parts.findIndex(p => p.section && p.text.includes('spec-strip'));
  const rangeIdx = parts.findIndex(p => p.section && p.text.includes('KE:RANGESTRIP'));
  if (specIdx === -1 || rangeIdx === -1) return src;

  /* Already immediately after the spec strip (allowing for the
     whitespace node between them). */
  if (rangeIdx === specIdx + 1 || rangeIdx === specIdx + 2) return src;

  const block = parts.splice(rangeIdx, 1)[0];

  /* Recompute: removing the block may shift the spec index. */
  const newSpecIdx = parts.findIndex(p => p.section && p.text.includes('spec-strip'));
  parts.splice(newSpecIdx + 1, 0, { text: '\n\n  ', section: false }, block);

  return head + parts.map(p => p.text).join('') + tail;
}

/* Re-title the relocated block: it now introduces the range rather
   than closing the page. */
function retitleRangeSection(src, page) {
  if (!FAMILY[page]) return src;
  return src
    .replace(/<span class="kicker">The Full Range<\/span>/,
      '<span class="kicker">Explore the Range</span>')
    .replace(/<h2 class="h2 split-lines">Eight other <span class="em">systems\.<\/span><\/h2>/,
      '<h2 class="h2">We also build eight other <span class="em">systems.</span></h2>');
}

function injectHead(src, page) {
  const title = getTag(src, /<title>([\s\S]*?)<\/title>/).trim();
  const desc = getTag(src, /<meta name="description" content="([\s\S]*?)">/).trim();
  const img = HERO_IMG[page] || 'images/commercial-hero.webp';
  const url = `${SITE}/${page === 'index.html' ? '' : page}`;

  const isHome = page === 'index.html';
  const schema = isHome ? organisationSchema() : '';

  const block = `<!-- KE:META -->
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kalyan Elevators">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${SITE}/${img}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#141414">${schema}
<!-- /KE:META -->`;

  /* Remove any previous block, plus the hand-written tags that the
     new elevators.html shipped with, so nothing is duplicated. */
  let out = src.replace(/<!-- KE:META -->[\s\S]*?<!-- \/KE:META -->\n?/, '');
  out = out.replace(/^\s*<link rel="canonical"[^>]*>\n/m, '');
  out = out.replace(/^\s*<meta property="og:[^>]*>\n/gm, '');
  out = out.replace(/^\s*<meta name="twitter:card"[^>]*>\n/gm, '');

  return out.replace(/(<link rel="icon"[^>]*>)/, `${block}\n$1`);
}

function organisationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Kalyan Elevators Pvt. Ltd.',
    url: SITE + '/',
    logo: SITE + '/logo.png',
    image: SITE + '/images/commercial-hero.webp',
    telephone: '+91-79949-98880',
    email: CONTACT.email,
    foundingDate: '2018',
    areaServed: 'Kerala, India',
    address: [
      {
        '@type': 'PostalAddress',
        name: 'Head Office',
        streetAddress: '2nd Floor, Ruqia Chambers, Kovilvattam Junction, TD Road',
        addressLocality: 'Kochi',
        addressRegion: 'Kerala',
        postalCode: '682035',
        addressCountry: 'IN'
      },
      {
        '@type': 'PostalAddress',
        name: 'Branch Office',
        streetAddress: 'TMC 36/2551, Third Floor, Jomsons Tower, Chettiynagdi Junction, Post Office Rd',
        addressLocality: 'Thrissur',
        addressRegion: 'Kerala',
        postalCode: '680001',
        addressCountry: 'IN'
      }
    ]
  };
  return '\n<script type="application/ld+json">' + JSON.stringify(data) + '</script>';
}

/* ---- run -------------------------------------------------- */

let changed = 0;
PAGES.forEach(page => {
  const file = path.join(ROOT, page);
  if (!fs.existsSync(file)) return;

  const before = fs.readFileSync(file, 'utf8');
  let out = before;

  out = bumpVersions(out);
  out = familyClass(out, page);
  out = relocateRangeStrip(out);
  out = reskinSections(out, page);
  out = retitleRangeSection(out, page);
  out = injectHead(out, page);

  if (out !== before) {
    fs.writeFileSync(file, out);
    changed++;
    console.log('  updated  ' + page);
  } else {
    console.log('  ok       ' + page);
  }
});

console.log(`\nPage transforms complete — ${changed} of ${PAGES.length} page(s) updated.`);
