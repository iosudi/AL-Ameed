import rentService from "@/api/rentService/rentService";
import FileUpload from "@/common/components/FileUpload";
import { NAMESPACES } from "@/translations/namespaces";
import { Form, Formik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Button } from "../ui/button";

interface ExaminationFormValues {
  examination_form: File | null;
}

interface UploadExaminationFormProps {
  requestId: string;
}

export default function UploadExaminationForm({
  requestId,
}: UploadExaminationFormProps) {
  const { t } = useTranslation(NAMESPACES.modals);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: ExaminationFormValues = {
    examination_form: null,
  };

  const validationSchema = Yup.object({
    examination_form: Yup.mixed().required(t("examination_form_required")),
  });

  const handleSubmit = async (values: ExaminationFormValues) => {
    setIsLoading(true);
    const formData = new FormData();
    if (values.examination_form) {
      formData.append("inspection_form", values.examination_form);
    }

    const res = await rentService.updateInspectionForm(formData, requestId);

    if (res.status == 200) toast.success("success");
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-4 flex flex-col justify-center items-center">
          <FileUpload
            label={t("upload_examination_form")}
            accept="image/*"
            // capture={true}
            onChange={(files) => {
              if (files && !(files instanceof FileList)) {
                setFieldValue("examination_form", files); // ✅ Correctly set Formik field
              }
            }}
            value={values.examination_form} // ✅ Bind value from Formik
          />

          <Button variant={"destructive"} size={"lg"}>
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              t("attach_form")
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
