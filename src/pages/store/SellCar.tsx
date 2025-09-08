import sellService from "@/api/sellService/sellService";
import { Stepper } from "@/common/Stepper";
import CarInfoStep from "@/components/sell-car-steps/CarInfoStep";
import CarStatusStep from "@/components/sell-car-steps/CarStatusStep";
import ContactInfoStep from "@/components/sell-car-steps/ContactInfoStep";
import ExtraFeaturesStep from "@/components/sell-car-steps/ExtraFeaturesStep";
import PriceStep from "@/components/sell-car-steps/PriceStep";
import UploadImagesStep from "@/components/sell-car-steps/UploadImagesStep";
import { SellCarForm } from "@/interfaces/SellCarForm";
import { NAMESPACES } from "@/translations/namespaces";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const SellCar = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { i18n, t } = useTranslation([NAMESPACES.carSell, NAMESPACES.common]);

  const steps = [
    t("carSell:stepper.carInfo"),
    t("carSell:stepper.carCondition"),
    t("carSell:stepper.additionalSpecs"),
    t("carSell:stepper.contactDetails"),
    t("carSell:stepper.uploadImages"),
    t("carSell:stepper.askingPrice"),
  ];

  const initialValues = {
    brand_model: "",
    year: "",
    mileage: "",
    transmission: "",
    fuel_type: "",
    color: "",
    previous_accidents: "",
    previous_owners_count: "",
    body_condition: "",
    accessories: "",
    seller_name: "",
    seller_phone: "",
    seller_email: "",
    uploaded_images: null,
    price: "",
    price_negotiable: "true",
  };

  //   const validationSchemas = [
  //     Yup.object({
  //       brand: Yup.string().required("هذا الحقل مطلوب"),
  //     }),
  //     Yup.object({
  //       year: Yup.string().required("هذا الحقل مطلوب"),
  //     }),
  //     Yup.object({
  //       milage: Yup.string().required("هذا الحقل مطلوب"),
  //     }),
  //     Yup.object({
  //       engine_type: Yup.string().required("هذا الحقل مطلوب"),
  //     }),
  //     Yup.object({
  //       transmission: Yup.string().required("هذا الحقل مطلوب"),
  //     }),
  //     Yup.object({
  //       carStatus: Yup.string().required("مطلوبة حالة السيارة"),
  //     }),
  //     Yup.object({
  //       images: Yup.mixed(),
  //     }),
  //     Yup.object({
  //       price: Yup.string().required("مطلوب السعر"),
  //     }),
  //   ];

  const handleSubmit = async (values: SellCarForm) => {
    try {
      const formData = new FormData();

      // Append all text fields
      for (const key in values) {
        if (key !== "uploaded_images") {
          const value = values[key as keyof SellCarForm];
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }
      }

      // Append uploaded images if available
      if (values.uploaded_images && Array.isArray(values.uploaded_images)) {
        values.uploaded_images.forEach((file) => {
          formData.append("uploaded_images", file); // API will receive it as a file array
        });
      }

      // Submit logic here: e.g., axios.post("/api/submit", formData)
      await sellService.createSellRequest(formData);

      toast.success("تم إرسال النموذج بنجاح");
    } catch (error) {
      // console.error("Submission error:", error);
      if (error instanceof AxiosError && error?.response?.data.vehicle) {
        toast.error(error.response.data.vehicle[0]);
      } else {
        toast.error("حدث خطأ");
      }
    }
  };

  const next = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const back = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const stepComponents = [
    <CarInfoStep />,
    <CarStatusStep />,
    <ExtraFeaturesStep />,
    <ContactInfoStep />,
    <UploadImagesStep />,
    <PriceStep />,
  ];

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="container mx-auto">
      <div
        className="p-8 max-w-6xl mx-auto"
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} />

        {/* Formik Form */}
        <div className="mt-12">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              if (isLastStep) {
                handleSubmit(values);
              } else {
                next();
                actions.setTouched({});
              }
            }}
          >
            {() => (
              <Form>
                {/* Render form fields depending on step */}
                {stepComponents[currentStep]}

                {/* Navigation Buttons */}
                <div className="flex justify-end sm:gap-6 gap-2 sm:mt-8 mt-4">
                  <button
                    type="button"
                    onClick={back}
                    disabled={currentStep === 0}
                    className="sm:px-12 px-6 py-2 rounded-md border text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50 cursor-pointer"
                  >
                    {t("common:prev")}
                  </button>

                  <button
                    type="submit"
                    className="sm:px-12 px-6 py-2 rounded-md text-white bg-primary hover:bg-primary/90 cursor-pointer"
                  >
                    {isLastStep ? t("common:submit") : t("common:next")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SellCar;
