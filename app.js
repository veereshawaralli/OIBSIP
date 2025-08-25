// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetOffset = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetOffset),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for hero button
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetOffset = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetOffset),
                    behavior: 'smooth'
                });
            }
        });
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const scrollY = window.pageYOffset;

        let activeSection = '';

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        const scrollY = window.pageYOffset;

        if (scrollY > 50) {
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Scroll event listeners
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLink();
        updateNavbarBackground();
    }, 16));

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section comes into view
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Add fade-in classes and observe elements
    const animateElements = document.querySelectorAll(
        '.about-content, .skill-item, .project-card, .timeline-item, .contact-content, .section-title'
    );
    
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Observe sections for animations
    const sections = document.querySelectorAll('.skills, .projects, .experience');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Skill bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            
            setTimeout(() => {
                bar.style.setProperty('--target-width', width + '%');
                bar.style.width = width + '%';
                bar.classList.add('animate');
            }, index * 200);
        });
    }

    // Project demo and code links
    const demoButtons = document.querySelectorAll('.demo-btn');
    const codeButtons = document.querySelectorAll('.code-btn');

    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a demo notification
            showNotification('🚀 Demo functionality - This would open the live project demo!', 'success');
        });
    });

    codeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a code notification
            showNotification('💻 Code repository - This would open the GitHub repository!', 'info');
        });
    });

    // Resume download functionality
    const resumeBtn = document.getElementById('downloadResume');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            showNotification('📄 Resume download initiated - In a real scenario, this would download the resume PDF!', 'success');
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Downloading...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 2000);
        });
    }

    // Contact form handling with success message
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add success message element to form
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = '✅ Message sent successfully! I\'ll get back to you soon.';
        contactForm.insertBefore(successMessage, contactForm.firstChild);

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Validate form
            if (!validateContactForm(name, email, subject, message)) {
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Hide any existing success message
            successMessage.classList.remove('show');
            
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Also show notification
                showNotification('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 2000);
        });
    }

    // Form validation
    function validateContactForm(name, email, subject, message) {
        if (name.length < 2) {
            showNotification('❌ Please enter a valid name (at least 2 characters).', 'error');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showNotification('❌ Please enter a valid email address.', 'error');
            return false;
        }
        
        if (subject.length < 5) {
            showNotification('❌ Please enter a more descriptive subject (at least 5 characters).', 'error');
            return false;
        }
        
        if (message.length < 10) {
            showNotification('❌ Please enter a more detailed message (at least 10 characters).', 'error');
            return false;
        }
        
        return true;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;

        // Add to body
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });

        // Click notification to dismiss
        notification.addEventListener('click', (e) => {
            if (e.target !== closeBtn) {
                removeNotification(notification);
            }
        });
    }

    function removeNotification(notification) {
        if (notification && notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }

    // Social links functionality
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.textContent.trim();
            showNotification(`🔗 Opening ${platform} - This would redirect to the actual ${platform} profile!`, 'info');
        });
    });

    // Contact info interactions
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const heading = item.querySelector('h4').textContent.toLowerCase();
        
        item.addEventListener('click', function() {
            const content = this.querySelector('p').textContent;
            
            if (heading === 'email') {
                window.open(`mailto:${content}`, '_blank');
                showNotification('📧 Opening email client...', 'info');
            } else if (heading === 'phone') {
                window.open(`tel:${content}`, '_blank');
                showNotification('📱 Opening phone app...', 'info');
            } else if (heading === 'location') {
                showNotification('📍 Opening location on map - This would open Google Maps!', 'info');
            }
        });
        
        // Add cursor pointer style
        item.style.cursor = 'pointer';
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add typing effect to hero role
    function typeWriter(element, text, delay = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        
        setTimeout(type, 1000); // Start after 1 second delay
    }

    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        const roleText = heroRole.textContent;
        typeWriter(heroRole, roleText, 120);
    }

    // Parallax effect for hero section (subtle)
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent && scrolled < hero.offsetHeight) {
            const rate = scrolled * -0.2;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    }

    window.addEventListener('scroll', throttle(parallaxScroll, 16));

    // Initialize on page load
    setTimeout(() => {
        updateActiveNavLink();
        updateNavbarBackground();
    }, 100);

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(circle);

        setTimeout(() => {
            if (circle.parentNode) {
                circle.remove();
            }
        }, 600);
    }

    // Add ripple effect to buttons
    const rippleButtons = document.querySelectorAll('.hero-btn, .resume-btn, .submit-btn, .demo-btn, .code-btn');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    });

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Add subtle hover animations
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.project-image img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.project-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Add project action buttons for mobile visibility
    projectCards.forEach(card => {
        const projectInfo = card.querySelector('.project-info');
        const overlay = card.querySelector('.project-overlay');
        
        if (projectInfo && overlay) {
            // Clone overlay buttons to project info for mobile
            const overlayLinks = overlay.querySelector('.project-links');
            if (overlayLinks) {
                const mobileActions = document.createElement('div');
                mobileActions.className = 'project-actions';
                mobileActions.innerHTML = overlayLinks.innerHTML;
                
                // Add event listeners to mobile buttons
                const mobileDemoBtn = mobileActions.querySelector('.demo-btn');
                const mobileCodeBtn = mobileActions.querySelector('.code-btn');
                
                if (mobileDemoBtn) {
                    mobileDemoBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        showNotification('🚀 Demo functionality - This would open the live project demo!', 'success');
                    });
                }
                
                if (mobileCodeBtn) {
                    mobileCodeBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        showNotification('💻 Code repository - This would open the GitHub repository!', 'info');
                    });
                }
                
                projectInfo.appendChild(mobileActions);
            }
        }
    });
});

// CSS for notifications and effects (injected via JavaScript)
const dynamicStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 400px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 10000;
    font-size: 0.9rem;
    cursor: pointer;
}

.notification.show {
    transform: translateX(0);
}

.notification--success {
    background: #27ae60;
    color: white;
    border: 1px solid #2ecc71;
}

.notification--error {
    background: #e74c3c;
    color: white;
    border: 1px solid #c0392b;
}

.notification--info {
    background: #3498db;
    color: white;
    border: 1px solid #2980b9;
}

.notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.notification-message {
    flex: 1;
    line-height: 1.4;
}

.notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
}

.notification-close:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
}

@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
}

.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

.form-success {
    background: rgba(39, 174, 96, 0.1);
    border: 1px solid rgba(39, 174, 96, 0.3);
    color: #27ae60;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    display: none;
    font-weight: 500;
}

.form-success.show {
    display: block;
    animation: slideInDown 0.3s ease;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.project-actions {
    display: none;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--portfolio-border);
    gap: 1rem;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
        transform: translateY(-100%);
    }
    
    .notification.show {
        transform: translateY(0);
    }

    .project-actions {
        display: flex;
    }

    .project-overlay {
        display: none !important;
    }
}
`;

// Inject dynamic styles
if (!document.getElementById('dynamic-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-styles';
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);
}