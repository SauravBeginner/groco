import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { forwardRef } from "react";
import { useDeleteCartMutation, useFetchCartQuery } from "../redux/apiSlice";

export const CartModal = forwardRef<HTMLDivElement>((_, ref) => {
  const { data: item, isLoading } = useFetchCartQuery();

  const navigate = useNavigate();

  const [deleteCart] = useDeleteCartMutation();

  const handleDeleteCartItem = async (id: string) => {
    try {
      await deleteCart({ itemId: id });
    } catch (err) {
      console.error("Failed to add to cart: ", err);
    }
  };

  if (isLoading) {
    return (
      <div className="absolute top-20 right-0 w-72 p-4 bg-white rounded-lg shadow-lg border-t">
        {/* Skeleton for Cart Items */}
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            className="flex items-center mb-2 justify-between border-b"
            key={index}
          >
            <div className="flex mb-2">
              <div className="h-16 w-16 ml-2 bg-gray-300"></div>
              <div className="ml-4">
                <div className="h-4 bg-gray-300 w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 w-24 mb-2"></div>
                <div className="h-4 bg-gray-300 w-16"></div>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl text-gray-800 cursor-pointer hover:text-green-500">
              <MdDelete />
            </span>
          </div>
        ))}
        {/* Repeat the above skeleton block for more items */}

        {/* Skeleton for Total */}
        <div className="text-xl text-gray-800 text-center">
          <div className="h-3 bg-gray-300 w-24 mx-auto"></div>
        </div>

        {/* Skeleton for Checkout Button */}
        <div className="block mt-2 bg-gray-300 text-center text-lg py-4 rounded-lg"></div>
      </div>
    );
  }

  if (item?.totalQuantity === 0) {
    return (
      <div
        ref={ref}
        className="absolute top-20 right-0 w-72 p-4 bg-white rounded-lg shadow-lg border-t"
      >
        <h1 className="text-center">No items in Cart!</h1>
      </div>
    ); // Handle case when item is not available
  }

  const { cart, totalPrice } = item;

  return (
    <div
      ref={ref}
      className="absolute top-20 right-0 w-72 p-4 bg-white rounded-lg shadow-lg border-t"
    >
      <div className="max-h-80 overflow-y-auto scrollbar-hide">
        {cart?.items?.map((cartItem: any) => (
          <div
            className="flex items-center mb-2 justify-between border-b"
            key={cartItem?.id}
          >
            <div className="flex mb-2">
              <img
                src={cartItem?.product?.thumbNail}
                alt={cartItem?.product?.name}
                className="h-16 ml-2 cursor-pointer"
                onClick={() => navigate(`/product/${cartItem?.product?.id}`)}
              />
              <div className="ml-4">
                <h3
                  className="text-lg text-gray-800 cursor-pointer"
                  onClick={() => navigate(`/product/${cartItem?.product?.id}`)}
                >
                  {cartItem?.product?.name}
                </h3>
                <span className="block text-gray-600">
                  ₹ {cartItem?.product?.price} /-
                </span>
                <span className="block text-gray-600">
                  Qty : {cartItem?.quantity}
                </span>
              </div>
            </div>
            <span
              className="material-symbols-outlined text-2xl text-gray-800 cursor-pointer hover:text-green-500"
              onClick={() => handleDeleteCartItem(cartItem?.id)}
            >
              <MdDelete />
            </span>
          </div>
        ))}
      </div>
      <div className="text-xl text-gray-800 text-center">
        Total : ₹ {totalPrice} /-
      </div>
      <Button
        className="block w-full mt-4 bg-green-500 text-white text-center text-lg py-2 rounded-lg"
        onClick={() => {
          navigate("/cart");
        }}
      >
        Checkout
      </Button>
    </div>
  );
});
