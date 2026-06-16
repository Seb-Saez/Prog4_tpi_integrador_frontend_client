/**
 * Skeleton placeholder shown while the product list is loading.
 * Uses Tailwind's animate-pulse to mimic the card layout.
 */
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    {/* Image area */}
    <div className="h-48 bg-gray-200" />
    <div className="p-5">
      {/* Badge */}
      <div className="h-5 w-20 bg-gray-200 rounded-full mb-3" />
      {/* Title */}
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
      {/* Description lines */}
      <div className="h-4 w-full bg-gray-200 rounded mb-1.5" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-4" />
      {/* Category tags */}
      <div className="flex gap-1.5 mb-4">
        <div className="h-4 w-16 bg-gray-200 rounded-full" />
        <div className="h-4 w-12 bg-gray-200 rounded-full" />
      </div>
      {/* Price */}
      <div className="pt-2 border-t border-gray-100">
        <div className="h-7 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const SKELETON_COUNT = 8;

const ProductListSkeleton = () => (
  <div className="max-w-7xl mx-auto">
    {/* Heading skeleton */}
    <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-8" />

    {/* Filter bar skeleton */}
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <div className="flex-1 h-10 bg-gray-200 rounded-xl animate-pulse" />
      <div className="sm:w-64 h-10 bg-gray-200 rounded-xl animate-pulse" />
    </div>

    {/* Card grid skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default ProductListSkeleton;
