/**
 * Elpis Stüdyo - Main JavaScript File
 * Bu dosya sitenin tüm interaktif özelliklerini yönetir
 */

// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeFAQ();
    initializeLazyLoading();
    initializeActiveNavigation();
});

/**
 * Scroll-triggered animasyonları başlatır
 */
function initializeAnimations() {
    // Intersection Observer ile fade-in animasyonları
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered animation için delay ekleme
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Bir kez görünür olduktan sonra observer'ı durdur
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tüm fade-in elementlerini gözlemle
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        // Staggered animation için delay ekleme
        element.dataset.delay = index * 100;
        observer.observe(element);
    });
}

/**
 * Mobil menü toggle işlevini başlatır
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Body scroll'u engelle/aç
            document.body.classList.toggle('menu-open');
        });

        // Menü linklerine tıklandığında menüyü kapat
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

/**
 * Scroll efektlerini başlatır (header background, etc.)
 */
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;
            
            // Header background değişimi
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Header hide/show (opsiyonel)
            if (scrollY > lastScrollY && scrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }
}

/**
 * FAQ accordion işlevini başlatır
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Diğer tüm FAQ'ları kapat
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherToggle = otherQuestion.querySelector('.faq-toggle');
                    
                    otherAnswer.classList.remove('active');
                    if (otherToggle) {
                        otherToggle.classList.remove('active');
                    }
                }
            });
            
            // Mevcut FAQ'yı toggle et
            answer.classList.toggle('active');
            if (toggle) {
                toggle.classList.toggle('active');
            }
        });
    });
}

/**
 * Lazy loading için basit implementasyon
 */
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Aktif navigasyon linkini belirler
 */
function initializeActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Mevcut sayfa ile link href'ini karşılaştır
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Smooth scroll için utility fonksiyon
 */
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 100; // Header yüksekliği için offset
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

/**
 * Form submission handler (contact forms için)
 */
function handleFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validasyonu
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Form başarılı şekilde gönderildi mesajı
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            form.reset();
        } else {
            showNotification('Lütfen tüm gerekli alanları doldurun.', 'error');
        }
    });
}

/**
 * Bildirim gösterme fonksiyonu
 */
function showNotification(message, type = 'info') {
    // Mevcut bildirimleri kaldır
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // CSS stilleri
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Tip-based renkler
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // DOM'a ekle
    document.body.appendChild(notification);
    
    // Animasyon için timeout
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Otomatik kaldırma
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Sayfa yüklenme performansını optimize eder
 */
function optimizePageLoad() {
    // Critical CSS'i inline olarak yükle
    const criticalCSS = document.querySelector('style[data-critical]');
    if (criticalCSS) {
        criticalCSS.remove();
    }
    
    // Non-critical CSS'i defer et
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    stylesheets.forEach(link => {
        link.media = 'print';
        link.onload = function() {
            this.media = 'all';
        };
    });
}

/**
 * Keyboard navigation desteği
 */
function initializeKeyboardNavigation() {
    // Escape tuşu ile modal/menu kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Mobil menüyü kapat
            const mobileMenu = document.querySelector('.nav-menu.active');
            const mobileToggle = document.querySelector('.mobile-menu-toggle.active');
            
            if (mobileMenu && mobileToggle) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // FAQ'ları kapat
            const activeFAQ = document.querySelector('.faq-answer.active');
            if (activeFAQ) {
                activeFAQ.classList.remove('active');
                const toggle = activeFAQ.previousElementSibling.querySelector('.faq-toggle');
                if (toggle) {
                    toggle.classList.remove('active');
                }
            }
        }
    });
    
    // Tab navigation için focus management
    const focusableElements = 'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], select, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = Array.from(document.querySelectorAll(focusableElements));
            const currentIndex = focusable.indexOf(document.activeElement);
            
            if (e.shiftKey) {
                // Shift + Tab (backwards)
                if (currentIndex === 0) {
                    e.preventDefault();
                    focusable[focusable.length - 1].focus();
                }
            } else {
                // Tab (forwards)
                if (currentIndex === focusable.length - 1) {
                    e.preventDefault();
                    focusable[0].focus();
                }
            }
        }
    });
}

/**
 * Temizlik fonksiyonları (sayfa değişiminde)
 */
function cleanup() {
    // Event listener'ları temizle
    window.removeEventListener('scroll', requestTick);
    window.removeEventListener('resize', handleResize);
    
    // Timer'ları temizle
    if (window.scrollTimer) {
        clearTimeout(window.scrollTimer);
    }
    
    if (window.resizeTimer) {
        clearTimeout(window.resizeTimer);
    }
}

/**
 * Resize handler
 */
function handleResize() {
    if (window.resizeTimer) {
        clearTimeout(window.resizeTimer);
    }
    
    window.resizeTimer = setTimeout(() => {
        // Mobil menü durumunu kontrol et
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && mobileToggle) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
        
        // Animasyonları yeniden hesapla
        const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    }, 250);
}

/**
 * Accessibility improvements
 */
function initializeAccessibility() {
    // Skip to main content linki
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Ana içeriğe geç';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Ana içerik container'ına ID ekle
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

/**
 * Performance monitoring
 */
function initializePerformanceMonitoring() {
    // Page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Sayfa yükleme süresi: ${Math.round(loadTime)}ms`);
        
        // Analytics'e gönder (gerçek projede)
        // sendAnalytics('page_load_time', Math.round(loadTime));
    });
    
    // CLS (Cumulative Layout Shift) monitoring
    let cls = 0;
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
                cls += entry.value;
            }
        }
    });
    
    try {
        observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
        // Layout shift API desteklenmiyor
        console.log('Layout shift monitoring desteklenmiyor');
    }
}

/**
 * Error handling
 */
function initializeErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript hatası:', e.error);
        
        // Kullanıcı dostu hata mesajı göster
        if (e.error && !e.error.toString().includes('Script error')) {
            showNotification('Bir hata oluştu. Sayfa yeniden yüklenecek.', 'error');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    });
    
    // Promise rejection handling
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Promise rejection:', e.reason);
        e.preventDefault();
    });
}

/**
 * Service Worker registration (PWA features için)
 */
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('Service Worker kayıtlı:', registration.scope);
                })
                .catch(function(error) {
                    console.log('Service Worker kaydı başarısız:', error);
                });
        });
    }
}

// Event listeners
window.addEventListener('resize', handleResize);
window.addEventListener('beforeunload', cleanup);

// Page-specific initializations
document.addEventListener('DOMContentLoaded', function() {
    initializeKeyboardNavigation();
    initializeAccessibility();
    initializePerformanceMonitoring();
    initializeErrorHandling();
    
    // Form handling (contact sayfası için)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        handleFormSubmission(contactForm);
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target && target !== '#') {
                smoothScrollTo(target);
            }
        });
    });
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAnimations,
        initializeMobileMenu,
        showNotification,
        smoothScrollTo
    };
}