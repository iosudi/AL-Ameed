import { RentCarForm } from "@/interfaces/RentCarForm";
import { NAMESPACES } from "@/translations/namespaces";
import { ErrorMessage, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";

interface RentalTermsProps {
  terms: string[];
}

export const RentalTerms = ({ terms }: RentalTermsProps) => {
  const { t } = useTranslation(NAMESPACES.carRent);
  const { values, setFieldValue } = useFormikContext<RentCarForm>();

  return (
    <div>
      {terms.length > 1 ? (
        <>
          <h2 className="mb-3">{t("rentalTerms.title")}</h2>
          <ol className="list-decimal list-inside text-sm">
            {terms.map((term: string, index: number) => (
              <li key={index}>{term}</li>
            ))}
          </ol>
        </>
      ) : (
        <p>{terms[0]}</p>
      )}

      <div>
        <div className="flex items-center gap-2 my-4">
          <Checkbox
            id="acceptTerms"
            className="cursor-pointer border-[#d40000]"
            checked={values.acceptTerms}
            onCheckedChange={(checked: boolean) =>
              setFieldValue("acceptTerms", checked)
            }
          />
          <label
            htmlFor="acceptTerms"
            className="sm:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("rentalTerms.accept")}
          </label>
        </div>
        <ErrorMessage
          name="acceptTerms"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
};

export default RentalTerms;
