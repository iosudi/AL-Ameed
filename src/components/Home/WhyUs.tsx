import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";

export const WhyUs = () => {
  const { t } = useTranslation(NAMESPACES.home);
  return (
    <section className="my-8 pb-24 relative">
      <img
        className="absolute top-0 right-0 object-cover h-full w-auto -z-10 opacity-50"
        src="/Home/r-shape.svg"
        alt="bg"
      />
      <div className="container mx-auto px-2">
        <div>
          <h2 className="text-center md:text-4xl text-2xl mb-8">
            {t("why_us.title")}
          </h2>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
            <div className="bg-[#202324] md:p-12 p-6 rounded-2xl">
              <img
                className="sm:h-16 h-10 w-auto mb-2"
                src="/Home/hand_shake.svg"
                alt="icon"
              />
              <h3 className="text-xl  text-white mb-2">
                {t("why_us.card1.title")}
              </h3>
              <p className=" text-base text-white">
                {t("why_us.card1.description")}
              </p>
            </div>

            <div className="bg-[#202324] md:p-12 p-6 rounded-2xl">
              <img
                className="sm:h-16 h-10 w-auto mb-2"
                src="/Home/care_icon.svg"
                alt="icon"
              />
              <h3 className="text-xl  text-white mb-2">
                {t("why_us.card2.title")}
              </h3>
              <p className=" text-base text-white">
                {t("why_us.card2.description")}
              </p>
            </div>

            <div className="bg-[#202324] md:p-12 p-6 rounded-2xl">
              <img
                className="sm:h-16 h-10 w-auto mb-2"
                src="/Home/user_heart.svg"
                alt="icon"
              />
              <h3 className="text-xl  text-white mb-2">
                {t("why_us.card3.title")}
              </h3>
              <p className=" text-base text-white">
                {t("why_us.card3.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
