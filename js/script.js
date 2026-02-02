/* 
    Canal View - Interactive elements
*/

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // Navbar scroll effect
    let scroled = false;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (!scroled) {
                navbar.classList.add('navbar-scrolled');
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.padding = '0.5rem 0';
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
                scroled = true;
            }
        } else {
            if (scroled) {
                navbar.classList.remove('navbar-scrolled');
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = 'none';
                scroled = false;
            }
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });

    // Simple Form Submission (Mock)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Success!';
                btn.classList.remove('btn-gold');
                btn.classList.add('btn-success');
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-gold');
                }, 3000);
            }, 1500);
        });
    });


    // Gallery Interaction (Conditional: Desktop Popup vs Mobile In-place)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModalEl = document.getElementById('lightboxModal');
    const lightboxModal = lightboxModalEl ? new bootstrap.Modal(lightboxModalEl) : null;

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const isDetailed = item.classList.contains('detailed');
            const captionText = item.querySelector('.gallery-overlay span').innerText;
            const imgSrc = item.getAttribute('data-img-src');

            if (window.innerWidth > 768) {
                // Desktop: Show Premium Lightbox
                if (lightboxModal) {
                    const modalImg = lightboxModalEl.querySelector('#lightbox-img');
                    const modalCaption = lightboxModalEl.querySelector('#lightbox-caption');
                    modalImg.src = imgSrc;
                    modalCaption.innerText = captionText;
                    lightboxModal.show();
                }
            } else {
                // Mobile: Toggle In-Place Detail
                galleryItems.forEach(i => i.classList.remove('detailed'));
                if (!isDetailed) {
                    item.classList.add('detailed');
                }
            }
        });
    });

    // Animation on scroll (Simple Reveal)
    const reveal = () => {
        const reveals = document.querySelectorAll('.animate-up');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
});
