// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typed.js
    initializeTypedJS();
    
    // Initialize mobile menu functionality
    initializeMobileMenu();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize skill bars animation
    initializeSkillBars();
    
    // Initialize dark mode toggle
    initializeDarkMode();
    
    // Initialize floating buttons
    initializeFloatingButtons();
});

// Typed.js initialization
function initializeTypedJS() {
    var typed = new Typed('.role', {
        strings: ['MERN Stack Developer', 'Web Developer', 'Software Engineer'],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const toggleBtn = document.querySelector('.toggle_btn');
    const closeBtn = document.querySelector('.close_btn');
    const dropdownMenu = document.querySelector('.dropdown_menu');
    const mobileLinks = document.querySelectorAll('.dropdown-items a');

    // Toggle mobile menu
    toggleBtn.addEventListener('click', () => {
        dropdownMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close mobile menu
    closeBtn.addEventListener('click', () => {
        dropdownMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close mobile menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !toggleBtn.contains(e.target) && dropdownMenu.classList.contains('active')) {
            dropdownMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// Scroll effects
function initializeScrollEffects() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.getElementById('header');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        // Scroll to top button
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
        
        // Navbar background effect
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            
            if (document.body.classList.contains('dark-mode')) {
                header.style.background = 'rgba(30, 30, 44, 0.98)';
            }
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            
            if (document.body.classList.contains('dark-mode')) {
                header.style.background = 'rgba(30, 30, 44, 0.95)';
            }
        }
        
        // Active navigation highlighting
        updateActiveNavLink();
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .dropdown-items a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.fill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                // Width is already set in CSS, this triggers the transition
                bar.style.width = bar.style.width;
            }
        });
    }
    
    // Initial call
    animateSkillBars();
    
    // Call on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Dark mode toggle
function initializeDarkMode() {
    const modeToggle = document.getElementById('modeToggle');
    const modeIcon = modeToggle.querySelector('i');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        modeIcon.className = 'fa-solid fa-sun';
    }
    
    // Toggle dark mode
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            modeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            modeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'light');
        }
        
        // Update header background
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            if (document.body.classList.contains('dark-mode')) {
                header.style.background = 'rgba(30, 30, 44, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        }
    });
}

// Floating buttons functionality
function initializeFloatingButtons() {
    const floatingContainer = document.querySelector('.floating-container');
    const floatingBtn = document.querySelector('.floating-btn');
    
    // Toggle floating buttons visibility
    floatingBtn.addEventListener('click', () => {
        const elementContainer = document.querySelector('.element-container');
        const isVisible = elementContainer.style.opacity === '1';
        
        if (isVisible) {
            elementContainer.style.opacity = '0';
            elementContainer.style.visibility = 'hidden';
        } else {
            elementContainer.style.opacity = '1';
            elementContainer.style.visibility = 'visible';
        }
    });
    
    // Close floating buttons when clicking outside
    document.addEventListener('click', (e) => {
        if (!floatingContainer.contains(e.target)) {
            const elementContainer = document.querySelector('.element-container');
            elementContainer.style.opacity = '0';
            elementContainer.style.visibility = 'hidden';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation for images
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

// Initialize image loading
preloadImages();

// Add intersection observer for fade-in animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const elementsToAnimate = document.querySelectorAll('.skill, .project-card, .timeline-content, .contact-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Initialize intersection observer
initializeIntersectionObserver();

// Add resize event listener for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize to larger screens
    if (window.innerWidth > 768) {
        const dropdownMenu = document.querySelector('.dropdown_menu');
        if (dropdownMenu.classList.contains('active')) {
            dropdownMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
});