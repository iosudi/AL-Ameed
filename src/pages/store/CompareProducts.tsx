import profileService from "@/api/profileService/profileService";
import { compare_swiper } from "@/constants/swiper-breakpoints";
import { VehicleDetails } from "@/interfaces/Vehicles";
import React, { useState } from "react";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CompareCard from "../../components/CompareProducts/CompareCard";

export const CompareProducts = () => {
  const [products, setProducts] = useState<VehicleDetails[] | null>(null);

  React.useEffect(() => {
    FetchCompareList();
  }, []);

  async function FetchCompareList() {
    const res = await profileService.GetCompare();
    setProducts(res.data.vehicles); // Check if the response is right first
    console.log(res);
  }

  return (
    <section className="sm:mt-20">
      <div className="container mx-auto px-2">
        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4  lg:px-15 md:px-8 px-4">
            {products?.length ? (
              <Swiper
                modules={[Scrollbar, Navigation]}
                breakpoints={compare_swiper}
                grabCursor={true}
                scrollbar={{
                  hide: false,
                  draggable: true,
                  el: ".custom-swiper-scrollbar",
                }}
                navigation={{
                  nextEl: `.custom-swiper-next`,
                  prevEl: `.custom-swiper-prev`,
                }}
              >
                {products?.map((vehicle) => (
                  <SwiperSlide key={vehicle.id}>
                    <CompareCard index={vehicle.id} vehicle={vehicle} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <h2 className="text-3xl text-center">لا يوجد</h2>
            )}
            <div className="swiper-controls flex items-center gap-4 px-8 mt-4 ">
              <div className="custom-swiper-scrollbar h-4 max-w-3xl mx-auto bg-neutral-950 rounded-full relative grow [&_.swiper-scrollbar-drag]:!bg-white "></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareProducts;
