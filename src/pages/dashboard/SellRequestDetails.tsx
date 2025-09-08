import sellService from "@/api/sellService/sellService";
import logo from "@/assets/Logo.svg";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { SellRequestResult } from "@/interfaces/SellRequest";
import { NAMESPACES } from "@/translations/namespaces";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SellRequestDetails() {
  const { i18n, t } = useTranslation([
    NAMESPACES.common,
    NAMESPACES.dataTable,
    NAMESPACES.rentRequests,
    NAMESPACES.rentRequestDetails,
    NAMESPACES.sellRequestsDetails, // Add this namespace for sell-specific translations
  ]);
  const currentLanguage = i18n.language;
  const { logout } = useAuth();
  const [swiperKey, setSwiperKey] = React.useState(0);
  const [dir, setDir] = React.useState<"rtl" | "ltr">("ltr");

  const { id } = useParams();
  const [requestDetails, setRequestDetails] =
    useState<SellRequestResult | null>(null);

  async function getRequestDetails() {
    if (id) {
      const res = await sellService.getSellRequestById(id);
      setRequestDetails(res.data);
    }
  }

  useEffect(() => {
    getRequestDetails();
  }, []);

  useEffect(() => {
    const currentDir =
      (document.documentElement.getAttribute("dir") as "rtl" | "ltr") || "ltr";
    setDir(currentDir);
    setSwiperKey((prev) => prev + 1);
  }, [i18n.language]);

  return (
    <section>
      <div className="container mx-auto px-2">
        <img
          src={logo}
          alt="AlAmeed"
          className="h-48 w-auto block mx-auto mt-16 mb-8"
        />
        <div className="flex items-center justify-end md:gap-6 gap-2 mb-4">
          <Button
            className="text-lg md:!px-8 px-5 md:!py-7 py-4 md:rounded-2xl rounded-lg text-red-900"
            variant="outline"
            onClick={logout}
          >
            {t("common:logout")}
          </Button>

          <Button
            className="text-lg md:!px-8 px-5 md:!py-7 py-4 md:rounded-2xl rounded-lg"
            variant="outline"
            onClick={() =>
              currentLanguage == "ar"
                ? i18n.changeLanguage("en")
                : i18n.changeLanguage("ar")
            }
          >
            {currentLanguage == "ar" ? "EN" : "العربيه"}
            <BsGlobe2 className="size-5 ml-2" />
          </Button>
        </div>
        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900]">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
            <h2 className="md:text-3xl text-2xl text-center mb-6">
              {t("sellRequestsDetails:pageTitle")}
            </h2>

            <DashboardNavbar />

            <div className="mt-12">
              <h2 className="text-xl pb-3 border-b font-bold border-neutral-400">
                {t("sellRequestsDetails:vehicleDetails")}
              </h2>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-7">
                <div>
                  <Label className="mb-2 text-base" htmlFor="brand_model">
                    {t("sellRequestsDetails:brandModel")}
                  </Label>
                  <Input
                    id="brand_model"
                    name="brand_model"
                    value={requestDetails?.brand_model || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="year">
                    {t("sellRequestsDetails:year")}
                  </Label>
                  <Input
                    id="year"
                    name="year"
                    value={requestDetails?.year?.toString() || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="color">
                    {t("sellRequestsDetails:color")}
                  </Label>
                  <Input
                    id="color"
                    name="color"
                    value={requestDetails?.color || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="fuel_type">
                    {t("sellRequestsDetails:fuelType")}
                  </Label>
                  <Input
                    id="fuel_type"
                    name="fuel_type"
                    value={requestDetails?.fuel_type || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="transmission">
                    {t("sellRequestsDetails:transmission")}
                  </Label>
                  <Input
                    id="transmission"
                    name="transmission"
                    value={requestDetails?.transmission || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="mileage">
                    {t("sellRequestsDetails:mileage")}
                  </Label>
                  <Input
                    id="mileage"
                    name="mileage"
                    value={
                      requestDetails?.mileage
                        ? `${requestDetails.mileage.toLocaleString()} ${t(
                            "sellRequests:km"
                          )}`
                        : ""
                    }
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="body_condition">
                    {t("sellRequestsDetails:bodyCondition")}
                  </Label>
                  <Input
                    id="body_condition"
                    name="body_condition"
                    value={requestDetails?.body_condition || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label
                    className="mb-2 text-base"
                    htmlFor="previous_owners_count"
                  >
                    {t("sellRequestsDetails:previousOwnersCount")}
                  </Label>
                  <Input
                    id="previous_owners_count"
                    name="previous_owners_count"
                    value={
                      requestDetails?.previous_owners_count?.toString() || ""
                    }
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label
                    className="mb-2 text-base"
                    htmlFor="previous_accidents"
                  >
                    {t("sellRequestsDetails:previousAccidents")}
                  </Label>
                  <Input
                    id="previous_accidents"
                    name="previous_accidents"
                    value={
                      requestDetails?.previous_accidents
                        ? t("common:yes")
                        : t("common:no")
                    }
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="price">
                    {t("sellRequestsDetails:price")}
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    value={
                      requestDetails?.price
                        ? `${requestDetails.price.toLocaleString()} BHD`
                        : ""
                    }
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="price_negotiable">
                    {t("sellRequestsDetails:priceNegotiable")}
                  </Label>
                  <Input
                    id="price_negotiable"
                    name="price_negotiable"
                    value={
                      requestDetails?.price_negotiable
                        ? t("common:yes")
                        : t("common:no")
                    }
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>
              </div>

              {/* Accessories Section */}
              {requestDetails?.accessories_list &&
                requestDetails.accessories_list.length > 0 && (
                  <>
                    <h2 className="text-xl pb-3 border-b font-bold border-neutral-400 mt-6">
                      {t("sellRequestsDetails:accessories")}
                    </h2>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {requestDetails.accessories_list.map(
                          (accessory, index) => (
                            <span
                              key={index}
                              className="bg-neutral-700 text-white px-3 py-1 rounded-full text-sm"
                            >
                              {accessory}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}

              <h2 className="text-xl pb-3 border-b font-bold border-neutral-400 mt-6">
                {t("sellRequestsDetails:sellerInfo")}
              </h2>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-7">
                <div>
                  <Label className="mb-2 text-base" htmlFor="seller_name">
                    {t("sellRequestsDetails:sellerName")}
                  </Label>
                  <Input
                    id="seller_name"
                    name="seller_name"
                    value={requestDetails?.seller_name || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="seller_email">
                    {t("sellRequestsDetails:sellerEmail")}
                  </Label>
                  <Input
                    id="seller_email"
                    name="seller_email"
                    value={requestDetails?.seller_email || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="seller_phone">
                    {t("sellRequestsDetails:sellerPhone")}
                  </Label>
                  <Input
                    id="seller_phone"
                    name="seller_phone"
                    value={requestDetails?.seller_phone || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>
              </div>

              {/* Images Section */}
              {requestDetails?.images && requestDetails.images.length > 0 && (
                <>
                  <h2 className="text-xl pb-3 border-b font-bold border-neutral-400 mt-6">
                    {t("sellRequestsDetails:images")}
                  </h2>

                  <div className="mt-4">
                    <Swiper
                      grabCursor={true}
                      slidesPerView={1}
                      spaceBetween={16}
                      key={swiperKey}
                      dir={dir}
                      breakpoints={{
                        640: {
                          slidesPerView: 2,
                        },
                        768: {
                          slidesPerView: 3,
                        },
                        1024: {
                          slidesPerView: 4,
                        },
                      }}
                    >
                      {requestDetails.images.map((image) => (
                        <SwiperSlide key={image.id}>
                          <div className="bg-[#1A1C1D] rounded-2xl p-4 overflow-hidden">
                            <img
                              className="w-full h-48 object-cover rounded-lg"
                              src={image.image}
                              alt={`Car image ${image.id}`}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder-car-image.jpg"; // Fallback image
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </>
              )}

              {/* Request Status and Dates */}
              <h2 className="text-xl pb-3 border-b font-bold border-neutral-400 mt-6">
                {t("sellRequestsDetails:requestInfo")}
              </h2>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-7">
                <div>
                  <Label className="mb-2 text-base" htmlFor="status">
                    {t("sellRequestsDetails:status")}
                  </Label>
                  <Input
                    id="status"
                    name="status"
                    value={requestDetails?.status || ""}
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="created_at">
                    {t("sellRequestsDetails:createdAt")}
                  </Label>
                  <Input
                    id="created_at"
                    name="created_at"
                    value={
                      requestDetails?.created_at
                        ? new Date(
                            requestDetails.created_at
                          ).toLocaleDateString(
                            i18n.language === "ar" ? "ar-EG" : "en-US"
                          )
                        : ""
                    }
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="updated_at">
                    {t("sellRequestsDetails:updatedAt")}
                  </Label>
                  <Input
                    id="updated_at"
                    name="updated_at"
                    value={
                      requestDetails?.updated_at
                        ? new Date(
                            requestDetails.updated_at
                          ).toLocaleDateString(
                            i18n.language === "ar" ? "ar-EG" : "en-US"
                          )
                        : ""
                    }
                    className="py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>
              </div>

              <Button className="w-full mt-4">
                {t("sellRequestsDetails:share")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
