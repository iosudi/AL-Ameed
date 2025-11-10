import { SellCarForm } from "@/interfaces/SellCarForm";
import { NAMESPACES } from "@/translations/namespaces";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CarInfoStep = () => {
  const { values, setFieldValue } = useFormikContext<SellCarForm>();
  const { i18n, t } = useTranslation(NAMESPACES.carSell);

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <Label className="mb-2" htmlFor="brand_model">
            {t("carForm.brand")}
          </Label>
          <Field
            name="brand_model"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.brandPlaceholder")}
          />
          <ErrorMessage
            name="brand_model"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="year">
            {t("carForm.year")}
          </Label>
          <Field
            name="year"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.yearPlaceholder")}
          />
          <ErrorMessage
            name="year"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="mileage">
            {t("carForm.milage")}
          </Label>
          <Field
            name="mileage"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.milagePlaceholder")}
          />
          <ErrorMessage
            name="mileage"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="mb-2" htmlFor="fuel_type">
            {t("carForm.engineType")}
          </Label>
          <Select
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            value={values.fuel_type}
            onValueChange={(value) => setFieldValue("fuel_type", value)}
          >
            <SelectTrigger className="border border-[#d40000] px-2 py-5 rounded-md w-full">
              <SelectValue placeholder={t("carForm.selectOption")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gasoline">{t("carForm.gasoline")}</SelectItem>
              <SelectItem value="diesel">{t("carForm.diesel")}</SelectItem>
              <SelectItem value="electric">{t("carForm.electric")}</SelectItem>
              <SelectItem value="hybrid">{t("carForm.hybrid")}</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage
            name="fuel_type"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="transmission">
            {t("carForm.transmission")}
          </Label>
          <Select
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            value={values.transmission}
            onValueChange={(value) => setFieldValue("transmission", value)}
          >
            <SelectTrigger className="border border-[#d40000] px-2 py-5 rounded-md w-full">
              <SelectValue placeholder={t("carForm.selectOption")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">
                {t("carForm.automatic")}
              </SelectItem>
              <SelectItem value="manual">{t("carForm.manual")}</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage
            name="transmission"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div>
        <Label className="mb-2" htmlFor="additional_details">
          {t("carForm.additionalDetails")}
        </Label>
        <Field
          as="textarea"
          name="additional_details"
          className="border border-[#d40000] p-2 rounded-md w-full min-h-[120px]"
          placeholder={t("carForm.additionalDetailsPlaceholder")}
        />
        <ErrorMessage
          name="additional_details"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </>
  );
};

export default CarInfoStep;
