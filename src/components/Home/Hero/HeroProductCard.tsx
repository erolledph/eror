import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProductCardProps {
  id: string;
  slug: string;
  discount?: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  currency: string;
  savings: number;
  isCarousel?: boolean;
}

const HeroProductCard: React.FC<HeroProductCardProps> = ({
  slug,
  discount,
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageUrl,
  price,
  originalPrice,
  currency,
  savings,
  isCarousel = false
}) => {
  return (
    <div className={`relative rounded-xl overflow-hidden group cursor-pointer ${isCarousel ? 'h-full min-h-[500px]' : 'h-[280px]'}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={isCarousel}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>

      {/* Content overlay */}
      <div className={`relative z-10 h-full flex flex-col justify-between ${isCarousel ? 'p-8 lg:p-12' : 'p-5'}`}>
        {/* Top section with badges */}
        <div className="flex items-start justify-between gap-2 mb-4">
          {/* Discount Badge */}
          {discount && (
            <div className="bg-red text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              {discount} OFF
            </div>
          )}
          
          {/* Savings Badge */}
          {savings > 0 && (
            <div className="bg-green text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              Save {currency}{savings.toFixed(2)}
            </div>
          )}
        </div>

        {/* Bottom section with product info */}
        <div className="space-y-3">
          {/* Category */}
          <div>
            <span className={`inline-block font-medium text-blue bg-white/90 px-3 py-1.5 rounded-full backdrop-blur-sm ${isCarousel ? 'text-sm' : 'text-xs'}`}>
              {subtitle}
            </span>
          </div>

          {/* Product Title */}
          <h3 className={`font-bold text-white leading-tight ${isCarousel ? 'text-2xl lg:text-3xl xl:text-4xl mb-3' : 'text-lg mb-2'} line-clamp-2`}>
            {title}
          </h3>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className={`font-bold text-white ${isCarousel ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                {currency}{price.toFixed(2)}
              </span>
              {originalPrice > price && (
                <span className={`text-white/70 line-through ${isCarousel ? 'text-lg lg:text-xl' : 'text-sm'}`}>
                  {currency}{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Star rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`fill-current text-yellow ${isCarousel ? 'w-4 h-4' : 'w-3.5 h-3.5'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className={`text-white/80 ${isCarousel ? 'text-sm' : 'text-xs'}`}>(4.5)</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href={`/products/${slug}`}
              className={`inline-block bg-blue text-white font-semibold rounded-lg hover:bg-blue-dark transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm text-center ${
                isCarousel 
                  ? 'text-base px-8 py-3 lg:px-10 lg:py-4' 
                  : 'text-sm px-6 py-2.5'
              }`}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroProductCard;