export const ProductDetailsSkeleton = () => {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto md:flex justify-center items-center">
          <div className="h-64 w-full lg:h-96 bg-gray-300 rounded animate-pulse"></div>
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="my-4 h-8 bg-gray-300 rounded w-2/3 animate-pulse"></div>
            <div className="my-4 flex items-center">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"
                  ></div>
                ))}
                <div className="ml-3 h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </div>
            </div>
            <div className="leading-relaxed h-20 bg-gray-300 rounded animate-pulse"></div>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
              <div className="flex items-center">
                <span className="mr-3 h-6 bg-gray-300 rounded w-12 animate-pulse"></span>
                <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="ml-1 h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="ml-1 h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-auto flex items-center">
                <span className="mr-3 h-6 bg-gray-300 rounded w-12 animate-pulse"></span>
                <div className="relative">
                  <div className="h-10 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="title-font h-8 bg-gray-300 rounded w-24 animate-pulse"></span>
              <div className="h-10 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
