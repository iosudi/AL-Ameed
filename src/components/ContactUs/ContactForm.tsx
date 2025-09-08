import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const ContactForm = () => {
  const { t } = useTranslation(NAMESPACES.contact);

  return (
    <>
      <form>
        {/* Name Information */}
        <div className="grid grid-cols-2 w-full items-center lg:gap-16 gap-2 mb-4">
          <div>
            <Label className="mb-2.5 text-lg" htmlFor="firstName">
              {t("form.firstName")}
            </Label>
            <Input
              className="bg-transparent border-[#D40000] py-6 placeholder:font-[400] placeholder:text-neutral-400 rounded"
              type="text"
              id="firstName"
              name="firstName"
            />
          </div>
          <div>
            <Label className="mb-2.5 text-lg" htmlFor="lastName">
              {t("form.lastName")}
            </Label>
            <Input
              className="bg-transparent border-[#D40000] py-6 placeholder:font-[400] placeholder:text-neutral-400 rounded"
              type="text"
              id="lastName"
              name="lastName"
            />
          </div>
        </div>

        {/* Contact information (Email & Phone ) */}
        <div className="grid grid-cols-2 w-full items-center lg:gap-16 gap-2 mb-4">
          <div>
            <Label className="mb-2.5 text-lg" htmlFor="email">
              {t("form.email")}
            </Label>
            <Input
              className="bg-transparent border-[#D40000] py-6 placeholder:font-[400] placeholder:text-neutral-400 rounded"
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <Label className="mb-2.5 text-lg" htmlFor="phone">
              {t("form.phone")}
            </Label>
            <Input
              className="bg-transparent border-[#D40000] py-6 placeholder:font-[400] placeholder:text-neutral-400 rounded"
              type="tel"
              id="phone"
              name="phone"
              placeholder="36363465"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="grid  w-full items-center lg:gap-16 gap-2 mb-4">
          <div>
            <Label className="mb-2.5 text-lg" htmlFor="email">
              {t("form.message")}
            </Label>
            <Textarea
              className="bg-transparent border-[#D40000] py-6 placeholder:font-[400] placeholder:text-neutral-400 rounded"
              id="content"
              name="content"
              placeholder={t("form.messagePlaceholder")}
            ></Textarea>
          </div>
        </div>

        <Button className="border border-[#B71616] bg-[#B71616] w-full rounded">
          {t("form.submit")}
        </Button>
      </form>
    </>
  );
};
