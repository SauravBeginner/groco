import { Trash } from "lucide-react";
import withScrollTop from "../hoc/withScrollTop";
import { useClearCartMutation, useFetchCartQuery } from "../redux/apiSlice";
import { CartSkeleton } from "../loader/CartSkeleton";
import { useEffect, useState } from "react";
import DeleteModal from "../components/DeleteModal";
import { CartImes } from "../components/CartImes";
import { PriceDetails } from "../components/PriceDetails";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { data: item, isLoading } = useFetchCartQuery();
  const { cart, totalPrice, totalQuantity } = item || {};
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState("");
  const [clearCart] = useClearCartMutation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);
  const handleClearCart = async () => {
    try {
      await clearCart(undefined);
      onClose();
    } catch (err) {
      console.error("Failed to clear the cart: ", err);
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="mx-auto mt-10 max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <div className="flex items-center justify-between mt-10">
          <h1 className="text-3xl  font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          {item?.totalQuantity !== 0 && (
            <div className="ml-6 p-2 rounded-lg flex text-sm bg-red-600 hover:bg-red-700 text-white">
              <button
                type="button"
                className="flex items-center space-x-1 px-2 py-1 pl-0"
                onClick={() => {
                  setIsOpen(true);
                  setMsg("Are you sure you want to clear the cart?");
                }}
              >
                <Trash size={24} className="text-white" />
                <span className="text-xs font-bold text-white">
                  Clear All Cart Items
                </span>
              </button>
            </div>
          )}
        </div>
        {item?.totalQuantity === 0 ? (
          <div className="h-[20vh] mt-10">
            <h1 className="text-center">No items in Cart</h1>
          </div>
        ) : (
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8 lg:max-h-[70vh] lg:overflow-y-auto scrollbar-hide"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <CartSkeleton key={index} />
                    ))
                  : cart?.items?.map((cartItem: any) => (
                      <CartImes key={cartItem?.id} cartItem={cartItem} />
                    ))}
              </ul>
            </section>

            {/* Order summary */}
            <PriceDetails
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
            />
          </form>
        )}
        {isOpen && (
          <DeleteModal
            message={msg}
            onConfirm={handleClearCart}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default withScrollTop(Cart);
