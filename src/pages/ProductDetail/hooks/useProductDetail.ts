
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../../contexts/CartContext';
import { getProductById, getFeaturedProducts } from '../../../services/productService';

export const useProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        
        const productId = parseInt(id);
        const productData = await getProductById(productId);
        
        if (!productData) {
          navigate('/not-found');
          return;
        }
        
        setProduct(productData);
        
        // Get related products (featured as a fallback)
        const related = await getFeaturedProducts();
        // Filter out current product if present
        setRelatedProducts(related.filter(item => item.id !== productId));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  return {
    product,
    relatedProducts,
    isLoading
  };
};
