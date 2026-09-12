document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle || !navMenu) return;

    function toggleMenu() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-active');
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close mobile menu on Escape key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('is-active')) {
            toggleMenu();
            navToggle.focus(); // Return focus to the toggle button
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('is-active')) {
            toggleMenu();
        }
    });
});