import React from "react";

export const OrderSkeleton = () => {
  return (
    <div className="space-y-1 px-2 py-4 animate-pulse">
      <div className="flex items-center justify-between">
        <dt className="text-sm text-gray-800 bg-gray-300 h-4 w-24" />
        <dd className="text-sm font-medium text-gray-900 bg-gray-300 h-4 w-16" />
      </div>
      <div className="flex items-center justify-between pt-4">
        <dt className="flex items-center text-sm text-gray-800 bg-gray-300 h-4 w-24" />
        <dd className="text-sm font-medium text-green-700 bg-gray-300 h-4 w-16" />
      </div>
      <div className="flex items-center justify-between py-4">
        <dt className="flex text-sm text-gray-800 bg-gray-300 h-4 w-24" />
        <dd className="text-sm font-medium text-green-700 bg-gray-300 h-4 w-16" />
      </div>
      <div className="flex items-center justify-between border-y border-dashed py-4">
        <dt className="text-base font-medium text-gray-900 bg-gray-300 h-4 w-24" />
        <dd className="text-base font-medium text-gray-900 bg-gray-300 h-4 w-16" />
      </div>
    </div>
  );
};
