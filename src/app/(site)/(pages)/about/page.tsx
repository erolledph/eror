import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | TechMart - Premium Technology Store',
  description: 'Learn more about TechMart and our mission to bring you the best technology products.',
};

const AboutPage = () => {
  return (
    <main>
      <div className="pt-[120px] pb-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 p-8 lg:p-12">
            <div className="text-center mb-12">
              <h1 className="font-semibold text-2xl xl:text-heading-3 text-dark mb-4">
                About TechMart
              </h1>
              <p className="text-dark-4 max-w-[600px] mx-auto text-lg">
                Your trusted destination for premium technology products and innovative solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-semibold text-xl text-dark mb-4">Our Mission</h2>
                <p className="text-dark-4 mb-6">
                  At TechMart, we're passionate about bringing you the latest and greatest in technology. 
                  Our carefully curated selection ensures that every product meets our high standards for 
                  quality, innovation, and value.
                </p>
                
                <h2 className="font-semibold text-xl text-dark mb-4">Why Choose Us?</h2>
                <ul className="space-y-3 text-dark-4">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue rounded-full"></div>
                    Carefully curated product selection
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue rounded-full"></div>
                    Competitive prices and exclusive deals
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue rounded-full"></div>
                    Expert product recommendations
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue rounded-full"></div>
                    Trusted partner relationships
                  </li>
                </ul>
              </div>

              <div className="bg-gray-1 rounded-lg p-8 text-center">
                <div className="w-20 h-20 bg-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 5L25 15H35L27.5 22.5L30 32.5L20 27.5L10 32.5L12.5 22.5L5 15H15L20 5Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-dark mb-3">Premium Quality</h3>
                <p className="text-dark-4">
                  Every product in our catalog is hand-picked for its exceptional quality and innovative features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;