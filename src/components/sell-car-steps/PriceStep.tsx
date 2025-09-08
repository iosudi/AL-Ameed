import { SellCarForm } from "@/interfaces/SellCarForm";
import { NAMESPACES } from "@/translations/namespaces";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const PriceStep = () => {
  const { t } = useTranslation(NAMESPACES.carSell);
  const { values, setFieldValue } = useFormikContext<SellCarForm>();

  return (
    <div className="grid w-full gap-4 mb-4">
      <div>
        <Label className="mb-2" htmlFor="price">
          {t("carForm.price")}*
        </Label>
        <Field
          name="price"
          className="border border-[#d40000] p-2 rounded-md w-full"
          placeholder={t("carForm.pricePlaceholder")}
        />
        <ErrorMessage
          name="price"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
      <div>
        <RadioGroup
          defaultValue={values.price_negotiable}
          onValueChange={(val) => setFieldValue("price_negotiable", val)}
          dir="rtl"
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="true" id="r1" />
            <Label htmlFor="r1">قابل للتفاوض</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="false" id="r2" />
            <Label htmlFor="r2">غير قابل للتفاوض</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
export default PriceStep;
