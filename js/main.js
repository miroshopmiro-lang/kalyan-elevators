/* ============================================================
   KALYAN ELEVATORS — behaviour layer
   ------------------------------------------------------------
   This file no longer renders the header, menu, footer or the
   product cross-link strips. Those are baked into every page as
   real HTML by build/build-layout.js, so navigation survives a
   failed, blocked or stale script. Run that build after editing
   build/site-data.js.

   Nothing here is required for the page to be readable. Every
   enhancement below degrades to a visible, usable page.
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- header scroll state ---------------------------------- */
  function initHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- mobile menu overlay ---------------------------------- */
  function initMenu() {
    var toggle = document.getElementById('menuToggle');
    var overlay = document.getElementById('menuOverlay');
    if (!toggle || !overlay) return;

    var setState = function (open) {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    };

    toggle.addEventListener('click', function () {
      setState(!document.body.classList.contains('menu-open'));
    });

    overlay.addEventListener('click', function (e) {
      if (e.target.closest('a')) setState(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setState(false);
        toggle.focus();
      }
    });

    setState(false);
  }

  /* ---- desktop Elevators dropdown ---------------------------
     CSS opens it on hover. This adds click and keyboard access so
     it also works on touch and without a mouse. */
  function initNavDropdown() {
    document.querySelectorAll('.nav-drop').forEach(function (drop) {
      var trigger = drop.querySelector('.nav-drop-trigger');
      if (!trigger) return;

      var setOpen = function (open) {
        drop.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      };

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        setOpen(!drop.classList.contains('is-open'));
      });

      drop.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { setOpen(false); trigger.focus(); }
      });

      /* Close when focus or the pointer leaves the whole group. */
      drop.addEventListener('focusout', function (e) {
        if (!drop.contains(e.relatedTarget)) setOpen(false);
      });
      drop.addEventListener('mouseleave', function () { setOpen(false); });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-drop')) {
        document.querySelectorAll('.nav-drop.is-open').forEach(function (d) {
          d.classList.remove('is-open');
          var t = d.querySelector('.nav-drop-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  /* ---- line-by-line heading reveal -------------------------- */
  function initSplitLines() {
    document.querySelectorAll('.split-lines').forEach(function (el) {
      if (el.dataset.split) return;
      el.dataset.split = '1';
      var html = el.innerHTML.split(/<br\s*\/?>(?![^<]*<\/span>)/i);
      el.innerHTML = html.map(function (line) {
        return '<span class="line"><span>' + line + '</span></span>';
      }).join('');
    });
  }

  /* ---- scroll reveals --------------------------------------- */
  function initReveals() {
    var els = document.querySelectorAll('.reveal, .img-reveal, .split-lines');
    if (!els.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });

    /* Failsafe: if the observer never fires, show everything rather
       than leaving content stuck hidden. */
    setTimeout(function () {
      if (!document.querySelector('.reveal.in, .img-reveal.in, .split-lines.in')) {
        io.disconnect();
        els.forEach(function (el) { el.classList.add('in'); });
      }
    }, 900);
  }

  /* ---- animated counters -----------------------------------
     Reads [data-count] / [data-suffix]. Renders the final value
     immediately when motion is reduced. */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    var render = function (el, value) {
      el.firstChild.textContent = value.toLocaleString('en-IN');
    };
    var addSuffix = function (el) {
      var suffix = el.dataset.suffix;
      if (suffix && !el.querySelector('b')) {
        var b = document.createElement('b');
        b.textContent = suffix;
        el.appendChild(b);
      }
    };

    els.forEach(function (el) {
      if (!el.firstChild) el.appendChild(document.createTextNode('0'));
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        render(el, parseInt(el.dataset.count, 10) || 0);
        addSuffix(el);
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        var target = parseInt(el.dataset.count, 10) || 0;
        var start = performance.now(), dur = 1800;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 4);
          render(el, Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
          else render(el, target);
        })(start);
        addSuffix(el);
      });
    }, { threshold: 0.4 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- FAQ accordions --------------------------------------- */
  function initAccordions() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a || q.dataset.bound) return;
      q.dataset.bound = '1';
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', function () {
        var open = item.classList.contains('open');
        var group = item.closest('.faq-group') || document;
        group.querySelectorAll('.faq-item.open').forEach(function (o) {
          o.classList.remove('open');
          o.querySelector('.faq-a').style.maxHeight = null;
          var oq = o.querySelector('.faq-q');
          if (oq) oq.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
          q.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---- parallax backgrounds --------------------------------- */
  function initParallax() {
    if (reduceMotion) return;
    var els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;
    var onScroll = function () {
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var speed = parseFloat(el.dataset.parallax) || 0.12;
        var offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = 'translateY(' + offset.toFixed(1) + 'px) scale(1.12)';
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- horizontal carousels --------------------------------- */
  function initCarousels() {
    document.querySelectorAll('.carousel').forEach(function (c) {
      var track = c.querySelector('.carousel-track');
      var prev = c.querySelector('[data-prev]');
      var next = c.querySelector('[data-next]');
      if (!track) return;
      var step = function () {
        return track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 300;
      };
      if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
      if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    });
  }

  /* ---- floating labels on selects --------------------------- */
  function initFloatingSelects() {
    document.querySelectorAll('.field select').forEach(function (s) {
      var sync = function () {
        s.closest('.field').classList.toggle('has-value', !!s.value);
      };
      s.addEventListener('change', sync);
      sync();
    });
  }

  /* ---- forms -----------------------------------------------
     TODO: these are not yet wired to a destination. The hero bar
     carries the chosen elevator type down to the consultation
     form; the consultation forms themselves still need a real
     endpoint before the site can capture an enquiry. */
  function initForms() {
    document.querySelectorAll('form[data-demo]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (form.classList.contains('lead-bar')) {
          var targetSelect = document.querySelector('.consult-form select');
          var sourceSelect = form.querySelector('select');
          if (targetSelect && sourceSelect) {
            targetSelect.value = sourceSelect.value;
            targetSelect.dispatchEvent(new Event('change'));
          }
          var target = document.getElementById('consult');
          if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
          return;
        }

        var btn = form.querySelector('.btn span');
        if (btn) btn.textContent = 'Request Received ✓';
      });
    });
  }

  /* ---- hero video ------------------------------------------
     Sources live in data attributes and are injected for the
     matching breakpoint only. Previously both the mobile and the
     desktop pair were in the markup and hidden with display:none,
     which hides a <video> but does not stop it downloading — so
     every device pulled roughly 2 MB of video it never played.
     With no JS the poster image stands in. */
  function initHeroVideo() {
    var videos = document.querySelectorAll('.hero-video[data-webm]');
    if (!videos.length) return;

    var wantMobile = window.matchMedia('(max-width: 900px)').matches;
    var set = [];

    videos.forEach(function (v) {
      var isMobile = v.classList.contains('hero-video-mobile');
      if (isMobile !== wantMobile) return;

      ['webm', 'mp4'].forEach(function (type) {
        var src = v.dataset[type];
        if (!src) return;
        var s = document.createElement('source');
        s.src = src;
        s.type = 'video/' + type;
        v.appendChild(s);
      });
      v.load();
      set.push(v);
    });

    if (!set.length) return;

    /* Single clip: just loop it. */
    if (set.length === 1) {
      set[0].loop = true;
      set[0].classList.add('active');
      set[0].play().catch(function () {});
      return;
    }

    /* Two clips: alternate, crossfading via the .active class. */
    set.forEach(function (v, i) {
      v.addEventListener('ended', function () {
        var next = set[(i + 1) % set.length];
        next.currentTime = 0;
        next.classList.add('active');
        v.classList.remove('active');
        next.play().catch(function () {});
      });
    });
    set[0].classList.add('active');
    set[0].play().catch(function () {});
  }

  /* ---- below-the-fold decorative video ---------------------
     autoplay overrides preload="none", so a video that is never
     scrolled to still downloads in full. Hold its sources back
     until it approaches the viewport. Without JS the poster shows. */
  function initLazyVideo() {
    var videos = document.querySelectorAll('video[data-lazy-src]');
    if (!videos.length) return;

    var load = function (v) {
      if (v.dataset.loaded) return;
      v.dataset.loaded = '1';
      v.dataset.lazySrc.split(',').forEach(function (src) {
        src = src.trim();
        if (!src) return;
        var s = document.createElement('source');
        s.src = src;
        s.type = 'video/' + src.split('.').pop();
        v.appendChild(s);
      });
      v.load();
      v.play().catch(function () {});
    };

    if (!('IntersectionObserver' in window)) {
      videos.forEach(load);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        load(e.target);
      });
    }, { rootMargin: '400px 0px' });
    videos.forEach(function (v) { io.observe(v); });
  }

  /* ---- init ------------------------------------------------- */
  window.KE = {
    initAll: function () {
      initSplitLines();
      initReveals();
      initCounters();
      initAccordions();
      initParallax();
      initCarousels();
      initFloatingSelects();
      initForms();
      initHeroVideo();
      initLazyVideo();
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initMenu();
    initNavDropdown();
    window.KE.initAll();

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function (err) {
          console.warn('[SW] Registration failed:', err);
        });
      });
    }
  });
})();
