import { useCarBrands } from "@/hooks/useBrands";
import { Brands } from "@/interfaces/Brands";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { FaInstagram } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

export const Footer = () => {
  const { data } = useCarBrands();
  const { t } = useTranslation(NAMESPACES.footer);
  const navigate = useNavigate();

  const handleNavigateByBrand = (brand: number) => {
    const queryParams = `?brand=${brand}`;

    navigate(`/shop${queryParams}`);
  };

  return (
    <footer className="bg-[#151718] pt-16 ">
      <div className="container mx-auto">
        <ul className="flex flex-wrap justify-around items-start gap-8 pb-4">
          <li>
            <ul>
              <h4 className="font-bold text-xl mb-2">
                {t("footer.browseSite")}
              </h4>
              <NavLink to={"/who"}>
                <li className="mb-1">{t("footer.whoWeAre")}</li>
              </NavLink>
              <NavLink to={"/shop"}>
                <li className="mb-1">{t("footer.carGallery")}</li>
              </NavLink>
              <NavLink to={"/contact-us"}>
                <li className="mb-1">{t("footer.contactUs")}</li>
              </NavLink>
            </ul>
          </li>

          <li>
            <ul>
              <h4 className="font-bold text-xl mb-2">
                {t("footer.importantLinks")}
              </h4>
              <NavLink to={"/faqs"}>
                <li className="mb-1">{t("footer.faqs")}</li>
              </NavLink>
              <NavLink to={"/privacy-policy"}>
                <li className="mb-1">{t("footer.privacyPolicy")}</li>
              </NavLink>
              <NavLink to={"/privacy-policy"}>
                <li className="mb-1">{t("footer.termsConditions")}</li>
              </NavLink>
            </ul>
          </li>

          <li>
            <ul>
              <h4 className="font-bold text-xl mb-2">
                <h4 className="font-bold text-xl mb-2">
                  {t("footer.favoriteBrands")}
                </h4>
              </h4>
              {data?.data.results.slice(0, 4).map((brand: Brands) => (
                <li
                  onClick={() => {
                    handleNavigateByBrand(brand.id);
                  }}
                  className="mb-1 cursor-pointer hover:underline"
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          </li>

          {/* <li>
            <ul>
              <h4 className="font-bold text-xl mb-2">نـوع السيـارة</h4>
              <li className="mb-1">Coupe</li>
              <li className="mb-1">Sedan</li>
              <li className="mb-1">Van</li>
              <li className="mb-1">Sport</li>
            </ul>
          </li> */}

          <li>
            <ul>
              <h4 className="font-bold text-xl mb-2">
                {t("footer.followOffers")}
              </h4>
              <div className="flex items-center gap-2  text-xl">
                {/* <li>
                  <FaFacebook />
                </li> */}
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/alameed_cars?utm_source=ig_web_button_share_sheet&igsh=MXBveDNva2V0bDdveg=="
                  >
                    <FaInstagram />
                  </a>
                </li>
                {/* <li>
                  <FaTiktok />
                </li> */}
              </div>
            </ul>
          </li>
        </ul>
      </div>
      <div className="py-4 border-t border-[#FFFFFF1F] flex sm:justify-end justify-center px-16">
        <a href="https://contact-us.bcaitech.bh" target="_blank">
          <span className="flex items-center gap-4">
            <img src="/company_logo.svg" alt="Bcaitech" />
            <span>
              {t("footer.poweredBy")} <br /> Bcaitech
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
