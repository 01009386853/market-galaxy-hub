
import React from 'react';
import { Filter } from 'lucide-react';
import { categories } from '../../../services/productService';

interface MobileFilterProps {
  activeCategory: string;
  isFilterOpen: boolean;
  priceRange: { min: number; max: number };
  minRating: number;
  toggleFilter: () => void;
  handlePriceChange: (min: number, max: number) => void;
  handleRatingChange: (rating: number) => void;
  setIsFilterOpen: (isOpen: boolean) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  activeCategory,
  isFilterOpen,
  priceRange,
  minRating,
  toggleFilter,
  handlePriceChange,
  handleRatingChange,
  setIsFilterOpen
}) => {
  return (
    <>
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
                    className={`block py-1 hover:text-secondary transition-colors ${
                      activeCategory === category ? "text-secondary font-medium" : ""
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
                        ? "bg-secondary text-white border-secondary" 
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
    </>
  );
};

export default MobileFilter;
