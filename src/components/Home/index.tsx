'use client';
import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import CategorySection from './CategorySection';
import NewArrivalsSection from './NewArrivalsSection';
import GenericContentSection from './GenericContentSection';
import BestSellerSection from './BestSellerSection';
import { Product } from '@/types/product';
import { fetchLatestProducts, fetchUniqueCategoryProducts } from '@/lib/api';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [latestProducts, uniqueCategoryProducts] = await Promise.all([
          fetchLatestProducts(20),
          fetchUniqueCategoryProducts(5)
        ]);
        setProducts(latestProducts);
        setHeroProducts(uniqueCategoryProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main>
      <HeroSection latestProducts={products} heroProducts={heroProducts} />
      <CategorySection products={products} />
      <NewArrivalsSection products={products} />
      
      <GenericContentSection
        title="UP TO 30% OFF"
        subtitle="Special Offer"
        description="Don't miss out on our exclusive deals and limited-time offers on premium products."
        buttonText="Shop Now"
        buttonLink="/products"
        backgroundImage="/images/promo/promo-01.png"
        backgroundColor="#F5F5F7"
      />
      
      <BestSellerSection products={products} />
      
      <GenericContentSection
        title="Join Our Community"
        description="Stay updated with the latest products, exclusive deals, and tech news delivered straight to your inbox."
        buttonText="Learn More"
        buttonLink="/about"
        backgroundColor="#E5EAF4"
        layout="center"
      />
    </main>
  );
};

export default Home;