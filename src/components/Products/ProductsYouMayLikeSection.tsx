'use client';
import React, { useState } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductsYouMayLikeSectionProps {
  allPossibleProducts: Product[];
  currentProductId: string;
}

const ProductsYouMayLikeSection: React.FC<ProductsYouMayLikeSectionProps> = ({ 
  allPossibleProducts, 
  currentProductId 
}) => {
  const [productsToShow, setProductsToShow] = useState(4);

  // Filter out the current product
  const availableProducts = allPossibleProducts.filter(product => product.id !== currentProductId);
  
  if (!availableProducts || availableProducts.length === 0) {
    return null;
  }

  // Get the products to display based on the current count
  const displayedProducts = availableProducts.slice(0, productsToShow);
  const hasMoreProducts = productsToShow < availableProducts.length;

  const handleLoadMore = () => {
    setProductsToShow(prev => Math.min(prev + 4, availableProducts.length));
  };

  return (
    <section className="py-16 bg-gray-1">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1L12.09 6.26L18 6.26L13.18 9.74L15.27 15L10 11.52L4.73 15L6.82 9.74L2 6.26L7.91 6.26L10 1Z"
                fill="#3C50E0"
              />
            </svg>
            <span className="font-medium text-dark">Recommended</span>
          </div>
          <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
            Products You May Like
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreProducts && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              className="inline-flex font-medium text-white bg-blue py-3 px-8 rounded-md transition-all duration-200 hover:bg-blue-dark shadow-lg hover:shadow-xl"
            >
              Load More Products
            </button>
          </div>
        )}

        {/* Show total count */}
        <div className="text-center mt-6">
          <p className="text-dark-4 text-sm">
            Showing {displayedProducts.length} of {availableProducts.length} products
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsYouMayLikeSection;