export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  percentOff?: number;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  currency: string;
  imageUrl: string;
  imageUrls: string[];
  productUrl: string;
  category: string;
  tags: string[];
  status: string;
  userId: string;
  blogId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsApiResponse {
  data: Product[];
  pagination: {
    total: number;
    limit: number | null;
    offset: number;
    hasMore: boolean;
  };
  filters: {
    category: string | null;
    tag: string | null;
    status: string;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string;
    sortOrder: string;
  };
}