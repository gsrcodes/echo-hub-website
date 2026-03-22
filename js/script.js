/* ================================================================
   UNEXLY — Interactive Layer
   Custom cursor · Tilt · Magnetic · Parallax · Reveals · Counters
   ================================================================ */
(() => {
  'use strict';

  /* ── Helpers ── */
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  /* ═══════════════════════════════════════════════════
     CUSTOM CURSOR (desktop only)
     ═══════════════════════════════════════════════════ */
  if (!isTouch) {
    const dot = $('#cursor');
    const ring = $('#cursorFollower');
    let mx = -100, my = -100, dx = -100, dy = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    /* Hover state on interactive elements */
    $$('a, button, [data-tilt], .tilt-card:not(.module-card--soon), [data-magnetic], input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
    });

    /* Lerp animation loop */
    (function tick() {
      dx = lerp(dx, mx, 0.15);
      dy = lerp(dy, my, 0.15);
      rx = lerp(rx, mx, 0.07);
      ry = lerp(ry, my, 0.07);
      dot.style.left = dx + 'px';
      dot.style.top = dy + 'px';
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(tick);
    })();
  }

  /* ═══════════════════════════════════════════════════
     SCROLL — Progress bar · Nav · Manifesto reveal
     ═══════════════════════════════════════════════════ */
  const progressBar = $('#scrollProgress');
  const nav = $('#nav');
  const manifestoEl = $('.reveal-words');
  let manifestoWords = [];

  if (manifestoEl) {
    manifestoEl.innerHTML = manifestoEl.textContent.trim()
      .split(/\s+/).map(w => '<span class="word">' + w + '</span>').join(' ');
    manifestoWords = $$('.word', manifestoEl);
  }

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    /* Progress bar */
    if (progressBar && max > 0) progressBar.style.width = (y / max * 100) + '%';

    /* Nav glass on scroll */
    if (nav) nav.classList.toggle('scrolled', y > 60);

    /* Manifesto word-by-word light-up */
    if (manifestoWords.length) {
      const rect = manifestoEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      const n = Math.floor(t * manifestoWords.length * 1.4);
      for (let i = 0; i < manifestoWords.length; i++) {
        manifestoWords[i].classList.toggle('lit', i < n);
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ═══════════════════════════════════════════════════
     MOBILE MENU
     ═══════════════════════════════════════════════════ */
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    $$('a', navLinks).forEach(a => a.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }));
  }

  /* ═══════════════════════════════════════════════════
     SMOOTH SCROLL (anchor links)
     ═══════════════════════════════════════════════════ */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = $(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  }));

  /* ═══════════════════════════════════════════════════
     SPLIT WORDS (hero + CTA titles)
     ═══════════════════════════════════════════════════ */
  $$('[data-split-words]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    const isHero = el.classList.contains('hero-title');

    el.innerHTML = words.map((w, i) => {
      if (isHero) {
        /* Hero: CSS keyframe animation with staggered delay */
        return '<span class="word" style="animation-delay:' + (0.5 + i * 0.08).toFixed(2) + 's">' + w + '</span>';
      }
      /* Others (CTA): scroll-triggered stagger via transition */
      const d = (i * 0.06).toFixed(2);
      return '<span class="word" style="display:inline-block;opacity:0;transform:translateY(24px);'
        + 'transition:opacity .5s cubic-bezier(.16,1,.3,1) ' + d + 's,'
        + 'transform .5s cubic-bezier(.16,1,.3,1) ' + d + 's">' + w + '</span>';
    }).join(' ');
  });

  /* ═══════════════════════════════════════════════════
     REVEAL ON SCROLL (IntersectionObserver)
     ═══════════════════════════════════════════════════ */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      /* Trigger non-hero split-word stagger inside this reveal */
      $$('[data-split-words]:not(.hero-title) .word', entry.target).forEach(w => {
        w.style.opacity = '1';
        w.style.transform = 'translateY(0)';
      });

      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  $$('.reveal').forEach(el => {
    /* Skip module-cards — grid stagger handles them */
    if (el.classList.contains('module-card')) return;
    revealObs.observe(el);
  });

  /* ═══════════════════════════════════════════════════
     MODULE GRID STAGGER
     ═══════════════════════════════════════════════════ */
  const grid = $('.module-grid');
  if (grid) {
    const gridObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('.module-card', grid).forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 50);
        });
        gridObs.unobserve(grid);
      });
    }, { threshold: 0.05 });
    gridObs.observe(grid);
  }

  /* ═══════════════════════════════════════════════════
     3D TILT ON HOVER (desktop only)
     ═══════════════════════════════════════════════════ */
  if (!isTouch) {
    $$('.tilt-card:not(.module-card--soon), [data-tilt]').forEach(card => {
      /* Skip elements with parallax — transform is managed there */
      if (card.dataset.parallax) return;

      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rotX = ((e.clientY - r.top) / r.height - 0.5) * -8;
        const rotY = ((e.clientX - r.left) / r.width - 0.5) * 8;
        card.style.transform =
          'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-4px) scale3d(1.02,1.02,1)';
        card.style.transition = 'transform .1s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = '';
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     MAGNETIC BUTTONS (desktop only)
     ═══════════════════════════════════════════════════ */
  if (!isTouch) {
    $$('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.25) + 'px,' + (y * 0.25) + 'px)';
        btn.style.transition = 'transform .15s ease';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     COUNT-UP ANIMATION
     ═══════════════════════════════════════════════════ */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const pre = el.dataset.prefix || '';
      const suf = el.dataset.suffix || '';
      const dur = 2000;
      const t0 = performance.now();

      (function tick(now) {
        const t = clamp((now - t0) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3); /* ease-out cubic */
        el.textContent = pre + Math.round(target * eased) + suf;
        if (t < 1) requestAnimationFrame(tick);
      })(t0);

      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('.count-up').forEach(el => countObs.observe(el));

  /* ═══════════════════════════════════════════════════
     HERO PHOTO PARALLAX (desktop only)
     ═══════════════════════════════════════════════════ */
  if (!isTouch) {
    const photo = $('.hero-photo');
    if (photo) {
      let ready = false;
      photo.addEventListener('animationend', () => { ready = true; });
      setTimeout(() => { ready = true; }, 2500); /* fallback */
      window.addEventListener('scroll', () => {
        if (ready) photo.style.transform = 'translateY(' + (window.scrollY * 0.06) + 'px)';
      }, { passive: true });
    }
  }

})();
