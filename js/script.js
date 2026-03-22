/* ==============================================
   UNEXLY — Site Interactions
   Vanilla JS, no dependencies
   ============================================== */

(function () {
  'use strict';

  // ── Scroll reveal with IntersectionObserver ──
  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // ── Staggered reveal for module grid cards ──
  function initStagger() {
    var grids = document.querySelectorAll('.module-grid');
    grids.forEach(function (grid) {
      var cards = grid.querySelectorAll('.module-card');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            cards.forEach(function (card, i) {
              setTimeout(function () {
                card.classList.add('visible');
              }, i * 50);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(grid);
    });
  }

  // ── Count-up animation ──
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var separator = el.getAttribute('data-separator') || '';
    var isDecimal = el.getAttribute('data-decimal') === 'true';
    var duration = 1500;
    var start = performance.now();

    function formatNumber(n) {
      if (isDecimal) return n.toFixed(1);
      var str = Math.floor(n).toString();
      if (separator) {
        str = str.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      }
      return str;
    }

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = prefix + formatNumber(current) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCountUp() {
    var counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  // ── Pain bar fill animation ──
  function initPainBars() {
    var bars = document.querySelectorAll('.pain-bar-fill');
    bars.forEach(function (bar) {
      var width = bar.getAttribute('data-width');
      bar.style.setProperty('--bar-width', width + '%');
    });
  }

  // ── Hero money counter ──
  function initMoneyCounter() {
    var counterEl = document.getElementById('counterValue');
    if (!counterEl) return;
    var perSecond = 47000 / (365 * 24 * 3600); // ~R$ 0.00149/s
    var startTime = Date.now();

    function update() {
      var elapsed = (Date.now() - startTime) / 1000;
      var lost = elapsed * perSecond;
      counterEl.textContent = 'R$\u00a0' + lost.toFixed(2).replace('.', ',');
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ── Navigation scroll effect ──
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var scrolled = false;

    function checkScroll() {
      var shouldBeScrolled = window.scrollY > 60;
      if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        nav.classList.toggle('scrolled', scrolled);
      }
      requestAnimationFrame(checkScroll);
    }

    requestAnimationFrame(checkScroll);
  }

  // ── Mobile menu toggle ──
  function initMobileMenu() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth scroll for anchor links ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          var navHeight = document.getElementById('nav').offsetHeight;
          var top = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  // ── Init all ──
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initStagger();
    initCountUp();
    initPainBars();
    initMoneyCounter();
    initNav();
    initMobileMenu();
    initSmoothScroll();
  });
})();

