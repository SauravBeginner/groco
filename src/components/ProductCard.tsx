import { useNavigate } from "react-router-dom";
import { SamllButton } from "./SmallButton";

export const ProductCard = ({ product, isGridView }: any) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="swiper-slide p-6 bg-white rounded-lg shadow-lg text-center"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.thumbNail}
          alt={product.imgAlt}
          loading="lazy"
          className={`mx-auto h-48 mb-4 ${isGridView ? "" : "mr-4"}`}
        />
        <div className={`${isGridView ? "" : "flex flex-col items-start"}`}>
          <h1 className="text-2xl text-gray-800 mb-2">{product.name}</h1>
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
          <SamllButton className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-black px-8 py-2 rounded-lg">
            Add to Cart
          </SamllButton>
        </div>
      </div>
    </div>
  );
};
