
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../../services/productService';
import { Product } from '../../../contexts/CartContext';

export const useProductFilters = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('search');
    const pageParam = searchParams.get('page');
    
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    } else {
      setCurrentPage(1);
    }
    
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

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    products,
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
  };
};
