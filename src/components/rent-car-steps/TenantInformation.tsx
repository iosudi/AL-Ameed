import { RentCarForm } from "@/interfaces/RentCarForm";
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

export const TenantInformation = () => {
  const { values, setFieldValue } = useFormikContext<RentCarForm>();
  const { t, i18n } = useTranslation(NAMESPACES.carRent);

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <Label className="mb-2" htmlFor="customer_data.first_name">
            {t("carForm.firstName")}*
          </Label>
          <Field
            name="customer_data.first_name"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.firstNamePlaceholder")}
          />
          <ErrorMessage
            name="customer_data.first_name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="customer_data.middle_name">
            {t("carForm.middleName")}*
          </Label>
          <Field
            name="customer_data.middle_name"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.middleNamePlaceholder")}
          />
          <ErrorMessage
            name="customer_data.middle_name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="customer_data.last_name">
            {t("carForm.lastName")}*
          </Label>
          <Field
            name="customer_data.last_name"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.lastNamePlaceholder")}
          />
          <ErrorMessage
            name="customer_data.last_name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label className="mb-2" htmlFor="customer_data.nationality">
            {t("carForm.nationality")}*
          </Label>
          <Select
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            value={values.customer_data.nationality}
            onValueChange={(value) =>
              setFieldValue("customer_data.nationality", value)
            }
          >
            <SelectTrigger className="border border-[#d40000] px-2 py-5 rounded-md w-full">
              <SelectValue placeholder={t("carForm.nationality")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bahraini">{t("carForm.bahraini")}</SelectItem>
              <SelectItem value="egyptian">{t("carForm.egyptian")}</SelectItem>
              <SelectItem value="saudi">{t("carForm.saudi")}</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage
            name="customer_data.nationality"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="customer_data.id_number">
            {t("carForm.nationalId")}*
          </Label>
          <Field
            name="customer_data.id_number"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.nationalIdPlaceholder")}
          />
          <ErrorMessage
            name="customer_data.id_number"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="customer_data.phone_number">
            {t("carForm.phone")}*
          </Label>
          <Field
            name="customer_data.phone_number"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.phonePlaceholder")}
          />
          <ErrorMessage
            name="customer_data.phone_number"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default TenantInformation;
