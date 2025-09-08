import { useCarFeatures } from "@/hooks/useFeature";
import { Feature } from "@/interfaces/Feature";
import { SellCarForm } from "@/interfaces/SellCarForm";
import { NAMESPACES } from "@/translations/namespaces";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const ExtraFeaturesStep = () => {
  const { data: features } = useCarFeatures();
  const { values, setFieldValue, touched, errors } =
    useFormikContext<SellCarForm>();
  const { t } = useTranslation(NAMESPACES.carSell);

  // Local state to manage selected features as array
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Initialize selectedFeatures from accessories string on component mount
  useEffect(() => {
    if (values.accessories && values.accessories.trim()) {
      const featuresArray = values.accessories.split(" ").filter(Boolean);
      setSelectedFeatures(featuresArray);
    }
  }, []);

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    let updatedFeatures: string[];

    if (checked) {
      // Add feature to array if checked
      updatedFeatures = [...selectedFeatures, featureId];
    } else {
      // Remove feature from array if unchecked
      updatedFeatures = selectedFeatures.filter(
        (id: string) => id !== featureId
      );
    }

    // Update local state
    setSelectedFeatures(updatedFeatures);

    // Convert array to string with space separation and update Formik
    const featuresString = updatedFeatures.join(" ");
    setFieldValue("accessories", featuresString);
  };

  return (
    <div>
      <div className="grid w-full gap-4">
        <div>
          <Label className="mb-2" htmlFor="color">
            {t("carForm.color")}*
          </Label>
          <Field
            name="color"
            className="border border-[#d40000] p-2 rounded-md w-full"
            placeholder={t("carForm.colorPlaceholder")}
          />
          <ErrorMessage
            name="color"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="grid w-full mt-4">
          <Label className="mb-2 text-base" htmlFor="accessories">
            {t("carForm.features")}
            <span className="text-red-700">*</span>
          </Label>
          <div className="w-full border border-[#d40000] py-12 px-8 rounded-lg">
            <div className="grid sm:grid-cols-3 grid-cols-2 max-w-xl gap-4">
              {features?.data.results.map((feature: Feature) => (
                <div className="flex items-center gap-2" key={feature.id}>
                  <Checkbox
                    id={feature.id.toString()}
                    className="cursor-pointer border-[#d40000]"
                    checked={selectedFeatures.includes(feature.name.toString())}
                    onCheckedChange={(checked: boolean) =>
                      handleFeatureChange(feature.name.toString(), checked)
                    }
                  />
                  <label
                    htmlFor={feature.id.toString()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature.name}
                  </label>
                </div>
              ))}
            </div>
            {touched.accessories && errors.accessories && (
              <p className="text-red-700">{errors.accessories}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraFeaturesStep;
