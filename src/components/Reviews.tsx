import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Heading } from "./Heading";
import { reviews } from "../data/dummy";

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
