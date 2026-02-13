/* ===================================
   UNEXLY — Script v4
   Complete rewrite with all bug fixes
   =================================== */

(() => {
    'use strict';

    /* ── Lenis Smooth Scroll ── */
    const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    /* ── GSAP + Lenis integration ── */
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ── Progress Bar ── */
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        gsap.to(progressBar, {
            width: '100%',
            ease: 'none',
            scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
        });
    }

    /* ========================================
       NAVIGATION
       ======================================== */
    const nav = document.getElementById('nav');
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');

    // Scroll effect
    if (nav) {
        ScrollTrigger.create({
            start: 50,
            onUpdate: (self) => {
                if (self.scroll() > 50) nav.classList.add('scrolled');
                else nav.classList.remove('scrolled');
            }
        });
    }

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth anchor scrolling via Lenis
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                if (navLinks) navLinks.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                lenis.scrollTo(target, { offset: -80 });
            }
        });
    });

    /* ========================================
       HERO ENTRANCE TIMELINE
       RULE: Always use .fromTo() — never .to() with from
       ======================================== */
    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    const heroBadge = document.querySelector('.hero-badge');
    const heroLines = document.querySelectorAll('.hero-title .line');
    const heroSub = document.querySelector('.hero-sub');
    const heroActions = document.querySelector('.hero-actions');
    const heroMetrics = document.querySelector('.hero-metrics');

    if (heroBadge) {
        heroTl.fromTo(heroBadge,
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8 }
        );
    }

    heroLines.forEach((line, i) => {
        heroTl.fromTo(line,
            { opacity: 0, y: 50, rotateX: 10 },
            { opacity: 1, y: 0, rotateX: 0, duration: 0.9 },
            `-=0.65`
        );
    });

    if (heroSub) {
        heroTl.fromTo(heroSub,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.5'
        );
    }

    if (heroActions) {
        heroTl.fromTo(heroActions,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.4'
        );
    }

    if (heroMetrics) {
        heroTl.fromTo(heroMetrics,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.3'
        );
    }

    /* ========================================
       HERO DEVICE — Entrance + Scroll
       RULE: gsap.set() → gsap.to() → onComplete → ScrollTrigger
       This prevents competing animations
       ======================================== */
    const heroDeviceWrapper = document.querySelector('.hero-device-wrapper');
    if (heroDeviceWrapper) {
        // 1) Set initial state
        gsap.set(heroDeviceWrapper, { opacity: 0, y: 80, scale: 0.92, rotateX: 6 });

        // 2) Entrance animation
        gsap.to(heroDeviceWrapper, {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            duration: 1.3, ease: 'expo.out', delay: 0.9,
            onComplete: () => {
                // 3) ONLY after entrance, create scroll-out trigger
                ScrollTrigger.create({
                    trigger: '.hero',
                    start: 'center center',
                    end: 'bottom top',
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const p = self.progress;
                        gsap.set(heroDeviceWrapper, {
                            opacity: 1 - p * 0.8,
                            scale: 1 - p * 0.1,
                            y: p * -60
                        });
                    }
                });
            }
        });
    }

    /* ── Scroll Cue fade ── */
    const scrollCue = document.getElementById('scrollCue');
    if (scrollCue) {
        gsap.fromTo(scrollCue,
            { opacity: 0 },
            { opacity: 1, delay: 2, duration: 0.6 }
        );
        ScrollTrigger.create({
            start: 100,
            onUpdate: (self) => {
                gsap.set(scrollCue, { opacity: self.scroll() > 100 ? 0 : 1 });
            }
        });
    }

    /* ========================================
       COUNTER ANIMATIONS
       ======================================== */
    function animateCounters(selector) {
        document.querySelectorAll(selector).forEach(el => {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.fromTo(el, { innerText: 0 }, {
                        innerText: target,
                        duration: 1.8,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        onUpdate: function () {
                            el.textContent = Math.round(gsap.getProperty(el, 'innerText')) + suffix;
                        }
                    });
                }
            });
        });
    }
    animateCounters('.metric-val[data-target]');
    animateCounters('.proof-number[data-target]');

    /* ========================================
       MARQUEE SPEED VARIATION
       ======================================== */
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        ScrollTrigger.create({
            trigger: '.marquee-section',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const speed = 50 + self.progress * 25;
                marqueeTrack.style.animationDuration = speed + 's';
            }
        });
    }

    /* ========================================
       TEXT REVEAL — Word-by-word
       RULE: Words use CSS margin-right: 0.3em, NOT trailing spaces
       ======================================== */
    const revealParagraph = document.querySelector('.reveal-paragraph');
    if (revealParagraph) {
        const text = revealParagraph.textContent.trim();
        revealParagraph.innerHTML = '';

        const words = text.split(/\s+/);
        const highlights = ['Unexly', 'IA', 'WhatsApp', 'plataforma'];

        words.forEach(word => {
            const span = document.createElement('span');
            span.classList.add('word');
            // Check highlights
            if (highlights.some(h => word.includes(h))) {
                span.classList.add('highlight');
            }
            span.textContent = word;
            // spacing is handled by CSS margin-right: 0.3em
            revealParagraph.appendChild(span);
        });

        const wordEls = revealParagraph.querySelectorAll('.word');
        ScrollTrigger.create({
            trigger: '.text-reveal',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            onUpdate: (self) => {
                const progress = self.progress;
                wordEls.forEach((w, i) => {
                    const wordProgress = Math.min(1, Math.max(0, (progress * wordEls.length - i) / 2));
                    w.style.opacity = 0.08 + wordProgress * 0.92;
                });
            }
        });
    }

    /* ========================================
       FEATURE CARDS — stagger + mouse glow
       ======================================== */
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 0.8,
                delay: i * 0.1,
                ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 85%', once: true }
            }
        );

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
    });

    /* ========================================
       SECTION HEADERS — Reveals
       ======================================== */
    document.querySelectorAll('.section-header').forEach(header => {
        gsap.fromTo(header,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
                scrollTrigger: { trigger: header, start: 'top 85%', once: true }
            }
        );
    });

    /* ========================================
       CONVERSATIONS DEVICE — Apple-style Scale
       ======================================== */
    const convDevice = document.getElementById('convDevice');
    if (convDevice) {
        gsap.fromTo(convDevice,
            { scale: 0.7, opacity: 0.3 },
            {
                scale: 1, opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: convDevice,
                    start: 'top 90%',
                    end: 'top 25%',
                    scrub: 0.5
                }
            }
        );
    }

    /* ── Device Features Row ── */
    document.querySelectorAll('.df-item').forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, y: 35 },
            {
                opacity: 1, y: 0, duration: 0.7,
                delay: i * 0.15,
                ease: 'expo.out',
                scrollTrigger: { trigger: item, start: 'top 88%', once: true }
            }
        );
    });

    /* ========================================
       HOW IT WORKS — Step Cards
       ======================================== */
    document.querySelectorAll('.step-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
            {
                opacity: 1, x: 0, duration: 0.8,
                ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 85%', once: true }
            }
        );
    });

    /* ========================================
       PHONE DEVICE — Apple-style Scale
       ======================================== */
    const phoneScaler = document.getElementById('phoneScaler');
    if (phoneScaler) {
        gsap.fromTo(phoneScaler,
            { scale: 0.6, opacity: 0.2 },
            {
                scale: 1, opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: phoneScaler,
                    start: 'top 90%',
                    end: 'top 30%',
                    scrub: 0.5
                }
            }
        );
    }

    /* ========================================
       WHATSAPP CHAT SEQUENCE
       RULE: NO auto-scroll (waChat.scrollTop = ...)
       ======================================== */
    const waChat = document.getElementById('waChat');
    if (waChat) {
        const chatItems = waChat.querySelectorAll('.wa-msg, .wa-typing, .wa-switch');

        let chatAnimated = false;
        ScrollTrigger.create({
            trigger: waChat,
            start: 'top 75%',
            once: true,
            onEnter: () => {
                if (chatAnimated) return;
                chatAnimated = true;

                chatItems.forEach(item => {
                    const delay = parseInt(item.dataset.delay || '0', 10);
                    const isTyping = item.classList.contains('wa-typing');

                    setTimeout(() => {
                        item.classList.add('visible');

                        // Hide typing indicators after showing next msg
                        if (isTyping) {
                            const next = item.nextElementSibling;
                            const nextDelay = next ? parseInt(next.dataset.delay || '0', 10) : delay + 800;
                            setTimeout(() => {
                                item.classList.remove('visible');
                            }, nextDelay - delay - 100);
                        }
                    }, delay);
                });
            }
        });
    }

    /* ========================================
       SCHEDULING CARDS — Stagger
       ======================================== */
    document.querySelectorAll('.sched-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.7,
                delay: i * 0.08,
                ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 88%', once: true }
            }
        );
    });

    /* ========================================
       EXTENDED FEATURES — Stagger
       ======================================== */
    document.querySelectorAll('.ext-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 35 },
            {
                opacity: 1, y: 0, duration: 0.7,
                delay: i * 0.07,
                ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 88%', once: true }
            }
        );
    });

    /* ========================================
       SECURITY BADGES — Stagger
       ======================================== */
    document.querySelectorAll('.security-badge').forEach((badge, i) => {
        gsap.fromTo(badge,
            { opacity: 0, y: 25, scale: 0.9 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.6,
                delay: i * 0.06,
                ease: 'expo.out',
                scrollTrigger: { trigger: badge, start: 'top 90%', once: true }
            }
        );
    });

    /* ========================================
       WA FEATURES GRID — Stagger
       ======================================== */
    document.querySelectorAll('.wa-feature').forEach((feat, i) => {
        gsap.fromTo(feat,
            { opacity: 0, y: 35 },
            {
                opacity: 1, y: 0, duration: 0.7,
                delay: i * 0.1,
                ease: 'expo.out',
                scrollTrigger: { trigger: feat, start: 'top 88%', once: true }
            }
        );
    });

    /* ========================================
       PROOF CARDS — Stagger
       ======================================== */
    document.querySelectorAll('.proof-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.8,
                delay: i * 0.12,
                ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 85%', once: true }
            }
        );
    });

    /* ========================================
       CTA SECTION — Content + Form Slides
       ======================================== */
    const ctaContent = document.querySelector('.cta-content');
    const ctaFormWrap = document.querySelector('.cta-form-wrap');

    if (ctaContent) {
        gsap.fromTo(ctaContent,
            { opacity: 0, x: -40 },
            {
                opacity: 1, x: 0, duration: 0.9, ease: 'expo.out',
                scrollTrigger: { trigger: ctaContent, start: 'top 85%', once: true }
            }
        );
    }
    if (ctaFormWrap) {
        gsap.fromTo(ctaFormWrap,
            { opacity: 0, x: 40 },
            {
                opacity: 1, x: 0, duration: 0.9, ease: 'expo.out',
                scrollTrigger: { trigger: ctaFormWrap, start: 'top 85%', once: true }
            }
        );
    }

    /* ========================================
       FORM SUBMISSION
       ======================================== */
    const ctaForm = document.getElementById('ctaForm');
    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = ctaForm.querySelector('.btn-primary');
            if (btn) {
                btn.innerHTML = '<span>Solicitação enviada! ✅</span>';
                btn.style.pointerEvents = 'none';
                btn.style.opacity = 0.7;
            }
            // Reset after 4s
            setTimeout(() => {
                if (btn) {
                    btn.innerHTML = '<span>Entrar na lista de espera</span><i class="fas fa-arrow-right"></i>';
                    btn.style.pointerEvents = 'auto';
                    btn.style.opacity = 1;
                }
                ctaForm.reset();
            }, 4000);
        });
    }

    /* ========================================
       MAGNETIC BUTTONS
       ======================================== */
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
    });

    /* ========================================
       PARALLAX BG GLOWS
       ======================================== */
    document.querySelectorAll('.glow').forEach(glow => {
        gsap.to(glow, {
            y: -80,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.3
            }
        });
    });

    /* ========================================
       FOOTER ENTRANCE
       ======================================== */
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.fromTo(footer,
            { opacity: 0 },
            {
                opacity: 1, duration: 0.8, ease: 'power2.out',
                scrollTrigger: { trigger: footer, start: 'top 92%', once: true }
            }
        );
    }

})();