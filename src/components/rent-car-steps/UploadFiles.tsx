import FileUpload from "@/common/components/FileUpload";
import { RentCarForm } from "@/interfaces/RentCarForm";
import { NAMESPACES } from "@/translations/namespaces";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

export const UploadFiles = () => {
  const { t } = useTranslation(NAMESPACES.carRent);
  const { values, setFieldValue } = useFormikContext<RentCarForm>();

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 mb-4">
      <div>
        <FileUpload
          label={t("carForm.idFront")}
          onChange={(files) => {
            if (files && !(files instanceof FileList)) {
              setFieldValue("customer_data.id_front_photo", files);
            }
          }}
          value={values.customer_data.id_front_photo}
        />
      </div>

      <div>
        <FileUpload
          label={t("carForm.idBack")}
          onChange={(files) => {
            if (files && !(files instanceof FileList)) {
              setFieldValue("customer_data.id_back_photo", files);
            }
          }}
          value={values.customer_data.id_back_photo}
        />
      </div>

      <div>
        <FileUpload
          label={t("carForm.licenseFront")}
          onChange={(files) => {
            if (files && !(files instanceof FileList)) {
              setFieldValue("customer_data.license_front_photo", files);
            }
          }}
          value={values.customer_data.license_front_photo}
        />
      </div>

      <div>
        <FileUpload
          label={t("carForm.licenseBack")}
          onChange={(files) => {
            if (files && !(files instanceof FileList)) {
              setFieldValue("customer_data.license_back_photo", files);
            }
          }}
          value={values.customer_data.license_back_photo}
        />
      </div>
    </div>
  );
};

export default UploadFiles;
