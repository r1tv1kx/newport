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

// ============ CURSOR TRACKER ============
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
let cursorTracker;

if (!isCoarsePointer) {
    cursorTracker = document.createElement('div');
    cursorTracker.className = 'cursor-tracker';
    document.body.appendChild(cursorTracker);

    let cursorRaf;
    const updateCursor = (x, y, scale = 0.9) => {
        cancelAnimationFrame(cursorRaf);
        cursorRaf = requestAnimationFrame(() => {
            cursorTracker.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
        });
    };

    window.addEventListener('pointermove', (e) => {
        cursorTracker.classList.add('is-visible');
        const scale = cursorTracker.classList.contains('is-clicked') ? 0.7 : 0.9;
        updateCursor(e.clientX, e.clientY, scale);
    });

    window.addEventListener('pointerdown', () => {
        cursorTracker.classList.add('is-clicked');
    });

    window.addEventListener('pointerup', () => {
        cursorTracker.classList.remove('is-clicked');
    });

    window.addEventListener('pointerleave', () => {
        cursorTracker.classList.remove('is-visible');
    });
}

// ============ DARK MODE TOGGLE ============
const themeToggle = document.getElementById('toggle-theme-btn');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Load saved theme or default to dark (futuristic)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.innerHTML = '<path d="M12 2v2m0 16v2m8.49-14.49l-1.42 1.42M6.34 17.66l-1.42 1.42M22 12h-2M4 12H2m16.49 4.49l-1.42-1.42M6.34 6.34L4.92 4.92"/><circle cx="12" cy="12" r="5"/>';
} else {
    body.classList.add('dark-mode');
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
}

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const isDark = body.classList.contains('dark-mode');
    if (isDark) {
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    } else {
        themeIcon.innerHTML = '<path d="M12 2v2m0 16v2m8.49-14.49l-1.42 1.42M6.34 17.66l-1.42 1.42M22 12h-2M4 12H2m16.49 4.49l-1.42-1.42M6.34 6.34L4.92 4.92"/><circle cx="12" cy="12" r="5"/>';
    }
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

// ============ CRAZY SCROLL ANIMATIONS ============
// Parallax layers with different speeds
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero section parallax with multiple layers
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = Math.max(0, 1 - (scrolled / 600));
    }
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px) rotateX(${scrolled * 0.03}deg)`;
    }
    
    // Floating cards dynamic movement
    document.querySelectorAll('.floating-card').forEach((card, index) => {
        const speed = 0.2 + (index * 0.1);
        const rotation = scrolled * (0.05 + index * 0.02);
        card.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg) scale(${1 - scrolled * 0.0003})`;
    });
    
    // Section titles zoom and fade
    document.querySelectorAll('.section-title').forEach(title => {
        const rect = title.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = (windowHeight - rect.top) / windowHeight;
            const scale = 0.8 + (progress * 0.2);
            title.style.transform = `scale(${Math.min(scale, 1)})`;
            title.style.opacity = Math.min(progress * 1.5, 1);
        }
    });
    
    // Cards reveal with stagger effect
    document.querySelectorAll('.about-card, .project-card, .cert-card, .skill-category').forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 100);
        }
    });
    
    // Navbar blur effect
    const navbar = document.getElementById('navbar');
    if (scrolled > 50) {
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.background = body.classList.contains('light-mode') 
            ? 'rgba(255, 255, 255, 0.85)' 
            : 'rgba(15, 23, 42, 0.85)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.background = body.classList.contains('light-mode')
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(15, 23, 42, 0.7)';
    }
});

// ============ MAGNETIC BUTTON EFFECT ============
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ============ 3D CARD TILT EFFECT ============
document.querySelectorAll('.about-card, .project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ============ SMOOTH CURSOR TRAIL ============
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
};

createCursorTrail();

// ============ DYNAMIC BACKGROUND PARTICLES ============
const createParticles = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
                this.reset();
            }
        }
        
        draw() {
            const isDark = body.classList.contains('dark-mode');
            ctx.fillStyle = isDark 
                ? `rgba(14, 165, 233, ${this.opacity})` 
                : `rgba(14, 165, 233, ${this.opacity * 0.6})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect nearby particles
        particles.forEach((a, i) => {
            particles.slice(i + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const isDark = body.classList.contains('dark-mode');
                    ctx.strokeStyle = isDark
                        ? `rgba(14, 165, 233, ${0.1 * (1 - distance / 100)})`
                        : `rgba(14, 165, 233, ${0.05 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

createParticles();

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

// ============ CONTACT FORM HANDLING ============
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Disable submit button during processing
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text">SENDING...</span>';
        submitBtn.disabled = true;
        
        try {
            // Use FormSubmit.co - free email service, no API key needed
            const response = await fetch('https://formsubmit.co/ajax/singhritvik1411@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _captcha: 'false',
                    _template: 'table'
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    showFormMessage('✓ SENT - Your message has been delivered successfully!', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset input styling
                    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
                        input.style.borderColor = 'var(--border-color)';
                        input.style.boxShadow = 'none';
                    });
                } else {
                    throw new Error('Failed to send message');
                }
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('Error:', error);
            // Show error message
            showFormMessage('Failed to send. Please try again or email directly at singhritvik1411@gmail.com', 'error');
        } finally {
            // Re-enable submit button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type} show`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
}

// ============ FORM INPUT ANIMATIONS ============
const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Add glow effect on valid input
    input.addEventListener('input', () => {
        if (input.checkValidity() && input.value.length > 0) {
            input.style.borderColor = 'var(--neon-green)';
            input.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.2)';
        } else {
            input.style.borderColor = 'var(--border-color)';
            input.style.boxShadow = 'none';
        }
    });
});

