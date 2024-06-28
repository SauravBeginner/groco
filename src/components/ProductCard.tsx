import { useNavigate } from "react-router-dom";
import { SamllButton } from "./SmallButton";
import { useAddToCartMutation } from "../redux/apiSlice";

export const ProductCard = ({ product, isGridView }: any) => {
  const navigate = useNavigate();

  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: product?.id, quantity: 1 });
    } catch (err) {
      console.error("Failed to add to cart: ", err);
    }
  };
  return (
    <div className="cursor-pointer">
      <div className="swiper-slide p-6 bg-white rounded-lg shadow-lg text-center">
        <img
          src={product.thumbNail}
          alt={product.imgAlt}
          loading="lazy"
          className={`mx-auto h-48 mb-4 ${isGridView ? "" : "mr-4"}`}
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <div className={`${isGridView ? "" : "flex flex-col items-start"}`}>
          <h1
            className="text-2xl text-gray-800 mb-2"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.name}
          </h1>
          <div className="text-gray-800 text-lg mb-2">{product.price}</div>
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`material-symbols-outlined ${
                  index < Math.floor(product.rating)
                    ? "text-orange-500"
                    : index < product.rating
                    ? "text-orange-500"
                    : ""
                }`}
              >
                {index < product.rating
                  ? index + 0.5 === product.rating
                    ? "star_half"
                    : "star"
                  : "star"}
              </span>
            ))}
          </div>
          <SamllButton
            className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-black px-8 py-2 rounded-lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </SamllButton>
        </div>
      </div>
    </div>
  );
};
