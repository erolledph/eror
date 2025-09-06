import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchProductBySlug, fetchProducts } from '@/lib/api';
import ProductImageGallery from '@/components/Products/ProductImageGallery';
import ProductsYouMayLikeSection from '@/components/Products/ProductsYouMayLikeSection';
import SocialShareButtons from '@/components/Products/SocialShareButtons';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | TechMart',
      description: 'The product you are looking for could not be found.',
    };
  }

  return {
    title: `${product.name} | TechMart`,
    description: product.description.replace(/[#*`]/g, '').substring(0, 160),
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products from the same category
  let relatedProducts = [];
  try {
    const response = await fetchProducts({
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    // Get all products for the "Products You May Like" section
    relatedProducts = response.data;
  } catch (error) {
    console.error('Error fetching related products:', error);
  }

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <main>
      <div className="pt-[120px] pb-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-dark-4">
              <li>
                <Link href="/" className="hover:text-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-blue transition-colors">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-dark font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-xl shadow-1 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Product Images Gallery */}
              <div className="p-6 lg:p-8">
                <ProductImageGallery 
                  imageUrls={product.imageUrls || [product.imageUrl]} 
                  productName={product.name} 
                />
              </div>

              {/* Product Details */}
              <div className="p-6 lg:p-8 xl:p-12">
                <div className="mb-6">
                  <span className="inline-block text-sm font-medium text-blue bg-blue/10 px-3 py-1.5 rounded-full mb-4">
                    {product.category}
                  </span>
                  <h1 className="font-bold text-2xl lg:text-3xl xl:text-4xl text-dark mb-4 leading-tight">
                    {product.name}
                  </h1>

                  {/* Star Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 fill-current ${i < 4 || (i === 4 && 0.5) ? 'text-yellow' : 'text-gray-3'}`}
                          viewBox="0 0 20 20"
                        >
                          {i === 4 ? (
                            // Half star for 4.5 rating
                            <defs>
                              <linearGradient id={`half-${i}`}>
                                <stop offset="50%" stopColor="#FBBF24" />
                                <stop offset="50%" stopColor="#E5E7EB" />
                              </linearGradient>
                            </defs>
                          ) : null}
                          <path 
                            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" 
                            fill={i === 4 ? `url(#half-${i})` : undefined}
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-medium text-dark">4.5</span>
                  </div>
                  
                  {/* Discount and Savings Badges */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {product.percentOff && product.percentOff > 0 && (
                      <div className="bg-gradient-to-r from-red to-red-dark text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        -{product.percentOff}% OFF
                      </div>
                    )}

                    {product.savings > 0 && (
                      <div className="bg-green text-white text-sm font-medium px-4 py-2 rounded-full">
                        Save {product.currency}{formatPrice(product.savings)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8 p-4 bg-gray-1 rounded-lg">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-bold text-3xl lg:text-4xl text-dark">
                      {product.currency}{formatPrice(product.discountedPrice)}
                    </span>
                    {product.originalPrice > product.discountedPrice && (
                      <span className="text-dark-4 text-xl lg:text-2xl line-through">
                        {product.currency}{formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.savings > 0 && (
                    <p className="text-green font-semibold text-lg">
                      You save {product.currency}{formatPrice(product.savings)} ({product.percentOff}% off)
                    </p>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4 mb-8">
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue to-blue-dark text-white text-lg font-bold py-4 px-8 rounded-lg hover:from-blue-dark hover:to-blue transition-all duration-200 shadow-lg hover:shadow-xl text-center block"
                  >
                    Buy Now - {product.currency}{formatPrice(product.discountedPrice)}
                  </a>
                </div>

                {/* Social Share Section */}
                <div className="border-t border-gray-3 pt-6">
                  <h3 className="font-semibold text-lg text-dark mb-4">Share this product</h3>
                  <SocialShareButtons 
                    productName={product.name}
                    productUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://techmart.com'}/products/${product.slug}`}
                  />
                </div>

              
              </div>
            </div>

            {/* Product Description Section */}
            <div className="border-t border-gray-3 p-6 lg:p-8 xl:p-12">
              <div className="max-w-4xl">
                <h2 className="font-semibold text-xl lg:text-2xl text-dark mb-6">Product Description</h2>
                <div className="prose prose-lg max-w-none prose-headings:text-dark prose-p:text-dark-4 prose-strong:text-dark prose-a:text-blue prose-a:no-underline hover:prose-a:underline prose-ul:text-dark-4 prose-ol:text-dark-4 prose-li:text-dark-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => <h1 className="text-2xl font-bold text-dark mb-4">{children}</h1>,
                      h2: ({children}) => <h2 className="text-xl font-semibold text-dark mb-3 mt-6">{children}</h2>,
                      h3: ({children}) => <h3 className="text-lg font-semibold text-dark mb-2 mt-4">{children}</h3>,
                      p: ({children}) => <p className="text-dark-4 mb-4 leading-relaxed">{children}</p>,
                      ul: ({children}) => <ul className="list-disc list-inside text-dark-4 mb-4 space-y-2">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside text-dark-4 mb-4 space-y-2">{children}</ol>,
                      li: ({children}) => <li className="text-dark-4">{children}</li>,
                      strong: ({children}) => <strong className="font-semibold text-dark">{children}</strong>,
                      a: ({href, children}) => <a href={href} className="text-blue hover:underline font-medium" target="_blank" rel="noopener noreferrer">{children}</a>,
                      blockquote: ({children}) => <blockquote className="border-l-4 border-blue pl-4 italic text-dark-4 my-4">{children}</blockquote>,
                      code: ({children}) => <code className="bg-gray-2 px-2 py-1 rounded text-sm font-mono text-dark">{children}</code>,
                      pre: ({children}) => <pre className="bg-gray-2 p-4 rounded-lg overflow-x-auto text-sm font-mono text-dark mb-4">{children}</pre>,
                    }}
                  >
                    {product.description}
                  </ReactMarkdown>
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-3">
                    <h3 className="font-semibold text-lg text-dark mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Link
                          key={index}
                          href={`/products?tags=${encodeURIComponent(tag)}`}
                          className="text-sm font-medium text-dark-4 bg-gray-2 hover:bg-blue hover:text-white px-3 py-1.5 rounded-full transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continue Shopping Button */}
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gray-2 text-dark text-lg font-semibold py-3 px-8 rounded-lg hover:bg-gray-3 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
                  fill="currentColor"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Products You May Like Section */}
      {relatedProducts.length > 0 && (
        <ProductsYouMayLikeSection allPossibleProducts={relatedProducts} currentProductId={product.id} />
      )}
    </main>
  );
};

export default ProductPage;