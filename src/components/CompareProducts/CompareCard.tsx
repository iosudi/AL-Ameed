import { VehicleDetails } from "@/interfaces/Vehicles";
import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarInfo from "../ProductDetails/CarInfo";
import "/node_modules/swiper/swiper-bundle.min.css";

type cardProps = {
  index?: number;
  vehicle: VehicleDetails;
};

export const CompareCard = ({ index, vehicle }: cardProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [totalSlides, setTotalSlides] = React.useState(0);

  return (
    <div>
      <div className="mb-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          cssMode={true}
          slidesPerView={1}
          navigation={{
            nextEl: `.gallery-swiper-next-${index}`,
            prevEl: `.gallery-swiper-prev-${index}`,
          }}
          onInit={(swiper) => {
            setCurrentIndex(swiper.realIndex + 1);
            setTotalSlides(swiper.slides.length);
          }}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex + 1);
          }}
        >
          {vehicle.images.map((image) => {
            return (
              <SwiperSlide key={image.id}>
                <div>
                  <img
                    className="h-[445px] w-full object-cover object-center rounded-xl"
                    src={`${import.meta.env.VITE_API_BASE_URL}${image.image}`}
                    alt="image"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            className={`gallery-swiper-prev-${index} h-fit arrow cursor-pointer bg-[#202324] p-3 rounded-xl text-lg text-white disabled:bg-[#1d2020] disabled:text-[#aaa disabled:cursor-not-allowed`}
          >
            <GoArrowRight />
          </button>

          <span>
            {currentIndex}/{totalSlides}
          </span>

          <button
            className={`gallery-swiper-next-${index} h-fit arrow cursor-pointer bg-[#202324] p-3 rounded-xl text-lg text-white disabled:bg-[#1d2020] disabled:text-[#aaa] disabled:cursor-not-allowed`}
          >
            <GoArrowLeft />
          </button>
        </div>
      </div>

      <CarInfo features={vehicle.features_list} />
    </div>
  );
};

export default CompareCard;
