import { UserSellRequests } from "@/components/Dashboard/Table/UserSellRequests";
import { UserRents } from "@/components/UserDashboard/UserRents";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";

export default function UserDashboard() {
  const { t } = useTranslation(NAMESPACES.userDashboard);

  return (
    <>
      <section>
        <div className="container mx-auto px-2">
          <h1 className="md:text-6xl/relaxed text-4xl text-center md:mt-16 mt-8 mb-8">
            {t("dashboard")}
          </h1>

          <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
            <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
              <div>
                <h4 className="text-4xl mt-4 text-center">{t("rentals")}</h4>
                <UserRents />
              </div>

              <div>
                <h4 className="text-4xl mt-8 text-center">{t("sells")}</h4>
                <UserSellRequests />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
