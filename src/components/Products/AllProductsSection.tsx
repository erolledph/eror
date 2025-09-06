'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { fetchProducts, getUniqueCategories, getUniqueTags } from '@/lib/api';

const AllProductsSection: React.FC = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: searchParams.get('category') || '',
    tag: searchParams.get('tags') || '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc',
  });
  const [offset, setOffset] = useState(0);
  const limit = 12;

  // Update filters when URL parameters change
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const tagFromUrl = searchParams.get('tags');
    if (categoryFromUrl && categoryFromUrl !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }));
    }
    if (tagFromUrl && tagFromUrl !== filters.tag) {
      setFilters(prev => ({ ...prev, tag: tagFromUrl }));
    }
  }, [searchParams, filters.category, filters.tag]);

  useEffect(() => {
    loadCategories();
    loadTags();
    loadProducts(true);
  }, []);

  useEffect(() => {
    loadProducts(true);
  }, [filters]);

  const loadCategories = async () => {
    try {
      const cats = await getUniqueCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadTags = async () => {
    try {
      const uniqueTags = await getUniqueTags();
      setTags(uniqueTags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const loadProducts = async (reset = false) => {
    setLoading(true);
    try {
      const currentOffset = reset ? 0 : offset;
      const response = await fetchProducts({
        ...filters,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        limit,
        offset: currentOffset,
      });

      if (reset) {
        setProducts(response.data);
        setOffset(limit);
      } else {
        setProducts(prev => [...prev, ...response.data]);
        setOffset(prev => prev + limit);
      }
      
      setTotalProducts(response.pagination.total);
      setHasMore(response.pagination.hasMore);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setOffset(0);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadProducts(false);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: '',
      tag: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    setOffset(0);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.tag) count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    return count;
  };

  return (
    <section className="py-8 bg-white min-h-screen">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden fixed top-[120px] left-4 z-50">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-white border border-gray-3 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5H21V6H3V4.5ZM7.5 10.5H16.5V12H7.5V10.5ZM10.5 16.5H13.5V18H10.5V16.5Z" fill="#3C50E0"/>
                </svg>
                <span className="font-medium text-sm">Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Left Sidebar - Filters */}
          <div className={`
            fixed lg:sticky lg:top-[120px] inset-y-0 left-0 z-40 w-80 bg-white  
            transform transition-transform duration-300 ease-in-out lg:transform-none
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:w-72 xl:w-80 flex-shrink-0 overflow-y-auto pt-[120px] lg:pt-0 lg:h-[calc(100vh-120px)] shadow-xl lg:shadow-none
          `}>
            {/* Mobile Overlay */}
            {sidebarOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div className="p-6 h-full">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue/10 rounded-lg flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4.5H21V6H3V4.5ZM7.5 10.5H16.5V12H7.5V10.5ZM10.5 16.5H13.5V18H10.5V16.5Z" fill="#3C50E0"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-dark">Filters</h3>
                    {getActiveFiltersCount() > 0 && (
                      <p className="text-sm text-blue">{getActiveFiltersCount()} active</p>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-dark-4 hover:text-blue transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>

              {/* Search Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark mb-3">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full rounded-lg border border-gray-3 bg-white py-3 pl-10 pr-4 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark mb-3">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full rounded-lg border border-gray-3 bg-white py-3 px-4 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/10"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark mb-3">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full rounded-lg border border-gray-3 bg-white py-2.5 px-3 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/10"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full rounded-lg border border-gray-3 bg-white py-2.5 px-3 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/10"
                    />
                  </div>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark mb-3">
                  Tags
                </label>
                <select
                  value={filters.tag}
                  onChange={(e) => handleFilterChange('tag', e.target.value)}
                  className="w-full rounded-lg border border-gray-3 bg-white py-3 px-4 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/10"
                >
                  <option value="">All Tags</option>
                  {tags.map(tag => (
                    <option key={tag} value={tag}>
                      #{tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            {/* Top Bar with Sort and Results Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-gray-1 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-dark">
                  {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
                </p>
                {getActiveFiltersCount() > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-dark-4">•</span>
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-blue hover:text-blue-dark font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-dark whitespace-nowrap">Sort by:</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="rounded-lg border border-gray-3 bg-white py-2 px-3 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/10"
                  >
                    <option value="createdAt">Newest</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                </div>

                <select
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                  className="rounded-lg border border-gray-3 bg-white py-2 px-3 text-sm outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/10"
                >
                  <option value="desc">High to Low</option>
                  <option value="asc">Low to High</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="inline-flex items-center gap-2 font-semibold text-white bg-gradient-to-r from-blue to-blue-dark py-4 px-10 rounded-lg transition-all duration-200 hover:from-blue-dark hover:to-blue disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Load More Products
                    </>
                  )}
                </button>
              </div>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-2 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-dark mb-2">No products found</h3>
                <p className="text-dark-4 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAllFilters}
                  className="text-blue hover:text-blue-dark font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;