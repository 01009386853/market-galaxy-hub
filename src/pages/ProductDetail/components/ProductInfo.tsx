
import React, { useState } from 'react';
import { Star, Check, ShoppingCart } from 'lucide-react';
import { Product, useCart } from '../../../contexts/CartContext';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Calculate discounted price if applicable
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;
    
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };
  
  const changeQuantity = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="lg:w-1/2">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex items-center text-yellow-500 mr-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="text-gray-600">{product.rating} stars</span>
      </div>
      
      {/* Price */}
      <div className="mb-6">
        {discountedPrice ? (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
            <span className="text-gray-500 line-through text-lg">${product.price.toFixed(2)}</span>
          </div>
        ) : (
          <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        )}
      </div>
      
      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>
      
      {/* Features and details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Details</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check size={18} className="text-amazon-success mr-2 mt-0.5 flex-shrink-0" />
            <span>Brand: {product.brand}</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-amazon-success mr-2 mt-0.5 flex-shrink-0" />
            <span>Category: {product.category}</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-amazon-success mr-2 mt-0.5 flex-shrink-0" />
            <span>Stock: {product.stock} units</span>
          </li>
        </ul>
      </div>
      
      {/* Add to cart section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        {/* Stock indicator */}
        {product.stock > 0 ? (
          <p className="text-amazon-success font-medium mb-3">In Stock</p>
        ) : (
          <p className="text-red-500 font-medium mb-3">Out of Stock</p>
        )}
        
        {product.stock > 0 && (
          <>
            {/* Quantity selector */}
            <div className="flex items-center mb-4">
              <span className="mr-3">Quantity:</span>
              <div className="flex border rounded-md">
                <button 
                  onClick={() => changeQuantity(-1)} 
                  className="px-3 py-1 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 text-center py-1">{quantity}</span>
                <button 
                  onClick={() => changeQuantity(1)} 
                  className="px-3 py-1 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full mb-3 flex justify-center items-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
