import { homeServicesSlider } from "@/data/homeServicesSlider";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Skeleton } from "../ui/skeleton";

import { brands_swiper, service_swiper } from "@/constants/swiper-breakpoints";
import { useCarBrands } from "@/hooks/useBrands";
import { useVehicles } from "@/hooks/useVehicles";
import { Brands } from "@/interfaces/Brands";
import { Vehicles } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "../../../node_modules/swiper/swiper-bundle.min.css";

export const ExploreBoxSection = () => {
  const { t, i18n } = useTranslation(NAMESPACES.home);
  const [swiperKey, setSwiperKey] = React.useState(0);
  const [dir, setDir] = React.useState<"rtl" | "ltr">("ltr");

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCondition, setSelectedCondition] = React.useState<string>(""); // Default to "all" cars
  const navigate = useNavigate();
  const { data } = useCarBrands({ primary: true });

  const {
    data: searchData,
    isLoading,
    isError,
  } = useVehicles({ search: searchQuery, condition: selectedCondition });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  // Handle condition selection (new, used, or all)
  const handleConditionChange = (condition: string) => {
    setSelectedCondition(condition);
  };

  // Handle navigation to the shop page with query params
  const handleNavigate = () => {
    let queryParams = `?search=${searchQuery}`;
    if (selectedCondition !== "") {
      queryParams += `&type=${selectedCondition}`;
    }
    navigate(`/shop${queryParams}`);
  };

  const handleNavigateToDetails = (carId: number) => {
    navigate(`/product-details?id=${carId}`);
  };

  const handleNavigateByBrand = (brand: number) => {
    const queryParams = `?brand=${brand}`;

    navigate(`/shop${queryParams}`);
  };

  const handleNavigateByContact = (type: "rent" | "rent_to_own") => {
    const queryParams = `?type=${type}`;

    navigate(`/shop${queryParams}`);
  };

  const handleNavigateByStatus = (status: string) => {
    const queryParams = `?type=${status}`;

    navigate(`/shop${queryParams}`);
  };

  const handleNavigateToUpholstery = () => {
    navigate(`/upholstery-overview`);
  };

  React.useEffect(() => {
    const currentDir =
      (document.documentElement.getAttribute("dir") as "rtl" | "ltr") || "ltr";
    setDir(currentDir);
    setSwiperKey((prev) => prev + 1);
  }, [i18n.language]);

  return (
    <section>
      <div className="container mx-auto px-2">
        <h1
          className="md:text-6xl/relaxed text-3xl/relaxed text-center mt-16 mb-8"
          dangerouslySetInnerHTML={{ __html: t("hero.heading") }}
        ></h1>

        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] p-6">
            {/* Filtration List */}
            <div className="header mb-4">
              <ul className="flex items-center justify-center sm:gap-4 gap-2 sm:text-xl text-[13px]">
                <li
                  className={`cursor-pointer ${
                    selectedCondition === "" ? "active-link" : ""
                  }`}
                  onClick={() => handleConditionChange("")}
                >
                  {t("hero.all_cars")}
                </li>
                <li
                  className={`cursor-pointer ${
                    selectedCondition === "new" ? "active-link" : ""
                  }`}
                  onClick={() => handleConditionChange("new")}
                >
                  {t("hero.new_cars")}
                </li>
                <li
                  className={`cursor-pointer ${
                    selectedCondition === "used" ? "active-link" : ""
                  }`}
                  onClick={() => handleConditionChange("used")}
                >
                  {t("hero.used_cars")}
                </li>
                {/* <li
                  className={`cursor-pointer ${
                    selectedCondition === "exclusive" ? "active-link" : ""
                  }`}
                  onClick={() => handleConditionChange("exclusive")}
                >
                  {t("hero.exclusive_offers")}
                </li> */}
              </ul>
            </div>

            {/* Search Filed */}
            <div className="flex justify-between items-center md:flex-row flex-col md:gap-36 gap-8">
              <div className="relative flex items-center gap-3 bg-transparent border-neutral-100 border px-3 py-4 rounded grow md:w-fit w-full">
                <Command className="bg-transparent text-white">
                  <CommandInput
                    placeholder={t("hero.search_placeholder")}
                    className="sm:text-2xl text-base"
                    onValueChange={handleSearch}
                    value={searchQuery}
                  />
                  {searchQuery && (
                    <CommandList className="absolute w-full top-[105%] left-0 bg-primary-200 rounded-2xl z-10">
                      {isLoading ? (
                        <div className="p-4 flex flex-col gap-3">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ) : isError ? (
                        <p className="p-4 text-red-500">
                          {t("hero.error_message")}
                        </p>
                      ) : searchData?.data?.results?.length > 0 ? (
                        searchData?.data?.results.map((result: Vehicles) => (
                          <CommandItem
                            className="cursor-pointer"
                            key={result.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigateToDetails(result.id);
                            }}
                          >{`${result.brand_name} ${result.model} ${result.year} (${result.type})`}</CommandItem>
                        ))
                      ) : (
                        searchQuery && (
                          <p className="p-4 text-gray-500">
                            {t("hero.no_results")}
                          </p>
                        )
                      )}

                      {/* Add the button here as the last item */}
                      {searchQuery && searchData?.data?.results?.length > 0 && (
                        <Button
                          className="my-4"
                          variant={"outline"}
                          onClick={handleNavigate}
                        >
                          {t("hero.go_to_store")}
                        </Button>
                      )}
                    </CommandList>
                  )}
                </Command>

                <FiSearch className="md:size-8 size-6" />
              </div>

              <NavLink to="/sell-car">
                <Button
                  className="font-bold md:text-2xl text-base py-8 rounded-lg gap-6 bg-transparent hover:bg-transparent hover:text-white md:w-fit w-full"
                  variant={"outline"}
                  size={"lg"}
                >
                  {t("hero.sell_your_car")}
                  <img
                    className="md:h-14 h-10 w-auto"
                    src="/Home/gify-car.gif"
                    alt="sell you car"
                  />
                </Button>
              </NavLink>
            </div>

            {/* Services Slider */}
            <div className="my-8 flex items-center gap-3">
              <button className="service-swiper-prev h-fit arrow cursor-pointer bg-[#202324] p-2 rounded text-lg text-white disabled:bg-[#1d2020] disabled:text-[#aaa] disabled:cursor-not-allowed">
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
                {homeServicesSlider?.map((service) => {
                  return (
                    <SwiperSlide>
                      <div
                        className="bg-[#1A1C1D] rounded-2xl p-4 md:p-8 text-center cursor-pointer hover:opacity-90 transition-all duration-200"
                        onClick={() => {
                          switch (service.type) {
                            case "used":
                              return handleNavigateByStatus("used");
                            case "new":
                              return handleNavigateByStatus("new");
                            case "rent":
                              return handleNavigateByContact("rent");
                            case "rent_to_own":
                              return handleNavigateByContact("rent_to_own");
                            case "upholstery":
                              return handleNavigateToUpholstery();
                            default:
                              return;
                          }
                        }}
                      >
                        <img
                          className="mx-auto mb-4 block h-15 md:h-20 w-auto"
                          src={service.icon}
                          alt={t(service.titleKey) || "Service icon"}
                        />
                        <h4 className="text-base sm:text-xl md:text-2xl font-semibold text-white">
                          {t(service.titleKey)}
                        </h4>
                        <p className="text-sm sm:text-base md:text-xl text-gray-300">
                          {t(service.descKey)}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              <button className="service-swiper-next h-fit arrow cursor-pointer bg-[#202324] p-2 rounded text-lg text-white disabled:bg-[#1d2020] disabled:text-[#aaa] disabled:cursor-not-allowed">
                {dir === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
              </button>
            </div>

            {/* Brands Slider */}
            <div>
              <h2 className="text-center md:text-4xl sm:text-2xl text-xl mb-8">
                {t("hero.brands.heading")}
              </h2>
              <div className="flex items-center gap-3">
                <button className="brands-swiper-prev h-fit arrow cursor-pointer bg-[#202324] p-2 rounded text-lg text-white disabled:bg-[#1d2020] disabled:text-[#aaa] disabled:cursor-not-allowed">
                  {dir === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
                </button>

                <Swiper
                  modules={[Navigation]}
                  breakpoints={brands_swiper}
                  key={swiperKey}
                  dir={dir}
                  navigation={{
                    nextEl: ".brands-swiper-next",
                    prevEl: ".brands-swiper-prev",
                  }}
                >
                  {data?.data?.results?.map((brand: Brands) => {
                    return (
                      <SwiperSlide>
                        <div
                          className="bg-[#202324] rounded-2xl p-3 text-center cursor-pointer"
                          onClick={() => {
                            handleNavigateByBrand(brand.id);
                          }}
                        >
                          <img
                            className="mx-auto block mb-4 md:h-28 h-20 w-auto"
                            src={brand.logo}
                            alt="card brand"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                <button className="brands-swiper-next h-fit arrow cursor-pointer bg-[#202324] p-2 rounded text-lg text-white disabled:bg-[#1d2020] disabled:text-[#aaa] disabled:cursor-not-allowed">
                  {dir === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </button>
              </div>
              <NavLink to="/shop">
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="text-[#D40000] mr-5"
                >
                  {dir === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}

                  {t("hero.brands.view_all")}
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreBoxSection;
