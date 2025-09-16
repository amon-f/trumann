// Product functionality
class ProductManager {
  constructor() {
    this.products = [];
    this.init();
  }

  async init() {
    // In a real app, you would fetch products from an API
    this.products = window.products || [];
    this.setupEventListeners();
    this.renderProducts();
    this.renderFeaturedProducts();
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category) {
    if (!category) return this.products;
    return this.products.filter(product => product.category === category);
  }

  getFeaturedProducts(limit = 4) {
    return this.products
      .filter(product => product.featured)
      .slice(0, limit);
  }

  renderProducts(category = null) {
    const container = document.getElementById('product-list');
    if (!container) return;

    const filteredProducts = this.getProductsByCategory(category);
    
    if (filteredProducts.length === 0) {
      container.innerHTML = this.getNoProductsTemplate();
      return;
    }

    container.innerHTML = filteredProducts.map(product => this.getProductCardTemplate(product)).join('');
    this.attachProductEventListeners();
  }

  renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featuredProducts = this.getFeaturedProducts();
    container.innerHTML = featuredProducts.map(product => this.getFeaturedProductTemplate(product)).join('');
    this.attachProductEventListeners();
  }

  showProductDetails(productId) {
    const product = this.getProductById(productId);
    if (!product) return;

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    const modalBody = document.querySelector('#productModal .modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = this.getProductModalTemplate(product);
    this.attachModalEventListeners();
    modal.show();
  }

  // Template methods
  getNoProductsTemplate() {
    return `
      <div class="col-12 text-center py-5">
        <i class="bi bi-emoji-frown fs-1 text-muted"></i>
        <h3 class="mt-3">No products found</h3>
        <p class="text-muted">We couldn't find any products matching your criteria.</p>
        <a href="/" class="btn btn-primary mt-3">Browse All Products</a>
      </div>
    `;
  }

  getProductCardTemplate(product) {
    return `
      <div class="col-md-4 mb-4 animate-on-scroll" data-aos="fade-up">
        <div class="product-card h-100">
          ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
          <div class="product-image-container">
            <img 
              src="${product.image}" 
              class="product-image" 
              alt="${product.alt}"
              loading="lazy"
            >
            <div class="product-overlay">
              <button 
                class="btn btn-outline-light btn-sm quick-view" 
                data-id="${product.id}"
              >
                <i class="bi bi-eye me-1"></i> Quick View
              </button>
            </div>
          </div>
          <div class="product-body">
            <div class="product-category text-uppercase small text-muted">
              ${product.category}
            </div>
            <h3 class="product-title">${product.name}</h3>
            
            <div class="product-rating mb-2">
              ${this.getRatingStars(product.rating)}
              <span class="ms-2 text-muted small">(${product.rating})</span>
            </div>
            
            <div class="product-price">${this.formatPrice(product.price)}</div>
            
            <div class="product-actions mt-auto">
              <button 
                class="btn btn-primary btn-sm w-100 add-to-cart" 
                data-id="${product.id}"
              >
                <i class="bi bi-cart-plus me-1"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getFeaturedProductTemplate(product) {
    return `
      <div class="col-md-3 col-6 mb-4">
        <div class="product-card h-100">
          <div class="product-image-container">
            <img 
              src="${product.image}" 
              class="product-image" 
              alt="${product.alt}"
              loading="lazy"
            >
          </div>
          <div class="product-body text-center">
            <h3 class="product-title h5">${product.name}</h3>
            <div class="product-price text-primary fw-bold">${this.formatPrice(product.price)}</div>
            <button 
              class="btn btn-outline-primary btn-sm mt-2 add-to-cart" 
              data-id="${product.id}"
            >
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  getProductModalTemplate(product) {
    return `
      <div class="row">
        <div class="col-md-6">
          <div class="position-relative mb-3" style="height: 400px; overflow: hidden; border-radius: 8px; border: 1px solid var(--color-border);">
            <img 
              src="${product.image}" 
              class="img-fluid w-100 h-100" 
              alt="${product.alt}"
              style="object-fit: cover; transition: transform 0.3s ease;"
              id="main-product-image"
            >
            ${product.discount ? `
              <span class="position-absolute top-0 start-0 m-2 badge bg-danger">
                ${product.discount}% OFF
              </span>
            ` : ''}
          </div>
          <div class="d-flex gap-2 flex-wrap">
            ${[product.image, ...(product.additionalImages || [])].slice(0, 4).map((img, index) => `
              <div class="position-relative" style="width: 80px; height: 80px;">
                <img 
                  src="${img}" 
                  class="img-thumbnail h-100 w-100" 
                  style="object-fit: cover; cursor: pointer; ${index === 0 ? 'border-color: var(--color-primary);' : ''}"
                  onmouseenter="document.getElementById('main-product-image').src = this.src; this.parentNode.classList.add('border-primary')"
                  onmouseleave="this.parentNode.classList.remove('border-primary')"
                  alt="${product.name}"
                >
              </div>
            `).join('')}
          </div>
        </div>
        <div class="col-md-6">
          <h3 class="mb-2">${product.name}</h3>
          <div class="d-flex align-items-center mb-3">
            <div class="text-warning me-2">
              ${this.getRatingStars(product.rating)}
            </div>
            <span class="text-muted small">(${product.rating}) | ${product.reviewCount || '0'} reviews</span>
          </div>
          
          <div class="d-flex align-items-center mb-4">
            <h4 class="text-primary mb-0 me-2">${this.formatPrice(product.price)}</h4>
            ${product.originalPrice ? `<del class="text-muted small">${this.formatPrice(product.originalPrice)}</del>` : ''}
            ${product.discount ? `<span class="badge bg-danger ms-2">${product.discount}% OFF</span>` : ''}
          </div>
          
          <div class="mb-4">
            <h5 class="h6 mb-2">Description:</h5>
            <p>${product.description}</p>
          </div>
          
          ${product.materials ? `
            <div class="mb-4">
              <h5 class="h6 mb-2">Materials:</h5>
              <ul class="list-unstyled small">
                ${product.materials.map(material => `<li>• ${material}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${product.specifications ? `
            <div class="mb-4">
              <h5 class="h6 mb-2">Specifications:</h5>
              <div class="row small">
                ${Object.entries(product.specifications).map(([key, value]) => `
                  <div class="col-6 mb-1">
                    <span class="text-muted">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                    <span class="ms-1">${value}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${product.careInstructions ? `
            <div class="alert alert-light border small">
              <h6 class="alert-heading mb-2">Care Instructions:</h6>
              <ul class="mb-0">
                ${product.careInstructions.map(instruction => `<li>${instruction}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${product.sizes && product.sizes.length > 0 ? `
            <div class="mb-4">
              <h5 class="h6 mb-2">Size:</h5>
              <div class="d-flex flex-wrap gap-2">
                ${product.sizes.map((size, index) => `
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="size-${product.id}" 
                      id="size-${product.id}-${index}" 
                      value="${size}" 
                      ${index === 0 ? 'checked' : ''}
                    >
                    <label class="form-check-label" for="size-${product.id}-${index}">
                      ${size}
                    </label>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${product.colors && product.colors.length > 0 ? `
            <div class="mb-4">
              <h5 class="h6 mb-2">Color:</h5>
              <div class="d-flex flex-wrap gap-2">
                ${product.colors.map((color, index) => `
                  <div class="form-check">
                    <input 
                      class="form-check-input d-none" 
                      type="radio" 
                      name="color-${product.id}" 
                      id="color-${product.id}-${index}" 
                      data-color="${color}"
                      ${index === 0 ? 'checked' : ''}
                    >
                    <label 
                      class="form-check-label color-swatch" 
                      for="color-${product.id}-${index}"
                      style="width: 30px; height: 30px; border-radius: 50%; background-color: ${color}; display: inline-block; border: 2px solid transparent; cursor: pointer;"
                      title="${color}"
                    ></label>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-items-center">
              <span class="me-3">Quantity:</span>
              <div class="input-group" style="max-width: 150px;">
                <button class="btn btn-outline-secondary" type="button" id="quantity-decrease-${product.id}">-</button>
                <input 
                  type="number" 
                  class="form-control text-center" 
                  value="1" 
                  min="1" 
                  id="product-quantity-${product.id}"
                >
                <button class="btn btn-outline-secondary" type="button" id="quantity-increase-${product.id}">+</button>
              </div>
            </div>
            
            <div class="d-flex gap-2">
              <button 
                class="btn btn-primary flex-grow-1 add-to-cart py-3" 
                data-id="${product.id}"
              >
                <i class="bi bi-cart-plus me-2"></i> Add to Cart - ${this.formatPrice(product.price)}
              </button>
              <button class="btn btn-outline-secondary" style="width: 50px;">
                <i class="bi bi-heart"></i>
              </button>
            </div>
            
            <div class="border-top pt-3">
              <div class="d-flex align-items-center text-muted small mb-2">
                <i class="bi bi-truck me-2"></i>
                <span>Free shipping on orders over $50</span>
              </div>
              <div class="d-flex align-items-center text-muted small">
                <i class="bi bi-arrow-return-left me-2"></i>
                <span>Free returns within 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getColorOptionsTemplate(colors) {
    if (!colors || colors.length === 0) return '';
    
    return `
      <div class="mb-4">
        <h5 class="h6">Colors:</h5>
        <div class="d-flex gap-2">
          ${colors.map(color => `
            <div 
              class="color-option" 
              style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;"
              title="${color}"
            ></div>
          `).join('')}
        </div>
      </div>
    `;
  }

  getSizeOptionsTemplate(sizes) {
    if (!sizes || sizes.length === 0) return '';
    
    return `
      <div class="mb-4">
        <label class="form-label">Size:</label>
        <div class="btn-group w-100" role="group">
          ${sizes.map((size, index) => `
            <input 
              type="radio" 
              class="btn-check" 
              name="size" 
              id="size-${size}" 
              autocomplete="off"
              ${index === 0 ? 'checked' : ''}
            >
            <label class="btn btn-outline-secondary" for="size-${size}">${size}</label>
          `).join('')}
        </div>
      </div>
    `;
  }

  getRatingStars(rating) {
    return Array(5).fill('').map((_, i) => 
      i < Math.floor(rating) 
        ? '<i class="bi bi-star-fill"></i>'
        : i < rating 
          ? '<i class="bi bi-star-half"></i>'
          : '<i class="bi bi-star"></i>'
    ).join('');
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  }

  // Event handlers
  setupEventListeners() {
    // Handle show product details event
    document.addEventListener('showProductDetails', (e) => {
      const { productId } = e.detail;
      this.showProductDetails(productId);
    });
    
    // Handle color swatch selection
    document.addEventListener('click', (e) => {
      const colorSwatch = e.target.closest('.color-swatch');
      if (colorSwatch) {
        const input = document.getElementById(colorSwatch.getAttribute('for'));
        if (input) {
          // Update active state
          document.querySelectorAll(`input[name="${input.name}"]`).forEach(radio => {
            const label = document.querySelector(`label[for="${radio.id}"]`);
            if (label) {
              label.style.borderColor = radio === input ? '#6C5B7B' : 'transparent';
            }
          });
        }
      }
    });
  }

  attachProductEventListeners() {
    // Add any additional product-specific event listeners here
  }

  attachModalEventListeners() {
    // Quantity controls
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.getElementById('quantity-decrease');
    const increaseBtn = document.getElementById('quantity-increase');

    if (decreaseBtn && quantityInput) {
      decreaseBtn.addEventListener('click', () => {
        const value = parseInt(quantityInput.value) - 1;
        if (value >= 1) quantityInput.value = value;
      });
    }

    if (increaseBtn && quantityInput) {
      increaseBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });
    }
  }
}

// Initialize product manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Make products available globally
  if (!window.products) {
    // In a real app, this would come from an API
    window.products = [];
  }
  
  window.productManager = new ProductManager();
});
