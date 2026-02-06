/* ===================================
   UNEXLY — Premium Interactive Engine
   =================================== */

(function () {
    'use strict';

    // ─── CONSOLE BRANDING ───
    console.log(
        '%c✦ Unexly',
        'font-size:28px;font-weight:900;color:#6C5CE7;text-shadow:0 0 20px rgba(108,92,231,.35);'
    );
    console.log(
        '%cGestão Empresarial Reimaginada',
        'font-size:12px;color:#00CEFF;font-weight:600;'
    );
    console.log(
        '%cUnexly Team • contato@unexly.com',
        'font-size:11px;color:#8B7FF0;'
    );

    // ─── DOM CACHE ───
    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => [...p.querySelectorAll(s)];

    // ─── UTILITY ───
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
    const isMobile = () => window.innerWidth <= 768;

    /* ═══════════════════════════════════
       1. CUSTOM CURSOR
       ═══════════════════════════════════ */
    const cursorDot = $('#cursorDot');
    const cursorOutline = $('#cursorOutline');
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

    if (cursorDot && cursorOutline && !isMobile()) {
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        (function animateCursor() {
            outlineX = lerp(outlineX, mouseX, 0.15);
            outlineY = lerp(outlineY, mouseY, 0.15);
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateCursor);
        })();

        // Hover targets
        const hoverTargets = 'a, button, .btn-primary, .btn-ghost, .nav-link, .nav-link-cta, .theme-btn, .schedule-card, .bento-card, .pricing-card, .testimonial-card, .faq-item, .sidebar-item, .menu-item, .mockup-card, .social-links a, .preview-btn, input, textarea, select';
        document.addEventListener('mouseover', e => {
            if (e.target.closest(hoverTargets)) document.body.classList.add('cursor-hover');
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(hoverTargets)) document.body.classList.remove('cursor-hover');
        });
    }

    /* ═══════════════════════════════════
       2. SCROLL PROGRESS BAR
       ═══════════════════════════════════ */
    const scrollProgress = $('#scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
        }, { passive: true });
    }

    /* ═══════════════════════════════════
       3. NAVBAR
       ═══════════════════════════════════ */
    const navbar = $('#navbar');
    const navMenu = $('#navMenu');
    const navToggle = $('#navToggle');

    // Scroll effect
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // Mobile toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            }
        });

        // Close on link click
        $$('.nav-link, .nav-link-cta', navMenu).forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            });
        });
    }

    // Smooth scroll for anchor links
    $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = $(id);
            if (target) {
                e.preventDefault();
                const offset = navbar ? navbar.offsetHeight + 16 : 80;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    /* ═══════════════════════════════════
       4. MAGNETIC BUTTONS
       ═══════════════════════════════════ */
    if (!isMobile()) {
        $$('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });

        // Button ripple effect (set CSS custom properties for radial gradient)
        $$('.btn-primary').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                btn.style.setProperty('--ripple-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
                btn.style.setProperty('--ripple-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
            });
        });
    }

    /* ═══════════════════════════════════
       4b. MOUSE FOLLOW GRADIENT ON CARDS
       ═══════════════════════════════════ */
    if (!isMobile()) {
        $$('.bento-card, .pricing-card, .testimonial-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
            });
        });
    }

    /* ═══════════════════════════════════
       5. 3D TILT CARDS
       ═══════════════════════════════════ */
    if (!isMobile()) {
        $$('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const rotateX = (0.5 - y) * 12;
                const rotateY = (x - 0.5) * 12;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
                setTimeout(() => { card.style.transition = ''; }, 600);
            });
        });
    }

    /* ═══════════════════════════════════
       5b. TEXT SCRAMBLE EFFECT
       ═══════════════════════════════════ */
    function scrambleText(el) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        const original = el.textContent;
        let iteration = 0;
        const interval = setInterval(() => {
            el.textContent = original.split('').map((char, i) => {
                if (char === ' ') return ' ';
                if (i < iteration) return original[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            iteration += 1 / 2;
            if (iteration >= original.length) {
                el.textContent = original;
                clearInterval(interval);
            }
        }, 30);
    }

    // Run scramble on section titles when they scroll into view
    if (typeof IntersectionObserver !== 'undefined') {
        const scrambleObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrambleText(entry.target);
                    scrambleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        $$('.section-title').forEach(el => scrambleObserver.observe(el));
    }

    /* ═══════════════════════════════════
       6. REVEAL ANIMATIONS (ScrollTrigger)
       ═══════════════════════════════════ */
    function showAllFallback() {
        $$('.reveal-text, .reveal-up, [data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    function initGSAP() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            showAllFallback();
            return;
        }
        gsap.registerPlugin(ScrollTrigger);

        // Hero text reveal — dramatic stagger with spring
        gsap.utils.toArray('.reveal-line > span').forEach((span, i) => {
            gsap.fromTo(span,
                { y: 100, opacity: 0, rotationX: -40, transformOrigin: 'center bottom' },
                { y: 0, opacity: 1, rotationX: 0, duration: 1.2, delay: 0.18 * i + 0.3, ease: 'power4.out' }
            );
        });

        // Hero reveal-text & reveal-up with stagger spring
        gsap.utils.toArray('.hero .reveal-text, .hero .reveal-up').forEach((el, i) => {
            gsap.to(el, {
                y: 0, opacity: 1, duration: 0.9, delay: 0.6 + i * 0.12, ease: 'back.out(1.4)'
            });
        });

        // Hero eyebrow pill — special bounce in
        const eyebrow = $('.eyebrow-pill');
        if (eyebrow) {
            gsap.fromTo(eyebrow,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, delay: 0.2, ease: 'back.out(2)' }
            );
        }

        // Hero dashboard mockup — dramatic scale + fade
        const dashMockup = $('.dashboard-mockup');
        if (dashMockup) {
            gsap.fromTo(dashMockup,
                { y: 80, opacity: 0, scale: 0.85 },
                { y: 0, opacity: 1, scale: 1, duration: 1.4, delay: 0.8, ease: 'power3.out' }
            );
        }

        // Floating badges — pop in with spring
        gsap.utils.toArray('.floating-badge').forEach((badge, i) => {
            gsap.fromTo(badge,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.7, delay: 1.6 + i * 0.2, ease: 'back.out(2.5)' }
            );
        });

        // Non-hero reveal-text & reveal-up (ScrollTrigger) — with slight rotation
        gsap.utils.toArray('.reveal-text, .reveal-up').forEach(el => {
            if (el.closest('.hero')) return;
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
            });
        });

        // AOS-like data attributes — use fromTo so target opacity is explicit
        gsap.utils.toArray('[data-aos]').forEach(el => {
            const type = el.dataset.aos;
            const delay = parseFloat(el.dataset.aosDelay || 0) / 1000;
            let fromVars = { opacity: 0 };
            let toVars = { opacity: 1, duration: 0.8, delay, ease: 'power3.out' };

            if (type === 'fade-up') { fromVars.y = 40; toVars.y = 0; }
            else if (type === 'fade-left') { fromVars.x = 50; toVars.x = 0; }
            else if (type === 'fade-right') { fromVars.x = -50; toVars.x = 0; }
            else if (type === 'zoom-in') { fromVars.scale = 0.92; toVars.scale = 1; }

            gsap.fromTo(el, fromVars, {
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                ...toVars
            });
        });

        // Counter animation — slot machine style with easing
        $$('.metric-value[data-target]').forEach(el => {
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            gsap.to({ val: 0 }, {
                val: target,
                duration: 2.5,
                delay: 1.2,
                ease: 'power2.out',
                onUpdate: function () {
                    el.textContent = Math.round(this.targets()[0].val) + suffix;
                }
            });
        });

        // Bento cards — individual reveal with alternating directions
        gsap.utils.toArray('.bento-card').forEach((card, i) => {
            const isLeft = i % 3 === 0;
            const isRight = i % 3 === 1;
            gsap.fromTo(card,
                {
                    y: 50,
                    x: isLeft ? -30 : isRight ? 30 : 0,
                    opacity: 0,
                    scale: 0.95
                },
                {
                    y: 0,
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: i * 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Pricing cards — dramatic entrance
        ScrollTrigger.batch('.pricing-card', {
            start: 'top 85%',
            onEnter: batch => {
                gsap.fromTo(batch,
                    { y: 60, opacity: 0, scale: 0.9, rotationY: -8 },
                    { y: 0, opacity: 1, scale: 1, rotationY: 0, stagger: 0.15, duration: 1, ease: 'power3.out' }
                );
            },
            once: true
        });

        // Testimonial cards — slide up with spring
        ScrollTrigger.batch('.testimonial-card', {
            start: 'top 88%',
            onEnter: batch => {
                gsap.fromTo(batch,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'back.out(1.3)' }
                );
            },
            once: true
        });

        // Section tags — pop in
        gsap.utils.toArray('.section-tag').forEach(tag => {
            gsap.fromTo(tag,
                { scale: 0.7, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)',
                    scrollTrigger: { trigger: tag, start: 'top 88%', toggleActions: 'play none none none' }
                }
            );
        });

        // Phone frame entrance
        const phoneFrame = $('.phone-frame');
        if (phoneFrame) {
            gsap.fromTo(phoneFrame,
                { y: 80, opacity: 0, rotationY: 15 },
                {
                    y: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: phoneFrame, start: 'top 80%', toggleActions: 'play none none none' }
                }
            );
        }

        // Impact boxes — counter + scale
        ScrollTrigger.batch('.impact-box', {
            start: 'top 85%',
            onEnter: batch => {
                gsap.fromTo(batch,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.5)' }
                );
            },
            once: true
        });

        // Parallax orbs — enhanced
        gsap.utils.toArray('.orb').forEach((orb, i) => {
            gsap.to(orb, {
                y: (i % 2 === 0 ? -100 : 100),
                rotate: (i % 2 === 0 ? 30 : -30),
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 2
                }
            });
        });

        // Section parallax offset (slower background feel)
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.fromTo(header,
                { y: 30 },
                {
                    y: -20,
                    scrollTrigger: {
                        trigger: header,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5
                    }
                }
            );
        });

        // CTA section — dramatic entrance
        const ctaSection = $('.cta-section');
        if (ctaSection) {
            gsap.fromTo(ctaSection.querySelectorAll('.section-title, .section-subtitle, .btn-primary, .btn-ghost'),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: ctaSection, start: 'top 80%', toggleActions: 'play none none none' }
                }
            );
        }

        // WL features — stagger entries
        ScrollTrigger.batch('.wl-feature', {
            start: 'top 88%',
            onEnter: batch => {
                gsap.fromTo(batch,
                    { x: -30, opacity: 0 },
                    { x: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
                );
            },
            once: true
        });

        // Contact form inputs — slide in from right
        ScrollTrigger.batch('.contact-form input, .contact-form textarea, .contact-form select', {
            start: 'top 90%',
            onEnter: batch => {
                gsap.fromTo(batch,
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' }
                );
            },
            once: true
        });

        // Footer links — stagger fade in
        ScrollTrigger.batch('.footer-column', {
            start: 'top 92%',
            onEnter: batch => {
                gsap.fromTo(batch,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out' }
                );
            },
            once: true
        });
    }

    // Wait for GSAP to load
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initGSAP();
    } else {
        window.addEventListener('load', () => {
            initGSAP();
            // Safety: if GSAP still hasn't loaded after 2s, show everything anyway
            setTimeout(showAllFallback, 2000);
        });
    }

    /* ═══════════════════════════════════
       7. KANBAN — Interactive Calendar
       ═══════════════════════════════════ */
    const modal = $('#appointmentModal');
    const closeModal = $('#closeModal');
    const cancelModal = $('#cancelModal');
    const confirmBtn = $('#confirmAppointment');
    let selectedSlot = null;

    // Click on empty slot
    $$('.slot-row').forEach(slot => {
        slot.addEventListener('click', () => {
            const time = slot.dataset.time;
            const col = slot.closest('.attendant-column');
            const attendant = col ? col.dataset.attendant : '1';

            // Pre-fill modal
            const timeSelect = $('#selectTime');
            const attSelect = $('#selectAttendant');
            if (timeSelect) timeSelect.value = time;
            if (attSelect) attSelect.value = attendant;

            selectedSlot = { time, attendant, column: col };
            if (modal) modal.classList.add('active');
        });
    });

    // Close modal
    [closeModal, cancelModal].forEach(btn => {
        if (btn) btn.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
            selectedSlot = null;
        });
    });

    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) { modal.classList.remove('active'); selectedSlot = null; }
        });
    }

    // Confirm appointment
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const name = $('#clientName')?.value?.trim() || 'Novo Cliente';
            const attendant = $('#selectAttendant')?.value || '1';
            const time = $('#selectTime')?.value || '08:00';
            const service = $('#selectService')?.value || 'Consulta';
            const column = $(`.attendant-column[data-attendant="${attendant}"]`);

            if (!column) return;
            const cardsLayer = $('.cards-layer', column);
            if (!cardsLayer) return;

            const timeSlots = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
            const topIndex = timeSlots.indexOf(time);
            if (topIndex === -1) return;

            // Collision detection
            const existingCards = $$('.schedule-card, .schedule-block', cardsLayer);
            for (const card of existingCards) {
                const cardTop = parseInt(getComputedStyle(card).getPropertyValue('--top'));
                const cardDuration = parseInt(getComputedStyle(card).getPropertyValue('--duration'));
                if (topIndex >= cardTop && topIndex < cardTop + cardDuration) {
                    alert('Horário já ocupado! Escolha outro slot.');
                    return;
                }
            }

            const nextHour = timeSlots[topIndex + 1] || '19:00';
            const colors = ['#6C5CE7','#00CEFF','#FF6B6B','#A855F7','#FFB86C'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const id = Date.now();

            const card = document.createElement('div');
            card.className = 'schedule-card';
            card.draggable = true;
            card.dataset.id = id;
            card.style.cssText = `--top: ${topIndex}; --duration: 1; --color: ${color};`;
            card.innerHTML = `
                <div class="card-drag-handle"><i class="fas fa-grip-vertical"></i></div>
                <div class="card-content">
                    <div class="card-time">${time} - ${nextHour}</div>
                    <div class="card-client">${name}</div>
                    <div class="card-service">${service}</div>
                    <div class="card-status confirmed"><i class="fas fa-check-circle"></i> Confirmado</div>
                </div>`;

            // Animate in
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            cardsLayer.appendChild(card);
            requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.4s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });

            initDragForCard(card);
            if (modal) modal.classList.remove('active');
            if ($('#clientName')) $('#clientName').value = '';
            selectedSlot = null;
        });
    }

    // Drag & Drop
    function initDragForCard(card) {
        card.addEventListener('dragstart', e => {
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', card.dataset.id);
            e.dataTransfer.effectAllowed = 'move';
        });
        card.addEventListener('dragend', () => card.classList.remove('dragging'));
    }

    $$('.schedule-card').forEach(initDragForCard);

    $$('.slot-row').forEach(slot => {
        slot.addEventListener('dragover', e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            slot.classList.add('drag-over');
        });
        slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
        slot.addEventListener('drop', e => {
            e.preventDefault();
            slot.classList.remove('drag-over');
            const cardId = e.dataTransfer.getData('text/plain');
            const card = $(`.schedule-card[data-id="${cardId}"]`);
            if (!card) return;

            const column = slot.closest('.attendant-column');
            const cardsLayer = column ? $('.cards-layer', column) : null;
            if (!cardsLayer) return;

            const timeSlots = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
            const newTop = timeSlots.indexOf(slot.dataset.time);
            if (newTop === -1) return;

            const duration = parseInt(getComputedStyle(card).getPropertyValue('--duration'));

            // Collision check
            const siblings = $$('.schedule-card, .schedule-block', cardsLayer);
            for (const sib of siblings) {
                if (sib === card) continue;
                const sibTop = parseInt(getComputedStyle(sib).getPropertyValue('--top'));
                const sibDur = parseInt(getComputedStyle(sib).getPropertyValue('--duration'));
                if (newTop < sibTop + sibDur && newTop + duration > sibTop) {
                    slot.classList.add('invalid');
                    setTimeout(() => slot.classList.remove('invalid'), 500);
                    return;
                }
            }

            cardsLayer.appendChild(card);
            card.style.setProperty('--top', newTop);

            const nextTime = timeSlots[newTop + duration] || '19:00';
            const timeLabel = slot.dataset.time + ' - ' + nextTime;
            const ct = $('.card-time', card);
            if (ct) ct.textContent = timeLabel;
        });
    });

    /* ═══════════════════════════════════
       8. WHITELABEL THEME SELECTOR
       ═══════════════════════════════════ */
    const themes = {
        violet: { primary: '#6C5CE7', dark: '#5A4BD1' },
        cyan: { primary: '#00CEFF', dark: '#0095D9' },
        purple: { primary: '#A855F7', dark: '#7C3AED' },
        coral: { primary: '#FF6B6B', dark: '#FF4757' }
    };

    $$('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const theme = themes[btn.dataset.theme];
            if (!theme) return;

            const preview = $('.customization-preview');
            if (!preview) return;

            // Update colors
            $$('.menu-item.active', preview).forEach(item => {
                item.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.dark})`;
            });
            $$('.preview-card i', preview).forEach(icon => icon.style.color = theme.primary);
            $$('.preview-logo i', preview).forEach(icon => icon.style.color = theme.primary);

            // Animate
            preview.style.transition = 'box-shadow 0.6s';
            preview.style.boxShadow = `0 30px 80px rgba(0,0,0,0.5), 0 0 80px ${theme.primary}22`;
            setTimeout(() => { preview.style.boxShadow = ''; }, 800);
        });
    });

    /* ═══════════════════════════════════
       9. DYNAMIC WHATSAPP CHAT
       ═══════════════════════════════════ */
    const chatContainer = $('#dynamicChatMessages');
    const chatInput = $('#dynamicChatInput');
    const sendBtn = $('#dynamicSendBtn');
    let chatStarted = false;

    function startDynamicChat() {
        if (chatStarted || !chatContainer) return;
        chatStarted = true;

        const items = $$('.wa-message, .typing-indicator, .agent-switch', chatContainer);

        // Pre-compute: link each client-typing indicator to its following sent message
        const typingToSentMap = new Map();
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains('typing-indicator') && items[i].classList.contains('client-typing')) {
                // Find the next sent message after this typing indicator
                for (let j = i + 1; j < items.length; j++) {
                    if (items[j].classList.contains('wa-message') && items[j].classList.contains('sent')) {
                        typingToSentMap.set(items[i], items[j]);
                        break;
                    }
                }
            }
        }

        // Track sent messages that will be handled by their typing indicator
        const sentHandledByTyping = new Set(typingToSentMap.values());

        items.forEach(item => {
            const delay = parseInt(item.dataset.delay || 0);
            const dur = parseInt(item.dataset.duration || 0);
            const isTyping = item.classList.contains('typing-indicator');
            const isClientTyping = isTyping && item.classList.contains('client-typing');

            // Skip sent messages that are linked to a typing indicator — they'll be shown by the typing handler
            if (sentHandledByTyping.has(item)) return;

            setTimeout(() => {
                item.style.removeProperty('opacity');
                item.style.removeProperty('visibility');
                item.style.removeProperty('transform');
                item.style.removeProperty('display');
                item.classList.add('show');
                requestAnimationFrame(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                });

                if (isClientTyping) {
                    // Start typing in the input field while the typing indicator is visible
                    const linkedSent = typingToSentMap.get(item);
                    if (linkedSent && chatInput) {
                        const text = linkedSent.querySelector('p')?.textContent || '';
                        chatInput.value = '';
                        let charIdx = 0;
                        const charSpeed = Math.max(20, Math.min(50, (dur - 200) / text.length));
                        const typingInterval = setInterval(() => {
                            if (charIdx < text.length) {
                                chatInput.value += text[charIdx++];
                            } else {
                                clearInterval(typingInterval);
                                // Send button click animation
                                if (sendBtn) {
                                    sendBtn.classList.add('sending');
                                    setTimeout(() => sendBtn.classList.remove('sending'), 250);
                                }
                                // Hide typing indicator, show the sent message, clear input
                                setTimeout(() => {
                                    item.classList.remove('show');
                                    item.classList.add('hide');
                                    setTimeout(() => { item.style.display = 'none'; }, 200);

                                    chatInput.value = '';
                                    linkedSent.style.removeProperty('opacity');
                                    linkedSent.style.removeProperty('visibility');
                                    linkedSent.style.removeProperty('transform');
                                    linkedSent.style.removeProperty('display');
                                    linkedSent.classList.add('show');
                                    requestAnimationFrame(() => {
                                        linkedSent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    });
                                }, 150);
                            }
                        }, charSpeed);
                    }
                } else if (isTyping && dur > 0) {
                    // Regular typing indicator (from the bot)
                    setTimeout(() => {
                        item.classList.remove('show');
                        item.classList.add('hide');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 200);
                    }, dur);
                }
            }, delay);
        });
    }

    // Observe when WhatsApp section is in view
    if (chatContainer && typeof IntersectionObserver !== 'undefined') {
        const chatObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                startDynamicChat();
                chatObserver.disconnect();
            }
        }, { threshold: 0.3 });
        chatObserver.observe(chatContainer);
    }

    /* ═══════════════════════════════════
       10. CONTACT FORM (Web3Forms)
       ═══════════════════════════════════ */
    const contactForm = $('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const btnSpan = btn?.querySelector('span');
            const originalText = btnSpan?.textContent || 'Enviar';

            // Basic validation
            const required = $$('input[required], textarea[required]', contactForm);
            let valid = true;
            required.forEach(field => {
                field.classList.remove('input-error');
                if (!field.value.trim()) {
                    field.classList.add('input-error');
                    valid = false;
                }
            });
            if (!valid) return;

            if (btn) btn.disabled = true;
            if (btnSpan) btnSpan.textContent = 'Enviando...';

            try {
                const formData = new FormData(contactForm);
                formData.append('access_key', '26babe76-46ed-4886-a890-8608325e78c6');
                formData.append('subject', 'Nova solicitação de demonstração - Unexly');
                formData.append('from_name', 'Unexly Website');

                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();

                if (data.success) {
                    if (btnSpan) btnSpan.textContent = 'Enviado com Sucesso! ✓';
                    if (btn) btn.style.background = 'linear-gradient(135deg, #27c93f, #1ea832)';
                    contactForm.reset();
                    setTimeout(() => {
                        if (btnSpan) btnSpan.textContent = originalText;
                        if (btn) { btn.style.background = ''; btn.disabled = false; }
                    }, 3000);
                } else {
                    throw new Error('Submit failed');
                }
            } catch (err) {
                if (btnSpan) btnSpan.textContent = 'Erro. Tente novamente.';
                if (btn) btn.style.background = 'linear-gradient(135deg, #FF6B6B, #FF4757)';
                setTimeout(() => {
                    if (btnSpan) btnSpan.textContent = originalText;
                    if (btn) { btn.style.background = ''; btn.disabled = false; }
                }, 3000);
            }
        });
    }

    /* ═══════════════════════════════════
       11. PARTICLES BACKGROUND (Enhanced)
       ═══════════════════════════════════ */
    function createParticles() {
        const hero = $('#hero');
        if (!hero || isMobile()) return;

        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;';
        hero.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w, h;
        let heroMouseX = w / 2, heroMouseY = h / 2;

        function resize() {
            w = canvas.width = hero.offsetWidth;
            h = canvas.height = hero.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Track mouse position inside hero
        hero.addEventListener('mousemove', e => {
            const rect = hero.getBoundingClientRect();
            heroMouseX = e.clientX - rect.left;
            heroMouseY = e.clientY - rect.top;
        });

        const colors = [
            'rgba(108,92,231,',
            'rgba(0,206,255,',
            'rgba(168,85,247,',
        ];

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 2 + 0.5;
                this.alpha = Math.random() * 0.35 + 0.05;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                // Mouse repulsion
                const dx = this.x - heroMouseX;
                const dy = this.y - heroMouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150 * 0.8;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }

                this.vx *= 0.98;
                this.vy *= 0.98;
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 130) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(108,92,231,${0.08 * (1 - d / 130)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        // Draw mouse connection lines
        function drawMouseLines() {
            particles.forEach(p => {
                const dx = p.x - heroMouseX;
                const dy = p.y - heroMouseY;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(heroMouseX, heroMouseY);
                    ctx.strokeStyle = `rgba(0,206,255,${0.12 * (1 - d / 200)})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            });
        }

        (function animate() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
            drawMouseLines();
            requestAnimationFrame(animate);
        })();
    }
    createParticles();

    /* ═══════════════════════════════════
       12. PHONE NUMBER MASK
       ═══════════════════════════════════ */
    const phoneInput = $('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', e => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 11) val = val.slice(0, 11);
            if (val.length > 6) val = `(${val.slice(0,2)}) ${val.slice(2,7)}-${val.slice(7)}`;
            else if (val.length > 2) val = `(${val.slice(0,2)}) ${val.slice(2)}`;
            else if (val.length > 0) val = `(${val}`;
            e.target.value = val;
        });
    }

    /* ═══════════════════════════════════
       13. KONAMI CODE EASTER EGG
       ═══════════════════════════════════ */
    const konamiCode = [38,38,40,40,37,39,37,39,66,65];
    let konamiPosition = 0;
    document.addEventListener('keydown', e => {
        if (e.keyCode === konamiCode[konamiPosition]) {
            konamiPosition++;
            if (konamiPosition === konamiCode.length) {
                konamiPosition = 0;
                activateEasterEgg();
            }
        } else {
            konamiPosition = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.transition = 'filter 0.5s';
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'hue-rotate(360deg)';
            setTimeout(() => { document.body.style.filter = ''; }, 500);
        }, 2000);

        // Confetti-like particles
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            const colors = ['#6C5CE7', '#00CEFF', '#FF6B6B', '#A855F7', '#FFB86C'];
            confetti.style.cssText = `
                position:fixed;
                top:-10px; left:${Math.random()*100}vw;
                width:8px; height:8px;
                background:${colors[Math.floor(Math.random()*colors.length)]};
                border-radius:${Math.random()>0.5?'50%':'2px'};
                z-index:99999;
                pointer-events:none;
                animation: confettiFall ${2+Math.random()*2}s ease-out forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }

        // Add confetti keyframes if not exists
        if (!$('#confettiStyle')) {
            const style = document.createElement('style');
            style.id = 'confettiStyle';
            style.textContent = `@keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg); opacity: 0; }
            }`;
            document.head.appendChild(style);
        }
    }

    /* ═══════════════════════════════════
       14. KEYBOARD SHORTCUTS
       ═══════════════════════════════════ */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            modal.classList.remove('active');
            selectedSlot = null;
        }
    });

    /* ═══════════════════════════════════
       14b. HERO TYPING EFFECT
       ═══════════════════════════════════ */
    function heroTypingEffect() {
        const subtitleEl = $('.hero-subtitle');
        if (!subtitleEl) return;
        const fullText = subtitleEl.textContent;
        subtitleEl.textContent = '';
        subtitleEl.style.opacity = '1';
        subtitleEl.style.borderRight = '2px solid rgba(108,92,231,0.6)';

        let i = 0;
        const speed = 25;
        function typeChar() {
            if (i < fullText.length) {
                subtitleEl.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                // Blink cursor then remove
                let blinks = 0;
                const blink = setInterval(() => {
                    subtitleEl.style.borderRight = blinks % 2 === 0
                        ? '2px solid transparent'
                        : '2px solid rgba(108,92,231,0.6)';
                    blinks++;
                    if (blinks > 6) {
                        clearInterval(blink);
                        subtitleEl.style.borderRight = 'none';
                    }
                }, 400);
            }
        }
        setTimeout(typeChar, 1200);
    }
    heroTypingEffect();

    /* ═══════════════════════════════════
       14c. SMOOTH REVEAL NAVBAR LINKS
       ═══════════════════════════════════ */
    $$('.nav-link').forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-10px)';
        link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + i * 80);
    });

    /* ═══════════════════════════════════
       14d. SCROLL-VELOCITY SKEW
       ═══════════════════════════════════ */
    if (!isMobile()) {
        let lastScrollTop = 0;
        let scrollVelocity = 0;
        const skewTargets = $$('.bento-card, .pricing-card, .testimonial-card');
        
        window.addEventListener('scroll', () => {
            const st = window.scrollY;
            scrollVelocity = clamp(st - lastScrollTop, -15, 15);
            lastScrollTop = st;
        }, { passive: true });

        (function updateSkew() {
            scrollVelocity *= 0.9;
            skewTargets.forEach(el => {
                el.style.transform = el.matches(':hover') ? '' : `skewY(${scrollVelocity * 0.06}deg)`;
            });
            requestAnimationFrame(updateSkew);
        })();
    }

    /* ═══════════════════════════════════
       15. LOADING & INIT
       ═══════════════════════════════════ */
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';

        // Inject card-shine overlay elements for mouse-follow glow
        $$('.bento-card, .pricing-card, .testimonial-card').forEach(card => {
            const shine = document.createElement('div');
            shine.className = 'card-shine';
            card.appendChild(shine);
        });

        // Inject bento-shimmer sweep elements
        $$('.bento-card').forEach(card => {
            const shimmer = document.createElement('div');
            shimmer.className = 'bento-shimmer';
            card.appendChild(shimmer);
        });

        // Re-trigger GSAP if needed
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });

})();
