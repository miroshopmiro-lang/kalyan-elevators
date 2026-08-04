# Build steps — read before editing navigation

The header, mobile menu, footer and the product cross-link strips are
**generated into the HTML** of all 14 pages. They are not rendered at
runtime any more. If you edit navigation by hand in one page, the other
thirteen will drift.

## Commands

```bash
node build/build-layout.js   # header, menu, footer, cross-link strips
node build/build-pages.js    # versions, accents, section skins, <head> meta
node build/check-links.js    # link + asset integrity, exits non-zero on failure
```

All three are idempotent — safe to re-run any time. Run them in that order.

## Where things live

| To change | Edit |
| --- | --- |
| Product list, names, order, hero images | `build/site-data.js` |
| Phone, email, office addresses | `build/site-data.js` → `CONTACT` |
| Header / menu / footer markup | `build/build-layout.js` |
| Asset cache-bust version | `build/build-pages.js` → `CSS_V`, `JS_V` |
| Product family accent colours | `css/style.css` → `.fam-*` rules |

Generated regions are wrapped in `<!-- KE:NAME -->` … `<!-- /KE:NAME -->`.
Anything inside those markers is overwritten on the next build.

## Two things that will bite you

**1. Bump the service worker when assets change.**
`build/build-pages.js` writes `?v=` query strings onto `style.css` and
`main.js`. `sw.js` has its own `ASSET_V` and `CACHE_VERSION`. If they drift,
returning visitors get a stale mix of new HTML and old JS. `check-links.js`
fails the build when `ASSET_V` no longer matches what the pages request —
keep it that way.

**2. Nothing may depend on JavaScript to become visible.**
The site previously set `body { opacity: 0 }` and relied on `main.js` to add
a `.loaded` class. When that script was slow, blocked or served stale, the
page rendered blank — and because the navigation was also drawn by the same
script, there was no menu either. That combination is what the client saw on
his phone. The page-in fade is now a pure CSS animation, and the nav is real
markup. Don't reintroduce either dependency.

## Still outstanding

- **Forms do not submit.** All four still call `preventDefault()` and print
  "Request Received ✓". Deliberately deferred until the design is signed off.
  See the TODO in `js/main.js` → `initForms()`.
- **No trust-counter figures.** The counter component is wired and ready
  (`[data-count]` / `[data-suffix]`, see `initCounters()`), but no real numbers
  have been confirmed, so no counter band is on the page yet.
- **Certification marks are plain text.** The previous hand-drawn SVG
  approximations of the TÜV SÜD / CE / ISO marks have been removed. Swap in
  real certificate artwork when it arrives.
- **Product specs unverified.** The 36 spec figures across the nine product
  pages are written copy, not confirmed Kalyan data. Not promoted into hero
  position for that reason.

## Original video files

`gallery/_originals/` holds the pre-compression hero video (23 MB). The
shipped versions are re-encoded at 448px wide, 24fps. Keep the originals out
of any deploy.
