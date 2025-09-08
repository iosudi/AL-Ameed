import { NAMESPACES } from "@/translations/namespaces";
import { ErrorMessage, Field } from "formik";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";

export const ContactInfoStep = () => {
  const { t } = useTranslation(NAMESPACES.carSell);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="mb-2" htmlFor="seller_name">
            {t("carForm.name")}*
          </Label>
          <Field
            name="seller_name"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.namePlaceholder")}
          />
          <ErrorMessage
            name="seller_name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="seller_phone">
            {t("carForm.phone")}*
          </Label>
          <Field
            name="seller_phone"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.phonePlaceholder")}
          />
          <ErrorMessage
            name="seller_phone"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div className="grid w-full gap-4 mb-4">
        <div>
          <Label className="mb-2" htmlFor="seller_email">
            {t("carForm.email")}
          </Label>
          <Field
            name="seller_email"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.emailPlaceholder")}
          />
          <ErrorMessage
            name="seller_email"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default ContactInfoStep;
