/* ============================================
   SOCIALUNLOCK - JAVASCRIPT INTERACTIVITY
   ============================================ */

// ==== FAQ Accordion Functionality ====
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ==== Mobile Hamburger Menu ====
window.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// ==== Animated Stat Counters ====
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.getAttribute('data-target') === '100' ? '%' : '+');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.getAttribute('data-target') === '100' ? '%' : '+');
            }
        }, 30);
    });
}

// Trigger counter animation when section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('why-section')) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const whySection = document.querySelector('.why-section');
if (whySection) {
    observer.observe(whySection);
}

// ==== Animated Grid Canvas ====
function initGridCanvas() {
    const canvas = document.getElementById('gridCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const gridSize = 50;
    let time = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 + Math.sin(time * 0.005) * 0.05})`;
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + Math.sin(time * 0.002) * 10, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y + Math.cos(time * 0.002) * 10);
            ctx.stroke();
        }

        time++;
    }

    function animate() {
        drawGrid();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

// Initialize grid on page load
window.addEventListener('load', initGridCanvas);

// ==== Smooth Scroll Enhancement ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==== Service Card Hover Glow Effect ====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

// ==== Parallax Effect for Hero ====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animated-particles');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});

// ==== Add Glow Effect to Service Cards on Hover ====
document.querySelectorAll('.pillar-card, .stat-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cssText += '; --glow-opacity: 1;';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.cssText += '; --glow-opacity: 0;';
    });
});

// ==== Page Load Animation ====
function triggerPageLoadAnimation() {
    document.body.style.animation = 'fadeIn 0.6s ease-out';
}

window.addEventListener('load', triggerPageLoadAnimation);

// ==== Typing Effect for Hero Title (Optional Enhancement) ====
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let index = 0;
    const speed = 50;
    
    function typeChar() {
        if (index < originalText.length) {
            titleElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeChar, speed);
        }
    }
    
    // Only trigger on first load
    if (performance.navigation.type === 1) {
        typeChar();
    }
}

// ==== Intersection Observer for Fade-in Animations ====
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.section-title, .section-text, .section-subtitle').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ==== Active Navigation Link Indicator ====
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition && 
            section.offsetTop + section.offsetHeight > scrollPosition) {
            const sectionId = section.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                    link.style.color = 'var(--neon-cyan)';
                    link.style.textShadow = '0 0 10px var(--neon-cyan)';
                }
            });
        }
    });
});

// ==== Logo Click to Return Home ====
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==== Enhanced Accessibility - Focus Management ====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ==== Prevent Layout Shift on Scroll ====
function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

window.addEventListener('load', function() {
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
    }
});

// ==== Performance: Lazy animations for backgrounds ====
let particlesAnimating = true;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        particlesAnimating = false;
    } else {
        particlesAnimating = true;
    }
});

// ==== Contact Button Interactions ====
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
});

console.log('🔓 SocialUnlock - Elite Social Media Solutions');
console.log('📲 Contact: @socialunlock on Telegram');
