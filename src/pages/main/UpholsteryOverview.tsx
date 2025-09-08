import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { service_swiper } from "@/constants/swiper-breakpoints";
import { useUpholsteryMaterials } from "@/hooks/useUpholstery";
import { UpholsteryMaterials } from "@/interfaces/UpholsteryMaterials";
import { NAMESPACES } from "@/translations/namespaces";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const UpholsteryOverview = () => {
  const [swiperKey, setSwiperKey] = React.useState(0);
  const [dir, setDir] = React.useState<"rtl" | "ltr">("ltr");
  const { data } = useUpholsteryMaterials();
  const { t, i18n } = useTranslation([
    NAMESPACES.UpholsteryOverview,
    NAMESPACES.common,
  ]);

  React.useEffect(() => {
    const currentDir =
      (document.documentElement.getAttribute("dir") as "rtl" | "ltr") || "ltr";
    setDir(currentDir);
    setSwiperKey((prev) => prev + 1);
  }, [i18n.language]);

  return (
    <div>
      <h2 className="md:text-5xl text-3xl text-center mb-4 mt-28">
        {t("UpholsteryOverview:UpholsteryHeading")}
      </h2>

      <div className="lg:px-24">
        <h4 className="md:text-2xl text-xl px-12">
          {t("UpholsteryOverview:UpholsteryTypes")}
        </h4>
        <div className="my-4 flex items-center gap-3 relative">
          <button className="service-swiper-prev  h-fit arrow cursor-pointer bg-[#D40000] p-2 rounded text-lg text-white disabled:bg-[#d40000a1] disabled:text-[#aaa] disabled:cursor-not-allowed">
            {dir === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </button>

          <Swiper
            modules={[Navigation]}
            breakpoints={service_swiper}
            grabCursor={true}
            key={swiperKey}
            dir={dir}
            navigation={{
              nextEl: ".service-swiper-next",
              prevEl: ".service-swiper-prev",
            }}
          >
            {data?.data.results.map((type: UpholsteryMaterials) => {
              return (
                <SwiperSlide key={type.id}>
                  <div className="bg-[#202324] rounded-2xl p-4 text-center ">
                    <div className="sm:h-72 h-52 relative">
                      <img
                        className="w-full h-full object-cover object-center rounded-xl"
                        src="https://i.pinimg.com/736x/f2/f3/ad/f2f3adb30a3529c02d9c197102204548.jpg"
                        alt="service image"
                      />
                      <div className="absolute bottom-0 right-0 w-full flex items-center justify-start gap-3 sm:px-4 px-1 py-2 bg-gradient-to-t from-black to-transparent">
                        <h6 className="sm:text-2xl text-lg">{type.name}</h6>
                      </div>
                    </div>

                    <div className="flex md:flex-row flex-col  items-center justify-between mt-3">
                      <Badge
                        variant="secondary"
                        className="sm:text-lg text-base text-white bg-[#242728] rounded md:w-fit w-full"
                      >
                        BHD{" "}
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                        }).format(type.price)}
                      </Badge>

                      <NavLink to={`/upholstery-details?id=${type.id}`}>
                        <Button
                          variant={"ghost"}
                          className="sm:text-lg text-xs text-[#D40000] cursor-pointer p-0"
                        >
                          {t("common:offer_details")}
                          {i18n.language == "ar" ? (
                            <IoIosArrowBack />
                          ) : (
                            <IoIosArrowForward />
                          )}
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button className="service-swiper-next h-fit arrow cursor-pointer bg-[#D40000] p-2 rounded text-lg text-white disabled:bg-[#d40000a1] disabled:text-[#aaa] disabled:cursor-not-allowed">
            {i18n.language == "ar" ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
        </div>
      </div>

      <div className="px-4">
        <h2 className="md:text-5xl text-3xl text-center mb-8 mt-16">
          {t("UpholsteryOverview:features")}
        </h2>

        <div className="grid sm:grid-cols-2 sm:gap-8 gap-4 lg:px-28 ">
          <div className="lg:p-16 p-6 rounded-xl bg-[#202324]">
            <h5 className="md:text-3xl sm:text-2xl text-xl mb-4">
              {t("UpholsteryOverview:upholstery.leather_title")}
            </h5>
            <p className="md:text-lg sm:text-base text-sm">
              {t("UpholsteryOverview:upholstery.leather_description")}
            </p>
          </div>

          <div className="lg:p-16  p-6 rounded-xl bg-[#202324]">
            <h5 className="md:text-3xl sm:text-2xl text-xl mb-4">
              {t("UpholsteryOverview:upholstery.vinyl_title")}
            </h5>
            <p className="md:text-lg sm:text-base text-sm">
              {t("UpholsteryOverview:upholstery.vinyl_description")}
            </p>
          </div>

          <div className="lg:p-16  p-6 rounded-xl bg-[#202324]">
            <h5 className="md:text-3xl sm:text-2xl text-xl mb-4">
              {t("UpholsteryOverview:upholstery.nylon_title")}
            </h5>
            <p className="md:text-lg sm:text-base text-sm">
              {t("UpholsteryOverview:upholstery.nylon_description")}
            </p>
          </div>

          <div className="lg:p-16  p-6 rounded-xl bg-[#202324]">
            <h5 className="md:text-3xl sm:text-2xl text-xl mb-4">
              {t("UpholsteryOverview:upholstery.polyester_title")}
            </h5>
            <p className="md:text-lg sm:text-base text-sm">
              {t("UpholsteryOverview:upholstery.polyester_description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpholsteryOverview;
