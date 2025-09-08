import { rent_offer_swiper } from "@/constants/swiper-breakpoints";
import { NAMESPACES } from "@/translations/namespaces";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const RentOffers = () => {
  const { t, i18n } = useTranslation(NAMESPACES.home);
  const [swiperKey, setSwiperKey] = React.useState(0);
  const [dir, setDir] = React.useState<"rtl" | "ltr">("ltr");

  React.useEffect(() => {
    const currentDir =
      (document.documentElement.getAttribute("dir") as "rtl" | "ltr") || "ltr";
    setDir(currentDir);
    setSwiperKey((prev) => prev + 1);
  }, [i18n.language]);

  return (
    <section className="my-8">
      <div className="container relative mx-auto px-2 pointer-events-none ">
        <div className="backdrop-blur-md absolute top-0 left-0 w-full h-full flex items-center justify-center z-30">
          <h5 className="md:text-4xl text-2xl font-bold text-center">
            انتظروا عروض الايجار ...{" "}
            <span className="text-5xl underline">قريبا</span> بالعميد
          </h5>
        </div>
        <div>
          <h2 className="text-center md:text-4xl text-2xl mb-8">
            {t("rental_offers.heading")}
          </h2>

          <Swiper
            modules={[Pagination]}
            breakpoints={rent_offer_swiper}
            grabCursor={true}
            pagination={{ clickable: true }}
            key={swiperKey}
            dir={dir}
            className="rent-offers-swiper"
          >
            {[...Array(8)].map((_, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="bg-[#202324] rounded-2xl p-2 text-center ">
                    <img
                      className="mx-auto block object-cover object-center w-full h-full"
                      src="/Home/rent-offer.svg"
                      alt="offer"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RentOffers;
