import { rateVehicle } from "@/api/vehicles/vehiclesService";
import { VehicleDetails } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { Loader2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import RatingTable from "./RatingTable";

export const CarRate = ({ vehicle }: { vehicle: VehicleDetails }) => {
  const [ratings, setRatings] = React.useState({
    price_rating: 0,
    comfort_rating: 0,
    interior_rating: 0,
    exterior_rating: 0,
    reliability_rating: 0,
    performance_rating: 0,
  });

  const { t } = useTranslation([NAMESPACES.productDetails, NAMESPACES.common]);

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  // const calculateAverage = () => {
  //   const values = Object.values(ratings);
  //   return values.reduce((a, b) => a + b, 0) / values.length;
  // };

  async function handleSubmit(payload: object) {
    try {
      const res = await rateVehicle(payload);
      toast.success(t("common:success_rate"));
      console.log(res);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 403)
        toast.error(t("common:unauthenticated"));
      console.log(err);
    }
  }

  return (
    <>
      <h4 className="md:text-3xl text-xl text-center mb-6">
        {t("carRate.heading")}
      </h4>
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="grow">
          <h5 className="xl:text-3xl md:text-2xl text-base mb-4">
            <span>{t("carRate.label")}:</span>{" "}
            <span>{`${vehicle?.brand_details.name} ${vehicle?.model} / ${vehicle?.year} (${vehicle?.color})`}</span>
          </h5>

          <RatingTable values={ratings} onRatingChange={handleRatingChange} />
        </div>

        <div className="bg-[#1A1C1D] p-4 rounded-xl lg:w-2/5">
          <Formik
            initialValues={{
              email: "",
              name: "",
              comment: "",
              vehicle: vehicle?.id,
              rating: {},
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const payload = {
                ...values,
                ...ratings,
                vehicle: vehicle.id,
              };

              try {
                console.log(payload);
                await handleSubmit(payload);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid sm:grid-cols-2 w-full items-center sm:gap-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name" className="mb-2.5 text-base">
                      {t("carRate.form.name")}
                    </Label>
                    <Field
                      name="name"
                      as={Input}
                      placeholder={t("carRate.form.name_placeholder")}
                      className="bg-transparent border-white py-4 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="mb-2.5 text-base">
                      {t("carRate.form.email")}
                    </Label>
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      placeholder="example@gmail.com"
                      className="bg-transparent border-white py-4 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                    />
                  </div>
                </div>

                <div className="grid w-full items-center gap-2 mb-4">
                  <Label htmlFor="comment" className="mb-2.5 text-base">
                    {t("carRate.form.comment")}
                  </Label>
                  <Field
                    name="comment"
                    as={Textarea}
                    placeholder={t("carRate.form.comment_placeholder")}
                    className="bg-transparent border-white py-2 placeholder:font-[400] placeholder:text-neutral-400 rounded min-h-24"
                  />
                </div>

                <Button
                  type="submit"
                  className="border border-[#B71616] bg-[#B71616] rounded mr-auto block md:w-fit w-full"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                  {t("carRate.form.submit")}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CarRate;
