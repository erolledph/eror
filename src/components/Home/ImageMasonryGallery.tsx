'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchProducts } from '@/lib/api';

const ImageMasonryGallery: React.FC = () => {
  const [allAvailableImages, setAllAvailableImages] = useState<string[]>([]);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all available images from products
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetchProducts({ limit: 100 });
        const imageUrls = response.data
          .map(product => product.imageUrl)
          .filter((url, index, array) => array.indexOf(url) === index); // Remove duplicates
        
        setAllAvailableImages(imageUrls);
        
        // Set initial displayed images (12 random images)
        const shuffled = [...imageUrls].sort(() => 0.5 - Math.random());
        setDisplayedImages(shuffled.slice(0, 12));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Auto-change images every 4 seconds
  useEffect(() => {
    if (allAvailableImages.length === 0) return;

    const interval = setInterval(() => {
      const shuffled = [...allAvailableImages].sort(() => 0.5 - Math.random());
      setDisplayedImages(shuffled.slice(0, 12));
    }, 4000);

    return () => clearInterval(interval);
  }, [allAvailableImages]);

  if (loading) {
    return (
      <section className="overflow-hidden py-20">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent mx-auto mb-4"></div>
              <p className="text-dark-4">Loading gallery...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden py-20 bg-gradient-to-br from-gray-1 to-white">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-blue bg-blue/10 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Product Gallery
          </span>
          <h2 className="font-bold text-2xl lg:text-3xl xl:text-4xl text-dark mb-4">
            Discover Our Collection
          </h2>
          <p className="text-dark-4 text-lg max-w-2xl mx-auto">
            Explore our curated selection of premium technology products in this dynamic showcase
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-[200px]">
          {displayedImages.map((imageUrl, index) => {
            // Define different grid spans and row spans for masonry effect
            const getGridClasses = (index: number) => {
              const patterns = [
                'col-span-2 row-span-2', // Large square
                'col-span-1 row-span-1', // Small square
                'col-span-2 row-span-1', // Wide rectangle
                'col-span-1 row-span-2', // Tall rectangle
                'col-span-1 row-span-1', // Small square
                'col-span-2 row-span-1', // Wide rectangle
                'col-span-1 row-span-1', // Small square
                'col-span-1 row-span-2', // Tall rectangle
                'col-span-2 row-span-2', // Large square
                'col-span-1 row-span-1', // Small square
                'col-span-1 row-span-1', // Small square
                'col-span-2 row-span-1', // Wide rectangle
              ];
              return patterns[index % patterns.length];
            };

            return (
              <div
                key={`${imageUrl}-${index}`}
                className={`
                  relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl 
                  transition-all duration-700 group cursor-pointer
                  ${getGridClasses(index)}
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Image
                  src={imageUrl}
                  alt={`Product showcase ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover content */}
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 12L9 16.5V7.5L15 12Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue/50 rounded-2xl transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue to-blue-dark text-white font-semibold px-8 py-4 rounded-full hover:from-blue-dark hover:to-blue transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            <span>Explore All Products</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ImageMasonryGallery;