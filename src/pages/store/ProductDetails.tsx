import profileService from "@/api/profileService/profileService";
import CallBtn from "@/common/components/CallBtn";
import ContactBtn from "@/common/components/ContactBtn";
import CarInfo from "@/components/ProductDetails/CarInfo";
import CarRate from "@/components/ProductDetails/CarRate";
import CarScanInfo from "@/components/ProductDetails/CarScanInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetFeaturesById } from "@/hooks/useFeature";
import { useCarVehicleId } from "@/hooks/useVehicles";
import { Feature } from "@/interfaces/Feature";
import { Image } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CiHeart } from "react-icons/ci";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { SlSizeFullscreen } from "react-icons/sl";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { NavLink, useLocation } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper-bundle.min.css";

export const ProductDetails = () => {
  const [swiperKey, setSwiperKey] = React.useState(0);
  const [dir, setDir] = React.useState<"rtl" | "ltr">("ltr");
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [totalSlides, setTotalSlides] = React.useState(0);
  const location = useLocation();
  const { t, i18n } = useTranslation(NAMESPACES.productDetails);
  const searchParams = new URLSearchParams(location.search);
  const carId = searchParams.get("id") || "";

  const { data } = useCarVehicleId(Number(carId));

  const featureIds = data?.data.features || [];

  const featuresQueries = useGetFeaturesById(featureIds, data?.data);

  const features = featuresQueries
    .map((q) => q.data?.data) // extract the actual feature data from AxiosResponse
    .filter(Boolean) as Feature[];

  async function AddToFavorites(vehichle_id: number) {
    const res = await profileService.AddToFavorite(vehichle_id);
    if (res.data.status == "success") toast.success(res.data.message);
  }

  async function AddToCompare(vehichle_id: number) {
    const res = await profileService.AddToCompare(vehichle_id);
    if (res.data.status == "success") toast.success(res.data.message);
  }

  React.useEffect(() => {
    const currentDir =
      (document.documentElement.getAttribute("dir") as "rtl" | "ltr") || "ltr";
    setDir(currentDir);
    setSwiperKey((prev) => prev + 1);
  }, [i18n.language]);

  if (carId == "") {
    return <h2 className="text-4xl font-bold text-center">لا يوجد سياره</h2>;
  }

  return (
    <section className="sm:mt-20 px-2">
      <div className="container mx-auto">
        <div className="h-fit p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] sm:p-6 p-3">
            <div className="grid md:grid-cols-3 grid-cols-1 xl:gap-10 lg:gap-6 md:gap-4">
              <div className="col-span-2">
                <PhotoProvider maskOpacity={0.5}>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    key={swiperKey}
                    dir={dir}
                    grabCursor={true}
                    navigation={{
                      nextEl: ".gallery-swiper-next",
                      prevEl: ".gallery-swiper-prev",
                    }}
                    onUpdate={(swiper) => {
                      setTotalSlides(swiper?.slides.length);
                    }}
                    onSlideChange={(swiper) => {
                      setCurrentIndex(swiper.realIndex + 1);
                    }}
                  >
                    {data?.data.images.map((image: Image, index: number) => {
                      return (
                        <SwiperSlide key={index}>
                          <PhotoView src={image.image}>
                            <div className="relative">
                              <img
                                className="md:max-h-[545px] max-h-[250px] w-full object-cover object-center rounded-xl"
                                src={image.image}
                                alt="image"
                              />
                              <div className="absolute bottom-0 right-0 w-full flex items-center justify-end gap-3 sm:px-4 px-1 py-3 bg-gradient-to-t from-black to-transparent">
                                <h6 className="sm:text-2xl  flex items-center gap-4 cursor-pointer">
                                  <SlSizeFullscreen />
                                  {t("carDetails.full_screen")}
                                </h6>
                              </div>
                            </div>
                          </PhotoView>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </PhotoProvider>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button className="gallery-swiper-prev h-fit arrow cursor-pointer bg-[#202324] p-3 rounded-xl text-lg text-white disabled:bg-[#1d2020] disabled:text-[#aaa disabled:cursor-not-allowed">
                    {i18n.language == "ar" ? <GoArrowRight /> : <GoArrowLeft />}
                  </button>

                  <span>
                    {currentIndex}/{totalSlides}
                  </span>

                  <button className="gallery-swiper-next h-fit arrow cursor-pointer bg-[#202324] p-3 rounded-xl text-lg text-white disabled:bg-[#1d2020] disabled:text-[#aaa] disabled:cursor-not-allowed">
                    {i18n.language == "ar" ? <GoArrowLeft /> : <GoArrowRight />}
                  </button>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="lg:text-3xl text-xl mb-4">{`${data?.data.brand_details.name} ${data?.data.model} / ${data?.data.year} (${data?.data.color})`}</h2>

                <div className="price mb-2">
                  <p className="text-lg text-[#d40000]">
                    {t("carDetails.priceLabel")}
                  </p>
                  <h3 className="lg:text-2xl md:text-xl">
                    {data?.data.currency}{" "}
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                    }).format(data?.data.price)}
                  </h3>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge
                    className="text-[#DE0101] bg-[#202324] text-base px-4"
                    variant={"default"}
                  >
                    {data?.data.condition_ar}
                  </Badge>

                  <Badge
                    className="text-[#DE0101] bg-[#202324] text-base px-4"
                    variant={"default"}
                  >
                    {data?.data.engine_type}
                  </Badge>

                  <Badge
                    className="text-[#DE0101] bg-[#202324] text-base px-4"
                    variant={"default"}
                  >
                    {data?.data.transmission}
                  </Badge>
                </div>

                {/* Action */}
                <div className="pb-8 border-b ">
                  {data?.data.type == "rent" && (
                    <NavLink to={`/rent-car?id=${carId}`}>
                      <Button
                        variant={"default"}
                        size={"lg"}
                        className="border  border-white bg-[#202324] text-[#fff] lg:text-2xl md:text-xl py-6 w-full gap-6 mb-4"
                      >
                        {t("carDetails.rent")}
                      </Button>
                    </NavLink>
                  )}

                  {data?.data.type == "rent_to_own" && (
                    <NavLink to={`/rent-to-own?id=${carId}`}>
                      <Button
                        variant={"default"}
                        size={"lg"}
                        className="border  border-white bg-[#202324] text-[#fff] lg:text-2xl md:text-xl py-6 w-full gap-6 mb-4"
                      >
                        {t("carDetails.rent_to_own")}
                      </Button>
                    </NavLink>
                  )}
                  <CallBtn />
                  <ContactBtn />
                </div>

                <div className=" flex items-center justify-center gap-4 mt-4">
                  <Button
                    variant={"outline"}
                    className="border-[#d80000] bg-transparent rounded-full  xl:text-xl grow "
                    onClick={() => AddToCompare(data?.data.id)}
                  >
                    {t("carDetails.compare")}
                    <FaScaleUnbalanced className="size-5" />
                  </Button>

                  <Button
                    variant={"outline"}
                    className="border-[#d80000] bg-transparent rounded-full  xl:text-xl grow"
                    onClick={() => AddToFavorites(data?.data.id)}
                  >
                    <span className="lg:inline md:hidden">
                      {t("carDetails.favorite")}
                    </span>
                    <CiHeart className="size-6" />
                  </Button>

                  {/* <Button
                    variant={"outline"}
                    size={"icon"}
                    className="border-[#d80000] bg-transparent rounded-full"
                  >
                    <IoShareSocialOutline className="xl:size-6 size-5" />
                  </Button> */}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 xl:gap-10 lg:gap-6 gap-4 mt-6">
              <div
                className={` bg-[#202324] rounded-lg p-4 ${
                  data?.data.inquiry_data ? "md:col-span-2" : "col-span-3"
                }`}
              >
                <CarInfo features={features} />
              </div>

              {data?.data.inquiry_data && (
                <div className=" bg-[#202324] rounded-lg p-4">
                  <CarScanInfo />
                </div>
              )}
            </div>

            <div className="grid mt-6 w-full bg-[#202324] rounded-lg lg:p-8 p-4">
              <CarRate vehicle={data?.data} />
            </div>

            {/* <div className="grid mt-6 w-full rounded-lg p-8 relative">
              <RelatedCars />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
