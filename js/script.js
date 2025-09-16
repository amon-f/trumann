// DOM Elements
const dom = {
  year: document.getElementById('year'),
  cartCount: document.getElementById('cart-count'),
  cartItems: document.getElementById('cart-items'),
  productList: document.getElementById('product-list'),
  cartModal: new bootstrap.Modal(document.getElementById('cartModal')),
  productModal: new bootstrap.Modal(document.getElementById('productModal')),
  cartTotal: document.getElementById('cart-total'),
  cartBadge: document.querySelector('.cart-badge')
};

// State
const state = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  products: []
};

// Initialize the application
function init() {
  setYear();
  setupEventListeners();
  loadProducts();
  updateCartUI();
  setupScrollAnimation();
}

// Set current year in footer
function setYear() {
  dom.year.textContent = new Date().getFullYear();
}

// Setup event listeners
function setupEventListeners() {
  // Cart toggle
  document.querySelector('.cart-toggle')?.addEventListener('click', () => {
    dom.cartModal.show();
  });

  // Close modal when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      bootstrap.Modal.getInstance(e.target)?.hide();
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
  });
}

// Smooth scroll function
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  if (targetId === '#') return;
  
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
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
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
    animateOnScroll();
  });
}

// Product data with enhanced structure
const products = [
  // Men's Shoes
  {
    id: 1,
    category: "men",
    name: "Nike AirMax",
    description: "Experience ultimate comfort and style with the iconic AirMax design.",
    price: 3500,
    image: "assets/img/sneaker1.png",
    alt: "Nike AirMax",
    rating: 4.5,
    colors: ["#2c3e50", "#7f8c8d", "#e74c3c"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    category: "men",
    name: "Adidas Ultraboost",
    description: "Revolutionary running shoes with responsive cushioning.",
    price: 8900,
    image: "assets/img/men_ultraboost.png",
    alt: "Adidas Ultraboost",
    rating: 4.8,
    colors: ["#000000", "#ffffff", "#0066cc"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    featured: true
  },
  {
    id: 3,
    category: "men",
    name: "Puma RS-X",
    description: "Bold retro-futuristic design meets modern comfort.",
    price: 7200,
    image: "assets/img/men_puma.png",
    alt: "Puma RS-X",
    rating: 4.3,
    colors: ["#000000", "#ff3366", "#00cc99"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    inStock: true,
    featured: false
  },
  {
    id: 4,
    category: "men",
    name: "Monkstory Urban Street Sneakers",
    description: "Classic design with premium leather construction.",
    price: 9500,
    image: "assets/img/sneaker2.png",
    alt: "Urban Street Sneakers",
    rating: 4.6,
    colors: ["#1a3e72", "#8b5a2b", "#333333"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    featured: true
  },
  {
    id: 5,
    category: "men",
    name: "Classic Leather Sneakers",
    description: "Timeless design that pairs with any outfit.",
    price: 12000,
    image: "assets/img/sneaker3.png",
    alt: "Classic Style Sneakers",
    rating: 4.7,
    colors: ["#ffffff", "#000000", "#c0c0c0"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    featured: true
  },

  // Women's Shoes
  {
    id: 6,
    category: "women",
    name: "Nike Air Force 1",
    description: "The legend lives on in this iconic basketball classic.",
    price: 6500,
    image: "assets/img/women_airforce1.png",
    alt: "Nike Air Force 1",
    rating: 4.7,
    colors: ["#ffffff", "#000000", "#ff6b6b"],
    sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
    inStock: true,
    featured: true
  },
  {
    id: 7,
    category: "women",
    name: "Adidas Superstar",
    description: "The iconic shell-toe design that started a sneaker revolution.",
    price: 7000,
    image: "assets/img/women_superstar.png",
    alt: "Adidas Superstar",
    rating: 4.8,
    colors: ["#ffffff", "#000000", "#ff0000"],
    sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
    inStock: true,
    featured: true
  },
  {
    id: 8,
    category: "women",
    name: "Converse Chuck Taylor",
    price: 4800,
    image: "assets/img/women_converse.png",
    alt: "Converse Chuck Taylor"
  },
  {
    id: 9,
    category: "women",
    name: "Vans Old Skool",
    price: 5200,
    image: "assets/img/women_vans.png",
    alt: "Vans Old Skool"
  },
  {
    id: 10,
    category: "women",
    name: "Reebok Classic",
    price: 5900,
    image: "assets/img/women_reebok.png",
    alt: "Reebok Classic"
  },

  // Kids' Shoes
  {
    id: 11,
    category: "kids",
    name: "Nike Kids Revolution",
    price: 3500,
    image: "assets/img/kids_nike.png",
    alt: "Nike Kids Revolution"
  },
  {
    id: 12,
    category: "kids",
    name: "Adidas Kids Lite Racer",
    price: 4000,
    image: "assets/img/kids_adidas.png",
    alt: "Adidas Kids Lite Racer"
  },
  {
    id: 13,
    category: "kids",
    name: "Puma Kids Smash",
    price: 3200,
    image: "assets/img/kids_puma.png",
    alt: "Puma Kids Smash"
  },
  {
    id: 14,
    category: "kids",
    name: "Skechers Kids Flex",
    price: 3700,
    image: "assets/img/kids_skechers.png",
    alt: "Skechers Kids Flex"
  },
  {
    id: 15,
    category: "kids",
    name: "New Balance Kids 574",
    price: 4100,
    image: "assets/img/kids_newbalance.png",
    alt: "New Balance Kids 574"
  }
];

// Utility to get category from hash
function getCategoryFromHash() {
  if (window.location.hash === "#shop-men") return "men";
  if (window.location.hash === "#shop-women") return "women";
  if (window.location.hash === "#shop-kids") return "kids";
  return null;
}

// Render products to the page based on category or all
function renderProducts(category = null) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = "";
  let filtered = category ? products.filter(p => p.category === category) : products;
  filtered.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm text-center">
        <img src="${product.image}" class="card-img-top" alt="${product.alt}">
        <div class="card-body">
          <h3 class="card-title text-navy">${product.name}</h3>
          <p class="price">KSh ${product.price.toLocaleString()}</p>
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });
  attachAddToCartEvents();
}

// Cart logic
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

// Attach add-to-cart events after rendering
function attachAddToCartEvents() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      const product = products.find(p => p.id === id);
      const cartItem = cart.find(item => item.id === id);
      if (cartItem) {
        cartItem.qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      updateCart();
    });
  });
}

// Update cart display
function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>
        <strong>${item.name}</strong> <br>
        <small>KSh ${item.price.toLocaleString()} x ${item.qty}</small>
      </div>
      <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">&times;</button>
    </div>
  `).join('');
  // Remove item event
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      cart = cart.filter(item => item.id !== id);
      updateCart();
    });
  });
}

// Checkout button event
document.getElementById('checkout-btn').addEventListener('click', function() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Checkout is not implemented in this demo.");
});

// Navigation category links
document.querySelectorAll('.category-card a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    if (this.textContent.includes("Men")) {
      window.location.hash = "#shop-men";
      renderProducts("men");
    } else if (this.textContent.includes("Women")) {
      window.location.hash = "#shop-women";
      renderProducts("women");
    } else if (this.textContent.includes("Kids")) {
      window.location.hash = "#shop-kids";
      renderProducts("kids");
    }
    document.getElementById('products').scrollIntoView({ behavior: "smooth" });
  });
});

// Render all products by default or filter by hash
window.addEventListener('hashchange', () => {
  const cat = getCategoryFromHash();
  renderProducts(cat);
});
renderProducts(getCategoryFromHash());

// Initial cart update
updateCart();