import { Button } from "./Button";
import { OrderSkeleton } from "../loader/OrderSkeleton";
import { useFetchCartQuery } from "../redux/apiSlice";

interface PriceProps {
  totalQuantity: number;
  totalPrice: number;
}
export const PriceDetails = ({ totalQuantity, totalPrice }: PriceProps) => {
  const { isLoading } = useFetchCartQuery();

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
    >
      <h2
        id="summary-heading"
        className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
      >
        Price Details
      </h2>
      <div>
        {isLoading ? (
          <OrderSkeleton />
        ) : (
          <div>
            <dl className="space-y-1 px-2 py-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-800">
                  Price ({totalQuantity} item)
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  ₹ {totalPrice}
                </dd>
              </div>
              <div className="flex items-center justify-between pt-4">
                <dt className="flex items-center text-sm text-gray-800">
                  <span>{totalPrice - totalPrice * 0.1}</span>
                </dt>
                <dd className="text-sm font-medium text-green-700">
                  - ₹ {totalPrice}
                </dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="flex text-sm text-gray-800">
                  <span>Delivery Charges</span>
                </dt>
                <dd className="text-sm font-medium text-green-700">Free</dd>
              </div>
              <div className="flex items-center justify-between border-y border-dashed py-4 ">
                <dt className="text-base font-medium text-gray-900">
                  Total Amount
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ₹ {totalPrice} /-
                </dd>
              </div>
            </dl>
            <div className="px-2 pb-4 font-medium text-green-700">
              You will save ₹ 3,431 on this order
            </div>
            <Button>CheckOut</Button>
          </div>
        )}
      </div>
    </section>
  );
};
