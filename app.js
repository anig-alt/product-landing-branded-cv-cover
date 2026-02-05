document.addEventListener('DOMContentLoaded', function() {
    // Sticky navbar: links scroll to section (smooth scroll is in CSS via html { scroll-behavior: smooth })
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Active section highlight in navbar
    const sections = document.querySelectorAll('section[id]');
    function setActiveNav() {
        const scrollY = window.scrollY;
        let current = null;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top - 100 && scrollY < top + height - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const id = href && href.startsWith('#') ? href.substring(1) : '';
            link.classList.toggle('active', id === current);
        });
    }
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    // Dark mode toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Pricing toggle: switch between Monthly and Yearly and update prices
    const toggleLabels = document.querySelectorAll('.pricing-toggle .toggle-label');
    const priceAmounts = document.querySelectorAll('.price-amount[data-monthly]');
    const pricePeriods = document.querySelectorAll('.price-period[data-monthly]');

    function setPricingPeriod(period) {
        toggleLabels.forEach(btn => {
            const isActive = btn.getAttribute('data-period') === period;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
        priceAmounts.forEach(el => {
            const value = el.getAttribute(`data-${period}`);
            if (value) el.textContent = value;
        });
        pricePeriods.forEach(el => {
            const value = el.getAttribute(`data-${period}`);
            if (value) el.textContent = value;
        });
    }

    toggleLabels.forEach(btn => {
        btn.addEventListener('click', function() {
            setPricingPeriod(this.getAttribute('data-period'));
        });
    });

    // Sync initial display with active toggle (Yearly is active by default in HTML)
    setPricingPeriod('yearly');

    // CTA Modal: open, close (button, backdrop, Escape), form validation
    const ctaModal = document.getElementById('ctaModal');
    const modalCloseBtn = document.getElementById('modalClose');
    const ctaForm = document.getElementById('ctaForm');
    const modalUsername = document.getElementById('modalUsername');
    const modalPassword = document.getElementById('modalPassword');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    function openModal() {
        ctaModal.classList.add('is-open');
        ctaModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalUsername.focus();
    }

    function closeModal() {
        ctaModal.classList.remove('is-open');
        ctaModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        usernameError.textContent = '';
        passwordError.textContent = '';
        modalUsername.classList.remove('error');
        modalPassword.classList.remove('error');
        ctaForm.reset();
    }

    document.querySelectorAll('.cta-open-modal').forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    ctaModal.addEventListener('click', function(e) {
        if (e.target === ctaModal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && ctaModal.classList.contains('is-open')) {
            closeModal();
        }
    });

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        usernameError.textContent = '';
        passwordError.textContent = '';
        modalUsername.classList.remove('error');
        modalPassword.classList.remove('error');

        let valid = true;
        const usernameVal = (modalUsername.value || '').trim();
        const passwordVal = (modalPassword.value || '').trim();

        if (!usernameVal) {
            usernameError.textContent = 'Username or email is required.';
            modalUsername.classList.add('error');
            valid = false;
        } else if (usernameVal.includes('@') && !isValidEmail(usernameVal)) {
            usernameError.textContent = 'Please enter a valid email address.';
            modalUsername.classList.add('error');
            valid = false;
        }
        if (!passwordVal) {
            passwordError.textContent = 'Password is required.';
            modalPassword.classList.add('error');
            valid = false;
        }

        if (valid) {
            closeModal();
            // Here you could send the form data to a server
        }
    });
});
