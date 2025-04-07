// Ensure styles and colors are preserved on Netlify
document.addEventListener('DOMContentLoaded', function() {
  // Add classname to body to indicate JS is loaded
  document.body.classList.add('js-enabled');
  
  // Force reload stylesheet to prevent Netlify optimization issues
  const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
  styleSheets.forEach(sheet => {
    const href = sheet.getAttribute('href');
    if (href && href.includes('styles.css')) {
      const newHref = href + '?v=' + new Date().getTime();
      console.log('Reloading stylesheet:', newHref);
      
      // Create a new stylesheet element
      const newSheet = document.createElement('link');
      newSheet.rel = 'stylesheet';
      newSheet.href = newHref;
      
      // Replace the old stylesheet
      sheet.parentNode?.insertBefore(newSheet, sheet);
      
      // Remove the old stylesheet after a delay
      setTimeout(() => {
        sheet.parentNode?.removeChild(sheet);
      }, 1000);
    }
  });
  
  // Verify critical CSS variables are loaded
  const checkCSSVars = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color');
    const darkBg = rootStyles.getPropertyValue('--dark-bg');
    
    if (!primaryColor || !darkBg) {
      console.warn('CSS variables not loaded properly, applying fallback styles');
      document.body.classList.add('use-fallback-styles');
    } else {
      console.log('CSS variables loaded successfully:', { 
        primaryColor, 
        darkBg 
      });
    }
  };
  
  // Check CSS variables after a short delay
  setTimeout(checkCSSVars, 500);
});

// Navigation Toggle
const navToggle = document.getElementById('navToggle') as HTMLElement;
const navMenu = document.getElementById('navMenu') as HTMLElement;

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Feature Slider
const featureDots = document.querySelectorAll('.feature-dot');
const featureCards = document.querySelectorAll('.feature-card');

featureDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const featureId = (dot as HTMLElement).getAttribute('data-feature');

    // Update active dot
    featureDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    // Update active feature card
    featureCards.forEach(card => {
      card.classList.remove('active');
      if (card.id === featureId) {
        card.classList.add('active');
      }
    });
  });
});

// Auto-rotate features every 5 seconds
let featureIndex = 0;
setInterval(() => {
  featureIndex = (featureIndex + 1) % featureDots.length;
  featureDots[featureIndex].dispatchEvent(new Event('click'));
}, 5000);

// Testimonial Slider
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    // Update active dot
    testimonialDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    // Update active testimonial
    testimonialCards.forEach((card, cardIndex) => {
      card.classList.remove('active');
      if (cardIndex === index) {
        card.classList.add('active');
      }
    });
  });
});

// Auto-rotate testimonials every 7 seconds
let testimonialIndex = 0;
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonialDots.length;
  testimonialDots[testimonialIndex].dispatchEvent(new Event('click'));
}, 7000);

// Modal Functionality
const modalTriggers = document.querySelectorAll('a[href="#checkout"]');
const modal = document.getElementById('checkout') as HTMLElement;
const closeModal = document.querySelector('.close-modal') as HTMLElement;

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Form submission
const orderForm = document.getElementById('order-form') as HTMLFormElement;
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    alert('Thank you for your order! We will process it right away.');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// Scroll animations for elements with data-aos attribute
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
  observer.observe(element);
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === "#checkout") return; // Handled by modal logic

    e.preventDefault();

    const target = document.querySelector(href as string);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
