import { useFetchCartQuery } from "../redux/apiSlice";
import { CartSkeleton } from "../loader";
import { CheckOutItems, ContactInfo, OrderPrice } from "../components";

const CheckOut = () => {
  const { data: item, isLoading } = useFetchCartQuery();
  const { cart } = item || {};
  return (
    <div className="mt-24">
      <div className="mx-auto my-4 max-w-6xl md:my-6">
        <div className="overflow-hidden rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <ContactInfo />
            {/* Product List */}
            <div className="bg-gray-100 px-5 py-6 md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200">
                  {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <CartSkeleton key={index} />
                      ))
                    : cart?.items?.map((cartItem: any) => (
                        <CheckOutItems key={cartItem?.id} cartItem={cartItem} />
                      ))}
                </ul>
              </div>
              <hr className="mt-6 border-gray-200" />
              <OrderPrice />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
