import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  // Format price to 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <Link href={`/products/${product.slug}`} className={`group bg-white rounded-xl shadow-1 overflow-hidden hover:shadow-3 transition-all duration-300 border border-gray-2 hover:border-blue/20 block ${className}`}>
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-1 to-gray-2 aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {product.percentOff && product.percentOff > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red to-red-dark text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            -{product.percentOff}% OFF
          </div>
        )}

        {product.savings > 0 && (
          <div className="absolute top-4 right-4 bg-green text-white text-xs font-medium px-2 py-1 rounded-md">
            Save {product.currency}{formatPrice(product.savings)}
          </div>
        )}

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white text-dark px-6 py-2.5 rounded-full font-medium text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue hover:text-white">
            Quick View
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block text-xs font-medium text-blue bg-blue/10 px-2.5 py-1 rounded-full mb-2">
            {product.category}
          </span>
          <h3 className="font-semibold text-dark text-base leading-tight line-clamp-2 group-hover:text-blue transition-colors duration-200 min-h-[3rem]">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-dark text-xl">
            {product.currency}{formatPrice(product.discountedPrice)}
          </span>
          {product.originalPrice > product.discountedPrice && (
            <span className="text-dark-4 text-sm line-through font-medium">
              {product.currency}{formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Star rating placeholder */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 fill-current text-yellow"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-dark-4 ml-1">(4.5)</span>
          </div>
          
          <span className="bg-gradient-to-r from-blue to-blue-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:from-blue-dark hover:to-blue transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            View Deal
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;