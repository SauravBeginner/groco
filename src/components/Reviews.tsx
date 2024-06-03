import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Heading from "./Heading";

const reviews = [
  {
    id: 1,
    imgSrc: "./images/pic-1.png",
    imgAlt: "review-1",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, sequi velit. Officiis soluta aperiam nostrum molestiae ab impedit nihil dolores.",
    name: "Jhon Deo",
    rating: 5,
  },
  {
    id: 2,
    imgSrc: "./images/pic-2.png",
    imgAlt: "review-2",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, sequi velit. Officiis soluta aperiam nostrum molestiae ab impedit nihil dolores.",
    name: "Emily Shelby",
    rating: 5,
  },
  {
    id: 3,
    imgSrc: "./images/pic-3.png",
    imgAlt: "review-3",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, sequi velit. Officiis soluta aperiam nostrum molestiae ab impedit nihil dolores.",
    name: "Tomson Farnandis",
    rating: 5,
  },
  {
    id: 4,
    imgSrc: "./images/pic-4.png",
    imgAlt: "review-4",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, sequi velit. Officiis soluta aperiam nostrum molestiae ab impedit nihil dolores.",
    name: "Marshall Art",
    rating: 5,
  },
  {
    id: 5,
    imgSrc: "./images/mans-29.jpg",
    imgAlt: "review-5",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, sequi velit. Officiis soluta aperiam nostrum molestiae ab impedit nihil dolores.",
    name: "Fransis Haalan",
    rating: 5,
  },
  {
    id: 6,
    imgSrc: "./images/review-img-8.jpg",
    imgAlt: "review-6",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, sequi velit. Officiis soluta aperiam nostrum molestiae ab impedit nihil dolores.",
    name: "Kevin Atlas",
    rating: 4.5,
  },
];

export const Reviews = () => {
  return (
    <section className="py-8" id="review">
      <Heading>
        Customer's{" "}
        <span className="bg-green-500 text-white px-4 py-2 heading">
          Reviews
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
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            className="swiper-slide p-6 bg-white rounded-lg shadow-lg text-center"
          >
            <img
              src={review.imgSrc}
              alt={review.imgAlt}
              className="mx-auto h-24 w-24 rounded-full mb-4"
            />
            <p className="text-gray-600 text-lg mb-4">{review.text}</p>
            <h3 className="text-2xl text-gray-800 mb-2">{review.name}</h3>
            <div className="flex justify-center">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`material-symbols-outlined ${
                    index < Math.floor(review.rating)
                      ? "text-orange-500"
                      : index < review.rating
                      ? "text-orange-500"
                      : ""
                  }`}
                >
                  {index < review.rating
                    ? index + 0.5 === review.rating
                      ? "star_half"
                      : "star"
                    : "star"}
                </span>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
