/**
 * ElpiSoftware - Minimal JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll animasyonları
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });
        
        fadeElements.forEach(function(element) {
            observer.observe(element);
        });
    }
    
    // Mobil menü
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
    
    // FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Diğer FAQ'ları kapat
            faqQuestions.forEach(function(q) {
                if (q !== question) {
                    q.classList.remove('active');
                    if (q.nextElementSibling) {
                        q.nextElementSibling.classList.remove('active');
                    }
                }
            });
            
            // Mevcut FAQ'yı toggle et
            if (isActive) {
                this.classList.remove('active');
                if (answer) answer.classList.remove('active');
            } else {
                this.classList.add('active');
                if (answer) answer.classList.add('active');
            }
        });
    });
    
    // Header scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll sadece # linkler için
    const hashLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    hashLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
});

// Gerekli CSS stilleri
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }
        
        .nav-menu.active .nav-link {
            padding: 1rem 2rem;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .mobile-menu-toggle {
            display: flex;
        }
    }
`;
document.head.appendChild(style);