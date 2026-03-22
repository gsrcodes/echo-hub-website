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
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

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
              }, i * 40);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      observer.observe(grid);
    });
  }

  // ── Navigation scroll effect ──
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var scrolled = false;

    function checkScroll() {
      var shouldBeScrolled = window.scrollY > 40;
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

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth scroll for anchor links ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ── Parallax float cards on scroll ──
  function initParallax() {
    var hero = document.querySelector('.hero-visual');
    if (!hero) return;
    var cards = hero.querySelectorAll('.float-card');
    if (!cards.length) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          var offset = scrollY * 0.08;
          cards.forEach(function (card, i) {
            var direction = i % 2 === 0 ? -1 : 1;
            card.style.transform = 'translateY(' + (direction * offset) + 'px)';
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Init all ──
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
    initStagger();
    initParallax();
  });

})();

