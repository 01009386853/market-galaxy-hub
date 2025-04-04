
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Calculate discounted price if applicable
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;
    
  return (
    <Link to={`/product/${product.id}`} className="overflow-hidden flex flex-col h-full bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative pb-[56.25%]">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="absolute w-full h-full object-cover"
        />
        {product.discountPercentage && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.title}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-500 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            {discountedPrice ? (
              <>
                <span className="font-bold text-lg">${discountedPrice.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {product.stock <= 10 && (
            <p className="text-red-500 text-sm mt-1">Only {product.stock} left in stock</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
