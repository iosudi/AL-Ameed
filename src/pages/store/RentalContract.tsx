import rentService from "@/api/rentService/rentService";
import { Stepper } from "@/common/Stepper";
import DownPriceStep from "@/components/rent-car-steps/DownPriceStep";
import { PaymentStep } from "@/components/rent-car-steps/PaymentStep";
import { RentalDuration } from "@/components/rent-car-steps/RentalDuration";
import { RentalTerms } from "@/components/rent-car-steps/RentalTerms";
import { TenantInformation } from "@/components/rent-car-steps/TenantInformation";
import { UploadFiles } from "@/components/rent-car-steps/UploadFiles";
import { RentCarForm } from "@/interfaces/RentCarForm";
import { NAMESPACES } from "@/translations/namespaces";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";

interface RentalContractProps {
  contractType: string;
}

export const RentalContract = ({ contractType }: RentalContractProps) => {
  const validationSchemas = [
    // Step 0: TenantInformation
    Yup.object().shape({
      customer_data: Yup.object().shape({
        first_name: Yup.string().required("First name is required"),
        middle_name: Yup.string().required("Middle name is required"),
        last_name: Yup.string().required("Last name is required"),
        phone_number: Yup.string()
          .matches(/^\+?\d{7,15}$/, "Enter a valid phone number")
          .required("Phone number is required"),
        id_number: Yup.string()
          .matches(/^\d{10}$/, "ID must be 10 digits")
          .required("ID number is required"),
        nationality: Yup.string().required("Nationality is required"),
      }),
    }),

    // Step 1: UploadFiles
    Yup.object().shape({
      customer_data: Yup.object().shape({
        license_front_photo: Yup.mixed().required(
          "License front photo is required"
        ),
        license_back_photo: Yup.mixed().required(
          "License back photo is required"
        ),
        id_front_photo: Yup.mixed().required("ID front photo is required"),
        id_back_photo: Yup.mixed().required("ID back photo is required"),
      }),
    }),

    // Step 2: RentalDuration
    ...(contractType === "rental"
      ? [
          Yup.object().shape({
            start_date: Yup.string()
              .required("Start date is required")
              .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                "Invalid date format (YYYY-MM-DD)"
              ),
            end_date: Yup.string()
              .required("End date is required")
              .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                "Invalid date format (YYYY-MM-DD)"
              )
              .test(
                "is-after",
                "End date must be after start date",
                function (value) {
                  const { start_date } = this.parent;
                  return new Date(value) > new Date(start_date);
                }
              ),
          }),
        ]
      : []),

    ...(contractType === "rent_to_own"
      ? [
          // Step 3: DownPriceStep
          Yup.object().shape({
            down_price: Yup.number()
              .min(0, "Down price must be positive")
              .required("Down price is required"),
          }),
        ]
      : []),

    // Terms
    Yup.object().shape({
      acceptTerms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required("Required"),
    }),

    // Payment
    Yup.object().shape({}),
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const { i18n, t } = useTranslation(NAMESPACES.carRent);
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const RentTerms = [
    t("terms.term1"),
    t("terms.term2"),
    t("terms.term3"),
    t("terms.term4"),
    t("terms.term5"),
  ];

  const RentToOwnTerm = [t("terms.rentToOwn")];

  const TermsProps = contractType === "rental" ? RentTerms : RentToOwnTerm;

  const steps = [
    t("steps.tenant"),
    t("steps.upload"),
    contractType === "rental" ? t("steps.duration") : null,
    contractType === "rent_to_own" ? t("steps.downPrice") : null,
    t("steps.terms"),
    t("steps.payment"),
  ].filter((step): step is string => step !== null);

  const stepComponents =
    contractType == "rent_to_own"
      ? [
          <TenantInformation />,
          <UploadFiles />,
          <DownPriceStep />,
          <RentalTerms terms={TermsProps} />,
          <PaymentStep />,
        ]
      : [
          <TenantInformation />,
          <UploadFiles />,
          <RentalDuration />,
          <RentalTerms terms={TermsProps} />,
          <PaymentStep />,
        ];

  const initialValues: RentCarForm = {
    customer_data: {
      first_name: "",
      middle_name: "",
      last_name: "",
      phone_number: "",
      id_number: "",
      nationality: "",
      license_front_photo: null,
      license_back_photo: null,
      id_front_photo: null,
      id_back_photo: null,
    },

    vehicle: id!,
    start_date: "",
    end_date: "",
    acceptTerms: false,
    down_price: 0,
  };

  const handleSubmit = async (values: RentCarForm) => {
    try {
      const formData = new FormData();

      // Append customer_data fields
      formData.append(
        "customer_data.first_name",
        values.customer_data.first_name
      );
      formData.append(
        "customer_data.middle_name",
        values.customer_data.middle_name
      );
      formData.append(
        "customer_data.last_name",
        values.customer_data.last_name
      );
      formData.append(
        "customer_data.phone_number",
        values.customer_data.phone_number
      );
      formData.append(
        "customer_data.id_number",
        values.customer_data.id_number
      );
      formData.append(
        "customer_data.nationality",
        values.customer_data.nationality
      );

      if (values.customer_data.license_front_photo)
        formData.append(
          "customer_data.license_front_photo",
          values.customer_data.license_front_photo
        );

      if (values.customer_data.license_back_photo)
        formData.append(
          "customer_data.license_back_photo",
          values.customer_data.license_back_photo
        );

      if (values.customer_data.id_front_photo)
        formData.append(
          "customer_data.id_front_photo",
          values.customer_data.id_front_photo
        );

      if (values.customer_data.id_back_photo)
        formData.append(
          "customer_data.id_back_photo",
          values.customer_data.id_back_photo
        );

      // Append vehicle and dates
      formData.append("vehicle", values.vehicle);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      if (contractType === "rent_to_own") {
        formData.append("down_price", values.down_price.toString());
      }
      // Submit to API
      if (contractType === "rent_to_own")
        await rentService.createRentToOwnRequest(formData);
      else await rentService.createRentRequest(formData);

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

  const next = () => setCurrentStep((prev) => prev + 1);
  const back = () => setCurrentStep((prev) => prev - 1);

  const isLastStep = currentStep === steps.length - 1;
  const isStepFive = currentStep === 4;

  return (
    <section>
      <div className="container mx-auto px-2">
        <h1 className="md:text-6xl/relaxed text-4xl text-center md:mt-16 mt-8 mb-8">
          {contractType === "rental"
            ? t("contract.rentalTitle")
            : t("contract.rentToOwnTitle")}
        </h1>

        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900]">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] md:pt-16 pt-8 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
            <h2 className=" md:text-4xl/relaxed sm:text-2xl text-xl text-center">
              {t("contract.fillInfo")}
            </h2>

            <div
              className="py-8 max-w-6xl mx-auto"
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
            >
              <Stepper steps={steps} currentStep={currentStep} />

              <div className="mt-12">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchemas[currentStep]}
                  onSubmit={async (values, actions) => {
                    console.log("Formik values at submit:", values);
                    try {
                      await validationSchemas[currentStep].validate(values, {
                        abortEarly: false,
                      });

                      if (isLastStep) {
                        handleSubmit(values);
                      } else {
                        next();
                        actions.setTouched({});
                      }
                    } catch (err) {
                      if (err instanceof Yup.ValidationError) {
                        const errors: Record<string, string> = {};
                        err.inner.forEach((error) => {
                          if (error.path) {
                            errors[error.path] = error.message;
                          }
                        });
                        actions.setErrors(errors);
                        actions.setTouched(
                          Object.keys(errors).reduce((acc, key) => {
                            acc[key] = true;
                            return acc;
                          }, {} as Record<string, boolean>)
                        );
                      }
                    }
                  }}
                >
                  {() => (
                    <Form>
                      {stepComponents[currentStep]}

                      <div className="flex justify-end md:gap-6 gap-2 mt-8">
                        <button
                          type="button"
                          onClick={back}
                          disabled={currentStep === 0}
                          className={`${
                            currentStep === 0 || isLastStep ? "hidden" : ""
                          } sm:px-12 px-6 py-2 rounded-md border text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50`}
                        >
                          {t("buttons.back")}
                        </button>

                        <button
                          type="submit"
                          className="sm:px-12 px-6 py-2 rounded-md text-white bg-primary hover:bg-primary/90"
                        >
                          {isLastStep
                            ? t("buttons.finish")
                            : isStepFive
                            ? t("buttons.toPayment")
                            : t("buttons.next")}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalContract;
