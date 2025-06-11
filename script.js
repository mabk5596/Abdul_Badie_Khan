document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling and active nav link logic
    const navLinks = document.querySelectorAll('nav ul li a');
    // IMPORTANT: Make sure this list includes all your section IDs
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('header');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - header.offsetHeight, // Adjust for fixed header
                behavior: 'smooth'
            });

            // Update active class immediately for better UX
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Intersection Observer for "scroll-reveal" animations and updating active nav link
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Changed from 0.3 to 0.1 for more reliable visibility trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('is-visible');

                // Update active nav link based on section in view
                const currentActive = document.querySelector('nav ul li a.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                const correspondingLink = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            } else {
                // Optional: Remove class when not intersecting if you want to re-animate on scroll back
                // entry.target.classList.remove('is-visible');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Initial check for active link on load
    window.addEventListener('load', function() {
        const currentScroll = window.scrollY + header.offsetHeight + 1; // +1 to ensure it's in the section
        sections.forEach(section => {
            if (currentScroll >= section.offsetTop && currentScroll < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(nav => nav.classList.remove('active'));
                const correspondingLink = document.querySelector(`nav ul li a[href="#${section.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
});