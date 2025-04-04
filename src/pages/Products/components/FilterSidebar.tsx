
import React from 'react';
import { categories } from '../../../services/productService';

interface FilterSidebarProps {
  activeCategory: string;
  priceRange: { min: number; max: number };
  minRating: number;
  handlePriceChange: (min: number, max: number) => void;
  handleRatingChange: (rating: number) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  activeCategory,
  priceRange,
  minRating,
  handlePriceChange,
  handleRatingChange
}) => {
  return (
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
                className={`block py-1 hover:text-secondary transition-colors ${
                  activeCategory === category ? "text-secondary font-medium" : ""
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
  );
};

export default FilterSidebar;
