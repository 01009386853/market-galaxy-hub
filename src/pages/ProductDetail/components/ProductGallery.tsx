
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Product } from '../../../contexts/CartContext';

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <div className="lg:w-1/2 mb-8 lg:mb-0">
      <div className="relative bg-white rounded-lg overflow-hidden mb-4">
        <AspectRatio ratio={1/1}>
          {!imageErrors[selectedImage] ? (
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="w-full h-full object-contain"
              onError={() => handleImageError(selectedImage)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-2xl font-bold">
              {product.title.charAt(0)}
            </div>
          )}
        </AspectRatio>
        
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
                selectedImage === index ? 'border-primary' : 'border-transparent'
              } ${imageErrors[index] ? 'bg-gray-100' : ''}`}
            >
              {!imageErrors[index] ? (
                <img 
                  src={img} 
                  alt={`${product.title} - view ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                  {index + 1}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
