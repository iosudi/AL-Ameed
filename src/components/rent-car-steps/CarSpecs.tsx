import { useVehicles } from "@/hooks/useVehicles";
import { RentCarForm } from "@/interfaces/RentCarForm";
import { Vehicles } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { ErrorMessage, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CarSpecs = () => {
  const { t, i18n } = useTranslation(NAMESPACES.carRent);
  const { values, setFieldValue } = useFormikContext<RentCarForm>();
  const { data } = useVehicles({ for_rent: true }, 0);

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <Label className="mb-2" htmlFor="nationality">
            {t("carForm.selectCar")}*
          </Label>
          <Select
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            value={values.vehicle}
            onValueChange={(value) => setFieldValue("vehicle", value)}
          >
            <SelectTrigger className="border border-[#d40000] px-2 py-5 rounded-md w-full">
              <SelectValue placeholder={t("carForm.selectCarPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {data?.data?.results.map((vehicle: Vehicles) => (
                <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                  {`${vehicle.brand_name} ${vehicle.model} ${vehicle.year} / (${vehicle.color})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage
            name="vehicle"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default CarSpecs;
