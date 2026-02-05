// Smooth scroll to pricing section
function scrollToPricing() {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

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
});
