import { MdDelete } from "react-icons/md";

export const Modal = () => {
  return (
    <div className="absolute top-20 right-0 w-72 p-4 bg-white rounded-lg shadow-lg border-t">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="flex items-center mb-2 justify-between border-b">
          <div className="flex mb-2">
            <img src="./images/cart-img-1.png" alt="#" className="h-16 ml-2" />
            <div className="ml-4">
              <h3 className="text-lg text-gray-800">Watermelon</h3>
              <span className="block text-gray-600">$5.89/-</span>
              <span className="block text-gray-600">Qty : 1</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-2xl text-gray-800 cursor-pointer hover:text-green-500">
            <MdDelete />
          </span>
        </div>
      ))}
      {/* <div className="flex items-center mb-4">
        <span className="material-symbols-outlined text-2xl text-gray-800 cursor-pointer hover:text-green-500">
          delete
        </span>
        <img src="./images/cart-img-2.png" alt="#" className="h-16 ml-2" />
        <div className="ml-4">
          <h3 className="text-lg text-gray-800">Onion</h3>
          <span className="block text-gray-600">$3.59/-</span>
          <span className="block text-gray-600">Qty : 1/kg</span>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <span className="material-symbols-outlined text-2xl text-gray-800 cursor-pointer hover:text-green-500">
          delete
        </span>
        <img src="./images/cart-img-3.png" alt="#" className="h-16 ml-2" />
        <div className="ml-4">
          <h3 className="text-lg text-gray-800">Chicken</h3>
          <span className="block text-gray-600">$9.99/-</span>
          <span className="block text-gray-600">Qty : 1/kg</span>
        </div>
      </div> */}
      <div className="text-xl text-gray-800 text-center">Total : $19.47/-</div>
      <a
        href="#"
        className="block mt-4 bg-green-500 text-white text-center text-lg py-2 rounded-lg"
      >
        Checkout
      </a>
    </div>
  );
};
