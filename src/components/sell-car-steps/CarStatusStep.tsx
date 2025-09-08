import { SellCarForm } from "@/interfaces/SellCarForm";
import { NAMESPACES } from "@/translations/namespaces";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CarStatusStep = () => {
  const { values, setFieldValue } = useFormikContext<SellCarForm>();
  const { i18n, t } = useTranslation([NAMESPACES.carSell, NAMESPACES.common]);

  return (
    <div>
      <RadioGroup
        className="mb-6"
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
        value={values.previous_accidents}
        onValueChange={(val) => setFieldValue("previous_accidents", val)}
      >
        <h6>{t("carSell:carForm.accidentHistory")}*</h6>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="r1" />
            <Label htmlFor="r1">{t("common:yes")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="r2" />
            <Label htmlFor="r2">{t("common:no")}</Label>
          </div>
        </div>
      </RadioGroup>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2" htmlFor="previous_owners_count">
            {t("carSell:carForm.previousOwners")}*
          </Label>
          <Field
            name="previous_owners_count"
            type="number"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.previousOwners")}
          />
          <ErrorMessage
            name="previous_owners_count"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="body_condition">
            {t("carSell:carForm.bodyCondition")}*
          </Label>
          <Select
            dir={i18n.language == "ar" ? "rtl" : "ltr"}
            value={values.body_condition}
            onValueChange={(value) => setFieldValue("body_condition", value)}
          >
            <SelectTrigger className="border border-[#d40000] px-2 py-5 rounded-md w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">
                {t("carSell:carForm.excellent")}
              </SelectItem>
              <SelectItem value="good">{t("carSell:carForm.good")}</SelectItem>
              <SelectItem value="needs_maintenance">
                {t("carSell:carForm.damaged")}
              </SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage
            name="body_condition"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </div>
  );
};
export default CarStatusStep;
