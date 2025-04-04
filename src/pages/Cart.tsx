
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, X } from 'lucide-react';
import { useCart, Product } from '../contexts/CartContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6">
          <div className="inline-flex justify-center items-center w-24 h-24 bg-gray-100 rounded-full text-gray-500 mb-4">
            <ShoppingCart size={40} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="lg:flex lg:gap-8">
        {/* Cart items */}
        <div className="lg:flex-1">
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            {/* Table header - hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-[1fr,120px,120px,80px] md:gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
              <div>Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Total</div>
            </div>
            
            {/* Cart items */}
            {items.map(item => {
              const { product, quantity } = item;
              const price = product.discountPercentage
                ? product.price * (1 - product.discountPercentage / 100)
                : product.price;
              const totalPrice = price * quantity;
              
              return (
                <div key={product.id} className="border-b last:border-b-0">
                  <div className="p-4 md:grid md:grid-cols-[1fr,120px,120px,80px] md:gap-4 md:items-center">
                    {/* Product details */}
                    <div className="flex gap-3 mb-4 md:mb-0">
                      {/* Product image */}
                      <Link to={`/product/${product.id}`} className="w-20 h-20 flex-shrink-0">
                        <img 
                          src={product.thumbnail} 
                          alt={product.title} 
                          className="w-full h-full object-cover rounded"
                        />
                      </Link>
                      
                      {/* Product name and remove button */}
                      <div className="flex-1">
                        <Link to={`/product/${product.id}`} className="font-medium hover:text-amazon-accent">
                          {product.title}
                        </Link>
                        <div className="text-sm text-gray-500 mb-2">
                          {product.brand}
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-red-500 text-sm flex items-center hover:underline"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                      
                      {/* Mobile X to remove */}
                      <button 
                        onClick={() => removeItem(product.id)} 
                        className="md:hidden text-gray-400"
                        aria-label="Remove item"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    {/* Mobile layout for price, quantity, total */}
                    <div className="flex justify-between md:hidden border-t pt-3">
                      <div>
                        <div className="text-gray-500 text-sm">Price:</div>
                        <div>${price.toFixed(2)}</div>
                      </div>
                      
                      <div>
                        <div className="text-gray-500 text-sm">Quantity:</div>
                        <div className="flex border rounded">
                          <button 
                            onClick={() => updateQuantity(product.id, quantity - 1)} 
                            className="px-2 py-0.5 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5">{quantity}</span>
                          <button 
                            onClick={() => updateQuantity(product.id, quantity + 1)} 
                            className="px-2 py-0.5 hover:bg-gray-100"
                            disabled={quantity >= product.stock}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-gray-500 text-sm">Total:</div>
                        <div className="font-semibold">${totalPrice.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    {/* Desktop layout for price, quantity, total */}
                    <div className="hidden md:block text-center">
                      ${price.toFixed(2)}
                    </div>
                    
                    <div className="hidden md:flex justify-center">
                      <div className="flex border rounded">
                        <button 
                          onClick={() => updateQuantity(product.id, quantity - 1)} 
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center py-1">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(product.id, quantity + 1)} 
                          className="px-3 py-1 hover:bg-gray-100"
                          disabled={quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="hidden md:block text-center font-semibold">
                      ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <Link to="/products" className="text-amazon-accent hover:underline flex items-center">
              <ArrowRight size={16} className="mr-1 rotate-180" />
              Continue Shopping
            </Link>
            
            <button 
              onClick={handleClearCart} 
              className="text-red-500 hover:underline flex items-center"
            >
              <Trash2 size={16} className="mr-1" />
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="btn-primary w-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
