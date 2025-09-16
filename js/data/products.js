// Men's Fashion Products Data
const products = [
  // Official Wear
  {
    id: 1,
    category: "official",
    name: "Slim Fit Navy Suit",
    description: "Classic navy blue slim fit suit with notch lapels, perfect for business and formal occasions. Made from premium wool blend fabric for all-day comfort. Features a two-button closure, flap pockets, and a single vent for a modern silhouette.",
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1539109136884-43d0f3a36ecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    alt: "Navy blue slim fit suit",
    rating: 4.8,
    reviewCount: 124,
    colors: ["#1C2E4A", "#000000", "#2C3E50"],
    sizes: ["38", "40", "42", "44", "46"],
    inStock: true,
    featured: true,
    tags: ["suit", "formal", "business"],
    materials: ["85% Wool", "15% Elastane"],
    careInstructions: ["Dry clean only", "Do not bleach", "Iron on low heat", "Hang to maintain shape"],
    shippingInfo: "Free shipping on all orders over $50. Free returns within 30 days."
  },
  {
    id: 2,
    category: "official",
    name: "Charcoal Gray Two-Piece",
    description: "Elegant charcoal gray two-piece suit with a modern slim fit. Features a single breasted jacket and flat front trousers. Perfect for business meetings and formal events.",
    price: 22999,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    alt: "Charcoal gray two-piece suit",
    rating: 4.7,
    colors: ["36454F", "1F2937", "111827"],
    sizes: ["38", "40", "42", "44"],
    inStock: true,
    featured: true,
    tags: ["suit", "formal", "business"]
  },
  
  // Smart Casual
  {
    id: 3,
    category: "smartcasual",
    name: "Casual Blazer with Chinos",
    description: "Lightweight cotton blazer paired with slim fit chinos. Perfect for smart casual Fridays or weekend outings. The breathable fabric ensures comfort all day long. Features a modern fit, functional buttons, and two front pockets.",
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1507680434564-854b03edcb51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    alt: "Casual blazer with chinos",
    rating: 4.6,
    reviewCount: 89,
    colors: ["#6B7280", "#4B5563", "#1F2937"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true,
    tags: ["blazer", "chinos", "smart casual"],
    materials: ["100% Cotton"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron on medium heat"],
    shippingInfo: "Free shipping on all orders over $50. Free returns within 30 days."
  },
  {
    id: 4,
    category: "smartcasual",
    name: "Denim Shirt with Chinos",
    description: "Classic denim shirt paired with slim fit chinos. The perfect smart casual combination that works for both office and after-hours socializing.",
    price: 8999,
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    alt: "Denim shirt with chinos",
    rating: 4.5,
    colors: ["1E40AF", "1E3A8A", "1E3A8A"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true,
    tags: ["shirt", "chinos", "smart casual"]
  },
  
  // Watches
  {
    id: 5,
    category: "watches",
    name: "Automatic Dress Watch",
    description: "Elegant automatic dress watch with sapphire crystal glass and genuine leather strap. Features a 42-hour power reserve, exhibition case back, and water resistance up to 50m. The perfect accessory for both business and formal occasions.",
    price: 34999,
    originalPrice: 39999,
    discount: 13,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542496658793-03473e423d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
    ],
    alt: "Automatic dress watch",
    rating: 4.9,
    reviewCount: 215,
    colors: ["#000000", "#333333", "#555555"],
    sizes: ["40mm", "42mm", "44mm"],
    inStock: true,
    featured: true,
    tags: ["watch", "dress watch", "automatic"],
    specifications: {
      movement: "Automatic",
      caseMaterial: "Stainless Steel",
      bandMaterial: "Genuine Leather",
      waterResistance: "50m",
      powerReserve: "42 hours",
      crystal: "Sapphire"
    },
    shippingInfo: "Free shipping on all orders. 2-year international warranty."
  },
  {
    id: 6,
    category: "watches",
    name: "Chronograph Sports Watch",
    description: "High-precision chronograph watch with tachymeter and date display. Features a stainless steel case and water resistance up to 100m.",
    price: 28999,
    image: "https://images.unsplash.com/photo-1542496658793-03473e423d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Chronograph sports watch",
    rating: 4.7,
    colors: ["1E40AF", "000000", "B91C1C"],
    sizes: ["Standard"],
    inStock: true,
    featured: true,
    tags: ["watch", "chronograph", "sports"]
  },
  
  // Add more products as needed
  {
    id: 7,
    category: "official",
    name: "Classic White Dress Shirt",
    description: "Premium cotton dress shirt with a classic fit. Perfect for pairing with suits or wearing with dress pants for a professional look.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1598037147616-4508c5d9c29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "White dress shirt",
    rating: 4.6,
    colors: ["FFFFFF", "F3F4F6", "E5E7EB"],
    sizes: ["15", "15.5", "16", "16.5", "17", "17.5"],
    inStock: true,
    featured: false,
    tags: ["shirt", "dress shirt", "formal"]
  },
  {
    id: 8,
    category: "smartcasual",
    name: "Casual Knit Sweater",
    description: "Soft merino wool knit sweater with a relaxed fit. Perfect for layering over shirts or wearing on its own for a smart casual look.",
    price: 12999,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    alt: "Knit sweater",
    rating: 4.5,
    colors: ["1F2937", "4B5563", "6B7280"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: false,
    tags: ["sweater", "knit", "smart casual"]
  }
];

// Make products available globally
window.products = products;
