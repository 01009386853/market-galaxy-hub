
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { categories } from '../services/productService';

const Navbar = () => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-amazon text-white">
      <div className="container mx-auto px-4">
        {/* Main navbar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            MarketGalaxy
          </Link>
          
          {/* Search bar - hidden on mobile */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex flex-grow mx-4 max-w-xl"
          >
            <div className="w-full flex">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-l text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-amazon-accent p-2 rounded-r hover:bg-amber-600 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
          
          {/* Cart and mobile menu */}
          <div className="flex items-center">
            <Link to="/cart" className="relative p-2 mr-4">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amazon-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button 
              onClick={toggleMenu} 
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile search - visible only on mobile */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-l text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-amazon-accent p-2 rounded-r hover:bg-amber-600 transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
        
        {/* Categories bar */}
        <div className="hidden md:flex overflow-x-auto pb-3 gap-6">
          {categories.map(category => (
            <Link 
              key={category}
              to={category === "All" ? "/products" : `/products?category=${category}`}
              className="text-sm whitespace-nowrap hover:text-amazon-accent transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amazon-light text-amazon">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col">
              <h3 className="font-semibold mb-2">Categories</h3>
              {categories.map(category => (
                <Link 
                  key={category}
                  to={category === "All" ? "/products" : `/products?category=${category}`}
                  className="py-2 border-b border-gray-200 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
