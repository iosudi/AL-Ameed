import vehicleService from "@/api/vehicles/vehiclesService";
import logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { NAMESPACES } from "@/translations/namespaces";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";
import { CiHeart, CiStar } from "react-icons/ci";
import { IoCarOutline } from "react-icons/io5";
import DashboardNavbar from "../../common/components/DashboardNavbar";

interface Statistics {
  total_vehicles: number;
  total_favorited_vehicles: number;
  total_reviews: number;
}

export const Overview = () => {
  const { i18n, t } = useTranslation(NAMESPACES.overview);
  const currentLanguage = i18n.language;
  const { logout } = useAuth();

  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await vehicleService.getStatistics();
      console.log(response);

      if (response.status != 200) {
        throw new Error("Network response was not ok");
      }
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-2">
        <img
          src={logo}
          alt="AlAmeed"
          className="md:h-48 h-36 w-auto block mx-auto sm:mt-16 mt-4 mb-8"
        />
        <div className="flex items-center justify-end md:gap-6 gap-2 mb-4">
          <Button
            className="text-lg md:!px-8 px-5 md:!py-7 py-4 md:rounded-2xl rounded-lg text-red-900"
            variant="outline"
            onClick={logout}
          >
            {t("logout")}
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

        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900]">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-48 xl:px-28 lg:px-15 md:px-8 px-4">
            <h2 className="md:text-3xl text-2xl text-center mb-6">
              {t("dashboard")}
            </h2>

            <DashboardNavbar />

            <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-8">
              <div className="sm:p-4 px-4 py-2 rounded-xl border border-white flex items-center justify-between">
                <div>
                  <p className="text-[#D40000] md:text-lg text-base mb-1">
                    {t("cars")}
                  </p>
                  <p className="md:text-4xl text-2xl">
                    {statistics?.total_vehicles}
                  </p>
                </div>

                <IoCarOutline className="md:size-12 size-8 text-[#D40000]" />
              </div>

              <div className="sm:p-4 px-4 py-2 rounded-xl border border-white flex items-center justify-between">
                <div>
                  <p className="text-[#D40000] md:text-lg text-base mb-1">
                    {t("favorites")}
                  </p>
                  <p className="md:text-4xl text-2xl">
                    {statistics?.total_favorited_vehicles}
                  </p>
                </div>

                <CiHeart className="md:size-12 size-8 text-[#D40000]" />
              </div>

              <div className="sm:p-4 px-4 py-2 rounded-xl border border-white flex items-center justify-between">
                <div>
                  <p className="text-[#D40000] md:text-lg text-base mb-1">
                    {t("ratings")}
                  </p>
                  <p className="md:text-4xl text-2xl">
                    {statistics?.total_reviews}
                  </p>
                </div>

                <CiStar className="md:size-12 size-8 text-[#D40000]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
