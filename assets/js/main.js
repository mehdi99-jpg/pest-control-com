// ===================================

let currentSlide = 0;
let slideInterval;
const SLIDE_DURATION = 5000; // 5 seconds per slide

// Initialize Hero Slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure AOS doesn't interfere
    setTimeout(initHeroSlider, 100);
});

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remove all AOS attributes from slides to prevent conflicts
    slides.forEach(slide => {
        const heroContent = slide.querySelector('.hero-content');
        if (heroContent) {
            const elements = heroContent.querySelectorAll('[data-aos]');
            elements.forEach(el => {
                el.removeAttribute('data-aos');
                el.removeAttribute('data-aos-delay');
            });
        }
    });
    
    // Set first slide as active
    slides[0].classList.add('active');
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    
    // Start automatic sliding
    startAutoSlide();
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });
    
    // Pause slider on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slideIndex === currentSlide) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('prev');
    
    // Remove prev class after animation
    setTimeout(() => {
        slides[currentSlide].classList.remove('prev');
    }, 1000);
    
    // Update current slide index
    currentSlide = slideIndex;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function previousSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
}

function startAutoSlide() {
    clearInterval(slideInterval); // Clear any existing interval
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
}

function pauseAutoSlide() {
    clearInterval(slideInterval);
}

function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
}

function handleKeyboardNavigation(e) {
    const slides = document.querySelectorAll('.hero-slide');
    
    if (slides.length === 0) return;
    
    // Left arrow - previous slide
    if (e.key === 'ArrowLeft') {
        previousSlide();
        resetAutoSlide();
    }
    
    // Right arrow - next slide
    if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
    }
}

// ===================================
// ANIMATION INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===================================
// MOBILE MENU TOGGLE - FIXED VERSION
// ===================================
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle menu on burger click
burger.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    
    // Animate burger icon
    const icon = burger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = burger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnBurger = burger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnBurger && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = burger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FORM VALIDATION & SUBMISSION (UPDATED)
// ===================================
const contactForm = document.getElementById('contactForm');
const messageContainer = document.getElementById('formMessage'); // Targets your empty div

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 1. Get form values
        const name = document.getElementById('name').value.trim();
        const phoneInput = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        
        // Remove spaces and dashes from phone for validation
        const cleanPhone = phoneInput.replace(/[\s-]/g, '');
        
        // 2. Check for errors
        let errors = [];
        
        if (name.length < 2) {
            errors.push("Veuillez entrer un nom valide.");
        }
        
        const phoneRegex = /^(?:(?:\+|00)212|0)[5-7]\d{8}$/;
        if (!phoneRegex.test(cleanPhone)) {
            errors.push("Veuillez entrer un numéro marocain valide (ex: 0612345678).");
        }
        
        if (email.length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push("Veuillez entrer une adresse email valide.");
            }
        }
        
        if (service === '') {
            errors.push("Veuillez sélectionner un type de service.");
        }
        
        // 3. Show errors inside the form (NO ALERTS)
        if (errors.length > 0) {
            messageContainer.innerHTML = `
                <div class="form-error" style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px; padding: 15px; border-radius: 8px; background-color: rgba(233, 69, 96, 0.1); border: 1px solid #e94560; color: #e94560;">
                    <i class="fas fa-exclamation-circle" style="font-size: 1.5rem;"></i>
                    <div>${errors.join('<br>')}</div>
                </div>
            `;
            return; // Stop here, don't send the email
        }
        
        // 4. If no errors, prepare to send
        messageContainer.innerHTML = '';
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;
        
        // 5. Send via EmailJS using your real keys
        emailjs.sendForm('service_ckhwl17', 'template_bd5atng', this)
            .then(function() {
                // Show success message inline
                messageContainer.innerHTML = `
                    <div class="form-success" style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px; padding: 15px; border-radius: 8px; background-color: rgba(46, 196, 182, 0.1); border: 1px solid #2ec4b6; color: #2ec4b6;">
                        <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
                        <div>Votre message a été envoyé avec succès ! Nous vous répondrons très vite.</div>
                    </div>
                `;
                
                contactForm.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;

                // Remove the success message after 5 seconds
                setTimeout(function() {
                    messageContainer.innerHTML = '';
                }, 5000);
                
            }, function(error) {
                // Show EmailJS error inline
                messageContainer.innerHTML = `
                    <div class="form-error" style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px; padding: 15px; border-radius: 8px; background-color: rgba(233, 69, 96, 0.1); border: 1px solid #e94560; color: #e94560;">
                        <i class="fas fa-times-circle" style="font-size: 1.5rem;"></i>
                        <div>L'envoi a échoué. Veuillez réessayer ou nous contacter directement.</div>
                    </div>
                `;
                console.error("EmailJS Error:", error);
                
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
    });
}

