/**
 * ============================================
 * Theme Manager - Gerenciamento de Tema
 * ============================================
 */
class ThemeManager {
    constructor() {
        this.htmlElement = document.documentElement;
        this.themeToggle = document.querySelector('.theme-toggle');
        this.storageKey = 'theme';
        this.init();
    }

    init() {
        this.loadTheme();
        this.attachEventListeners();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem(this.storageKey) || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.storageKey, theme);
    }

    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    attachEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

/**
 * ============================================
 * Mobile Menu Manager - Gerenciamento do Menu Mobile
 * ============================================
 */
class MobileMenuManager {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.menuClose = document.querySelector('.nav-menu-close');
        this.navMenu = document.querySelector('.nav-menu');
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    openMenu() {
        this.navMenu.classList.add('active');
        this.header.classList.add('menu-open');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.header.classList.remove('menu-open');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    attachEventListeners() {
        // Abrir menu
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.openMenu());
        }

        // Fechar menu
        if (this.menuClose) {
            this.menuClose.addEventListener('click', () => this.closeMenu());
        }

        // Fechar menu ao clicar fora
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = event.target.closest('.nav-menu');
            const isClickOnToggle = event.target.closest('.menu-toggle');

            if (!isClickInsideMenu && !isClickOnToggle && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // Fechar menu ao clicar em um link
        const navLinks = this.navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 780) {
                    this.closeMenu();
                }
            });
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }
}

/**
 * ============================================
 * Scroll Manager - Gerenciamento do Scroll
 * ============================================
 */
class ScrollManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.scrollUpBtn = document.getElementById('scrollUp');
        this.whatsappBtn = document.querySelector('.whatsapp');
        this.scrollThreshold = 50;
        this.showUpThreshold = 300; // Only show after 300px
        this.lastScrollPosition = 0;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.handleScroll(); // Check initial position
    }

    handleScroll() {
        const scrollPosition = window.scrollY;
        const isScrollingUp = scrollPosition < this.lastScrollPosition;

        // Header scrolled state
        if (scrollPosition > this.scrollThreshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // WhatsApp button visibility (shows after 50px)
        if (this.whatsappBtn) {
            if (scrollPosition > this.scrollThreshold) {
                this.whatsappBtn.classList.add('active');
            } else {
                this.whatsappBtn.classList.remove('active');
            }
        }

        // Scroll Up button visibility
        if (this.scrollUpBtn) {
            if (isScrollingUp && scrollPosition > this.showUpThreshold) {
                this.scrollUpBtn.classList.add('active');
            } else {
                this.scrollUpBtn.classList.remove('active');
            }
        }

        this.lastScrollPosition = scrollPosition;
    }

    attachEventListeners() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        if (this.scrollUpBtn) {
            this.scrollUpBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

/**
 * ============================================
 * FAQ Manager - Gerenciamento do Acordeão do FAQ
 * ============================================
 */
class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        if (this.faqItems.length === 0) return;
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Fechar todos os itens antes de tratar o clique
                this.closeAllItems();

                // Se não estava ativo, abre
                if (!isActive) {
                    item.classList.add('active');
                }
                // Se já estava ativo, o closeAllItems já fechou, completando o toggle
            });
        });
    }

    closeAllItems() {
        this.faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
}

/**
 * ============================================
 * App - Inicialização da Aplicação
 * ============================================
 */
class App {
    constructor() {
        this.themeManager = null;
        this.mobileMenuManager = null;
        this.scrollManager = null;
        this.faqManager = null;
    }

    init() {
        this.themeManager = new ThemeManager();
        this.mobileMenuManager = new MobileMenuManager();
        this.scrollManager = new ScrollManager();
        this.faqManager = new FAQManager();

        console.log('✅ Aplicação inicializada com sucesso!');
    }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});