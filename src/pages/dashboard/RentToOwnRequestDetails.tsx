import rentService from "@/api/rentService/rentService";
import logo from "@/assets/Logo.svg";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { RentalResults } from "@/interfaces/RentalRequest";
import { NAMESPACES } from "@/translations/namespaces";
import { formatDate } from "@/utils/dateHelpers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";
import { useParams } from "react-router-dom";

export default function RentRequestDetails() {
  const { i18n, t } = useTranslation([
    NAMESPACES.common,
    NAMESPACES.dataTable,
    NAMESPACES.rentRequests,
    NAMESPACES.rentRequestDetails,
  ]);
  const currentLanguage = i18n.language;
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const { id } = useParams();
  const [requestDetails, setRequestDetails] = useState<RentalResults | null>(
    null
  );

  const handleConfirmRequest = async () => {
    if (!id) return;
    try {
      setConfirming(true);
      await rentService.confirmRentToOwnRequest(id);
      toast.success(t("rentRequestDetails:requestAccepted"));
      // optionally refetch details if status changes
      getRequestDetails();
    } catch (error) {
      console.error(error);
      toast.error(t("rentRequestDetails:failedToAccept"));
    } finally {
      setConfirming(false);
    }
  };

  const handleSendPaymentNotification = async () => {
    if (!id) return;
    try {
      setLoading(true);
      await rentService.sendPaymentNotification(id);
      toast.success("Payment reminder sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send payment reminder.");
    } finally {
      setLoading(false);
    }
  };

  async function getRequestDetails() {
    if (id) {
      const res = await rentService.getRentToOwnRequestById(id);
      console.log(res);

      setRequestDetails(res.data);
    }
  }

  useEffect(() => {
    getRequestDetails();
  }, []);

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
            className="text-lg md:!px-8 px-5 md:!py-7 py-4 md:rounded-2xl rounded-lg "
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
        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
            <h2 className="md:text-3xl text-2xl text-center mb-6">
              {t("rentRequestDetails:pageTitle")}
            </h2>

            <DashboardNavbar />

            <div className="mt-12">
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  onClick={handleSendPaymentNotification}
                  disabled={loading}
                >
                  {loading
                    ? t("rentRequestDetails:sending")
                    : t("rentRequestDetails:sendPaymentReminder")}
                </Button>

                <Button
                  onClick={handleConfirmRequest}
                  disabled={confirming}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {confirming
                    ? t("rentRequestDetails:accepting")
                    : t("rentRequestDetails:acceptRequest")}
                </Button>
              </div>
              <h2 className="text-xl pb-3 border-b font-bold border-neutral-400">
                {t("rentRequestDetails:requestDetails")}
              </h2>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-7">
                <div>
                  <Label className="mb-2 text-base" htmlFor="brand_name">
                    {t("rentRequestDetails:brand")}
                  </Label>
                  <Input
                    id="brand_name"
                    name="brand_name"
                    value={requestDetails?.vehicle.brand_details.name}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="model">
                    {t("rentRequestDetails:model")}
                  </Label>
                  <Input
                    id="model"
                    name="model"
                    value={requestDetails?.vehicle.model}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="total_price">
                    {t("rentRequestDetails:down_price")}
                  </Label>
                  <Input
                    id="down_price"
                    name="down_price"
                    value={`${requestDetails?.down_price} BHD`}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="start_date">
                    {t("rentRequestDetails:startDate")}
                  </Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    value={formatDate(
                      requestDetails?.start_date,
                      i18n.language
                    )}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="end_date">
                    {t("rentRequestDetails:endDate")}
                  </Label>
                  <Input
                    id="end_date"
                    name="end_date"
                    value={formatDate(requestDetails?.end_date, i18n.language)}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>
              </div>

              <h2 className="text-xl pb-3 border-b font-bold border-neutral- mt-6">
                {t("rentRequestDetails:customerDetails")}
              </h2>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-7">
                <div>
                  <Label className="mb-2 text-base" htmlFor="first_name">
                    {t("rentRequestDetails:firstName")}
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={requestDetails?.customer_data.first_name}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="middle_name">
                    {t("rentRequestDetails:middleName")}
                  </Label>
                  <Input
                    id="middle_name"
                    name="middle_name"
                    value={requestDetails?.customer_data.middle_name}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="last_name">
                    {t("rentRequestDetails:lastName")}
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={requestDetails?.customer_data.last_name}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="id_number">
                    {t("rentRequestDetails:idNumber")}
                  </Label>
                  <Input
                    id="id_number"
                    name="id_number"
                    value={requestDetails?.customer_data.id_number}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="nationality">
                    {t("rentRequestDetails:nationality")}
                  </Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={requestDetails?.customer_data.nationality}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="phone_number">
                    {t("rentRequestDetails:phoneNumber")}
                  </Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={requestDetails?.customer_data.phone_number}
                    className=" py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <a
                    href={`${requestDetails?.customer_data.id_front_photo}`}
                    target="_blank"
                  >
                    <Button className="w-full" variant={"secondary"}>
                      {t("rentRequestDetails:idFrontPhoto")}
                    </Button>
                  </a>
                </div>

                <div>
                  <a
                    href={`${requestDetails?.customer_data.id_back_photo}`}
                    target="_blank"
                  >
                    <Button className="w-full" variant={"secondary"}>
                      {t("rentRequestDetails:idBackPhoto")}
                    </Button>
                  </a>
                </div>

                <div>
                  <a
                    href={`${requestDetails?.customer_data.license_front_photo}`}
                    target="_blank"
                  >
                    <Button className="w-full" variant={"secondary"}>
                      {t("rentRequestDetails:licenseFrontPhoto")}
                    </Button>
                  </a>
                </div>

                <div>
                  <a
                    href={`${requestDetails?.customer_data.license_back_photo}`}
                    target="_blank"
                  >
                    <Button className="w-full" variant={"secondary"}>
                      {t("rentRequestDetails:licenseBackPhoto")}
                    </Button>
                  </a>
                </div>

                <div>
                  <a
                    href={`${requestDetails?.inspection_form}`}
                    target="_blank"
                  >
                    <Button className="w-full" variant={"secondary"}>
                      {t("rentRequestDetails:inspectionForm")}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
