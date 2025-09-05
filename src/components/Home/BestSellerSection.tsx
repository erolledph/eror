import React from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/Products/ProductCard';

interface BestSellerSectionProps {
  products: Product[];
}

const BestSellerSection: React.FC<BestSellerSectionProps> = ({ products }) => {
  // Get products from different categories to ensure variety
  const diverseProducts = React.useMemo(() => {
    const categoryMap = new Map();
    const result: Product[] = [];
    
    // First, try to get one product from each category
    products.forEach(product => {
      if (!categoryMap.has(product.category) && result.length < 6) {
        categoryMap.set(product.category, true);
        result.push(product);
      }
    });
    
    // If we don't have enough products, fill with remaining products
    if (result.length < 6) {
      const remainingProducts = products.filter(p => !result.includes(p));
      result.push(...remainingProducts.slice(0, 6 - result.length));
    }
    
    return result;
  }, [products]);

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 1L10.09 5.26L14.5 5.26L11.205 7.74L12.795 12L8.5 9.52L4.205 12L5.795 7.74L2.5 5.26L6.91 5.26L8.5 1Z"
                  fill="#3C50E0"
                />
              </svg>
              Featured
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Best Sellers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {diverseProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;