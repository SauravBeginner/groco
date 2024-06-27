export const ProductSkeleton = () => {
  return (
    <div className="p-6 mx-6 bg-white rounded-lg shadow-lg text-center animate-pulse mb-4 lg:w-1/4">
      <div className="h-32 bg-gray-300 mb-4"></div>
      <div className="px-6 py-4">
        <div className="h-3 bg-gray-300 mb-2"></div>
        <div className="h-2 bg-gray-300 w-2/3 mx-auto"></div>
      </div>
      <div className="px-6 pt-2 pb-2">
        <div className="h-1 bg-gray-300 w-1/4 mb-2 mx-auto"></div>
        <div className="h-1 bg-gray-300 w-1/2 mx-auto"></div>
      </div>
    </div>
  );
};
