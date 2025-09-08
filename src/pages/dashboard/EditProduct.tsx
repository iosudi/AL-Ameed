import vehicleService from "@/api/vehicles/vehiclesService";
import logo from "@/assets/Logo.svg";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import FileUpload from "@/common/components/FileUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useCarBrandsInfinite } from "@/hooks/useBrands";
import { useCarFeatures } from "@/hooks/useFeature";
import { useCarVehicleId } from "@/hooks/useVehicles";
import { Brands } from "@/interfaces/Brands";
import { Feature } from "@/interfaces/Feature";
import { NAMESPACES } from "@/translations/namespaces";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";

const validationKeys = {
  required: "validators:validation.required",
  year: {
    min: "validators:validation.year.min",
    max: "validators:validation.year.max",
    type: "validators:validation.year.type",
  },
  mileage: {
    type: "validators:validation.mileage.type",
    min: "validators:validation.mileage.min",
  },
  engineCapacity: {
    type: "validators:validation.engineCapacity.type",
    range: "validators:validation.engineCapacity.range",
  },
  cylinders: {
    type: "validators:validation.cylinders.type",
    range: "validators:validation.cylinders.range",
  },
  seats: {
    type: "validators:validation.seats.type",
    range: "validators:validation.seats.range",
  },
  price: {
    type: "validators:validation.price.type",
    positive: "validators:validation.price.positive",
  },
};

