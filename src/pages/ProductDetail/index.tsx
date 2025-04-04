
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProductDetail } from './hooks/useProductDetail';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';

const ProductDetail = () => {
  const { product, relatedProducts, isLoading } = useProductDetail();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="text-primary hover:underline">
          Back to products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
        <span className="mx-2">/</span>
        <span className="font-medium">{product.title}</span>
      </div>
      
      {/* Back button (mobile) */}
      <Link to="/products" className="inline-flex items-center mb-4 text-primary md:hidden">
        <ArrowLeft size={16} className="mr-1" /> Back to products
      </Link>
      
      {/* Product detail */}
      <div className="lg:flex gap-8">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      
      {/* Related products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetail;
