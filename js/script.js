/* ================================================================
   UNEXLY — Interactive Layer
   Theme · Reveals · Counters · Smooth scroll
   ================================================================ */
(() => {
  'use strict';

  /* ── Theme Toggle ── */
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      if (next === 'light') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      localStorage.setItem('theme', next);
    });
  }

  /* ── Helpers ── */
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

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
     CONTACT FORM (AJAX + toast)
     ═══════════════════════════════════════════════════ */
  const contactForm = $('#contactForm');
  const toast = $('#toast');
  if (contactForm && toast) {
    function showToast(msg, isError) {
      toast.textContent = msg;
      toast.classList.toggle('toast--error', !!isError);
      toast.classList.add('toast--visible');
      setTimeout(() => { toast.classList.remove('toast--visible', 'toast--error'); }, 5000);
    }

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;

      const data = new FormData(contactForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          showToast('✅ Mensagem enviada! Responderemos em breve.');
          contactForm.reset();
        } else {
          showToast('Erro ao enviar. Tente novamente.', true);
        }
      })
      .catch(() => {
        showToast('Erro de conexão. Tente novamente.', true);
      })
      .finally(() => { btn.disabled = false; });
    });
  }

})();
