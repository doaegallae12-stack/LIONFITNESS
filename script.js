document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // --- ADVANCED TYPING & RADAR LOGIC ---
    const phrases = [
        "TRAIN LIKE A LION",
        "BUILD YOUR POWER",
        "NO LIMITS.<br>ONLY STRENGTH.",
        "WELCOME TO<br>LION FITNESS"
    ];

    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseEnd = 2000;
    const pauseStart = 500;

    const textElement = document.getElementById('typewriter-text');
    const cursorElement = document.getElementById('cursor');

    if (textElement && cursorElement) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriterHero() {
            const currentPhrase = phrases[phraseIndex];

            cursorElement.classList.add('typing');

            if (isDeleting) {
                const text = currentPhrase.substring(0, charIndex - 1);
                textElement.innerHTML = text;
                charIndex--;
            } else {
                const text = currentPhrase.substring(0, charIndex + 1);
                textElement.innerHTML = text;
                charIndex++;
            }

            let nextActionSpeed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                nextActionSpeed = pauseEnd;
                cursorElement.classList.remove('typing');
            }
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                nextActionSpeed = pauseStart;
                cursorElement.classList.remove('typing');
            }

            if (!isDeleting && charIndex !== currentPhrase.length) {
                nextActionSpeed += (Math.random() * 40 - 20);
            }

            setTimeout(typeWriterHero, nextActionSpeed);
        }

        setTimeout(typeWriterHero, 1000);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });

    // Mobile specific: Ensure visibility after a short delay if scrolling is sluggish
    setTimeout(() => {
        sections.forEach(section => {
            section.classList.add('visible');
        });
    }, 2000);

    // Shop Logic
    const products = [
        {
            id: 1,
            name: "Premium Whey Isolate",
            category: "Supplements",
            price: "650 MAD",
            image: "assets/images/p1.jpg"
        },
        {
            id: 2,
            name: "Extreme Mass Gainer",
            category: "Supplements",
            price: "450 MAD",
            image: "assets/images/p2.jpg"
        },
        {
            id: 3,
            name: "Nitric Oxide Pre-Workout",
            category: "Supplements",
            price: "380 MAD",
            image: "assets/images/p3.jpg"
        },
        {
            id: 4,
            name: "Essential BCAA Recovery",
            category: "Supplements",
            price: "320 MAD",
            image: "assets/images/p4.jpg"
        },
        {
            id: 5,
            name: "Casein Night Protein",
            category: "Supplements",
            price: "580 MAD",
            image: "assets/images/p5.jpg"
        },
        {
            id: 6,
            name: "Glutamine Pure",
            category: "Supplements",
            price: "250 MAD",
            image: "assets/images/p6.jpg"
        }
    ];

    const productGrid = document.getElementById('product-grid');

    function renderProducts() {
        if (!productGrid) return;
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">${product.price}</div>
                    <button class="btn btn-secondary" style="width: 100%">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }

    renderProducts();

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for contacting Lion Fitness! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Admin Panel Logic
    const adminPanel = document.getElementById('admin-panel');
    const closeAdmin = document.getElementById('close-admin');
    const logoLink = document.querySelector('.logo-container');

    if (logoLink && adminPanel) {
        // Secret entry: Double click the logo
        logoLink.addEventListener('dblclick', () => {
            const password = prompt("Enter Admin Password:");
            if (password === "lion2026") {
                adminPanel.style.display = "block";
                document.body.style.overflow = "hidden";
            } else {
                alert("Incorrect Password!");
            }
        });
    }

    if (closeAdmin && adminPanel) {
        closeAdmin.addEventListener('click', () => {
            adminPanel.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    // Admin Add Product
    const adminForm = document.getElementById('admin-product-form');
    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newProduct = {
                id: Date.now(),
                name: document.getElementById('p-name').value,
                category: document.getElementById('p-category').value,
                price: document.getElementById('p-price').value,
                image: document.getElementById('p-image').value
            };
            products.unshift(newProduct);
            renderProducts();
            adminForm.reset();
            alert("Product added successfully!");
        });
    }

    // --- ENERGY SPARKS PARTICLE SYSTEM ---
    const canvas = document.getElementById('energy-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 100; // Increased for full-page coverage

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 1.2;
                this.speedY = (Math.random() - 0.5) * 1.2;
                this.opacity = Math.random() * 0.4 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = `rgba(57, 255, 20, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        // Mouse influence
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            particles.forEach(p => {
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    p.x += dx * 0.01;
                    p.y += dy * 0.01;
                }
            });
        });
    }
});