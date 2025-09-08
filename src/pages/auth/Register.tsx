import authService from "@/api/authService/authService";
import logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { NAMESPACES } from "@/translations/namespaces";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

import * as Yup from "yup";
interface formType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const Register = () => {
  const { i18n, t } = useTranslation(NAMESPACES.register);
  const currentLanguage = i18n.language;

  const { login: loginContext } = useAuth();

  const navigate = useNavigate();
  const initialValues: formType = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const formValidationSchema = Yup.object().shape({
    email: Yup.string().email(t("email_error")).required(t("email_required")),

    password: Yup.string()
      .min(8, t("password_min_length"))
      .required(t("password_required")),
  });

  const form = useFormik({
    initialValues: initialValues,

    validationSchema: formValidationSchema,

    onSubmit: () => {
      handleRegister();
    },
  });

  async function handleRegister() {
    try {
      const res = await authService.register(
        form.values.first_name,
        form.values.last_name,
        form.values.email,
        form.values.password
      );
      navigate("/");
      loginContext(res.user);

      toast.success(t("success_login"));
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.password) {
        err.response.data.password.forEach((error: string) => {
          toast.error(error);
        });
      } else if (err instanceof AxiosError && err.response?.data?.email) {
        err.response.data.email.forEach(() => {
          toast.error(t("email_already_exists"));
        });
      } else {
        toast.error(t("unexpected_error"));
      }
    } finally {
      form.setSubmitting(false);
    }
  }

  return (
    <section>
      <div className="container mx-auto px-2">
        <img
          src={logo}
          alt="AlAmeed"
          className="h-48 w-auto block mx-auto mt-16 mb-8"
        />
        <div className="flex items-center justify-end md:gap-6 gap-2 mb-4">
          <Button
            className="text-lg md:!px-8 px-5 md:!py-7 py-4 md:rounded-2xl rounded-lg "
            variant="outline"
            onClick={() =>
              currentLanguage == "ar"
                ? i18n.changeLanguage("en")
                : i18n.changeLanguage("ar")
            }
          >
            {currentLanguage == "ar" ? "EN" : "العربيه"}
            <BsGlobe2 className="size-5 ml-2" />
          </Button>
        </div>
        <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-48 xl:px-28 lg:px-15 md:px-8 px-4 ">
            <h2 className="md:text-3xl text-2xl text-center mb-16">
              {t("create_account_user")}
            </h2>
            <form className="max-w-md mx-auto" onSubmit={form.handleSubmit}>
              <div className="grid sm:grid-cols-2  w-full items-center gap-2 mb-8">
                <div>
                  <Label className="mb-0 text-base" htmlFor="first_name">
                    {t("first_name")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-4 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                    type="text"
                    id="first_name"
                    name="first_name"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.first_name}
                  />
                </div>

                <div>
                  <Label className="mb-0 text-base" htmlFor="last_name">
                    {t("last_name")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-4 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                    type="text"
                    id="last_name"
                    name="last_name"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.last_name}
                  />
                </div>
              </div>
              {/* username */}
              <div className="grid  w-full items-center gap-2 mb-8">
                <Label className="mb-0 text-base" htmlFor="email">
                  {t("email")}
                  <span className="text-red-700">*</span>
                </Label>
                <Input
                  className="bg-transparent border-white py-4 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                  type="email"
                  id="email"
                  name="email"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.email}
                />
              </div>

              {/* password */}
              <div className="grid  w-full items-center gap-2 mb-8">
                <Label className="mb-0 text-base" htmlFor="password">
                  {t("password")}
                  <span className="text-red-700">*</span>
                </Label>
                <Input
                  className="bg-transparent border-white py-4 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                  type="password"
                  id="password"
                  name="password"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.password}
                />
                {form.touched.password && form.errors.password && (
                  <p className="text-red-700">{form.errors.password}</p>
                )}
              </div>

              <Button
                disabled={form.isSubmitting || !form.isValid}
                className={`border border-[#B71616] bg-[#B71616] rounded w-full mb-4 ${
                  form.isSubmitting && "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {form.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("create_account")
                )}
              </Button>

              <NavLink to="/user-login">
                <Button
                  variant={"outline"}
                  className="border border-[#B71616]  rounded w-full"
                >
                  {t("already_have_account")}
                </Button>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
