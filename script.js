// ============================================
// ULTRA-MODERN CYBERSECURITY PORTFOLIO
// Advanced Interactive Features
// ============================================

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============ DARK MODE TOGGLE ============
const themeToggle = document.getElementById('toggle-theme-btn');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Load saved theme or default to dark (futuristic)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.textContent = '☀️';
} else {
    body.classList.add('dark-mode');
    themeIcon.textContent = '🌙';
}

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const isDark = body.classList.contains('dark-mode');
    themeIcon.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============ SCROLL TO TOP BUTTON ============
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============ INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            
            // Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need fade-in animation
const animatedElements = document.querySelectorAll(
    '.about-card, .skill-category, .timeline-item, .project-card, .cert-card, .contact-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============ PARALLAX EFFECT FOR HERO SECTION ============
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    // Parallax for hero content
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = Math.max(0, 1 - (scrolled / 800));
    }

    // Parallax for hero visual with rotation
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px) rotateZ(${scrolled * 0.02}deg)`;
    }
});

// ============ FLOATING CARDS INTERACTION ============
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'var(--neon-cyan)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'var(--border-color)';
    });
});

// ============ SKILL TAG HOVER EFFECTS ============
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.05) translateY(-3px)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1) translateY(0)';
    });
});

// ============ CYBERSECURITY EASTER EGG ============
let keySequence = [];
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

window.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    keySequence = keySequence.slice(-10);
    
    if (keySequence.join(',') === secretCode.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    console.log('%c🔓 SECURITY SYSTEM UNLOCKED 🔓', 'color: #00d9ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00d9ff;');
    console.log('%cWelcome to the hidden terminal...', 'color: #39ff14; font-size: 14px;');
    console.log('%cCybersecurity is not a destination, it\'s a journey of continuous learning and adaptation.', 'color: #ff006e; font-size: 12px;');
    
    document.body.style.borderRadius = '0';
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(0,217,255,0.05), rgba(255,0,110,0.05));
        pointer-events: none;
        animation: pulse 2s infinite;
        z-index: 9999;
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.remove(), 2000);
}

// ============ MATRIX-STYLE BACKGROUND ANIMATION ============
function initMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        opacity: 0.03;
        pointer-events: none;
        z-index: -1;
    `;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
        ctx.font = `${fontSize}px 'Space Mono'`;
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            drops[i]++;
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
        }
        
        requestAnimationFrame(draw);
    }
    
    document.body.appendChild(canvas);
    draw();
}

// Initialize matrix effect on page load
window.addEventListener('load', () => {
    // Uncomment for matrix effect
    // initMatrixEffect();
});

// ============ RESPONSIVE ADJUSTMENTS ============
function handleResize() {
    if (window.innerWidth < 768) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.fontSize = '12px';
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.8s ease-out';
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);