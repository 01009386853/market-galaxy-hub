
import React from 'react';
import { useProductFilters } from './hooks/useProductFilters';
import FilterSidebar from './components/FilterSidebar';
import MobileFilter from './components/MobileFilter';
import ProductList from './components/ProductList';

const Products = () => {
  const {
    filteredProducts,
    isLoading,
    activeCategory,
    isFilterOpen,
    priceRange,
    minRating,
    currentPage,
    currentProducts,
    totalPages,
    handlePriceChange,
    handleRatingChange,
    toggleFilter,
    setIsFilterOpen,
    paginate
  } = useProductFilters();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex">
        {/* Sidebar filters - desktop */}
        <FilterSidebar
          activeCategory={activeCategory}
          priceRange={priceRange}
          minRating={minRating}
          handlePriceChange={handlePriceChange}
          handleRatingChange={handleRatingChange}
        />
        
        {/* Main content */}
        <div className="md:flex-1">
          {/* Mobile filter component */}
          <MobileFilter
            activeCategory={activeCategory}
            isFilterOpen={isFilterOpen}
            priceRange={priceRange}
            minRating={minRating}
            toggleFilter={toggleFilter}
            handlePriceChange={handlePriceChange}
            handleRatingChange={handleRatingChange}
            setIsFilterOpen={setIsFilterOpen}
          />
          
          {/* Desktop title */}
          <h1 className="text-2xl font-bold mb-6 hidden md:block">
            {activeCategory === "All" ? "All Products" : activeCategory}
          </h1>
          
          {/* Product count and sorting */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredProducts.length} products</p>
          </div>
          
          {/* Products grid with pagination */}
          <ProductList
            isLoading={isLoading}
            filteredProducts={filteredProducts}
            currentProducts={currentProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
