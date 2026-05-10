document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-links');

    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            burger.setAttribute('aria-expanded', isActive);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !burger.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});