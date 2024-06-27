import { MdDelete } from "react-icons/md";
import { useCarts } from "../hooks/useCarts";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { forwardRef } from "react";

export const CartModal = forwardRef<HTMLDivElement>((props, ref) => {
  const { carts, total, loading } = useCarts();

  const navigate = useNavigate();
  if (loading) {
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

  return (
    <div
      ref={ref}
      className="absolute top-20 right-0 w-72 p-4 bg-white rounded-lg shadow-lg border-t"
    >
      {carts?.items?.map((cartItem) => (
        <div
          className="flex items-center mb-2 justify-between border-b"
          key={cartItem?.id}
        >
          <div className="flex mb-2">
            <img
              src={cartItem?.product?.thumbNail}
              alt="#"
              className="h-16 ml-2"
            />
            <div className="ml-4">
              <h3 className="text-lg text-gray-800">
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
          <span className="material-symbols-outlined text-2xl text-gray-800 cursor-pointer hover:text-green-500">
            <MdDelete />
          </span>
        </div>
      ))}
      <div className="text-xl text-gray-800 text-center">
        Total : ₹ {total} /-
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
