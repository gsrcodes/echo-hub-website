// ===================================
// Wait for DOM to be ready
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Phone Showcase Animation - Starts big, shrinks down
    // ===================================
    function initPhoneAnimation() {
        const phoneShowcase = document.querySelector('.hero-phone-showcase');
        const phoneMockup = document.querySelector('.phone-mockup');
        
        if (phoneShowcase && phoneMockup) {
            // Start with phone scaled up
            phoneMockup.style.transform = 'scale(1.3)';
            phoneMockup.style.opacity = '0';
            
            // Animate to normal size
            setTimeout(() => {
                phoneMockup.style.transition = 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s ease-out';
                phoneMockup.style.transform = 'scale(1)';
                phoneMockup.style.opacity = '1';
            }, 300);
        }
    }
    
    // Run phone animation on load
    initPhoneAnimation();
    
    // ===================================
    // Chat Animation - Typing before messages
    // ===================================
    function initChatAnimation() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const elements = chatMessages.querySelectorAll('[data-delay]');
        
        elements.forEach(element => {
            const delay = parseInt(element.getAttribute('data-delay'));
            const duration = parseInt(element.getAttribute('data-duration')) || 0;
            
            setTimeout(() => {
                element.classList.add('show');
                
                // Se for typing-indicator, esconde após a duração
                if (element.classList.contains('typing-indicator') && duration > 0 && duration < 99999) {
                    setTimeout(() => {
                        element.classList.add('hide');
                        element.classList.remove('show');
                    }, duration);
                }
            }, delay);
        });
    }
    
    // Iniciar animação do chat quando a seção hero estiver visível
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initChatAnimation();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(heroSection);
    }
    
    // ===================================
    // Initialize AOS (Animate On Scroll)
    // ===================================
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100
    });

    // ===================================
    // Initialize Particles.js
    // ===================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // ===================================
    // Initialize Typed.js for Hero Subtitle
    // ===================================
    if (typeof Typed !== 'undefined') {
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            new Typed('#typed-text', {
                strings: [
                    'Transforme o atendimento da sua PME com IA avançada e toque humano',
                    'Atendimento 24/7 com chatbots inteligentes',
                    'Integração perfeita com WhatsApp e múltiplos canais',
                    'Aumente vendas e satisfação dos clientes'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                startDelay: 500,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    // ===================================
    // Animated Counter for Stats
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Intersection Observer for stat counters
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Scroll to Top Button
    // ===================================
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // Form Validation & Submission - Web3Forms
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    console.log('Contact form found:', contactForm ? 'YES' : 'NO');

    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        console.log('Submit button found:', submitButton ? 'YES' : 'NO');
        
        // Remove error state when user starts typing
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('input-error');
            });
        });
        
        // Validation function
        function validateForm() {
            const fields = [
                { id: 'name', label: 'Nome Completo', minLength: 3 },
                { id: 'email', label: 'Email', type: 'email' },
                { id: 'company', label: 'Empresa', minLength: 2 },
                { id: 'phone', label: 'Telefone', minLength: 8 },
                { id: 'message', label: 'Mensagem', minLength: 10 }
            ];
            
            const errors = [];
            
            fields.forEach(field => {
                const input = document.getElementById(field.id);
                const value = input ? input.value.trim() : '';
                
                // Remove previous error state
                if (input) {
                    input.classList.remove('input-error');
                }
                
                // Check if empty
                if (!value) {
                    errors.push(`O campo "${field.label}" é obrigatório.`);
                    if (input) input.classList.add('input-error');
                    return;
                }
                
                // Check minimum length
                if (field.minLength && value.length < field.minLength) {
                    errors.push(`O campo "${field.label}" deve ter pelo menos ${field.minLength} caracteres.`);
                    if (input) input.classList.add('input-error');
                    return;
                }
                
                // Check email format
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errors.push('Por favor, insira um email válido.');
                        if (input) input.classList.add('input-error');
                    }
                }
            });
            
            return errors;
        }
        
        // Use click on button instead of form submit to bypass browser validation
        submitButton.addEventListener('click', async function(e) {
            e.preventDefault();
            console.log('Form submission started!');
            
            // Validate form
            const errors = validateForm();
            console.log('Validation errors:', errors);
            
            if (errors.length > 0) {
                showNotification(errors[0], 'error');
                return;
            }
            
            const submitBtn = submitButton;
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Build JSON object for Web3Forms
            const formObject = {
                access_key: '26babe76-46ed-4886-a890-8608325e78c6',
                subject: 'Nova solicitação de demonstração - EchoHub',
                from_name: 'EchoHub Website',
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formObject)
                });
                
                const result = await response.json();
                
                console.log('Web3Forms response:', result);
                
                if (result.success) {
                    showNotification('Email enviado com sucesso! Entraremos em contato em breve.', 'success');
                    contactForm.reset();
                    // Remove error states
                    contactForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
                } else {
                    showNotification('Erro ao enviar: ' + (result.message || 'Tente novamente.'), 'error');
                    console.error('Form error:', result);
                }
            } catch (error) {
                showNotification('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
                console.error('Network error:', error);
            } finally {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Define colors based on type
        const colors = {
            success: '#25d366',
            error: '#ef4444',
            info: '#3b82f6'
        };
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icons[type] || icons.info}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
        `;
        document.head.appendChild(style);

        // Add to DOM
        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // ===================================
    // Add Parallax Effect to Hero Section
    // ===================================
    const hero = document.querySelector('.hero');
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (hero && phoneMockup) {
        // Disable scroll parallax effect to keep phone crisp and readable
        // Phone stays static while scrolling
    }

    // ===================================
    // Card Hover 3D Effect
    // ===================================
    const cards = document.querySelectorAll('.benefit-card, .feature-card, .use-case-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 1024) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // Lazy Loading Images (if any)
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ===================================
    // Intersection Observer for Section Animations
    // ===================================
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===================================
    // Active Navigation Link Highlighting
    // ===================================
    const navLinksForHighlight = document.querySelectorAll('.nav-link');
    const sectionsForNav = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPos = window.pageYOffset + 100;

        sectionsForNav.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksForHighlight.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ===================================
    // Add Loading State to Buttons
    // ===================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add loading state for form submit buttons
            if (this.type === 'submit') {
                const originalText = this.innerHTML;
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
                
                // Reset after form validation/submission
                setTimeout(() => {
                    this.disabled = false;
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });

    // ===================================
    // Performance: Debounce Scroll Events
    // ===================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    const debouncedScroll = debounce(highlightNavLink, 10);
    window.addEventListener('scroll', debouncedScroll);

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🚀 EchoHub Website', 'font-size: 20px; font-weight: bold; color: #1e3a8a;');
    console.log('%cTransforme seu atendimento com IA!', 'font-size: 14px; color: #10b981;');

    // ===================================
    // Easter Egg: Konami Code
    // ===================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showNotification('🎉 Você descobriu o código secreto! Bem-vindo ao EchoHub!', 'success');
                konamiIndex = 0;
                // Add some fun animation
                document.body.style.animation = 'rainbow 2s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ===================================
    // Accessibility: Skip to Content
    // ===================================
    const skipLink = document.createElement('a');
    skipLink.href = '#overview';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #1e3a8a;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // ===================================
    // Initialize Everything
    // ===================================
    console.log('✅ EchoHub website initialized successfully!');
});

// ===================================
// Service Worker Registration (for PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
