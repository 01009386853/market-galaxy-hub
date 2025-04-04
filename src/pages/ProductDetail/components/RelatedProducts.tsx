
import React from 'react';
import ProductCard from '../../../components/ProductCard';
import { Product } from '../../../contexts/CartContext';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (products.length === 0) return null;
  
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
