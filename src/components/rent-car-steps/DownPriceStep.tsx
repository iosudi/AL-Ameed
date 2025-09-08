import { NAMESPACES } from "@/translations/namespaces";
import { ErrorMessage, Field } from "formik";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";

export const DownPriceStep = () => {
  const { t } = useTranslation(NAMESPACES.carSell);

  return (
    <div className="grid w-full gap-4 mb-4">
      <div>
        <Label className="mb-2" htmlFor="price">
          {t("carForm.price")}*
        </Label>
        <Field
          name="down_price"
          className="border border-[#d40000] p-2 rounded-md w-full"
          placeholder={t("carForm.pricePlaceholder")}
        />
        <ErrorMessage
          name="down_price"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
};
export default DownPriceStep;
