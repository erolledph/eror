import React from "react";
import HeroCarousel from "./Hero/HeroCarousel";
import HeroFeature from "./Hero/HeroFeature";
import HeroProductCard from "./Hero/HeroProductCard";
import { Product } from '@/types/product';

interface HeroSectionProps {
  latestProducts: Product[];
  heroProducts: Product[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroProducts }) => {
  // Don't render if no hero products are available
  if (!heroProducts || heroProducts.length === 0) {
    return (
      <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent mx-auto mb-4"></div>
              <p className="text-dark-4">Loading products...</p>
            </div>
          </div>
        </div>
        <HeroFeature />
      </section>
    );
  }

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5 items-stretch">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden h-full min-h-[500px]">
              <HeroCarousel heroProducts={heroProducts} />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5 h-full">
              {/* Display featured products from API */}
              {heroProducts.slice(0, 2).map((product, index) => (
                <div key={product.id} className="w-full">
                  <HeroProductCard
                    id={product.id}
                    slug={product.slug}
                    discount={product.percentOff ? `${product.percentOff}%` : undefined}
                    title={product.name}
                    subtitle={product.category}
                    buttonText="View Deal"
                    buttonLink={product.productUrl}
                    imageUrl={product.imageUrl}
                    price={product.discountedPrice}
                    originalPrice={product.originalPrice}
                    currency={product.currency}
                    savings={product.savings}
                    isCarousel={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default HeroSection;