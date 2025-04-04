
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getFeaturedProducts, getProducts, categories } from '../services/productService';
import { Product } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [featured, allProducts] = await Promise.all([
          getFeaturedProducts(),
          getProducts()
        ]);
        
        setFeaturedProducts(featured);
        
        // Simulate new arrivals by sorting by id in reverse
        setNewArrivals([...allProducts].sort((a, b) => b.id - a.id).slice(0, 4));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-amazon to-amazon-accent text-white py-16 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop the Latest Products</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Find amazing deals on electronics, fashion, home goods and more.
          </p>
          <Link to="/products" className="btn-primary inline-block">
            Shop Now
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 pb-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-accent"></div>
          </div>
        ) : (
          <>
            {/* Featured Products */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Products</h2>
                <Link to="/products" className="text-amazon-accent hover:underline flex items-center">
                  View all <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
            
            {/* Categories */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(1).map(category => (
                  <Link 
                    key={category} 
                    to={`/products?category=${category}`} 
                    className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-amazon text-white p-8 h-full flex items-center justify-center">
                      <h3 className="text-lg md:text-xl font-semibold text-center">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h3>
                    </div>
                    <div className="absolute inset-0 bg-amazon-accent bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
                  </Link>
                ))}
              </div>
            </section>
            
            {/* New Arrivals */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">New Arrivals</h2>
                <Link to="/products" className="text-amazon-accent hover:underline flex items-center">
                  View all <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
