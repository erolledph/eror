import { Product, ProductsApiResponse } from '@/types/product';

const PRODUCTS_API_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;

export async function fetchProducts(params?: {
  category?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}): Promise<ProductsApiResponse> {
  // Throw error if no API URL is configured
  if (!PRODUCTS_API_URL) {
    throw new Error('No API URL configured. Please set NEXT_PUBLIC_PRODUCTS_API_URL in your environment variables.');
  }

  try {
    // Fetch all products from the base URL without query parameters
    const response = await fetch(PRODUCTS_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    let filteredData = [...data.data];

    // Apply client-side filtering if params are provided
    if (params) {
      // Filter by category
      if (params.category) {
        filteredData = filteredData.filter(product => 
          product.category.toLowerCase() === params.category!.toLowerCase()
        );
      }

      // Filter by tag
      if (params.tag) {
        filteredData = filteredData.filter(product =>
          product.tags.some(tag => tag.toLowerCase().includes(params.tag!.toLowerCase()))
        );
      }

      // Filter by price range
      if (params.minPrice !== undefined) {
        filteredData = filteredData.filter(product => product.price >= params.minPrice!);
      }
      if (params.maxPrice !== undefined) {
        filteredData = filteredData.filter(product => product.price <= params.maxPrice!);
      }

      // Filter by search term
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredData = filteredData.filter((product: Product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.slug.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      // Apply sorting
      if (params.sortBy) {
        filteredData.sort((a, b) => {
          let aValue = a[params.sortBy as keyof Product];
          let bValue = b[params.sortBy as keyof Product];

          // Handle date sorting
          if (params.sortBy === 'createdAt' || params.sortBy === 'updatedAt') {
            aValue = new Date(aValue as string).getTime();
            bValue = new Date(bValue as string).getTime();
          }

          // Handle string sorting
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }

          if (params.sortOrder === 'desc') {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          } else {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          }
        });
      }

      // Store the total count before applying pagination
      const totalFilteredCount = filteredData.length;

      // Apply pagination
      const offset = params.offset || 0;
      const limit = params.limit;
      
      if (limit !== undefined) {
        filteredData = filteredData.slice(offset, offset + limit);
      }

      // Return the filtered data with correct pagination info
      return {
        data: filteredData,
        pagination: {
          total: totalFilteredCount,
          limit: params?.limit || null,
          offset: params?.offset || 0,
          hasMore: params?.limit ? (params.offset || 0) + params.limit < totalFilteredCount : false
        },
        filters: {
          category: params?.category || null,
          tag: params?.tag || null,
          status: 'published',
          minPrice: params?.minPrice || null,
          maxPrice: params?.maxPrice || null,
          sortBy: params?.sortBy || 'createdAt',
          sortOrder: params?.sortOrder || 'desc'
        }
      };
    }

    // Return all data if no params provided
    return {
      data: filteredData,
      pagination: {
        total: filteredData.length,
        limit: null,
        offset: 0,
        hasMore: false
      },
      filters: {
        category: null,
        tag: null,
        status: 'published',
        minPrice: null,
        maxPrice: null,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchLatestProducts(limit: number = 8): Promise<Product[]> {
  const response = await fetchProducts({
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  return response.data;
}

async function fetchProductsByCategory(category: string, limit: number = 6): Promise<Product[]> {
  const response = await fetchProducts({
    category,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  return response.data;
}

export async function getUniqueCategories(): Promise<string[]> {
  const response = await fetchProducts();
  const categories = [...new Set(response.data.map(product => product.category))];
  return categories;
}

export async function getUniqueTags(): Promise<string[]> {
  const response = await fetchProducts();
  const allTags = response.data.flatMap(product => product.tags);
  const uniqueTags = [...new Set(allTags)].filter(tag => tag && tag.trim() !== '');
  return uniqueTags.sort();
}

export async function fetchUniqueCategoryProducts(limit: number = 5): Promise<Product[]> {
  try {
    // Fetch a larger set of products to ensure we have variety
    const response = await fetchProducts({
      limit: 50,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    
    const products = response.data;
    const uniqueCategoryProducts: Product[] = [];
    const usedCategories = new Set<string>();
    
    // Filter products to get unique categories
    for (const product of products) {
      if (!usedCategories.has(product.category) && uniqueCategoryProducts.length < limit) {
        uniqueCategoryProducts.push(product);
        usedCategories.add(product.category);
      }
    }
    
    // If we don't have enough unique categories, fill with remaining newest products
    if (uniqueCategoryProducts.length < limit) {
      const remainingProducts = products.filter(p => !uniqueCategoryProducts.includes(p));
      const needed = limit - uniqueCategoryProducts.length;
      uniqueCategoryProducts.push(...remainingProducts.slice(0, needed));
    }
    
    return uniqueCategoryProducts;
  } catch (error) {
    console.error('Error fetching unique category products:', error);
    // Return empty array if API fails
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetchProducts();
    
    // Find exact match by slug
    const product = response.data.find(p => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}