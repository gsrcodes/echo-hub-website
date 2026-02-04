// ===================================
// Wait for DOM to be ready
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initParticles();
    initPricingToggle();
    initThemeSelector();
    initScrollAnimations();
    initMobileMenu();
    initAnimationsOnScroll();
    initInteractiveCalendar();
    initContactForm();
    initDynamicChat();
});

// ===================================
// Simple scroll animations (works without GSAP)
// ===================================
function initAnimationsOnScroll() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    const navMenu = document.getElementById('navMenu');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// ===================================
// Animated Particles Background
// ===================================
function initParticles() {
    const particlesBg = document.getElementById('particlesBg');
    
    if (!particlesBg) return;

    // Create floating particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * -20;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${getRandomColor()};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${duration}s linear ${delay}s infinite;
            pointer-events: none;
        `;
        
        particlesBg.appendChild(particle);
    }
}

function getRandomColor() {
    const colors = [
        'rgba(37, 211, 102, 0.5)',
        'rgba(102, 126, 234, 0.5)',
        'rgba(245, 87, 108, 0.5)',
        'rgba(52, 232, 121, 0.5)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===================================
// Pricing Toggle (Monthly/Annual)
// ===================================
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    const amounts = document.querySelectorAll('.amount');
    
    if (!toggle) return;
    
    toggle.addEventListener('change', function() {
        amounts.forEach(amount => {
            const monthly = amount.getAttribute('data-monthly');
            const annual = amount.getAttribute('data-annual');
            
            if (monthly && annual) {
                if (this.checked) {
                    // Annual
                    amount.textContent = annual;
                } else {
                    // Monthly
                    amount.textContent = monthly;
                }
            }
        });
    });
}

// ===================================
// Theme Selector for Whitelabel Demo
// ===================================
function initThemeSelector() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const previewCards = document.querySelectorAll('.preview-card i');
    const menuItems = document.querySelectorAll('.menu-item.active');
    const previewLogo = document.querySelector('.preview-logo i');
    
    const themes = {
        purple: 'linear-gradient(135deg, #667eea, #764ba2)',
        green: 'linear-gradient(135deg, #25d366, #128c7e)',
        blue: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        red: 'linear-gradient(135deg, #f093fb, #f5576c)'
    };
    
    const iconColors = {
        purple: '#667eea',
        green: '#25d366',
        blue: '#4facfe',
        red: '#f093fb'
    };
    
    // Apply theme function
    function applyTheme(theme) {
        const gradient = themes[theme];
        const iconColor = iconColors[theme];
        
        menuItems.forEach(item => {
            item.style.background = gradient;
        });
        
        previewCards.forEach(icon => {
            icon.style.color = iconColor;
        });
        
        if (previewLogo) {
            previewLogo.style.color = iconColor;
        }
    }
    
    // Apply purple theme on load (default)
    applyTheme('purple');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');
            
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
        });
    });
}

// ===================================
// Scroll Animations with GSAP
// ===================================
function initScrollAnimations() {
    // Only initialize if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, using fallback animations');
        initFallbackAnimations();
        return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.4
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.6
    });

    gsap.from('.hero-cta', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.8
    });

    gsap.from('.hero-stats', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 1.0
    });

    gsap.from('.dashboard-mockup', {
        opacity: 0,
        x: 60,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    // Animate cards on scroll
    gsap.utils.toArray('.mockup-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1
        });
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
            },
            opacity: 0,
            y: 40,
            duration: 0.8
        });
    });

    // Parallax effect for hero
    gsap.to('.hero-visual', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        ease: 'none'
    });
}

// ===================================
// Fallback Animations (without GSAP)
// ===================================
function initFallbackAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.textContent);
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item strong, .stat-value, .insight-value').forEach(stat => {
    if (!isNaN(parseInt(stat.textContent))) {
        statsObserver.observe(stat);
    }
});

// ===================================
// Smooth Scroll Reveal Effects
// ===================================
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
});

// ===================================
// Form Validation & Submission
// ===================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add your form submission logic here
        console.log('Form submitted');
        
        // Show success message
        showNotification('Mensagem enviada com sucesso!', 'success');
    });
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#25d366' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// Typing Effect for Hero
// ===================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Interactive Dashboard Cards
// ===================================
const dashboardCards = document.querySelectorAll('.mockup-card');
dashboardCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Calendar Interaction
// ===================================
const calendarNav = document.querySelectorAll('.cal-nav');
calendarNav.forEach(nav => {
    nav.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
            animation: ripple 0.6s;
            pointer-events: none;
        `;
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS animation for ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Testimonial Carousel (if needed)
// ===================================
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
                testimonial.style.animation = 'fadeIn 0.5s';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// ===================================
// Easter Eggs & Interactions
// ===================================

// Konami Code Easter Egg
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Add rainbow effect to the page
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    showNotification('🎉 Easter Egg Ativado! 🎉', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// ===================================
// Interactive Kanban Calendar
// ===================================
function initInteractiveCalendar() {
    const modal = document.getElementById('appointmentModal');
    const closeModal = document.getElementById('closeModal');
    const cancelModal = document.getElementById('cancelModal');
    const confirmBtn = document.getElementById('confirmAppointment');
    
    if (!modal) return;
    
    // Track which slot was clicked
    let selectedSlot = null;
    
    // Close modal handlers
    closeModal?.addEventListener('click', () => modal.classList.remove('active'));
    cancelModal?.addEventListener('click', () => modal.classList.remove('active'));
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
    
    // Click on slot to create appointment
    document.querySelectorAll('.slot-row').forEach(slot => {
        slot.addEventListener('click', (e) => {
            // Check if this slot is occupied by checking if click was on a card
            if (e.target.closest('.schedule-card') || e.target.closest('.schedule-block')) {
                return;
            }
            
            const time = slot.dataset.time;
            const column = slot.closest('.attendant-column');
            const attendant = column?.dataset.attendant;
            
            if (!time || !attendant) return;
            
            // Check if slot is blocked (lunch, etc)
            const cardsLayer = column.querySelector('.cards-layer');
            const blocks = cardsLayer?.querySelectorAll('.schedule-block');
            const timeIndex = getTimeIndex(time);
            
            let isBlocked = false;
            blocks?.forEach(block => {
                const blockTop = parseInt(block.style.getPropertyValue('--top'));
                const blockDuration = parseInt(block.style.getPropertyValue('--duration'));
                if (timeIndex >= blockTop && timeIndex < blockTop + blockDuration) {
                    isBlocked = true;
                }
            });
            
            if (isBlocked) {
                showNotification('Este horário está bloqueado.', 'error');
                return;
            }
            
            // Check if slot already has a card
            const cards = cardsLayer?.querySelectorAll('.schedule-card');
            let isOccupied = false;
            cards?.forEach(card => {
                const cardTop = parseInt(card.style.getPropertyValue('--top'));
                const cardDuration = parseInt(card.style.getPropertyValue('--duration'));
                if (timeIndex >= cardTop && timeIndex < cardTop + cardDuration) {
                    isOccupied = true;
                }
            });
            
            if (isOccupied) {
                showNotification('Este horário já está ocupado.', 'error');
                return;
            }
            
            // Open modal with pre-selected values
            selectedSlot = { time, attendant, timeIndex };
            document.getElementById('selectTime').value = time;
            document.getElementById('selectAttendant').value = attendant;
            document.getElementById('clientName').value = '';
            modal.classList.add('active');
        });
    });
    
    // Confirm appointment
    confirmBtn?.addEventListener('click', () => {
        const name = document.getElementById('clientName').value.trim();
        const attendant = document.getElementById('selectAttendant').value;
        const time = document.getElementById('selectTime').value;
        const service = document.getElementById('selectService').value;
        
        if (!name) {
            showNotification('Por favor, digite o nome do cliente.', 'error');
            return;
        }
        
        const timeIndex = getTimeIndex(time);
        const column = document.querySelector(`.attendant-column[data-attendant="${attendant}"]`);
        const cardsLayer = column?.querySelector('.cards-layer');
        
        if (!cardsLayer) return;
        
        // Check if slot is available
        let isAvailable = true;
        cardsLayer.querySelectorAll('.schedule-card, .schedule-block').forEach(item => {
            const itemTop = parseInt(item.style.getPropertyValue('--top'));
            const itemDuration = parseInt(item.style.getPropertyValue('--duration'));
            if (timeIndex >= itemTop && timeIndex < itemTop + itemDuration) {
                isAvailable = false;
            }
        });
        
        if (!isAvailable) {
            showNotification('Este horário não está disponível.', 'error');
            return;
        }
        
        // Create new card
        const colors = ['#667eea', '#25d366', '#f5576c', '#4facfe', '#f093fb', '#fa709a', '#30cfd0'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const endTime = getTimeFromIndex(timeIndex + 1);
        
        const card = document.createElement('div');
        card.className = 'schedule-card';
        card.draggable = true;
        card.dataset.id = Date.now();
        card.style.setProperty('--top', timeIndex);
        card.style.setProperty('--duration', 1);
        card.style.setProperty('--color', randomColor);
        card.innerHTML = `
            <div class="card-drag-handle"><i class="fas fa-grip-vertical"></i></div>
            <div class="card-content">
                <div class="card-time">${time} - ${endTime}</div>
                <div class="card-client">${name}</div>
                <div class="card-service">${service}</div>
                <div class="card-status pending">
                    <i class="fas fa-clock"></i> Pendente
                </div>
            </div>
        `;
        
        cardsLayer.appendChild(card);
        initCardDrag(card);
        
        // Update attendant count
        updateAttendantCounts();
        
        modal.classList.remove('active');
        showNotification(`Agendamento criado para ${name} às ${time}! (Demo)`, 'success');
    });
    
    // Initialize drag for existing cards
    document.querySelectorAll('.schedule-card').forEach(card => {
        initCardDrag(card);
    });
    
    // Function to check collision considering card duration
    function checkCollision(cardsLayer, timeIndex, duration, excludeCard = null) {
        let hasCollision = false;
        const cardEnd = timeIndex + duration;
        
        cardsLayer.querySelectorAll('.schedule-card, .schedule-block').forEach(item => {
            // Skip the card being moved
            if (excludeCard && item === excludeCard) return;
            if (item.classList.contains('dragging')) return;
            
            const itemTop = parseInt(item.style.getPropertyValue('--top'));
            const itemDuration = parseInt(item.style.getPropertyValue('--duration')) || 1;
            const itemEnd = itemTop + itemDuration;
            
            // Check if ranges overlap
            if (timeIndex < itemEnd && cardEnd > itemTop) {
                hasCollision = true;
            }
        });
        
        return hasCollision;
    }
    
    // Function to count available slots
    function countAvailableSlots(column) {
        const cardsLayer = column.querySelector('.cards-layer');
        const totalSlots = 12; // 07:00 to 18:00
        let occupiedSlots = 0;
        
        cardsLayer?.querySelectorAll('.schedule-card, .schedule-block').forEach(item => {
            const duration = parseInt(item.style.getPropertyValue('--duration')) || 1;
            occupiedSlots += duration;
        });
        
        return Math.max(0, totalSlots - occupiedSlots);
    }
    
    // Function to update attendant counts in header
    function updateAttendantCounts() {
        document.querySelectorAll('.attendant-column').forEach(column => {
            const attendantId = column.dataset.attendant;
            const header = document.querySelector(`.attendant-header[data-attendant="${attendantId}"]`);
            if (!header) return;
            
            const cardsLayer = column.querySelector('.cards-layer');
            const cardCount = cardsLayer?.querySelectorAll('.schedule-card').length || 0;
            const availableSlots = countAvailableSlots(column);
            
            const badges = header.querySelectorAll('.attendant-meta .badge');
            if (badges[0]) {
                badges[0].textContent = `${cardCount} agendamento${cardCount !== 1 ? 's' : ''}`;
            }
            if (badges[1]) {
                badges[1].textContent = `${availableSlots} slot${availableSlots !== 1 ? 's' : ''}`;
            }
        });
    }
    
    // Initial count update
    updateAttendantCounts();
    
    // Drag and Drop functionality
    function initCardDrag(card) {
        card.addEventListener('dragstart', (e) => {
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', JSON.stringify({
                id: card.dataset.id,
                attendant: card.closest('.attendant-column')?.dataset.attendant
            }));
            e.dataTransfer.effectAllowed = 'move';
        });
        
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            document.querySelectorAll('.slot-row.drag-over, .slot-row.invalid').forEach(s => {
                s.classList.remove('drag-over', 'invalid');
            });
        });
    }
    
    // Store dragging card reference for collision checking
    let currentDraggingCard = null;
    
    // Drop zones
    document.querySelectorAll('.slot-row').forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            // Visual feedback
            const column = slot.closest('.attendant-column');
            const cardsLayer = column?.querySelector('.cards-layer');
            const timeIndex = getTimeIndex(slot.dataset.time);
            
            // Get the dragging card to check its duration
            const draggingCard = document.querySelector('.schedule-card.dragging');
            const duration = draggingCard ? (parseInt(draggingCard.style.getPropertyValue('--duration')) || 1) : 1;
            
            // Check if the card would fit (considering its full duration)
            const hasCollision = checkCollision(cardsLayer, timeIndex, duration, draggingCard);
            
            slot.classList.remove('drag-over', 'invalid');
            slot.classList.add(hasCollision ? 'invalid' : 'drag-over');
        });
        
        slot.addEventListener('dragleave', () => {
            slot.classList.remove('drag-over', 'invalid');
        });
        
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('drag-over', 'invalid');
            
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const draggingCard = document.querySelector(`.schedule-card[data-id="${data.id}"]`);
            const targetColumn = slot.closest('.attendant-column');
            const targetCardsLayer = targetColumn?.querySelector('.cards-layer');
            const timeIndex = getTimeIndex(slot.dataset.time);
            
            if (!draggingCard || !targetCardsLayer) return;
            
            // Get card duration
            const duration = parseInt(draggingCard.style.getPropertyValue('--duration')) || 1;
            
            // Check if available using the proper collision function
            const hasCollision = checkCollision(targetCardsLayer, timeIndex, duration, draggingCard);
            
            if (hasCollision) {
                showNotification('Este horário não está disponível.', 'error');
                return;
            }
            
            // Check if card would go beyond the schedule (18:00)
            if (timeIndex + duration > 12) {
                showNotification('O agendamento ultrapassaria o horário de funcionamento.', 'error');
                return;
            }
            
            // Move the card
            const newTime = slot.dataset.time;
            const endTime = getTimeFromIndex(timeIndex + duration);
            
            draggingCard.style.setProperty('--top', timeIndex);
            draggingCard.querySelector('.card-time').textContent = `${newTime} - ${endTime}`;
            
            // If moving to different column, move the card element
            if (draggingCard.closest('.cards-layer') !== targetCardsLayer) {
                targetCardsLayer.appendChild(draggingCard);
                // Update counts after moving between columns
                updateAttendantCounts();
            }
            
            showNotification('Agendamento movido com sucesso! (Demo)', 'success');
        });
    });
    
    // Helper functions
    function getTimeIndex(time) {
        const times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
        return times.indexOf(time);
    }
    
    function getTimeFromIndex(index) {
        const times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
        return times[index] || '19:00';
    }
}

