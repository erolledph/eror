"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Product } from '@/types/product';
import HeroProductCard from './HeroProductCard';

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";

interface HeroCarouselProps {
  heroProducts: Product[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ heroProducts }) => {
  // Transform products into slide format
  const slides = heroProducts.map((product, index) => ({
    id: product.id,
    slug: product.slug,
    discount: product.percentOff ? `${product.percentOff}%` : "Special Deal",
    title: product.name,
    subtitle: product.category,
    buttonText: "View Deal",
    buttonLink: product.productUrl,
    imageUrl: product.imageUrl,
    price: product.discountedPrice,
    originalPrice: product.originalPrice,
    currency: product.currency,
    savings: product.savings
  }));

  return (
    <div className="h-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !bg-white',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !w-8',
        }}
        loop={true}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="hero-carousel h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <HeroProductCard {...slide} isCarousel={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;