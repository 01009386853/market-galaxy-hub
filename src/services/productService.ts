
// Simulate API calls to fetch products
// In a real application, these would be actual API calls

import { Product } from "../contexts/CartContext";

// Sample product data
const products: Product[] = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    description: "Apple iPhone 14 Pro 256GB, Deep Purple, 6.1 inch Super Retina XDR display with ProMotion, A16 Bionic chip, Pro camera system.",
    price: 999.99,
    discountPercentage: 5.5,
    rating: 4.8,
    stock: 50,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Apple_iPhone_14_Pro_Colors.jpg",
    images: [
      "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Apple_iPhone_14_Pro_Colors.jpg",
      "https://www.apple.com/v/iphone-14-pro/c/images/overview/camera/intro/camera_intro__gd3lf4jfm42u_large.jpg"
    ]
  },
  {
    id: 2,
    title: "Samsung Galaxy S23 Ultra",
    description: "Samsung Galaxy S23 Ultra, 512GB, Phantom Black, 6.8 inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, 200MP camera.",
    price: 1199.99,
    rating: 4.7,
    stock: 42,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Samsung_Galaxy_S23_Series_KV_2P_MO.jpg",
    images: [
      "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Samsung_Galaxy_S23_Series_KV_2P_MO.jpg",
      "https://www.androidauthority.com/wp-content/uploads/2023/02/Samsung-Galaxy-S23-Ultra-in-hand-closeup.jpg"
    ]
  },
  {
    id: 3,
    title: "Sony WH-1000XM5",
    description: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones, up to 30 hour battery life, with built-in microphone for phone calls.",
    price: 399.99,
    discountPercentage: 10,
    rating: 4.9,
    stock: 25,
    brand: "Sony",
    category: "electronics",
    thumbnail: "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71DsI2FMt9L._AC_SL1500_.jpg"
    ]
  },
  {
    id: 4,
    title: "LG C2 65-Inch OLED TV",
    description: "LG C2 65-Inch OLED evo Gallery Edition, 4K Smart TV with 120Hz refresh rate, Dolby Vision, Dolby Atmos, and NVIDIA G-SYNC compatibility.",
    price: 1799.99,
    discountPercentage: 15,
    rating: 4.7,
    stock: 15,
    brand: "LG",
    category: "electronics",
    thumbnail: "https://m.media-amazon.com/images/I/81M7xsUzXHL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81M7xsUzXHL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81XT+4HUMYL._AC_SL1500_.jpg"
    ]
  },
  {
    id: 5,
    title: "MacBook Pro 16-inch",
    description: "MacBook Pro 16-inch with M2 Pro chip, 32GB unified memory, 1TB SSD storage, and 16-core GPU.",
    price: 2699.99,
    rating: 4.9,
    stock: 20,
    brand: "Apple",
    category: "laptops",
    thumbnail: "https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71xU6rmKkDL._AC_SL1500_.jpg"
    ]
  },
  {
    id: 6,
    title: "Dell XPS 15",
    description: "Dell XPS 15 with 12th Gen Intel Core i9, 32GB RAM, 1TB SSD, and NVIDIA GeForce RTX 3050 Ti.",
    price: 1999.99,
    discountPercentage: 8,
    rating: 4.6,
    stock: 18,
    brand: "Dell",
    category: "laptops",
    thumbnail: "https://m.media-amazon.com/images/I/71DAFe9xN6L._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71DAFe9xN6L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71oU5RNV7AL._AC_SL1500_.jpg"
    ]
  },
  {
    id: 7,
    title: "PlayStation 5",
    description: "PlayStation 5 Console with Ultra-high speed SSD, ray tracing, 4K-TV gaming, and up to 120fps with 120Hz output.",
    price: 499.99,
    rating: 4.8,
    stock: 10,
    brand: "Sony",
    category: "gaming",
    thumbnail: "https://m.media-amazon.com/images/I/51wPWJ6LxCL._SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/51wPWJ6LxCL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61SUJDrCTLL._SL1500_.jpg"
    ]
  },
  {
    id: 8,
    title: "Xbox Series X",
    description: "Xbox Series X Console, the fastest, most powerful Xbox ever with 12 teraflops of raw graphic processing power.",
    price: 499.99,
    rating: 4.7,
    stock: 12,
    brand: "Microsoft",
    category: "gaming",
    thumbnail: "https://m.media-amazon.com/images/I/51ojzJk7dHL._SL1200_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/51ojzJk7dHL._SL1200_.jpg",
      "https://m.media-amazon.com/images/I/71NBQ2a52CL._SL1500_.jpg"
    ]
  }
];

// Categories
export const categories = [
  "All",
  "smartphones",
  "electronics",
  "laptops",
  "gaming"
];

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...products];
};

// Get product by ID
export const getProductById = async (id: number): Promise<Product | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return products.find(product => product.id === id);
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (category === "All") {
    return [...products];
  }
  
  return products.filter(product => product.category === category);
};

// Get featured products (random selection)
export const getFeaturedProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Shuffle array and take first 4 items
  return [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
};
