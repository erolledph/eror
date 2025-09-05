'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  imageUrls: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ imageUrls, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Ensure we have at least one image
  const images = imageUrls && imageUrls.length > 0 ? imageUrls : [imageUrls[0] || '/placeholder-image.jpg'];
  const selectedImage = images[selectedImageIndex];

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="relative bg-gradient-to-br from-gray-1 to-gray-2 rounded-2xl overflow-hidden shadow-lg">
        <div className="aspect-square relative">
          <Image
            src={selectedImage}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            fill
            className="object-cover transition-all duration-300"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Image Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                    fill="#374151"
                  />
                </svg>
              </button>
              
              <button
                onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
                    fill="#374151"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 right-6 bg-dark/80 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-3 px-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg ${
                selectedImageIndex === index
                  ? 'border-blue shadow-xl ring-2 ring-blue/30 scale-105'
                  : 'border-gray-3 hover:border-blue/50'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
              
              {/* Active indicator */}
              {selectedImageIndex === index && (
                <div className="absolute inset-0 bg-blue/15 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="w-4 h-4 bg-blue rounded-full shadow-lg"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;