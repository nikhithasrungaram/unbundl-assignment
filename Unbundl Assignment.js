// Basic interactivity: menu toggle, smooth scroll, reveal on scroll, back-to-top
document.addEventListener('DOMContentLoaded', function() {
    // menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('nav');

    menuBtn.addEventListener('click', function() {
        const expanded = this.classList.toggle('open');
        this.setAttribute('aria-expanded', expanded);
        // toggle mobile nav visibility by toggling display style (or class)
        if (expanded) {
            nav.style.display = 'block';
        } else {
            nav.style.display = '';
        }
    });

    // close mobile nav when clicking a link (mobile)
    document.querySelectorAll('#nav a').forEach(a => {
        a.addEventListener('click', function() {
            if (menuBtn.classList.contains('open')) {
                menuBtn.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                nav.style.display = '';
            }
        });
    });

    // Smooth scrolling for local anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const el = document.querySelector(targetId);
                if (el) {
                    el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Reveal on scroll using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 560) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    backToTop.addEventListener('click', () => window.scrollTo({
        top: 0,
        behavior: 'smooth'
    }));

    // update current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Handle window resize: ensure nav shows when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            document.getElementById('nav').style.display = 'block';
        } else {
            if (!menuBtn.classList.contains('open')) {
                document.getElementById('nav').style.display = '';
            } else {
                // if menu button is open on mobile and user resizes larger, keep nav visible but close hamburger
                document.getElementById('nav').style.display = 'block';
                menuBtn.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
});