import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { products } from "../data/dummy";
import { useNavigate } from "react-router-dom";
import { Heading } from "./Heading";
import { SamllButton } from "./SmallButton";

export const Products = () => {
  const navigate = useNavigate();
  return (
    <section className="py-8" id="products">
      <Heading>
        Our{" "}
        <span className="bg-green-500 text-white px-4 py-2 heading">
          Products
        </span>
      </Heading>
      <Swiper
        // spaceBetween={50}
        // slidesPerView={3}
        //   centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="swiper-wrapper flex">
          {products.map((product: any) => (
            <SwiperSlide
              key={product?.id}
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
                      index < Math.floor(product?.rating)
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
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};
