
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts, getProductsByCategory, categories } from '../services/productService';
import { Product } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });
  const [minRating, setMinRating] = useState(0);
  
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('search');
    
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        let loadedProducts: Product[];
        
        if (category) {
          loadedProducts = await getProductsByCategory(category);
          setActiveCategory(category);
        } else {
          loadedProducts = await getProducts();
          setActiveCategory("All");
        }
        
        setProducts(loadedProducts);
        applyFilters(loadedProducts, searchQuery || "", priceRange.min, priceRange.max, minRating);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [location.search]);
  
  const applyFilters = (
    productsToFilter: Product[], 
    search: string, 
    minPrice: number, 
    maxPrice: number,
    rating: number
  ) => {
    let result = [...productsToFilter];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply price filter
    result = result.filter(product => {
      const finalPrice = product.discountPercentage 
        ? product.price * (1 - product.discountPercentage / 100) 
        : product.price;
        
      return finalPrice >= minPrice && finalPrice <= maxPrice;
    });
    
    // Apply rating filter
    if (rating > 0) {
      result = result.filter(product => product.rating >= rating);
    }
    
    setFilteredProducts(result);
  };
  
  const handlePriceChange = (min: number, max: number) => {
    const newRange = { min, max };
    setPriceRange(newRange);
    applyFilters(products, new URLSearchParams(location.search).get('search') || "", min, max, minRating);
  };
  
  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    applyFilters(
      products, 
      new URLSearchParams(location.search).get('search') || "", 
      priceRange.min, 
      priceRange.max, 
      rating
    );
  };
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex">
        {/* Sidebar filters - desktop */}
        <div className="hidden md:block md:w-64 pr-8">
          <h2 className="font-bold text-lg mb-4">Filters</h2>
          
          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul>
              {categories.map(category => (
                <li key={category} className="mb-1">
                  <a 
                    href={category === "All" ? "/products" : `/products?category=${category}`}
                    className={`block py-1 hover:text-amazon-accent transition-colors ${
                      activeCategory === category ? "text-amazon-accent font-medium" : ""
                    }`}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">${priceRange.min}</span>
              <span className="text-sm text-gray-600">${priceRange.max}</span>
            </div>
            <input
              type="range"
              min="0" 
              max="3000"
              step="100"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(priceRange.min, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Minimum Rating</h3>
            <ul className="space-y-1">
              {[0, 4, 3, 2, 1].map((rating) => (
                <li key={rating}>
                  <button
                    onClick={() => handleRatingChange(rating)}
                    className={`text-sm w-full text-left py-1 px-2 rounded hover:bg-gray-100 ${
                      minRating === rating ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {rating === 0 ? 'Any Rating' : `${rating}+ stars`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:flex-1">
          {/* Mobile filter toggle */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h1 className="text-2xl font-bold">
              {activeCategory === "All" ? "All Products" : activeCategory}
            </h1>
            <button 
              className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded"
              onClick={toggleFilter}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
          
          {/* Filter panel for mobile */}
          {isFilterOpen && (
            <div className="md:hidden bg-white p-4 mb-6 rounded shadow">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Categories</h3>
                <ul className="grid grid-cols-2 gap-1">
                  {categories.map(category => (
                    <li key={category}>
                      <a 
                        href={category === "All" ? "/products" : `/products?category=${category}`}
                        className={`block py-1 hover:text-amazon-accent transition-colors ${
                          activeCategory === category ? "text-amazon-accent font-medium" : ""
                        }`}
                        onClick={() => setIsFilterOpen(false)}
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">${priceRange.min}</span>
                  <span className="text-sm text-gray-600">${priceRange.max}</span>
                </div>
                <input
                  type="range"
                  min="0" 
                  max="3000"
                  step="100"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(priceRange.min, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Rating Filter */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Minimum Rating</h3>
                <ul className="flex flex-wrap gap-2">
                  {[0, 4, 3, 2, 1].map((rating) => (
                    <li key={rating} className="flex-1 min-w-[80px]">
                      <button
                        onClick={() => {
                          handleRatingChange(rating);
                          setIsFilterOpen(false);
                        }}
                        className={`text-sm w-full py-1 px-2 rounded border ${
                          minRating === rating 
                            ? "bg-amazon-accent text-white border-amazon-accent" 
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {rating === 0 ? 'Any' : `${rating}+★`}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className="w-full py-2 bg-gray-100 rounded mt-2"
                onClick={() => setIsFilterOpen(false)}
              >
                Close
              </button>
            </div>
          )}
          
          {/* Desktop title */}
          <h1 className="text-2xl font-bold mb-6 hidden md:block">
            {activeCategory === "All" ? "All Products" : activeCategory}
          </h1>
          
          {/* Product count and sorting */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredProducts.length} products</p>
          </div>
          
          {/* Products grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-accent"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
