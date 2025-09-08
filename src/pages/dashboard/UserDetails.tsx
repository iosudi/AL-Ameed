import dashboardService from "@/api/dashboardService/dashboardService";
import logo from "@/assets/Logo.svg";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import { EditRentTable } from "@/components/Dashboard/Table/EditRentTable";
import { UserSellRequests } from "@/components/Dashboard/Table/UserSellRequests";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/interfaces/User";
import { NAMESPACES } from "@/translations/namespaces";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";

export default function UserDetails() {
  const { i18n, t } = useTranslation([
    NAMESPACES.common,
    NAMESPACES.dataTable,
    NAMESPACES.userDetails,
  ]);
  const currentLanguage = i18n.language;
  const { logout } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id") || "";

  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    handleUsers();
  }, []);

  async function handleUsers() {
    const res = await dashboardService.getUserById(Number(userId));

    if (res.status === 200) setUser(res.data);
  }

  return (
    <section>
      <div className="container mx-auto px-2">
        <NavLink to="/">
          <img
            src={logo}
            alt="AlAmeed"
            className="h-48 w-auto block mx-auto mt-16 mb-8"
          />
        </NavLink>

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
              {t("userDetails:users")}
            </h2>

            <DashboardNavbar />

            <div className="grid grid-cols-1 gap-3 mt-7">
              <div className="p-9 rounded-xl border border-white text-2xl cursor-pointer">
                <p>
                  {" "}
                  {user?.first_name
                    ? `${user?.first_name} ${user?.last_name}`
                    : user?.username}
                </p>
              </div>

              <div>
                <h4 className="text-4xl mt-8 text-center">
                  {t("userDetails:rentals")}
                </h4>
                <EditRentTable />
              </div>

              <div>
                <h4 className="text-4xl mt-8 text-center">
                  {t("userDetails:sells")}
                </h4>
                <UserSellRequests />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
