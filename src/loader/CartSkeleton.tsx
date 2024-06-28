export const CartSkeleton = () => {
  return (
    <div className="animate-pulse">
      <li className="flex py-6 sm:py-6 ">
        <div className="flex-shrink-0">
          <div className="sm:h-38 sm:w-38 h-24 w-24 rounded-md bg-gray-300" />
        </div>
        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm bg-gray-300 h-4 w-24" />
              </div>
              <div className="mt-1 flex text-sm bg-gray-300 h-4 w-32" />
              <div className="mt-1 flex items-end">
                <div className="bg-gray-300 h-4 w-16" />
                <div className="bg-gray-300 h-4 w-20 ml-2" />
                <div className="bg-gray-300 h-4 w-10 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </li>
      <div className="mb-2 flex">
        <div className="min-w-24 flex">
          <div className="bg-gray-300 h-7 w-7" />
          <input
            type="text"
            className="mx-1 h-7 w-9 rounded-md border text-center bg-gray-300"
            readOnly
          />
          <div className="bg-gray-300 h-7 w-7" />
        </div>
        <div className="ml-6 flex text-sm">
          <div className="flex items-center space-x-1 px-2 py-1 pl-0 bg-gray-300 h-6 w-16" />
        </div>
      </div>
    </div>
  );
};
