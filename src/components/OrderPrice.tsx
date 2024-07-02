import { useFetchCartQuery } from "../redux/apiSlice";

export const OrderPrice = () => {
  const { data: item } = useFetchCartQuery();
  const { totalPrice, totalQuantity } = item || {};
  return (
    <>
      <form action="#" className="mt-6">
        <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
          <div className="flex-grow">
            <input
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter coupon code"
            />
          </div>
          <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Apply Coupon
            </button>
          </div>
        </div>
      </form>
      <ul className="mt-6 space-y-3">
        <li className="flex items-center justify-between text-gray-900">
          <p className="text-sm font-medium ">Total Quantity</p>
          <p className="text-sm font-bold ">
            {" "}
            {totalQuantity} <span className="font-medium">(Items)</span>
          </p>
        </li>
        <li className="flex items-center justify-between text-gray-600">
          <p className="text-sm font-medium">Sub total</p>
          <p className="text-sm font-medium">₹ {totalPrice}</p>
        </li>
        <li className="flex items-center justify-between text-gray-900">
          <p className="text-sm font-medium ">Total</p>
          <p className="text-sm font-bold ">₹ {totalPrice}</p>
        </li>
      </ul>
    </>
  );
};