// ===================================
// Contact Form - Web3Forms
// ===================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Remove error state when user starts typing
    contactForm.querySelectorAll('input, textarea').forEach(input => {
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
            
            if (input) input.classList.remove('input-error');
            
            if (!value) {
                errors.push(`O campo "${field.label}" é obrigatório.`);
                if (input) input.classList.add('input-error');
                return;
            }
            
            if (field.minLength && value.length < field.minLength) {
                errors.push(`O campo "${field.label}" deve ter pelo menos ${field.minLength} caracteres.`);
                if (input) input.classList.add('input-error');
                return;
            }
            
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
    
    // Form submission
    submitButton.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const errors = validateForm();
        
        if (errors.length > 0) {
            showNotification(errors[0], 'error');
            return;
        }
        
        const originalBtnText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
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
            
            if (result.success) {
                showNotification('Email enviado com sucesso! Entraremos em contato em breve.', 'success');
                contactForm.reset();
                contactForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            } else {
                showNotification('Erro ao enviar: ' + (result.message || 'Tente novamente.'), 'error');
            }
        } catch (error) {
            showNotification('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
            console.error('Network error:', error);
        } finally {
            submitButton.innerHTML = originalBtnText;
            submitButton.disabled = false;
        }
    });
}

// ===================================
// Performance Monitoring
// ===================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// ===================================
// Dynamic Chat Animation
// ===================================
function initDynamicChat() {
    const chatMessages = document.getElementById('dynamicChatMessages');
    const chatInput = document.getElementById('dynamicChatInput');
    const sendBtn = document.getElementById('dynamicSendBtn');
    
    if (!chatMessages) return;
    
    let hasAnimated = false;
    let animationTimeout = null;
    
    // Auto-scroll chat when new messages appear
    function scrollChatIfNeeded(container, element) {
        if (!container || !element) return;
        
        requestAnimationFrame(() => {
            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            
            if (elementRect.bottom > containerRect.bottom) {
                container.scrollTo({
                    top: container.scrollTop + (elementRect.bottom - containerRect.bottom) + 10,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Animate chat messages with timing
    function animateChat() {
        if (hasAnimated) return;
        hasAnimated = true;
        
        const elements = chatMessages.querySelectorAll('[data-delay]');
        let maxDelay = 0;
        
        elements.forEach(element => {
            const delay = parseInt(element.getAttribute('data-delay'));
            const duration = parseInt(element.getAttribute('data-duration')) || 0;
            
            if (delay > maxDelay) maxDelay = delay;
            
            animationTimeout = setTimeout(() => {
                element.classList.add('show');
                scrollChatIfNeeded(chatMessages, element);
                
                // Hide typing indicator after duration
                if (element.classList.contains('typing-indicator') && duration > 0) {
                    setTimeout(() => {
                        element.classList.add('hide');
                        element.classList.remove('show');
                    }, duration);
                }
            }, delay);
        });
        
        // Animate typing in input after all messages
        setTimeout(() => {
            animateInputTyping(chatInput, "Muito obrigada! 😊");
        }, maxDelay + 500);
    }
    
    // Animate typing in input field
    function animateInputTyping(input, text) {
        if (!input) return;
        
        let index = 0;
        input.value = '';
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                input.value += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                // Animate send button
                setTimeout(() => {
                    if (sendBtn) {
                        sendBtn.classList.add('sending');
                        setTimeout(() => {
                            sendBtn.classList.remove('sending');
                        }, 300);
                    }
                }, 400);
            }
        }, 60);
    }
    
    // Reset animation
    function resetChat() {
        hasAnimated = false;
        if (animationTimeout) clearTimeout(animationTimeout);
        
        const elements = chatMessages.querySelectorAll('[data-delay]');
        elements.forEach(element => {
            element.classList.remove('show', 'hide');
        });
        
        if (chatInput) chatInput.value = '';
    }
    
    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                // Small delay before starting animation
                setTimeout(() => {
                    animateChat();
                }, 500);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(chatMessages);
    
    // Optional: Allow replay on click
    const whatsappPhone = chatMessages.closest('.whatsapp-phone');
    if (whatsappPhone) {
        whatsappPhone.addEventListener('dblclick', () => {
            resetChat();
            setTimeout(() => animateChat(), 100);
        });
    }
}

// ===================================
// Console Welcome Message
// ===================================
console.log(
    '%c🌊 EchoHub %c- Plataforma SaaS Completa',
    'color: #25d366; font-size: 24px; font-weight: bold;',
    'color: #fff; font-size: 16px;'
);
console.log(
    '%cDesenvolvido com ❤️ por EchoHub Team',
    'color: #667eea; font-size: 14px;'
);
console.log(
    '%cInteressado em trabalhar conosco? Envie um email para: contato@echo-hub.dev',
    'color: #25d366; font-size: 12px;'
);

// ===================================
// Export for module systems
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initParticles,
        initPricingToggle,
        initThemeSelector,
        initInteractiveCalendar,
        initContactForm,
        initDynamicChat,
        showNotification
    };
}
