import { Button } from "@/components/ui/button";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa6";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { ContactForm } from "../../components/ContactUs/ContactForm";
export const ContactUs = () => {
  const { t } = useTranslation(NAMESPACES.contact);

  return (
    <section>
      <div className="container mx-auto px-2">
        <h1 className="md:text-6xl/relaxed text-4xl text-center md:mt-16 mt-8 mb-8">
          {t("title")}
        </h1>

        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
            <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
              {/* Form side */}
              <div>
                <h2 className="font-bold md:text-3xl sm:text-2xl text-xl border-b border-[#D40000] w-fit pb-2 mb-4">
                  {t("contactUsTitle")}
                </h2>

                <p className="md:text-2xl text-lg mb-8">{t("contactUsText")}</p>

                <ContactForm />
              </div>

              {/* Contact methods side */}
              <div>
                <div className="iframe">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1791.0114412167377!2d50.54607879892134!3d26.130796885916503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49ad7396780b4b%3A0x521781d37f4e782a!2z2KfZhNi52YXZitivINmE2YTYs9mK2KfYsdin2Ko!5e0!3m2!1sar!2seg!4v1745266733230!5m2!1sar!2seg"
                    width="600"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full md:h-96 h-72 rounded-2xl mb-6"
                  ></iframe>

                  <a
                    href="https://www.google.com/maps?q=26.130796885916503,50.54607879892134"
                    target="_blank"
                  >
                    <Button className="border border-[#B71616] bg-[#B71616] w-full rounded">
                      {t("googleMaps")}
                    </Button>
                  </a>
                </div>

                <div className="call-us mt-6">
                  <h3 className="font-bold md:text-3xl sm:text-2xl text-xl border-b border-[#D40000] w-fit pb-2 mb-4">
                    {t("callUsTitle")}
                  </h3>
                  <p className="md:text-xl text-lg mb-8">{t("callUsText")}</p>

                  <ul>
                    {/* <li className="flex items-center gap-2 mb-8 ">
                        <GoMail className="text-[#D40000] size-10" />

                        <a
                          href="mailto:info@aldowaishan.bh"
                          className="text-xl hover:underline"
                        >
                          info@aldowaishan.bh
                        </a>
                      </li> */}
                    <li className="flex items-center gap-2 mb-8 ">
                      <IoCallOutline className="text-[#D40000] size-10" />

                      <a
                        href="tel:+97317626292"
                        className="text-xl hover:underline"
                        dir="ltr"
                      >
                        +973 1762 6292
                      </a>
                    </li>

                    <li className="flex items-center gap-2 mb-8 ">
                      <FaWhatsapp className="text-[#D40000] size-10" />
                      <a
                        href="https://wa.me/97317626292"
                        className="text-xl hover:underline"
                        dir="ltr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +973 1762 6292
                      </a>
                    </li>

                    <li className="flex items-center gap-2 mb-8 ">
                      <IoLocationOutline className="text-[#D40000] size-10" />

                      <p className="text-xl"> {t("address")}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactUs;
