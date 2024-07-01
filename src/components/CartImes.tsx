import { useNavigate } from "react-router-dom";
import { useDeleteCartMutation, useEditCartMutation } from "../redux/apiSlice";
import { Trash } from "lucide-react";

export const CartImes = ({ cartItem }: any) => {
  const navigate = useNavigate();
  const [deleteCart] = useDeleteCartMutation();
  const [editCart] = useEditCartMutation();

  const handleDeleteCartItem = async (id: string) => {
    try {
      await deleteCart({ itemId: id });
    } catch (err) {
      console.error("Failed to add to cart: ", err);
    }
  };
  const handleUpdateCartItem = async (id: string, quantity: number) => {
    try {
      await editCart({ itemId: id, quantity });
    } catch (err) {
      console.error("Failed to add to cart: ", err);
    }
  };
  return (
    <>
      <div key={cartItem.id} className="">
        <li className="flex py-6 sm:py-6 ">
          <div className="flex-shrink-0">
            <img
              src={cartItem?.product?.thumbNail}
              alt={cartItem?.product?.name}
              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center cursor-pointer"
              onClick={() => navigate(`/product/${cartItem?.product?.id}`)}
            />
          </div>
          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <span
                      onClick={() =>
                        navigate(`/product/${cartItem?.product?.id}`)
                      }
                      className="font-semibold text-black cursor-pointer"
                    >
                      {cartItem?.product.name}
                    </span>
                  </h3>
                </div>
                <div className="mt-1 flex text-sm">
                  <p className="text-sm text-gray-500">
                    {cartItem?.product?.description}
                  </p>
                  {cartItem?.product?.description ? (
                    <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                      {cartItem?.product?.description}
                    </p>
                  ) : null}
                </div>
                <div className="mt-1 flex items-end">
                  <p className="text-xs font-medium text-gray-500 line-through">
                    {cartItem?.product?.price}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    &nbsp;&nbsp; {cartItem?.product?.price}
                  </p>
                  &nbsp;&nbsp;
                  <p className="text-sm font-medium text-green-500">
                    {cartItem?.product?.price} % off
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <div className="mb-2 flex">
          <div className="min-w-24 flex">
            <button
              type="button"
              className="h-7 w-7"
              onClick={() =>
                handleUpdateCartItem(
                  cartItem?.id,
                  cartItem?.quantity - 1 > 1 ? cartItem?.quantity - 1 : 1
                )
              }
            >
              -
            </button>
            <input
              type="text"
              className="mx-1 h-7 w-9 rounded-md border text-center"
              defaultValue={1}
              value={cartItem?.quantity}
            />
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center"
              onClick={() =>
                handleUpdateCartItem(cartItem?.id, cartItem?.quantity + 1)
              }
            >
              +
            </button>
          </div>
          <div className="ml-6 flex text-sm">
            <button
              type="button"
              className="flex items-center space-x-1 px-2 py-1 pl-0"
              onClick={() => handleDeleteCartItem(cartItem?.id)}
            >
              <Trash size={12} className="text-red-500" />
              <span className="text-xs font-medium text-red-500">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
