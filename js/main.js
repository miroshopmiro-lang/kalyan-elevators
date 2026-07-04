/* Kalyan Elevators — shared layout + motion system */
(function () {
  'use strict';

  var PRODUCTS = [
    ['passenger-elevators.html', 'Passenger Elevators'],
    ['home-elevators.html', 'Home Elevators'],
    ['glass-elevators.html', 'Glass Elevators'],
    ['capsule-elevators.html', 'Capsule Elevators'],
    ['commercial-elevators.html', 'Commercial Elevators'],
    ['hospital-elevators.html', 'Hospital Elevators'],
    ['car-elevators.html', 'Car Elevators'],
    ['freight-elevators.html', 'Freight Elevators'],
    ['goods-elevators.html', 'Goods Elevators'],
    ['structural-elevators.html', 'Structural Elevators']
  ];

  function headerHTML() {
    var productLinks = PRODUCTS.map(function (p) {
      return '<a href="' + p[0] + '">' + p[1] + '</a>';
    }).join('');
    return '' +
      '<header class="site-header" id="siteHeader">' +
        '<div class="header-inner">' +
          '<button class="burger" id="menuToggle" aria-label="Menu"><span><i></i><i></i></span></button>' +
          '<a class="brand" href="index.html"><img src="logo.png" alt="Kalyan Elevators"></a>' +
          '<div class="header-actions">' +
            '<a class="phone-pill" href="tel:+917994998880">+91 79949 98880</a>' +
            '<a class="btn btn-gold btn-quote" href="contact.html"><span>Get a Quote</span></a>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<nav class="menu-overlay" id="menuOverlay" aria-label="Main navigation">' +
        '<div class="menu-inner">' +
          '<div class="menu-col"><span class="mono-label">Navigate</span>' +
            '<div class="menu-main">' +
              '<a href="index.html">Home</a>' +
              '<a href="about.html">About</a>' +
              '<a href="contact.html">Contact</a>' +
            '</div>' +
          '</div>' +
          '<div class="menu-col"><span class="mono-label">Elevator Range</span>' +
            '<div class="menu-products">' + productLinks + '</div>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  function footerHTML() {
    var productLinks = PRODUCTS.slice(0, 6).map(function (p) {
      return '<li><a href="' + p[0] + '">' + p[1] + '</a></li>';
    }).join('');
    return '' +
      '<footer class="site-footer">' +
        '<div class="wrap">' +
          '<div class="footer-grid">' +
            '<div>' +
              '<a class="brand" href="index.html"><img src="logo.png" alt="Kalyan Elevators"></a>' +
              '<p style="margin-top:20px;font-size:13.5px;color:#6a6a6a;max-width:34ch">Bespoke vertical transportation systems, engineered for architectural harmony and whisper-quiet mobility.</p>' +
            '</div>' +
            '<div><h4>Quick Links</h4><ul>' +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="about.html">About</a></li>' +
              '<li><a href="contact.html">Contact</a></li>' +
              productLinks +
            '</ul></div>' +
            '<div><h4>Address</h4><ul>' +
              '<li style="font-size:13.5px;color:#555;line-height:1.7"><strong>Head Office</strong><br>2nd Floor, Ruqia Chambers, Kovilvattam Junction, TD Road, Kochi, Kerala - 682035</li>' +
              '<li style="margin-top:14px;font-size:13.5px;color:#555;line-height:1.7"><strong>Contact Number</strong><br><a href="tel:+917994998880">+91 79949 98880</a></li>' +
              '<li style="margin-top:10px"><a href="mailto:info@kalyanelevators.in">info@kalyanelevators.in</a></li>' +
            '</ul></div>' +
            '<div><h4>Headquarters</h4>' +
              '<div class="footer-map"><iframe title="Kalyan Elevators HQ" loading="lazy" src="https://www.google.com/maps?q=Kalyan+Elevators,Kochi,Kerala&output=embed"></iframe></div>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<span>© 2026 Kalyan Elevators. Engineered with precision.</span>' +
            '<div class="socials">' +
              '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>' +
              '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>' +
              '<a href="#" aria-label="X"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="display:block"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>' +
              '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<a class="whatsapp-fab" href="https://wa.me/917994998880" target="_blank" rel="noopener" aria-label="WhatsApp">' +
        '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="display:block">' +
          '<path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.177-1.355A9.95 9.95 0 0012.01 22c5.51 0 9.99-4.48 9.99-9.986C22 6.507 17.519 2.002 12.012 2zm0 18.294c-1.636 0-3.238-.429-4.646-1.243l-.333-.198-3.457.906.924-3.37-.217-.346a8.254 8.254 0 01-1.267-4.498c.001-4.563 3.717-8.274 8.284-8.274 4.56 0 8.271 3.712 8.273 8.277-.002 4.569-3.719 8.286-8.288 8.286zm4.543-6.196c-.249-.125-1.472-.725-1.7-.808-.228-.083-.393-.125-.558.125-.166.249-.641.808-.787.975-.145.166-.29.187-.539.062-.25-.125-1.05-.387-2.001-1.234-.74-.66-1.24-1.475-1.385-1.725-.145-.249-.015-.385.11-.51.112-.112.249-.29.373-.436.124-.146.166-.25.249-.415.083-.167.042-.312-.021-.437-.062-.125-.558-1.349-.764-1.848-.201-.484-.403-.418-.558-.426-.145-.007-.31-.009-.477-.009a.919.919 0 00-.663.312c-.228.249-.87.851-.87 2.076 0 1.226.892 2.41 1.016 2.577.125.166 1.758 2.685 4.258 3.764.595.257 1.06.41 1.423.525.597.19 1.141.163 1.572.099.48-.072 1.472-.601 1.679-1.183.207-.582.207-1.08.145-1.183-.063-.105-.228-.167-.478-.292z"/>' +
        '</svg>' +
      '</a>';
  }

  function injectLayout() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.outerHTML = headerHTML();
    if (f) f.outerHTML = footerHTML();
  }

  function initHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initMenu() {
    var toggle = document.getElementById('menuToggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
    document.querySelectorAll('.menu-overlay a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
      });
    });
  }

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

  function initReveals() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal, .img-reveal, .split-lines').forEach(function (el) {
      io.observe(el);
    });
  }

  function initCounters() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        var target = parseInt(el.dataset.count, 10) || 0;
        var suffix = el.dataset.suffix || '';
        var start = performance.now(), dur = 1800;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 4);
          el.firstChild.textContent = Math.round(target * eased).toLocaleString('en-IN');
          if (p < 1) requestAnimationFrame(tick);
          else el.firstChild.textContent = target.toLocaleString('en-IN');
        })(start);
        if (suffix && !el.querySelector('b')) {
          var b = document.createElement('b');
          b.textContent = suffix;
          el.appendChild(b);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      if (!el.firstChild) el.appendChild(document.createTextNode('0'));
      io.observe(el);
    });
  }

  function initAccordions() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a || q.dataset.bound) return;
      q.dataset.bound = '1';
      q.addEventListener('click', function () {
        var open = item.classList.contains('open');
        var group = item.closest('.faq-group') || document;
        group.querySelectorAll('.faq-item.open').forEach(function (o) {
          o.classList.remove('open');
          o.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!open) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  }

  function initParallax() {
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

  function initCarousels() {
    document.querySelectorAll('.carousel').forEach(function (c) {
      var track = c.querySelector('.carousel-track');
      var prev = c.querySelector('[data-prev]');
      var next = c.querySelector('[data-next]');
      if (!track) return;
      var step = function () { return track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 300; };
      if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
      if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    });
  }

  function initFloatingSelects() {
    document.querySelectorAll('.field select').forEach(function (s) {
      var sync = function () {
        s.closest('.field').classList.toggle('has-value', !!s.value);
      };
      s.addEventListener('change', sync);
      sync();
    });
  }

  function initForms() {
    document.querySelectorAll('form[data-demo]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (form.classList.contains('lead-bar')) {
          var targetSelect = document.querySelector('.consult-form select');
          var sourceSelect = form.querySelector('select');
          if (targetSelect && sourceSelect) {
            targetSelect.value = sourceSelect.value;
            var event = new Event('change');
            targetSelect.dispatchEvent(event);
          }
          var target = document.getElementById('consult');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
        var btn = form.querySelector('.btn span');
        if (btn) btn.textContent = 'Request Received ✓';
      });
    });
  }

  function initHeroVideoRotation() {
    var d1 = document.getElementById('vid-desktop-1');
    var d2 = document.getElementById('vid-desktop-2');
    var m1 = document.getElementById('vid-mobile-1');
    var m2 = document.getElementById('vid-mobile-2');
    
    function setupSequence(v1, v2) {
      if (!v1 || !v2) return;
      
      v1.play().catch(function() {});
      
      v1.addEventListener('ended', function () {
        v2.currentTime = 0;
        v2.play().catch(function() {});
        v2.classList.add('active');
        v1.classList.remove('active');
      });
      
      v2.addEventListener('ended', function () {
        v1.currentTime = 0;
        v1.play().catch(function() {});
        v1.classList.add('active');
        v2.classList.remove('active');
      });
    }
    
    setupSequence(d1, d2);
    setupSequence(m1, m2);
  }

  window.KE = {
    products: PRODUCTS,
    initAll: function () {
      initSplitLines();
      initReveals();
      initCounters();
      initAccordions();
      initParallax();
      initCarousels();
      initFloatingSelects();
      initForms();
      initHeroVideoRotation();
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    injectLayout();
    initHeader();
    initMenu();
    window.KE.initAll();
    setTimeout(function () {
      document.body.classList.add('loaded');
    }, 50);
  });
})();
