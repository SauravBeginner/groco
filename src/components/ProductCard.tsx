import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }: any) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        key={product.id}
        className="swiper-slide p-6 bg-white rounded-lg shadow-lg text-center"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.imgSrc}
          alt={product.imgAlt}
          className="mx-auto h-48 mb-4"
        />
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
        <a
          href="#"
          className="btn bg-none border border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg"
        >
          Add to Cart
        </a>
      </div>
    </div>
  );
};
