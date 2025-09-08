import logo from "@/assets/Logo.svg";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import { ShowSellRequests } from "@/components/Dashboard/Table/ShowSellRequests";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";

export const StaffCars = () => {
  const { i18n, t } = useTranslation([
    NAMESPACES.common,
    NAMESPACES.dataTable,
    NAMESPACES.staffCars,
  ]);
  const currentLanguage = i18n.language;
  const { logout } = useAuth();

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
              {t("common:adminNavbar.sell_requests")}
            </h2>

            <DashboardNavbar />

            <ShowSellRequests />
          </div>
        </div>
      </div>
    </section>
  );
};
export default StaffCars;