export const EditProduct = () => {
  const { logout } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const carId = searchParams.get("id") || "";
  const { data: vehicle } = useCarVehicleId(Number(carId));

  const { t, i18n } = useTranslation([
    NAMESPACES.addProduct,
    NAMESPACES.validators,
  ]);

  const currentLanguage = i18n.language; // 'en' or 'ar'

  const body_type = [
    {
      value: "sedan",
      label: currentLanguage === "ar" ? "سيدان" : "Sedan",
    },
    {
      value: "suv",
      label: currentLanguage === "ar" ? "دفع رباعي / SUV" : "SUV",
    },
    {
      value: "hatchback",
      label: currentLanguage === "ar" ? "هاتشباك" : "Hatchback",
    },
    {
      value: "crossover",
      label: currentLanguage === "ar" ? "كروس أوفر" : "Crossover",
    },
    {
      value: "pickup",
      label: currentLanguage === "ar" ? "بيك أب" : "Pickup Truck",
    },
    {
      value: "minivan",
      label: currentLanguage === "ar" ? "فان / عائلية" : "Minivan / MPV",
    },
    {
      value: "coupe",
      label: currentLanguage === "ar" ? "كوبيه" : "Coupe",
    },
    {
      value: "convertible",
      label: currentLanguage === "ar" ? "كابريوليه" : "Convertible",
    },
    {
      value: "wagon",
      label: currentLanguage === "ar" ? "ستيشن واجن" : "Station Wagon",
    },
    {
      value: "limousine",
      label: currentLanguage === "ar" ? "ليموزين" : "Limousine",
    },
    {
      value: "classic",
      label: currentLanguage === "ar" ? "كلاسيك / تريكلية" : "Classic & Trucks",
    },
  ];

  // const [mainImage, setMainImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<File[]>([]);
  const {
    data: brands,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCarBrandsInfinite();
  const [ref, inView] = useInView();
  const { data: features } = useCarFeatures();

  const formValidationSchema = Yup.object().shape({
    body_type: Yup.string().required(t(validationKeys.required)),
    brand: Yup.string().required(t(validationKeys.required)),
    model: Yup.string().required(t(validationKeys.required)),

    year: Yup.number()
      .typeError(t(validationKeys.year.type))
      .min(1900, t(validationKeys.year.min))
      .max(new Date().getFullYear(), t(validationKeys.year.max))
      .required(t(validationKeys.required)),

    transmission: Yup.string().required(t(validationKeys.required)),
    engine_type: Yup.string().required(t(validationKeys.required)),

    mileage: Yup.number()
      .typeError(t(validationKeys.mileage.type))
      .min(0, t(validationKeys.mileage.min))
      .required(t(validationKeys.required)),

    engine_capacity: Yup.number()
      .typeError(t(validationKeys.engineCapacity.type))
      .min(0.6, t(validationKeys.engineCapacity.range))
      .max(99.9, t(validationKeys.engineCapacity.range))
      .required(t(validationKeys.required)),

    currency: Yup.string().required(t(validationKeys.required)),

    cylinders: Yup.number()
      .typeError(t(validationKeys.cylinders.type))
      .min(2, t(validationKeys.cylinders.range))
      .max(16, t(validationKeys.cylinders.range))
      .required(t(validationKeys.required)),

    color: Yup.string().required(t(validationKeys.required)),
    seats: Yup.number()
      .typeError(t(validationKeys.seats.type))
      .min(1, t(validationKeys.seats.range))
      .max(9, t(validationKeys.seats.range))
      .required(t(validationKeys.required)),

    price: Yup.number()
      .typeError(t(validationKeys.price.type))
      .positive(t(validationKeys.price.positive))
      .required(t(validationKeys.required)),

    is_featured: Yup.string().oneOf(["true", "false"]),
    for_rent: Yup.string().oneOf(["true", "false"]),
    is_active: Yup.string().oneOf(["true", "false"]),
    is_negotiable: Yup.string().oneOf(["true", "false"]),

    captions: Yup.array().of(Yup.string()).min(0, t(validationKeys.required)),
    features: Yup.array().of(Yup.string()).min(1, t(validationKeys.required)),
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      body_type: "",
      brand: "",
      model: "",
      year: "",
      transmission: "",
      engine_type: "",
      mileage: "",
      engine_capacity: "",
      currency: "BHD",
      cylinders: "",
      color: "",
      seats: "",
      price: "",
      is_featured: "false",
      is_active: "true",
      is_negotiable: "false",
      captions: [] as string[],
      features: [] as string[],
    },

    validationSchema: formValidationSchema,

    onSubmit: (values) => {
      const formData = new FormData();

      // Append text fields
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}`, String(v)));
        } else {
          formData.append(key, String(value));
        }
      });

      // Append images
      // if (mainImage) {
      //   formData.append("main_photo", mainImage);
      // }

      otherImages.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file); // if your backend needs '[]'
        }
      });

      // Here you send the formData
      console.log([...formData.entries()]); // Debug
      handleSubmit(formData);
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (vehicle) {
      formik.setValues({
        type: vehicle.data.type || "",
        body_type: vehicle.data.body_type || "",
        brand: vehicle.data.brand || "",
        model: vehicle.data.model || "",
        year: vehicle.data.year || "",
        transmission: vehicle.data.transmission || "",
        engine_type: vehicle.data.engine_type || "",
        mileage: vehicle.data.mileage || "",
        engine_capacity: vehicle.data.engine_capacity || "",
        currency: vehicle.data.currency || "BHD",
        cylinders: vehicle.data.cylinders || "",
        color: vehicle.data.color || "",
        seats: vehicle.data.seats || "",
        price: vehicle.data.price || "",
        is_featured: vehicle.data.is_featured ? "true" : "false",
        is_active: vehicle.data.is_active ? "true" : "false",
        is_negotiable: vehicle.data.is_negotiable ? "true" : "false",
        captions: vehicle.data.captions || [],
        features: vehicle.data.features
          ? vehicle.data.features.map((f: number) => f.toString())
          : [],
      });
    }
  }, [vehicle]);

  // function handleMainImage(file: File | null): void {
  //   setMainImage(file ?? null);
  //   console.log(mainImage);
  // }

  // function handleOtherImages(files: File[]): void {
  //   setOtherImages(files ? Array.from(files) : []);
  //   console.log(otherImages);
  // }

  const allBrands = brands?.pages.flatMap((page) => page.results) || [];

  async function handleSubmit(form: FormData) {
    try {
      const res = await vehicleService.updateVehicle(form, carId);
      console.log(res);

      toast.success("Product created successfully");
    } catch (err) {
      console.error(" error:", err);
    } finally {
      formik.setSubmitting(false);
    }
  }

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    if (checked) {
      formik.setFieldValue("features", [...formik.values.features, featureId]);
    } else {
      formik.setFieldValue(
        "features",
        formik.values.features.filter((id: string) => id !== featureId)
      );
    }
  };

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
            className="text-lg md:!px-8 px-5 md:!py-7 py-4 md:rounded-2xl rounded-lg text-red-900"
            variant="outline"
            onClick={logout}
          >
            {t("addProduct:logout")}
          </Button>

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
          <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
            <h2 className="md:text-3xl text-2xl text-center mb-6">
              {t("addProduct:add_car")}
            </h2>

            <DashboardNavbar />

            <form className="mt-8" onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {/* <div>
                  <Label className="mb-2 text-base" htmlFor="email">
                    {t("addProduct:address")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  />
                </div> */}

                <div>
                  <Label className="mb-2 text-base" htmlFor="email">
                    {t("addProduct:tags")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Select
                    value={formik.values.type}
                    onValueChange={(value) => {
                      formik.setFieldValue("type", value);
                    }}
                    dir={i18n.language == "ar" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger className="w-full py-5 sm:text-xl rounded-lg cursor-pointer">
                      <SelectValue placeholder={t("addProduct:used-new")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="used">
                        <Badge variant={"default"} className="bg-[#B71616]">
                          {t("addProduct:used")}
                        </Badge>
                      </SelectItem>
                      <SelectItem value="new">
                        <Badge variant={"default"} className="bg-[#B71616]">
                          {t("addProduct:new")}
                        </Badge>
                      </SelectItem>
                      <SelectItem value="rent">
                        <Badge variant={"default"} className="bg-[#B71616]">
                          {t("addProduct:for_rent")}
                        </Badge>
                      </SelectItem>
                      <SelectItem value="rent_to_own">
                        <Badge variant={"default"} className="bg-[#B71616]">
                          {t("addProduct:rent_to_own")}
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {formik.touched.type && formik.errors.type && (
                    <p className="text-red-700">{formik.errors.type}</p>
                  )}
                </div>

                {/* <div>
                  <Label className="mb-2 text-base" htmlFor="email">
                    {t("addProduct:vehicle_details")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="text"
                    name="vehicle_details"
                    value={formik.values.vehicle_details}
                    onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  />
                </div> */}

                <div>
                  <Label className="mb-2 text-base" htmlFor="body_type">
                    {t("addProduct:body_type")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Select
                    value={formik.values.body_type}
                    onValueChange={(value) =>
                      formik.setFieldValue("body_type", value)
                    }
                    dir={i18n.language == "ar" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger className="w-full py-5 sm:text-xl rounded-lg cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {body_type.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.body_type && formik.errors.body_type && (
                    <p className="text-red-700">{formik.errors.body_type}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="email">
                    {t("addProduct:brand")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Select
                    value={formik.values.brand}
                    onValueChange={(value) =>
                      formik.setFieldValue("brand", value)
                    }
                    dir={i18n.language == "ar" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger className="w-full py-5 sm:text-xl rounded-lg cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="">
                      {allBrands.map((brand: Brands) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                      {/* Loading indicator at the bottom */}
                      <div ref={ref} className="py-2 text-center">
                        {isFetchingNextPage ? (
                          <div className="text-sm text-gray-500">
                            Loading more brands...
                          </div>
                        ) : hasNextPage ? (
                          <div className="text-sm text-gray-500">
                            Scroll to load more
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            No more brands
                          </div>
                        )}
                      </div>
                    </SelectContent>
                  </Select>
                  {formik.touched.brand && formik.errors.brand && (
                    <p className="text-red-700">{formik.errors.brand}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="email">
                    {t("addProduct:model")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="text"
                    id="model"
                    name="model"
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.model && formik.errors.model && (
                    <p className="text-red-700">{formik.errors.model}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="email">
                    {t("addProduct:year")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="text"
                    id="year"
                    name="year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.year && formik.errors.year && (
                    <p className="text-red-700">{formik.errors.year}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="email">
                    {t("addProduct:transmission")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Select
                    value={formik.values.transmission}
                    onValueChange={(value) =>
                      formik.setFieldValue("transmission", value)
                    }
                    dir={i18n.language == "ar" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger className="w-full py-5 sm:text-xl rounded-lg cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                      <SelectItem value="dual_clutch">Dual Clutch</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.transmission &&
                    formik.errors.transmission && (
                      <p className="text-red-700">
                        {formik.errors.transmission}
                      </p>
                    )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="email">
                    {t("addProduct:engine_type")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Select
                    value={formik.values.engine_type}
                    onValueChange={(value) =>
                      formik.setFieldValue("engine_type", value)
                    }
                    dir={i18n.language == "ar" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger className="w-full py-5 sm:text-xl rounded-lg cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gasoline">Gasoline</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.engine_type && formik.errors.engine_type && (
                    <p className="text-red-700">{formik.errors.engine_type}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="mileage">
                    {t("addProduct:kilometer")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="number"
                    min={0}
                    id="mileage"
                    name="mileage"
                    value={formik.values.mileage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.mileage && formik.errors.mileage && (
                    <p className="text-red-700">{formik.errors.mileage}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="engine_capacity">
                    {t("addProduct:engine_capacity")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="number"
                    min={0}
                    id="engine_capacity"
                    name="engine_capacity"
                    value={formik.values.engine_capacity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.engine_capacity &&
                    formik.errors.engine_capacity && (
                      <p className="text-red-700">
                        {formik.errors.engine_capacity}
                      </p>
                    )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="cylinders">
                    {t("addProduct:cylinders")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="number"
                    min={0}
                    id="cylinders"
                    name="cylinders"
                    value={formik.values.cylinders}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.cylinders && formik.errors.cylinders && (
                    <p className="text-red-700">{formik.errors.cylinders}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="color">
                    {t("addProduct:color")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="text"
                    id="color"
                    name="color"
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.color && formik.errors.color && (
                    <p className="text-red-700">{formik.errors.color}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="seats">
                    {t("addProduct:seats")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="number"
                    min={0}
                    id="seats"
                    name="seats"
                    value={formik.values.seats}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.seats && formik.errors.seats && (
                    <p className="text-red-700">{formik.errors.seats}</p>
                  )}
                </div>

                {/* <div>
                  <Label className="mb-2 text-base" htmlFor="insurance">
                    {t("addProduct:insurance")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="text"
                    id="insurance"
                    name="insurance"
                    value={formik.values.insurance}
                    onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  />
                </div> */}
              </div>

              {/* <div className="grid w-full mt-4">
                <Label className="mb-2 text-base" htmlFor="description">
                  {t("addProduct:description")}
                  <span className="text-red-700">*</span>
                </Label>
                <Textarea
                  className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg min-h-32"
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                />
              </div> */}

              <div className="grid w-full mt-4">
                <Label className="mb-2 text-base" htmlFor="price">
                  {t("addProduct:price")}
                  <span className="text-red-700">*</span>
                </Label>
                <Input
                  className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                  type="text"
                  placeholder="BHD 1000"
                  id="price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-700">{formik.errors.price}</p>
                )}
              </div>

              <div className="grid w-full mt-4">
                <Label className="mb-2 text-base" htmlFor="email">
                  {t("addProduct:features")}
                  <span className="text-red-700">*</span>
                </Label>
                <div className="w-full border border-white py-12 px-8 rounded-lg">
                  <div className="grid sm:grid-cols-3 grid-cols-2 max-w-xl gap-4">
                    {features?.data.results.map((feature: Feature) => (
                      <div className="flex items-center gap-2" key={feature.id}>
                        <Checkbox
                          id={feature.id.toString()}
                          className="cursor-pointer border-[#d40000]"
                          checked={formik.values.features.includes(
                            feature.id.toString()
                          )}
                          onCheckedChange={(checked: boolean) =>
                            handleFeatureChange(feature.id.toString(), checked)
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
                  {formik.touched.features && formik.errors.features && (
                    <p className="text-red-700">{formik.errors.features}</p>
                  )}
                </div>
              </div>

              <div className="grid w-full mt-4">
                <Label className="mb-2 text-base" htmlFor="email">
                  {t("addProduct:car_photos")}
                  <span className="text-red-700">*</span>
                </Label>
                <div className="flex flex-wrap items-center justify-center gap-6 w-full border border-white py-12 px-8 rounded-lg">
                  {/* <FileUpload
                    required={true}
                    label={t("addProduct:main_photo")}
                    multiple={false}
                    onChange={(files) => {
                      handleMainImage(files?.[0] ?? null);
                    }}
                  /> */}

                  <FileUpload
                    label={t("addProduct:other_photos")}
                    multiple
                    onChange={(files) => {
                      if (files) {
                        if (files instanceof FileList) {
                          const validFiles = Array.from(files).filter(
                            (file) => file instanceof File
                          );
                          setOtherImages(validFiles);
                        } else if (files instanceof File) {
                          // If single file passed, wrap it in an array
                          setOtherImages([files]);
                        }
                      } else {
                        setOtherImages([]);
                      }
                    }}
                    value={otherImages} // Pass the array of files as value
                  />
                </div>
              </div>

              <div className="grid w-full mt-4 justify-end">
                <Button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.isValid}
                  className={`border border-[#B71616] bg-[#B71616] rounded  px-16 py-5 text-lg ${
                    formik.isSubmitting && "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {formik.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    t("add_button")
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
