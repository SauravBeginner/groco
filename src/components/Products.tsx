import React from "react";
import Heading from "./Heading";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const products = [
  {
    id: 1,
    imgSrc: "./images/product-1.png",
    imgAlt: "product-1",
    name: "Fresh Orange",
    price: "$4.99/- - $6.28/-",
    rating: 4.5,
  },
  {
    id: 2,
    imgSrc: "./images/product-2.png",
    imgAlt: "product-2",
    name: "Fresh Onions",
    price: "$1.99/- - $3.08/-",
    rating: 4.5,
  },
  {
    id: 3,
    imgSrc: "./images/product-3.png",
    imgAlt: "product-3",
    name: "Fresh Meat",
    price: "$4.99/- - $12.00/-",
    rating: 5,
  },
  {
    id: 4,
    imgSrc: "./images/product-4.png",
    imgAlt: "product-4",
    name: "Fresh Cabbage",
    price: "$1.00/- - $2.48/-",
    rating: 4.5,
  },
  {
    id: 5,
    imgSrc: "./images/product-5.png",
    imgAlt: "product-5",
    name: "Fresh Potato",
    price: "$3.70/- - $5.08/-",
    rating: 4.5,
  },
  {
    id: 6,
    imgSrc: "./images/product-6.png",
    imgAlt: "product-6",
    name: "Fresh Hass Avocado",
    price: "$4.50/- - $6.04/-",
    rating: 5,
  },
  {
    id: 7,
    imgSrc: "./images/product-7.png",
    imgAlt: "product-7",
    name: "Fresh Carrot",
    price: "$0.99/- - $2.49/-",
    rating: 4.5,
  },
  {
    id: 8,
    imgSrc: "./images/product-8.png",
    imgAlt: "product-8",
    name: "Fresh Lime",
    price: "$5.99/- - $6.99/-",
    rating: 5,
  },
];

export const Products = () => {
  return (
    <section className="py-8" id="products">
      <Heading>
        Our{" "}
        <span className="bg-green-500 text-white px-4 py-2 heading">
          Products
        </span>
      </Heading>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        //   centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="swiper-wrapper flex">
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="swiper-slide p-6 bg-white rounded-lg shadow-lg text-center"
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
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};
