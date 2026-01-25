// ===================================
// Wait for DOM to be ready
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // SPLASH SCREEN - Experiência Imersiva
    // ===================================
    function initSplashScreen() {
        const splashScreen = document.getElementById('splashScreen');
        const splashCta = document.getElementById('splashCta');
        const splashText = document.getElementById('splashText');
        const splashChatMessages = document.getElementById('splashChatMessages');
        const splashChatInput = document.getElementById('splashChatInput');
        const splashSendBtn = document.getElementById('splashSendBtn');
        const body = document.body;
        
        if (!splashScreen || !splashCta) return;
        
        // Auto-scroll chat only when element is below visible area
        function scrollChatIfNeeded(container, element) {
            if (!container || !element) return;
            
            // Wait for element to be rendered
            requestAnimationFrame(() => {
                const containerRect = container.getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();
                
                // Check if element bottom is below container bottom (not visible)
                const elementBelowView = elementRect.bottom > containerRect.bottom;
                
                if (elementBelowView) {
                    container.scrollTo({
                        top: container.scrollTop + (elementRect.bottom - containerRect.bottom) + 10,
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        // Animate splash chat messages
        function animateSplashChat() {
            if (!splashChatMessages) return;
            
            const elements = splashChatMessages.querySelectorAll('[data-delay]');
            let maxDelay = 0;
            
            elements.forEach(element => {
                const delay = parseInt(element.getAttribute('data-delay'));
                const duration = parseInt(element.getAttribute('data-duration')) || 0;
                
                if (delay > maxDelay) maxDelay = delay;
                
                setTimeout(() => {
                    element.classList.add('show');
                    
                    // Auto-scroll only if this element is below visible area
                    scrollChatIfNeeded(splashChatMessages, element);
                    
                    // Hide typing indicator after duration
                    if (element.classList.contains('typing-indicator') && duration > 0 && duration < 99999) {
                        setTimeout(() => {
                            element.classList.add('hide');
                            element.classList.remove('show');
                        }, duration);
                    }
                }, delay);
            });
            
            // Show text and CTA after chat animation
            setTimeout(() => {
                if (splashText) {
                    splashText.classList.add('visible');
                }
            }, maxDelay + 800);
            
            setTimeout(() => {
                splashCta.classList.add('visible');
            }, maxDelay + 1200);
            
            // Animate user typing in input field after all messages
            setTimeout(() => {
                animateInputTyping(splashChatInput, "Quero saber mais! 😊");
            }, maxDelay + 400);
        }
        
        // Animate typing in input field with send animation
        function animateInputTyping(input, text) {
            if (!input) return;
            
            let index = 0;
            input.value = '';
            input.classList.add('typing-active');
            
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    input.value += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                    // Animate send button after typing
                    setTimeout(() => {
                        if (splashSendBtn) {
                            splashSendBtn.classList.add('sending');
                            setTimeout(() => {
                                splashSendBtn.classList.remove('sending');
                            }, 300);
                        }
                    }, 500);
                }
            }, 80);
        }
        
        // Start splash animation
        animateSplashChat();
        
        // Initialize WhatsApp interactive buttons
        initWhatsAppInteractions();
        
        // Handle CTA click - Reveal main content
        splashCta.addEventListener('click', function() {
            // Add exit animations
            splashScreen.classList.add('hidden');
            splashScreen.classList.add('fade-out');
            
            // Reveal main content
            setTimeout(() => {
                body.classList.remove('splash-active');
                body.classList.add('content-revealed');
                
                // Initialize AOS after content is revealed
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
                
                // Show hero chat messages instantly (already loaded from splash)
                showHeroChatInstantly();
                
                // Scroll to top
                window.scrollTo(0, 0);
            }, 600);
            
            // Remove splash from DOM after animation
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 1800);
        });
        
        // Add keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (splashCta.classList.contains('visible')) {
                    splashCta.click();
                }
            }
        });
    }
    
    // ===================================
    // WhatsApp Interactive Buttons
    // ===================================
    function initWhatsAppInteractions() {
        // Get all interactive elements
        const chatInterfaces = document.querySelectorAll('.chat-interface');
        
        chatInterfaces.forEach(chatInterface => {
            // Get phone-screen parent for popups
            const phoneScreen = chatInterface.closest('.phone-screen');
            const callPopup = phoneScreen ? phoneScreen.querySelector('.call-popup') : null;
            const emojiPopup = phoneScreen ? phoneScreen.querySelector('.emoji-popup') : null;
            const attachPopup = phoneScreen ? phoneScreen.querySelector('.attach-popup') : null;
            const menuPopup = chatInterface.querySelector('.header-menu-popup');
            const chatInput = chatInterface.querySelector('.chat-input');
            
            // Header actions
            const headerActions = chatInterface.querySelectorAll('[data-action]');
            
            headerActions.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = btn.dataset.action;
                    
                    // Check if current popup is already open
                    let currentPopupOpen = false;
                    if (action === 'emoji' && emojiPopup) currentPopupOpen = emojiPopup.classList.contains('show');
                    if (action === 'attach' && attachPopup) currentPopupOpen = attachPopup.classList.contains('show');
                    if (action === 'menu' && menuPopup) currentPopupOpen = menuPopup.classList.contains('show');
                    
                    // Close all popups first
                    closeAllPopups(chatInterface, phoneScreen);
                    
                    // If popup was open, just close it (don't reopen)
                    if (currentPopupOpen) return;
                    
                    switch(action) {
                        case 'video':
                        case 'call':
                            if (callPopup) {
                                callPopup.classList.add('show');
                                // Auto close after 3 seconds
                                setTimeout(() => {
                                    callPopup.classList.remove('show');
                                }, 3000);
                            }
                            break;
                        case 'menu':
                            if (menuPopup) {
                                menuPopup.classList.add('show');
                            }
                            break;
                        case 'emoji':
                            if (emojiPopup) {
                                emojiPopup.classList.add('show');
                            }
                            break;
                        case 'attach':
                            if (attachPopup) {
                                attachPopup.classList.add('show');
                            }
                            break;
                        case 'back':
                            // Small shake animation on back button
                            btn.style.animation = 'none';
                            btn.offsetHeight; // Trigger reflow
                            btn.style.animation = 'backShake 0.3s ease';
                            break;
                    }
                });
            });
            
            // Emoji selection
            if (emojiPopup && chatInput) {
                const emojis = emojiPopup.querySelectorAll('.emoji-grid span');
                emojis.forEach(emoji => {
                    emoji.addEventListener('click', () => {
                        chatInput.value += emoji.textContent;
                        emojiPopup.classList.remove('show');
                    });
                });
            }
            
            // Close call popup when clicking end button
            if (callPopup) {
                const endBtn = callPopup.querySelector('.call-end-btn');
                if (endBtn) {
                    endBtn.addEventListener('click', () => {
                        callPopup.classList.remove('show');
                    });
                }
            }
            
            // Close popups when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.chat-header-actions') && 
                    !e.target.closest('.header-menu-popup') &&
                    !e.target.closest('.emoji-btn') &&
                    !e.target.closest('.emoji-popup') &&
                    !e.target.closest('.attach-btn') &&
                    !e.target.closest('.attach-popup')) {
                    closeAllPopups(chatInterface, phoneScreen);
                }
            });
        });
        
        function closeAllPopups(container, phoneScreen) {
            const popups = container.querySelectorAll('.header-menu-popup');
            popups.forEach(popup => popup.classList.remove('show'));
            // Close emoji and attach popups in phone screen
            if (phoneScreen) {
                const screenPopups = phoneScreen.querySelectorAll('.emoji-popup, .attach-popup');
                screenPopups.forEach(popup => popup.classList.remove('show'));
            }
        }
    }
    
    // Initialize splash screen
    initSplashScreen();
    
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
                
                // After initial animation, let CSS animation take over
                setTimeout(() => {
                    phoneMockup.style.transition = 'none';
                }, 1200);
            }, 300);
        }
    }
    
    // Only run phone animation after splash is dismissed
    // initPhoneAnimation(); // Moved to splash CTA handler
    
    // ===================================
    // Floating Icons Parallax Effect
    // ===================================
    function initFloatingIconsParallax() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        if (floatingIcons.length > 0) {
            window.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;
                
                floatingIcons.forEach((icon, index) => {
                    const speed = (index + 1) * 10;
                    const x = mouseX * speed;
                    const y = mouseY * speed;
                    icon.style.transform = `translate(${x}px, ${y}px)`;
                });
            });
        }
    }
    
    initFloatingIconsParallax();
    
    // ===================================
    // Show Hero Chat Instantly (no animation)
    // ===================================
    function showHeroChatInstantly() {
        const chatMessages = document.getElementById('chatMessages');
        const heroChatInput = document.getElementById('heroChatInput');
        if (!chatMessages) return;
        
        const elements = chatMessages.querySelectorAll('[data-delay]');
        
        elements.forEach(element => {
            // Show all messages and agent switches
            if (element.classList.contains('message') || element.classList.contains('agent-switch')) {
                element.classList.add('show');
                element.style.animation = 'none';
            }
            // Hide all typing indicators
            if (element.classList.contains('typing-indicator')) {
                element.classList.add('hide');
                element.classList.remove('show');
            }
        });
        
        // Show input with typed text
        if (heroChatInput) {
            heroChatInput.value = "Quero saber mais! 😊";
        }
    }
    
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
// Hidden Pattern Reveal Effect (Optimized)
// ===================================
function initRevealEffect() {
    const canvas = document.getElementById('revealCanvas');
    const container = document.getElementById('revealContainer');
    const glow = document.getElementById('revealGlow');
    
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    let elements = [];
    let mouse = { x: -1000, y: -1000 };
    let isActive = false;
    
    // Set canvas size
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createElements();
    }
    
    // Create a fixed grid of elements that tiles infinitely
    function createElements() {
        elements = [];
        const spacing = 100;
        // Create extra rows for seamless scrolling
        const cols = Math.ceil(canvas.width / spacing) + 1;
        const rows = Math.ceil(canvas.height / spacing) + 3;
        
        const types = ['whatsapp', 'robot', 'chat', 'gear', 'briefcase', 'lightning'];
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (Math.random() < 0.45) continue;
                
                elements.push({
                    baseX: i * spacing + (Math.random() - 0.5) * 30,
                    baseY: j * spacing + (Math.random() - 0.5) * 30,
                    baseSize: Math.random() * 4 + 3,
                    type: types[Math.floor(Math.random() * types.length)],
                    opacity: 0,
                    rotation: Math.random() * Math.PI * 2,
                    color: Math.random() > 0.7 ? '#34e879' : '#25d366',
                    special: Math.random() > 0.95
                });
            }
        }
    }
    
    // Draw element at given screen position
    function drawElement(el, screenX, screenY) {
        const size = el.special ? el.baseSize * 1.5 : el.baseSize;
        
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(el.rotation);
        ctx.globalAlpha = el.opacity;
        ctx.strokeStyle = el.color;
        ctx.fillStyle = el.color;
        ctx.lineWidth = el.special ? 1.5 : 1;
        
        switch(el.type) {
            case 'whatsapp':
                // Simple WhatsApp icon
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-size * 0.4, 0);
                ctx.quadraticCurveTo(0, size * 0.5, size * 0.4, 0);
                ctx.stroke();
                break;
                
            case 'robot':
                // Simple robot
                ctx.strokeRect(-size * 0.5, -size * 0.4, size, size * 0.8);
                ctx.beginPath();
                ctx.arc(-size * 0.2, -size * 0.1, size * 0.12, 0, Math.PI * 2);
                ctx.arc(size * 0.2, -size * 0.1, size * 0.12, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'briefcase':
                // Simple briefcase
                ctx.strokeRect(-size * 0.6, -size * 0.25, size * 1.2, size * 0.6);
                ctx.beginPath();
                ctx.moveTo(-size * 0.2, -size * 0.25);
                ctx.lineTo(-size * 0.2, -size * 0.4);
                ctx.lineTo(size * 0.2, -size * 0.4);
                ctx.lineTo(size * 0.2, -size * 0.25);
                ctx.stroke();
                break;
                
            case 'chat':
                // Simple chat bubble
                ctx.beginPath();
                ctx.arc(0, -size * 0.1, size * 0.7, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-size * 0.3, size * 0.5);
                ctx.lineTo(0, size * 0.3);
                ctx.lineTo(size * 0.1, size * 0.5);
                ctx.stroke();
                break;
                
            case 'gear':
                // Simple gear
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
                ctx.stroke();
                break;
                
            case 'lightning':
                // Simple lightning
                ctx.beginPath();
                ctx.moveTo(size * 0.2, -size);
                ctx.lineTo(-size * 0.2, 0);
                ctx.lineTo(size * 0.2, 0);
                ctx.lineTo(-size * 0.2, size);
                ctx.stroke();
                break;
        }
        
        ctx.restore();
    }
    
    // Animation loop - scroll-aware
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const revealRadius = 150;
        const revealRadiusOuter = 220;
        const scrollY = window.scrollY || window.pageYOffset;
        const tileHeight = canvas.height;
        
        elements.forEach(el => {
            // Calculate screen position - elements tile vertically
            let screenY = el.baseY - (scrollY % tileHeight);
            // Wrap around for seamless tiling
            if (screenY < -50) screenY += tileHeight;
            if (screenY > tileHeight + 50) screenY -= tileHeight;
            
            const screenX = el.baseX;
            
            // Calculate distance from mouse
            const dx = screenX - mouse.x;
            const dy = screenY - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Set target opacity based on distance
            let targetOpacity = 0;
            if (distance < revealRadius) {
                targetOpacity = (1 - distance / revealRadius) * 0.65;
            } else if (distance < revealRadiusOuter) {
                targetOpacity = (1 - (distance - revealRadius) / (revealRadiusOuter - revealRadius)) * 0.15;
            }
            
            if (el.special) targetOpacity *= 1.4;
            
            // Smooth opacity transition
            el.opacity += (targetOpacity - el.opacity) * 0.15;
            
            // Only draw if visible
            if (el.opacity > 0.02) {
                drawElement(el, screenX, screenY);
                el.rotation += 0.003;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    // Update glow position
    function updateGlow() {
        if (glow) {
            glow.style.left = mouse.x + 'px';
            glow.style.top = mouse.y + 'px';
        }
    }
    
    // Throttled mouse handler
    let lastMoveTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMoveTime < 16) return; // ~60fps throttle
        lastMoveTime = now;
        
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        updateGlow();
        
        if (!isActive) {
            isActive = true;
            container.classList.add('active');
        }
    });
    
    // Mouse leave handler
    document.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
        updateGlow();
    });
    
    // Resize handler with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 200);
    });
    
    resize();
    animate();
    
    console.log('Reveal effect initialized with', elements.length, 'elements');
}

// Initialize reveal effect immediately
document.addEventListener('DOMContentLoaded', () => {
    initRevealEffect();
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
