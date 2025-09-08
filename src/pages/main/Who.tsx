import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";

export const Who = () => {
  const { t } = useTranslation(NAMESPACES.who);

  return (
    <section>
      <div className="container mx-auto px-2">
        <h1 className="md:text-6xl/relaxed text-4xl text-center md:mt-16 mt-8 mb-8">
          {t("title")}
        </h1>

        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
            <h2 className="font-bold md:text-3xl/relaxed sm:text-2xl text-xl ">
              {t("description")}
            </h2>

            <div className="my-8">
              <h3 className="font-bold md:text-2xl text-xl border-b border-[#D40000] w-fit pb-2 mb-4">
                {t("visionTitle")}
              </h3>
              <p className="md:text-2xl text-lg">{t("visionText")}</p>
            </div>

            <div className="my-8">
              <h3 className="font-bold md:text-2xl text-xl border-b border-[#D40000] w-fit pb-2 mb-4">
                {t("missionTitle")}
              </h3>
              <p className="md:text-2xl text-lg">{t("missionText")}</p>
            </div>

            <div className="my-8">
              <h3 className="font-bold md:text-2xl text-xl border-b border-[#D40000] w-fit pb-2 mb-4">
                {t("visionTitle")}
              </h3>
              <p className="md:text-2xl text-lg">{t("visionText")}</p>
            </div>

            <div className="my-8">
              <h3 className="font-bold md:text-2xl text-xl border-b border-[#D40000] w-fit pb-2 mb-4">
                {t("missionTitle")}
              </h3>
              <p className="md:text-2xl text-lg">{t("missionText")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Who;
