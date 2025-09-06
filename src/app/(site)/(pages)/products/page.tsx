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
      {/* Hero Section with Background */}
      <div className="relative pt-[120px] pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue/90 via-blue-dark/85 to-dark/90"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          ></div>
        </div>
        
        {/* Content */}
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="relative z-10 text-center">
      
            
            {/* Main Heading */}
            <div className="max-w-4xl mx-auto">
              <span className="inline-block text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                Premium Technology Store
              </span>
              
              <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight">
                Discover Premium Technology Products
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                Explore our curated collection of cutting-edge technology products, carefully selected for quality, innovation, and exceptional value.
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-light/10 rounded-full blur-lg"></div>
      </div>
      
      {/* Products Section */}
      <div className="relative bg-white">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233C50E0' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
        
   
        
        <AllProductsSection />
      </div>
      
    </main>
  );
};

export default ProductsPage;