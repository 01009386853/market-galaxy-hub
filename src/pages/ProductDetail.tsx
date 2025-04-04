
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Check, ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProductById, getFeaturedProducts } from '../services/productService';
import { Product, useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
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
  
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };
  
  const changeQuantity = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };
  
  const handleImageChange = (direction: 'next' | 'prev') => {
    if (!product) return;
    
    if (direction === 'next') {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-accent"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="text-amazon-accent hover:underline">
          Back to products
        </Link>
      </div>
    );
  }
  
  // Calculate discounted price if applicable
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-amazon-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="text-gray-500 hover:text-amazon-accent">Products</Link>
        <span className="mx-2">/</span>
        <span className="font-medium">{product.title}</span>
      </div>
      
      {/* Back button (mobile) */}
      <Link to="/products" className="inline-flex items-center mb-4 text-amazon-accent md:hidden">
        <ArrowLeft size={16} className="mr-1" /> Back to products
      </Link>
      
      {/* Product detail */}
      <div className="lg:flex gap-8">
        {/* Product images */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="relative bg-white rounded-lg overflow-hidden aspect-square mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="w-full h-full object-contain"
            />
            
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={() => handleImageChange('prev')} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => handleImageChange('next')} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            
            {product.discountPercentage && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                {Math.round(product.discountPercentage)}% OFF
              </div>
            )}
          </div>
          
          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded border-2 ${
                    selectedImage === index ? 'border-amazon-accent' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} - view ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product info */}
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
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