// ============ AI CHATBOT ============
(function() {
    const chatToggle = document.getElementById('chat-toggle');
    const closeChat = document.getElementById('close-chat');
    const chatContainer = document.getElementById('chatbot-container');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const modeToggle = document.getElementById('mode-toggle');
    const chatModeStatus = document.getElementById('chat-mode-status');
    
    let conversationHistory = [];
    let isProcessing = false;
    let chatMode = 'personal'; // 'personal' or 'normal'

    // Toggle chat window
    const toggleChat = () => {
        chatContainer.classList.toggle('chatbot-closed');
        if (!chatContainer.classList.contains('chatbot-closed')) {
            chatInput.focus();
        }
    };

    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    // Toggle between Personal and Normal mode
    const toggleMode = () => {
        chatMode = chatMode === 'personal' ? 'normal' : 'personal';
        
        // Update UI
        if (chatMode === 'personal') {
            chatModeStatus.textContent = 'Personal Mode';
            modeToggle.classList.remove('normal-mode');
            modeToggle.innerHTML = '<span class="mode-text">Change Mode</span>';
            modeToggle.title = 'Switch to Normal Mode';
            chatInput.placeholder = "Ask about Ritvik's experience...";
        } else {
            chatModeStatus.textContent = 'Normal Mode';
            modeToggle.classList.add('normal-mode');
            modeToggle.innerHTML = '<span class="mode-text">Change Mode</span>';
            modeToggle.title = 'Switch to Personal Mode';
            chatInput.placeholder = "Ask me anything...";
        }
        
        // Add mode switch notification
        addModeNotification();
    };

    modeToggle.addEventListener('click', toggleMode);

    // Add mode switch notification
    const addModeNotification = () => {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'message system-message';
        notificationDiv.style.cssText = 'text-align: center; font-size: 0.85rem; color: var(--text-light); opacity: 0.7; padding: 0.5rem; font-style: italic;';
        
        if (chatMode === 'personal') {
            notificationDiv.innerHTML = `<p>Switched to <strong>Personal Mode</strong>. Ask me about Ritvik Singh!</p>`;
        } else {
            notificationDiv.innerHTML = `<p>Switched to <strong>Normal Mode</strong>. Ask me anything!</p>`;
        }
        
        chatMessages.appendChild(notificationDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Add message to chat
    const addMessage = (content, isBot = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isBot ? 'AI' : 'You';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = content;
        messageContent.appendChild(p);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Add typing indicator
    const addTypingIndicator = () => {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = 'AI';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(messageContent);
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Remove typing indicator
    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    };

    // Send message to API
    const sendMessageToAPI = async (message) => {
        if (isProcessing || !message.trim()) return;
        
        isProcessing = true;
        const userMessage = message.trim();
        
        // Add user message to chat
        addMessage(userMessage, false);
        chatInput.value = '';
        
        // Add to conversation history
        conversationHistory.push({ role: 'user', content: userMessage });
        
        // Show typing indicator
        addTypingIndicator();
        sendMessage.disabled = true;
        chatInput.disabled = true;

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory: conversationHistory.slice(-10), // Keep last 10 messages
                    mode: chatMode // Send current mode to API
                })
            });

            const data = await response.json();
            
            removeTypingIndicator();

            if (response.ok && data.reply) {
                addMessage(data.reply, true);
                conversationHistory.push({ role: 'assistant', content: data.reply });
            } else {
                addMessage(data.error || 'Sorry, I encountered an error. Please try again.', true);
            }
        } catch (error) {
            console.error('Chat error:', error);
            removeTypingIndicator();
            addMessage('Sorry, I\'m having trouble connecting. Please check your internet connection and try again.', true);
        } finally {
            isProcessing = false;
            sendMessage.disabled = false;
            chatInput.disabled = false;
            chatInput.focus();
        }
    };

    // Send button click
    sendMessage.addEventListener('click', () => {
        sendMessageToAPI(chatInput.value);
    });

    // Enter key to send
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessageToAPI(chatInput.value);
        }
    });

    // Suggested questions (optional - you can add quick action buttons)
    const suggestedQuestions = [
        "What are Ritvik's key skills?",
        "Tell me about his experience",
        "What certifications does he have?"
    ];
})();