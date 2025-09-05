'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { fetchProducts, getUniqueCategories } from '@/lib/api';

const AllProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc',
  });
  const [offset, setOffset] = useState(0);
  const limit = 12;

  useEffect(() => {
    loadCategories();
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

  return (
    <section id="products" className="overflow-hidden py-20 bg-gray-2">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="mb-10">
          <h2 className="font-semibold text-xl xl:text-heading-5 text-dark mb-8">
            All Products
          </h2>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-1 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full rounded-md border border-gray-3 bg-gray-1 py-2.5 px-4 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full rounded-md border border-gray-3 bg-gray-1 py-2.5 px-4 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full rounded-md border border-gray-3 bg-gray-1 py-2.5 px-4 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full rounded-md border border-gray-3 bg-gray-1 py-2.5 px-4 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-3">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="rounded-md border border-gray-3 bg-gray-1 py-2.5 px-4 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                >
                  <option value="createdAt">Date Added</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Order
                </label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                  className="rounded-md border border-gray-3 bg-gray-1 py-2.5 px-4 outline-none duration-200 focus:border-blue focus:ring-2 focus:ring-blue/20"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
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
              className="inline-flex font-medium text-white bg-blue py-3 px-8 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Load More Products'}
            </button>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-4 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProductsSection;