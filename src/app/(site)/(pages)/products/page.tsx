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
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
                <span>/</span>
                <span className="text-white font-medium">Products</span>
              </div>
            </nav>
            
            {/* Main Heading */}
            <div className="max-w-4xl mx-auto">
              <span className="inline-block text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                Premium Technology Store
              </span>
              
              <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight">
                Discover Premium
                <span className="block bg-gradient-to-r from-yellow to-yellow-light bg-clip-text text-transparent">
                  Technology Products
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                Explore our curated collection of cutting-edge technology products, carefully selected for quality, innovation, and exceptional value.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-white/80 text-sm font-medium">Premium Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-white/80 text-sm font-medium">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-white/80 text-sm font-medium">Support</div>
                </div>
              </div>
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
        
        {/* Section Header */}
        <div className="relative z-10 pt-20 pb-10">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="text-center mb-12">
              <span className="inline-block text-blue bg-blue/10 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Shop Now
              </span>
              <h2 className="font-bold text-3xl lg:text-4xl text-dark mb-4">
                Find Your Perfect Product
              </h2>
              <p className="text-lg text-dark-4 max-w-2xl mx-auto">
                Use our advanced filters to discover exactly what you're looking for from our extensive catalog.
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-gradient-to-br from-blue/5 to-blue-light/5 p-6 rounded-xl border border-blue/10 text-center">
                <div className="w-12 h-12 bg-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#3C50E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Smart Search</h3>
                <p className="text-sm text-dark-4">Find products quickly with our intelligent search system</p>
              </div>
              
              <div className="bg-gradient-to-br from-green/5 to-green-light/5 p-6 rounded-xl border border-green/10 text-center">
                <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5H21V6H3V4.5ZM7.5 10.5H16.5V12H7.5V10.5ZM10.5 16.5H13.5V18H10.5V16.5Z" fill="#22AD5C"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Advanced Filters</h3>
                <p className="text-sm text-dark-4">Narrow down results by category, price, and features</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow/5 to-yellow-light/5 p-6 rounded-xl border border-yellow/10 text-center">
                <div className="w-12 h-12 bg-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FBBF24"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Best Deals</h3>
                <p className="text-sm text-dark-4">Exclusive discounts and special offers on top products</p>
              </div>
            </div>
          </div>
        </div>
        
        <AllProductsSection />
      </div>
      
      {/* Call to Action Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark-2 to-dark"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        ></div>
        
        <div className="relative z-10 max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center">
            <h2 className="font-bold text-3xl lg:text-4xl text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our Products
              Get in touch with our expert team for personalized product recommendations and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-dark font-semibold px-8 py-4 rounded-lg hover:bg-gray-1 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Contact Our Experts
              </a>
              <a
                href="/"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-dark transition-all duration-200"
              >
                Browse Categories
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow/20 rounded-full blur-3xl"></div>
      </div>
    </main>
  );
};

export default ProductsPage;