/* ============================================================
   KALYAN ELEVATORS — link and asset integrity check
   Run:  node build/check-links.js
   Exits non-zero if anything is broken, so it can gate a deploy.
   ============================================================ */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
process.chdir(ROOT);

const pages = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const brokenLinks = [];
const deadLinks = [];
const missingAssets = new Set();

function exists(p) {
  try { return fs.existsSync(decodeURIComponent(p)); } catch (e) { return fs.existsSync(p); }
}

pages.forEach(page => {
  const src = fs.readFileSync(page, 'utf8');

  /* page-to-page links */
  let m;
  const hrefRe = /href="([^"]*)"/g;
  while ((m = hrefRe.exec(src)) !== null) {
    const href = m[1];
    if (href === '#' || href === '') { deadLinks.push(`${page} -> href="${href}"`); continue; }
    if (/^(https?:|mailto:|tel:|data:)/i.test(href)) continue;
    if (href.startsWith('#')) continue;
    const target = href.split('#')[0].split('?')[0];
    if (!target) continue;
    if (!exists(target)) brokenLinks.push(`${page} -> ${href}`);
  }

  /* src="" assets. The leading (^|\s) matters: a bare \b would also
     match data-lazy-src, whose value is a comma-separated list. */
  const srcRe = /(?:^|\s)src="([^"]+)"/g;
  while ((m = srcRe.exec(src)) !== null) {
    const f = m[1].split('?')[0];
    if (/^(https?:|data:)/i.test(f)) continue;
    if (!exists(f)) missingAssets.add(`${page} -> src ${f}`);
  }

  /* deferred video sources, held in a comma-separated attribute */
  const lazyRe = /data-lazy-src="([^"]+)"/g;
  while ((m = lazyRe.exec(src)) !== null) {
    m[1].split(',').forEach(raw => {
      const f = raw.trim().split('?')[0];
      if (!f) return;
      if (!exists(f)) missingAssets.add(`${page} -> data-lazy-src ${f}`);
    });
  }

  /* CSS url() references inside inline styles. Fragment-only values
     such as url(#grid) point at an SVG def in the same document. */
  const urlRe = /url\(['"]?([^'")]+)['"]?\)/g;
  while ((m = urlRe.exec(src)) !== null) {
    const f = m[1].split('?')[0];
    if (/^(https?:|data:|#)/i.test(f)) continue;
    if (!exists(f)) missingAssets.add(`${page} -> url() ${f}`);
  }
});

/* assets referenced from the stylesheet */
const css = fs.readFileSync('css/style.css', 'utf8');
let m;
const cssUrlRe = /url\(['"]?([^'")]+)['"]?\)/g;
while ((m = cssUrlRe.exec(css)) !== null) {
  const f = m[1].split('?')[0];
  if (/^(https?:|data:|#)/i.test(f)) continue;
  const resolved = path.posix.normalize(path.posix.join('css', f));
  if (!exists(resolved)) missingAssets.add(`css/style.css -> ${f}`);
}

/* service-worker precache list must not point at assets that moved */
const sw = fs.readFileSync('sw.js', 'utf8');
const swAssetV = (sw.match(/ASSET_V\s*=\s*'([\d.]+)'/) || [])[1];
const htmlCssV = (fs.readFileSync('index.html', 'utf8').match(/style\.css\?v=([\d.]+)/) || [])[1];
const versionMismatch = swAssetV !== htmlCssV
  ? `sw.js ASSET_V=${swAssetV} but pages request v=${htmlCssV}`
  : null;

/* ---- report ---- */
console.log(`pages scanned:        ${pages.length}`);
console.log(`broken page links:    ${brokenLinks.length}`);
brokenLinks.forEach(l => console.log('   ' + l));
console.log(`dead href="#" links:  ${deadLinks.length}`);
deadLinks.forEach(l => console.log('   ' + l));
console.log(`missing assets:       ${missingAssets.size}`);
missingAssets.forEach(l => console.log('   ' + l));
console.log(`sw asset version:     ${versionMismatch || 'matches pages (' + swAssetV + ')'}`);

const failed = brokenLinks.length || deadLinks.length || missingAssets.size || versionMismatch;
console.log('\n' + (failed ? 'FAILED' : 'ALL CHECKS PASSED'));
process.exit(failed ? 1 : 0);
