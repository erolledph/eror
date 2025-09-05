import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <main>
      <div className="pt-[120px] pb-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 p-8 lg:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 5L25 15H35L27.5 22.5L30 32.5L20 27.5L10 32.5L12.5 22.5L5 15H15L20 5Z"
                    fill="#F23030"
                  />
                </svg>
              </div>
              
              <h1 className="font-bold text-2xl text-dark mb-4">
                Product Not Found
              </h1>
              
              <p className="text-dark-4 mb-8">
                Sorry, the product you're looking for doesn't exist or has been removed.
              </p>
              
              <div className="space-y-4">
                <Link
                  href="/products"
                  className="w-full bg-blue text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-dark transition-all duration-200 block"
                >
                  Browse All Products
                </Link>
                
                <Link
                  href="/"
                  className="w-full bg-gray-2 text-dark font-semibold py-3 px-6 rounded-lg hover:bg-gray-3 transition-all duration-200 block"
                >
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;