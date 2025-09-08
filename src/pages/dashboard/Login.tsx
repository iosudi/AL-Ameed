import authService from "@/api/authService/authService";
import logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { NAMESPACES } from "@/translations/namespaces";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

interface formType {
  username: string;
  password: string;
}

export const Login = () => {
  const { i18n, t } = useTranslation([NAMESPACES.common, NAMESPACES.login]);
  const currentLanguage = i18n.language;
  const { login: setUser } = useAuth();
  const from = "/dashboard";

  const navigate = useNavigate();
  const initialValues: formType = {
    username: "",
    password: "",
  };

  // const formValidationSchema = Yup.object().shape({
  //   username: Yup.string()
  //     .email("خطأ في البريد الالكتروني")
  //     .required("البريد الالكتروني مطلوب"),

  //   password: Yup.string()
  //     .min(8, "كلمة السر يجب ان تكون اطول من 8 حروف")
  //     .required("كلمة السر مطلوبة"),
  // });

  const form = useFormik({
    initialValues: initialValues,

    // validationSchema: formValidationSchema,

    onSubmit: () => {
      handleLogin();
    },
  });

  async function handleLogin() {
    try {
      const user = await authService.login(
        form.values.username,
        form.values.password
      );

      if (!user.user.is_staff) {
        toast.error("You don't have the access to proceed");
        return;
      }

      setUser(user.user);
      toast.success(t("common:success_login"));
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(t("common:error"));
      console.error("Login error:", err);
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
              {t("login:title", {
                type: t("login:admin"),
              })}
            </h2>
            <form className="max-w-md mx-auto" onSubmit={form.handleSubmit}>
              {/* username */}
              <div className="grid  w-full items-center gap-2 mb-8">
                <Label className="mb-0 text-base" htmlFor="email">
                  {t("login:email_label")}
                  <span className="text-red-700">*</span>
                </Label>
                <Input
                  dir="rtl"
                  className="bg-transparent border-white py-4 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                  type="text"
                  id="username"
                  name="username"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.username}
                />
              </div>

              {/* password */}
              <div className="grid  w-full items-center gap-2 mb-8">
                <Label className="mb-0 text-base" htmlFor="email">
                  {t("login:password_label")}
                  <span className="text-red-700">*</span>
                </Label>
                <Input
                  dir="rtl"
                  className="bg-transparent border-white py-4 placeholder:font-[400] placeholder:text-neutral-400 rounded"
                  type="password"
                  id="password"
                  name="password"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.password}
                />
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
                  t("login:login")
                )}
              </Button>

              <NavLink to="/register">
                <Button
                  variant={"outline"}
                  className="border border-[#B71616]  rounded w-full"
                >
                  {t("login:register")}
                </Button>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
