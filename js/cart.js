// Cart functionality
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.modal = new bootstrap.Modal(document.getElementById('cartModal'));
    this.init();
  }

  init() {
    this.updateCartUI();
    this.setupEventListeners();
    this.setupModalEventListeners();
  }
  
  setupModalEventListeners() {
    const modal = document.getElementById('cartModal');
    if (modal) {
      modal.addEventListener('shown.bs.modal', () => this.updateCartUI());
    }
  }

  addItem(product, quantity = 1, size = null, color = null) {
    const existingItem = this.items.find(item => 
      item.id === product.id && 
      item.size === size && 
      item.color === color
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: size,
        color: color
      });
    }

    this.save();
    this.updateCartCount();
    this.showToast(`${product.name} added to cart`, 'success');
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
    this.updateCartCount();
    this.showToast('Item removed from cart', 'info');
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.save();
      this.updateCartCount();
    }
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateCartUI() {
    const count = this.getTotalItems();
    const cartBadge = document.querySelector('.cart-badge');
    const cartCount = document.getElementById('cart-count');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartItemsBody = document.getElementById('cart-items-body');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartWithItems = document.getElementById('cart-with-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart badge
    if (cartBadge) {
      cartBadge.setAttribute('data-count', count);
      cartBadge.classList.toggle('has-items', count > 0);
    }
    
    // Update cart count in header
    if (cartCount) cartCount.textContent = count;
    if (cartItemCount) cartItemCount.textContent = count;
    
    // Calculate totals
    const subtotal = this.getTotalPrice();
    if (cartSubtotal) cartSubtotal.textContent = this.formatPrice(subtotal);
    if (cartTotal) cartTotal.textContent = this.formatPrice(subtotal);
    
    // Toggle cart states
    if (count === 0) {
      if (emptyCartMessage) emptyCartMessage.classList.remove('d-none');
      if (cartWithItems) cartWithItems.classList.add('d-none');
    } else {
      if (emptyCartMessage) emptyCartMessage.classList.add('d-none');
      if (cartWithItems) cartWithItems.classList.remove('d-none');
      if (cartItemsBody) {
        cartItemsBody.innerHTML = this.items.map(item => this.getCartItemTemplate(item)).join('');
        this.attachCartItemEventListeners();
      }
    }
  }
  
  getCartItemTemplate(item) {
    const total = item.price * item.quantity;
    const product = window.products.find(p => p.id === item.id) || {};
    
    return `
      <tr data-id="${item.id}" class="cart-item">
        <!-- Product Image -->
        <td class="ps-3">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="img-fluid rounded"
            style="width: 80px; height: 80px; object-fit: cover;"
          >
        </td>
        
        <!-- Product Details -->
        <td>
          <h6 class="mb-1 fw-normal">${item.name}</h6>
          ${item.size ? `<div class="text-muted small">Size: ${item.size}</div>` : ''}
          ${item.color ? `
            <div class="d-flex align-items-center mt-1">
              <span class="text-muted small me-2">Color:</span>
              <span class="d-inline-block rounded-circle border border-2 border-white shadow-sm" 
                    style="width: 16px; height: 16px; background-color: ${item.color}"></span>
            </div>` : ''}
        </td>
        
        <!-- Quantity Controls -->
        <td class="text-center">
          <div class="d-flex align-items-center justify-content-center">
            <button class="btn btn-sm btn-outline-secondary update-quantity" 
                    data-action="decrease" 
                    data-id="${item.id}" 
                    aria-label="Decrease quantity">
              <i class="bi bi-dash"></i>
            </button>
            <input 
              type="number" 
              class="form-control form-control-sm text-center mx-1" 
              value="${item.quantity}" 
              min="1" 
              data-id="${item.id}"
              style="width: 50px;"
              aria-label="Quantity"
            >
            <button class="btn btn-sm btn-outline-secondary update-quantity" 
                    data-action="increase" 
                    data-id="${item.id}"
                    aria-label="Increase quantity">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </td>
        
        <!-- Price -->
        <td class="text-end pe-4">
          <div class="fw-medium">${this.formatPrice(item.price)}</div>
          <div class="text-muted small">${this.formatPrice(item.price)} each</div>
        </td>
        
        <!-- Total -->
        <td class="text-end pe-3 fw-medium">
          ${this.formatPrice(total)}
        </td>
        
        <!-- Remove -->
        <td class="text-center">
          <button class="btn btn-link text-danger p-0 remove-item" 
                  data-id="${item.id}"
                  aria-label="Remove item">
            <i class="bi bi-x-lg"></i>
          </button>
        </td>
      </tr>
    `;
  }
  
  attachCartItemEventListeners() {
    // Quantity controls
    document.querySelectorAll('.update-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.getAttribute('data-action');
        const itemId = parseInt(button.getAttribute('data-id'));
        const input = document.querySelector(`input[data-id="${itemId}"]`);
        
        if (input) {
          let quantity = parseInt(input.value) || 1;
          
          if (action === 'increase') {
            quantity++;
          } else if (action === 'decrease' && quantity > 1) {
            quantity--;
          }
          
          input.value = quantity;
          this.updateQuantity(itemId, quantity);
        }
      });
    });
    
    // Handle direct input changes
    document.querySelectorAll('input[data-id]').forEach(input => {
      input.addEventListener('change', (e) => {
        const itemId = parseInt(input.getAttribute('data-id'));
        const quantity = Math.max(1, parseInt(input.value) || 1);
        input.value = quantity; // Ensure it's at least 1
        this.updateQuantity(itemId, quantity);
      });
    });

    // Remove item
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = parseInt(button.getAttribute('data-id'));
        this.removeItem(productId);
      });
    });
  }

  showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast show align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    // Set toast content
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center">
          <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-info-circle'} me-2"></i>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Initialize Bootstrap toast
    const bsToast = new bootstrap.Toast(toast, { 
      autohide: true, 
      delay: type === 'success' ? 3000 : 5000 
    });
    
    // Show toast
    bsToast.show();
    
    // Handle toast removal
    const removeToast = () => {
      if (toast && toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    };
    
    // Auto-hide after delay
    const hideTimeout = setTimeout(() => {
      if (bsToast._element) {
        bsToast.hide();
      }
    }, type === 'success' ? 3000 : 5000);
    
    // Handle close button
    const closeBtn = toast.querySelector('[data-bs-dismiss="toast"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        bsToast.hide();
      });
    }
    
    // Clean up on hide
    toast.addEventListener('hidden.bs.toast', () => {
      clearTimeout(hideTimeout);
      removeToast();
    });
  }

  setupEventListeners() {
    // Handle add to cart event
    document.addEventListener('addToCart', (e) => {
      const { product, quantity = 1, size = null, color = null } = e.detail;
      
      // If product is just an ID, find the full product object
      const productObj = typeof product === 'number' 
        ? window.products.find(p => p.id === product)
        : product;
      
      if (productObj) {
        this.addItem(productObj, quantity, size, color);
        
        // Show success message
        const toast = new bootstrap.Toast(document.getElementById('addedToCartToast'));
        const toastTitle = document.getElementById('toastProductTitle');
        const toastImage = document.getElementById('toastProductImage');
        
        if (toastTitle) toastTitle.textContent = productObj.name;
        if (toastImage) toastImage.src = productObj.image;
        
        toast.show();
      }
    });
    
    // Handle remove from cart
    document.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.remove-item');
      if (removeBtn) {
        e.preventDefault();
        const itemId = parseInt(removeBtn.dataset.id);
        this.removeItem(itemId);
      }
    });
    
    // Handle quantity updates
    document.addEventListener('click', (e) => {
      const qtyBtn = e.target.closest('.update-quantity');
      if (qtyBtn) {
        e.preventDefault();
        const action = qtyBtn.dataset.action;
        const itemId = parseInt(qtyBtn.dataset.id);
        const input = document.querySelector(`input[data-id="${itemId}"]`);
        
        if (input) {
          let qty = parseInt(input.value) || 1;
          
          if (action === 'increase') {
            qty++;
          } else if (action === 'decrease' && qty > 1) {
            qty--;
          }
          
          input.value = qty;
          this.updateQuantity(itemId, qty);
        }
      }
    });
    
    // Handle direct input changes
    document.addEventListener('change', (e) => {
      const qtyInput = e.target;
      if (qtyInput.matches('input[data-id]')) {
        const itemId = parseInt(qtyInput.dataset.id);
        const qty = Math.max(1, parseInt(qtyInput.value) || 1);
        qtyInput.value = qty; // Ensure it's at least 1
        this.updateQuantity(itemId, qty);
      }
    });
  }

  setupEventListeners() {
// Handle add to cart event
document.addEventListener('addToCart', (e) => {
  const { product, quantity = 1, size = null, color = null } = e.detail;
  
  // If product is just an ID, find the full product object
  const productObj = typeof product === 'number' 
    ? window.products.find(p => p.id === product)
    : product;
  
  if (productObj) {
    this.addItem(productObj, quantity, size, color);
    
    // Show success message
    const toast = new bootstrap.Toast(document.getElementById('addedToCartToast'));
    const toastTitle = document.getElementById('toastProductTitle');
    const toastImage = document.getElementById('toastProductImage');
    
    if (toastTitle) toastTitle.textContent = productObj.name;
    if (toastImage) toastImage.src = productObj.image;
    
    toast.show();
  }
});

// Handle remove from cart
document.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.remove-item');
  if (removeBtn) {
    e.preventDefault();
    const itemId = parseInt(removeBtn.dataset.id);
    this.removeItem(itemId);
  }
});

