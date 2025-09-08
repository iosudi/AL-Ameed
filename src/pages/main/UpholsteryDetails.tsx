import { getCarModel } from "@/api/Upholstery/upholsteryService";
import CallBtn from "@/common/components/CallBtn";
import ContactBtn from "@/common/components/ContactBtn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upholstery_types_swiper } from "@/constants/swiper-breakpoints";
import {
  useUpholsteryMaterials,
  useUpholsteryTypes,
} from "@/hooks/useUpholstery";
import { CarModel } from "@/interfaces/CarModel";
import { UpholsteryTypes } from "@/interfaces/UpholsteryTypes";
import { NAMESPACES } from "@/translations/namespaces";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const UpholsteryDetails = () => {
  const [swiperKey, setSwiperKey] = React.useState(0);
  const { i18n, t } = useTranslation(NAMESPACES.UpholsteryDetails);
  const [dir, setDir] = React.useState<"rtl" | "ltr">("ltr");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const materialId = searchParams.get("id") || "";
  const [selectedModelId, setSelectedModelId] = useState<number>(1);
  const [selectedMaterialId] = useState<number>(Number(materialId));
  const { data: MaterialData } = useUpholsteryMaterials(Number(materialId));
  const { data } = useUpholsteryTypes(selectedModelId, selectedMaterialId);

  const [carList, setCarList] = useState<CarModel[] | null>(null);

  React.useEffect(() => {
    fetchCarList();
  }, []);

  React.useEffect(() => {
    const currentDir =
      (document.documentElement.getAttribute("dir") as "rtl" | "ltr") || "ltr";
    setDir(currentDir);
    setSwiperKey((prev) => prev + 1);
  }, [i18n.language]);

  // 🚗 When user selects a new car model
  const handleModelChange = (modelId: number) => {
    setSelectedModelId(modelId); // triggers refetch in React Query
  };

  async function fetchCarList() {
    const res = await getCarModel();
    setCarList(res.data.results);
  }

  return (
    <div className="container mx-auto px-2">
      <h1 className="md:text-6xl/relaxed text-4xl text-center md:mt-16 mt-8 mb-8">
        {t("upholsteryService.title")}
      </h1>

      <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
        <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] md:pt-16 pt-8 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
          <h6 className="mb-4 text-2xl">{MaterialData?.data.name}</h6>
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div className="p-5 bg-[#202324] rounded-2xl">
              <div className="md:h-[450px] sm:h-[400px] h-[300px] relative">
                <img
                  className="w-full h-full object-cover object-center rounded-xl"
                  src="https://i.pinimg.com/736x/f2/f3/ad/f2f3adb30a3529c02d9c197102204548.jpg"
                  alt="service image"
                />

                <div className="absolute bottom-0 right-0 w-full flex items-center justify-start gap-3 sm:px-4 px-1 py-6 bg-gradient-to-t from-black to-transparent">
                  <h6 className="text-3xl">{MaterialData?.data.name}</h6>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-3xl mb-4">
                {t("upholsteryService.materialNameLabel")}
              </h4>
              <Select
                dir="rtl"
                value={selectedModelId.toString()}
                onValueChange={(e) => handleModelChange(Number(e))}
              >
                <SelectTrigger className="border border-[#ffff] bg-[#202324] px-2 py-5 rounded-md text-2xl w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {carList?.map((model: CarModel) => (
                    <SelectItem key={model.id} value={model.id.toString()}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Action */}

              <h3 className="p-2 mt-8 rounded-md border border-white text-2xl text-[#f40000] bg-[#202324] ">
                {t("upholsteryService.priceLabel")}::{" "}
                <span className="text-white">
                  {t("upholsteryService.priceCurrency")}{" "}
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                  }).format(MaterialData?.data.price)}
                </span>
              </h3>

              <div className="pt-8 ">
                <CallBtn />
                <ContactBtn />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-xl">
              {t("upholsteryService.availableMaterials")}
            </h4>
            <div className="my-4 flex items-center gap-3 relative">
              <button className="service-swiper-prev  h-fit arrow cursor-pointer bg-[#D40000] p-2 rounded text-lg text-white disabled:bg-[#d40000a1] disabled:text-[#aaa] disabled:cursor-not-allowed">
                {i18n.language === "ar" ? (
                  <IoIosArrowForward />
                ) : (
                  <IoIosArrowBack />
                )}
              </button>

              <div className="w-[90%]">
                <Swiper
                  modules={[Navigation]}
                  breakpoints={upholstery_types_swiper}
                  grabCursor={true}
                  key={swiperKey}
                  dir={dir}
                  navigation={{
                    nextEl: ".service-swiper-next",
                    prevEl: ".service-swiper-prev",
                  }}
                >
                  {data?.data.results.map((material: UpholsteryTypes) => {
                    return (
                      <SwiperSlide>
                        <div className="text-center ">
                          <div className="h-26 relative bg-[#202324] rounded-lg p-2 ">
                            <img
                              className="w-full h-full object-cover object-center rounded-lg"
                              src={material.image}
                              alt="service image"
                            />
                          </div>
                          <p className="text-sm mt-2">{material.name}</p>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <button className="service-swiper-next h-fit arrow cursor-pointer bg-[#D40000] p-2 rounded text-lg text-white disabled:bg-[#d40000a1] disabled:text-[#aaa] disabled:cursor-not-allowed">
                {i18n.language == "ar" ? (
                  <IoIosArrowBack />
                ) : (
                  <IoIosArrowForward />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpholsteryDetails;
