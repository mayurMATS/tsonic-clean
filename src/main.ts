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