// Handle quantity updates
document.addEventListener('click', (e) => {
  const qtyBtn = e.target.closest('.update-quantity');
  if (qtyBtn) {
    e.preventDefault();
    const action = qtyBtn.dataset.action;
    const itemId = parseInt(qtyBtn.dataset.id);
    const input = document.querySelector(`input[data-id="${itemId}"]`);
    
    if (input) {
      let qty = parseInt(input.value) || 1;
      
      if (action === 'increase') {
        qty++;
      } else if (action === 'decrease' && qty > 1) {
        qty--;
      }
      
      input.value = qty;
      this.updateQuantity(itemId, qty);
    }
  }
});

// Handle direct input changes
document.addEventListener('change', (e) => {
  const qtyInput = e.target;
  if (qtyInput.matches('input[data-id]')) {
    const itemId = parseInt(qtyInput.dataset.id);
    const qty = Math.max(1, parseInt(qtyInput.value) || 1);
    qtyInput.value = qty; // Ensure it's at least 1
    this.updateQuantity(itemId, qty);
  }
});

}

// Initialize cart when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
    
    // Initialize cart modal
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
      cartModal.addEventListener('show.bs.modal', () => {
        window.cart.updateCartUI();
      });
    }
    
    // Handle checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
        if (window.cart.getTotalItems() === 0) {
          e.preventDefault();
          window.cart.showToast('Your cart is empty', 'warning');
        }
      });
    }
  });
}
