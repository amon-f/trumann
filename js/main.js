// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  if (typeof cart !== 'undefined') cart.init();
  if (typeof productManager !== 'undefined') productManager.init();
  
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Setup scroll animations
  setupScrollAnimation();
  
  // Handle category filtering from URL hash
  window.addEventListener('hashchange', handleHashChange);  
  handleHashChange(); // Initial check
});

// Handle category filtering from URL hash
function handleHashChange() {
  const hash = window.location.hash.substring(1);
  if (hash.startsWith('category-') && typeof productManager !== 'undefined') {
    const category = hash.replace('category-', '');
    productManager.renderProducts(category);
  }
}

// Setup scroll animations
function setupScrollAnimation() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('animate');
      }
    });
  };

  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', () => {
    // Add shadow to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    
    animateOnScroll();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
