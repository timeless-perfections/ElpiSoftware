/**
 * ElpiSoftware - Main JavaScript File
 * Temiz ve optimize edilmiş kod yapısı
 */

// Globaller
let isInitialized = false;

// DOM yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
    if (isInitialized) return;
    isInitialized = true;
    
    // Temel fonksiyonları başlat
    initScrollAnimations();
    initMobileMenu();
    initFAQ();
    initSmoothScroll();
    initHeaderEffects();
});

/**
 * Scroll animasyonlarını başlatır
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade-in elementlerini gözlemle
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Mobil menü işlevini başlatır
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', function() {
        const isOpen = menu.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Menü linklerine tıklandığında kapat
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // ESC tuşu ile kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    function openMenu() {
        menu.classList.add('active');
        toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * FAQ accordion işlevini başlatır
 */
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
        
        // Keyboard support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(this);
            }
        });
    });
    
    function toggleFAQ(questionElement) {
        const answer = questionElement.nextElementSibling;
        const toggle = questionElement.querySelector('.faq-toggle');
        const isActive = questionElement.classList.contains('active');
        
        // Diğer FAQ'ları kapat
        questions.forEach(q => {
            if (q !== questionElement) {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
                const otherToggle = q.querySelector('.faq-toggle');
                if (otherToggle) otherToggle.classList.remove('active');
            }
        });
        
        // Mevcut FAQ'yı toggle et
        if (isActive) {
            questionElement.classList.remove('active');
            answer.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
        } else {
            questionElement.classList.add('active');
            answer.classList.add('active');
            if (toggle) toggle.classList.add('active');
            
            // Scroll kontrolü
            setTimeout(() => checkScrollable(answer), 100);
        }
    }
    
    function checkScrollable(element) {
        if (element.scrollHeight > element.clientHeight) {
            element.setAttribute('data-scrollable', 'true');
        }
    }
}

/**
 * Smooth scroll işlevini başlatır
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header scroll efektlerini başlatır
 */
function initHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Header background
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestHeaderUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
}

/**
 * Bildirim göster
 */
function showNotification(message, type = 'info') {
    // Mevcut bildirimleri temizle
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Stil
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Renk
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animasyon
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Otomatik kaldır
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/**
 * Form gönderimi için basit handler
 */
function handleFormSubmit(formElement) {
    if (!formElement) return;
    
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            showNotification('Form başarıyla gönderildi!', 'success');
            this.reset();
        } else {
            showNotification('Lütfen tüm gerekli alanları doldurun.', 'error');
        }
    });
}

/**
 * Resize handler
 */
function handleResize() {
    // Mobil menü kontrolü
    if (window.innerWidth > 768) {
        const menu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (menu && toggle) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Event listeners
window.addEventListener('resize', handleResize, { passive: true });

// Sayfa yüklendiğinde fade-in
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        handleFormSubmit(contactForm);
    }
});

// CSS için header scroll class'ı ekle
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 999;
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from { transform: translateY(-10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .mobile-menu-toggle {
            display: flex;
        }
    }
`;
document.head.appendChild(style);