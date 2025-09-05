import React from 'react';
import AllProductsSection from '@/components/Products/AllProductsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | TechMart - Premium Technology Store',
  description: 'Explore our wide range of premium technology products with exclusive deals and discounts.',
};

const ProductsPage = () => {
  return (
    <main>
      <div className="pt-[120px] pb-10 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center">
            <h1 className="font-semibold text-2xl xl:text-heading-3 text-dark mb-4">
              Our Products
            </h1>
            <p className="text-dark-4 max-w-[600px] mx-auto">
              Discover our curated collection of premium technology products, carefully selected for quality and value.
            </p>
          </div>
        </div>
      </div>
      <AllProductsSection />
    </main>
  );
};

export default ProductsPage;