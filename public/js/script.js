/* ===================================
   UNEXLY — Animations & Interactions v3
   Lenis + GSAP ScrollTrigger
   Apple-style device scaling
   =================================== */

(() => {
    'use strict';

    // ── Lenis Smooth Scroll ──
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ── Register GSAP ──
    gsap.registerPlugin(ScrollTrigger);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── Utility ──
    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const mm = gsap.matchMedia();

    // ── Progress Bar ──
    const progressBar = $('#progressBar');
    if (progressBar) {
        gsap.to(progressBar, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });
    }

    // ── Navigation ──
    const nav = $('#nav');
    const navToggle = $('#navToggle');
    const navLinks = $('#navLinks');

    if (nav) {
        ScrollTrigger.create({
            start: 80,
            onUpdate: (self) => {
                nav.classList.toggle('scrolled', self.progress > 0);
            },
        });
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        // Close on link click
        $$('.nav-link', navLinks).forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links via Lenis
    $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const target = $(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target, { offset: -60 });
            }
        });
    });

    // ── Hero Entrance Timeline ──
    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
        .fromTo('.hero-badge',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(
            '.hero-title .line',
            { opacity: 0, y: 50, rotationX: -15 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.12,
            },
            '-=0.3'
        )
        .fromTo('.hero-sub',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.5'
        )
        .fromTo('.hero-actions',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.5'
        )
        .fromTo('.hero-metrics',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.5'
        )
        .fromTo('.scroll-cue',
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            '-=0.3'
        );

    // Hero device — enter from below, then fade on scroll
    const heroDeviceWrapper = $('.hero-device-wrapper');
    if (heroDeviceWrapper) {
        // Set initial state explicitly via GSAP (overrides CSS)
        gsap.set(heroDeviceWrapper, { y: 80, opacity: 0, scale: 0.92 });

        // Entrance animation
        const deviceEntrance = gsap.to(heroDeviceWrapper, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            delay: 0.9,
            onComplete: () => {
                // Only create the scroll-out AFTER entrance is done
                // This prevents the two animations from fighting
                ScrollTrigger.create({
                    trigger: '.hero',
                    start: 'center top',
                    end: 'bottom top',
                    scrub: 1,
                    animation: gsap.fromTo(
                        heroDeviceWrapper,
                        { scale: 1, y: 0, opacity: 1 },
                        { scale: 0.85, y: -80, opacity: 0, ease: 'none' }
                    ),
                });
            },
        });
    }

    // Scroll cue fade
    const scrollCue = $('#scrollCue');
    if (scrollCue) {
        gsap.to(scrollCue, {
            opacity: 0,
            scrollTrigger: {
                trigger: '.hero',
                start: '10% top',
                end: '25% top',
                scrub: true,
            },
        });
    }

    // ── Counter Animation ──
    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2;
        const obj = { val: 0 };

        gsap.to(obj, {
            val: target,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
                el.textContent = Math.round(obj.val) + suffix;
            },
        });
    }

    // Hero metric counters
    $$('.metric-val[data-target]').forEach((el) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => animateCounter(el),
        });
    });

    // Proof section counters
    $$('.proof-number[data-target]').forEach((el) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => animateCounter(el),
        });
    });

    // ── Marquee Speed ──
    const marqueeTrack = $('.marquee-track');
    if (marqueeTrack) {
        gsap.to(marqueeTrack, {
            animationDuration: '30s',
            scrollTrigger: {
                trigger: '.marquee-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
                onUpdate: (self) => {
                    const speed = 50 - self.progress * 30;
                    marqueeTrack.style.animationDuration = speed + 's';
                },
            },
        });
    }

    // ── Text Reveal (word-by-word) ──
    const revealParagraph = $('.reveal-paragraph');
    if (revealParagraph) {
        const text = revealParagraph.textContent.trim();
        const keywords = ['Unexly', 'SaaS', 'agendamento', 'inteligência', 'artificial', 'WhatsApp', 'IA', 'integrado'];
        revealParagraph.innerHTML = '';
        const words = text.split(/\s+/);

        words.forEach((w, i) => {
            const span = document.createElement('span');
            span.classList.add('word');
            if (keywords.some((k) => w.toLowerCase().includes(k.toLowerCase()))) {
                span.classList.add('highlight');
            }
            span.textContent = w;
            revealParagraph.appendChild(span);
        });

        const wordEls = $$('.word', revealParagraph);
        gsap.to(wordEls, {
            opacity: 1,
            stagger: 0.025,
            scrollTrigger: {
                trigger: '.text-reveal',
                start: 'top top',
                end: 'bottom 60%',
                scrub: 1,
            },
        });
    }

    // ── Feature Cards Stagger ──
    $$('.feature-card').forEach((card) => {
        gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Mouse follow glow
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    // ── Agenda Device — Apple-style Scale ──
    const agendaDevice = $('#agendaDevice');
    if (agendaDevice) {
        mm.add('(min-width: 769px)', () => {
            gsap.fromTo(
                agendaDevice,
                { scale: 0.7, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: agendaDevice,
                        start: 'top 90%',
                        end: 'top 30%',
                        scrub: 1,
                    },
                }
            );
        });
        mm.add('(max-width: 768px)', () => {
            gsap.fromTo(
                agendaDevice,
                { scale: 0.85, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: agendaDevice,
                        start: 'top 95%',
                        end: 'top 50%',
                        scrub: 1,
                    },
                }
            );
        });
    }

    // Device features row stagger
    $$('.df-item').forEach((item, i) => {
        gsap.fromTo(
            item,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ── Step Cards Stagger ──
    $$('.step-card').forEach((card, i) => {
        gsap.fromTo(
            card,
            { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ── Phone Scaler — Apple-style ──
    const phoneScaler = $('#phoneScaler');
    if (phoneScaler) {
        mm.add('(min-width: 769px)', () => {
            gsap.fromTo(
                phoneScaler,
                { scale: 0.6, opacity: 0, y: 60 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: phoneScaler,
                        start: 'top 95%',
                        end: 'top 35%',
                        scrub: 1,
                    },
                }
            );
        });
        mm.add('(max-width: 768px)', () => {
            gsap.fromTo(
                phoneScaler,
                { scale: 0.75, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: phoneScaler,
                        start: 'top 95%',
                        end: 'top 55%',
                        scrub: 1,
                    },
                }
            );
        });
    }

    // ── WhatsApp Chat Animation ──
    const waChat = $('#waChat');
    if (waChat) {
        let chatAnimated = false;

        ScrollTrigger.create({
            trigger: waChat,
            start: 'top 70%',
            once: true,
            onEnter: () => {
                if (chatAnimated) return;
                chatAnimated = true;
                runChatSequence();
            },
        });

        function runChatSequence() {
            const elements = $$('[data-delay]', waChat);

            elements.forEach((el) => {
                const delay = parseInt(el.dataset.delay, 10);

                // For typing indicators, show then hide
                if (el.classList.contains('wa-typing')) {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay);
                    // Hide after next message appears
                    const nextMsg = el.nextElementSibling;
                    if (nextMsg) {
                        const nextDelay = parseInt(nextMsg.dataset.delay, 10);
                        setTimeout(() => {
                            el.classList.remove('visible');
                        }, nextDelay - 100);
                    }
                } else {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay);
                }
            });
        }
    }

    // ── WA Feature Cards Stagger ──
    $$('.wa-feature').forEach((card, i) => {
        gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: i * 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ── Proof Cards ──
    $$('.proof-card').forEach((card, i) => {
        gsap.fromTo(
            card,
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ── CTA + Form ──
    const ctaContent = $('.cta-content');
    const ctaForm = $('.cta-form-wrap');

    if (ctaContent) {
        gsap.fromTo(
            ctaContent,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }
    if (ctaForm) {
        gsap.fromTo(
            ctaForm,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }

    // Form submission
    const form = $('#ctaForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-primary');

            // Simple success animation
            btn.innerHTML = '<i class="fas fa-check"></i> <span>Enviado com sucesso!</span>';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            btn.style.boxShadow = '0 4px 24px rgba(34, 197, 94, 0.3)';

            gsap.fromTo(btn, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });

            setTimeout(() => {
                form.reset();
                btn.innerHTML = '<span>Entrar na lista de espera</span><i class="fas fa-arrow-right"></i>';
                btn.style.background = '';
                btn.style.boxShadow = '';
            }, 3000);
        });
    }

    // ── Section Headers ──
    $$('.section-header').forEach((header) => {
        const els = [
            header.querySelector('.section-label'),
            header.querySelector('.section-title'),
            header.querySelector('.section-desc'),
        ].filter(Boolean);

        gsap.fromTo(
            els,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ── Magnetic Buttons ──
    $$('.magnetic-btn').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power2.out',
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
    });

    // ── Parallax Glows ──
    $$('.glow').forEach((glow) => {
        gsap.to(glow, {
            y: -100,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
            },
        });
    });

    // ── Footer entrance ──
    gsap.fromTo(
        '.footer-top',
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        }
    );

})();