// ===================================
// REAL-TIME FORM FIELD VALIDATION
// ===================================
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');
const emailField = document.getElementById('email');

// Add visual feedback for valid/invalid fields
function addValidationFeedback(field, isValid) {
    if (isValid) {
        field.style.borderColor = '#2ec4b6'; // Teal (Success)
    } else {
        field.style.borderColor = '#e94560'; // Red (Error)
    }
}

if (nameField) {
    nameField.addEventListener('blur', function() {
        const isValid = this.value.trim().length >= 2;
        addValidationFeedback(this, isValid);
    });
}

if (phoneField) {
    phoneField.addEventListener('blur', function() {
        // Updated regex to exactly match the one used in form submission
        const phoneRegex = /^(?:(?:\+|00)212|0)[5-7]\d{8}$/;
        const isValid = phoneRegex.test(this.value.replace(/[\s-]/g, ''));
        addValidationFeedback(this, isValid);
    });
}

if (emailField) {
    emailField.addEventListener('blur', function() {
        if (this.value.trim().length === 0) {
            this.style.borderColor = ''; // Reset if empty (since it's not required)
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(this.value);
        addValidationFeedback(this, isValid);
    });
}

// Reset border color on focus
[nameField, phoneField, emailField].forEach(field => {
    if (field) {
        field.addEventListener('focus', function() {
            this.style.borderColor = '';
        });
    }
});


// ===================================
// WHATSAPP INTEGRATION
// ===================================
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const phoneNumber = '212660258377'; 
        const message = encodeURIComponent('Bonjour ! Je souhaite avoir des informations sur vos services.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
    });
}
// ===================================
// SCROLL TO TOP FUNCTIONALITY
// ===================================
let scrollToTopButton;

// Create scroll to top button (optional enhancement)
function createScrollToTopButton() {
    scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0f3460, #16213e);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(15, 52, 96, 0.3);
        transition: all 0.3s ease;
        z-index: 998;
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.background = 'linear-gradient(135deg, #e94560, #d63447)';
    });
    
    scrollToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.background = 'linear-gradient(135deg, #0f3460, #16213e)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===================================
// PERFORMANCE: LAZY LOADING IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ===================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ===================================
// CONSOLE MESSAGE (OPTIONAL)
// ===================================
console.log('%c🛡️ Home Shield - Pest Control Services', 'color: #0f3460; font-size: 20px; font-weight: bold;');
console.log('%cWebsite developed with modern web technologies', 'color: #666; font-size: 12px;');


// automated email// automated emails
const contactFormEmail = document.getElementById('contactForm');

if (contactFormEmail) {
    contactFormEmail.addEventListener('submit', function(event) {
        event.preventDefault();

        const successDiv = document.getElementById('formSuccess');

        emailjs.sendForm('service_ckhwl17', 'template_bd5atng', this)
            .then(function() {
                // Show success
                successDiv.className = 'form-success';
                successDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Votre message a été envoyé avec succès ! Nous vous répondrons dans les 24 heures.</p>
                `;
                successDiv.style.display = 'flex';
                contactFormEmail.reset();

                // Hide after 5 seconds
                setTimeout(function() {
                    successDiv.style.display = 'none';
                }, 5000);

            }, function(error) {
                // Show error
                successDiv.className = 'form-error';
                successDiv.innerHTML = `
                    <i class="fas fa-times-circle"></i>
                    <p>L'envoi a échoué. Veuillez réessayer ou nous contacter directement.</p>
                `;
                successDiv.style.display = 'flex';
            });
    });
}






