import vehicleService from "@/api/vehicles/vehiclesService";
import logo from "@/assets/Logo.svg";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import FileUpload from "@/common/components/FileUpload";
import DaySelector from "@/components/Dashboard/DaySelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { getBodyTypes, getColors } from "@/data/carDetails";
import { useCarBrandsInfinite } from "@/hooks/useBrands";
import { useCarFeatures } from "@/hooks/useFeature";
import { Feature } from "@/interfaces/Feature";
import { cn } from "@/lib/utils";
import { NAMESPACES } from "@/translations/namespaces";
import axios from "axios";
import { useFormik } from "formik";
import { CheckIcon, ChevronsUpDownIcon, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";

const PERMISSION_IDS = {
  RENT_TO_OWN: 185,
  VIEW_RENTAL: 176,
  VIEW_CAR_LISTING: 144,
} as const;

interface Day {
  id: number;
  value: string | number;
  date: Date | null;
  calendarValue: string;
  open: boolean;
}

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

const getAvailableVehicleTypes = (
  userPermissions: number[],
  isSuperuser: boolean,
  t: (key: string) => string
) => {
  if (isSuperuser) {
    return [
      { value: "used", label: t("addProduct:used") },
      { value: "new", label: t("addProduct:new") },
      { value: "rent", label: t("addProduct:for_rent") },
      { value: "rent_to_own", label: t("addProduct:rent_to_own") },
    ];
  }

  const availableTypes = [];

  // Check permissions and add corresponding types
  if (userPermissions.includes(PERMISSION_IDS.VIEW_CAR_LISTING)) {
    availableTypes.push(
      { value: "used", label: t("addProduct:used") },
      { value: "new", label: t("addProduct:new") }
    );
  }

  if (userPermissions.includes(PERMISSION_IDS.VIEW_RENTAL)) {
    availableTypes.push({ value: "rent", label: t("addProduct:for_rent") });
  }

  if (userPermissions.includes(PERMISSION_IDS.RENT_TO_OWN)) {
    availableTypes.push({
      value: "rent_to_own",
      label: t("addProduct:rent_to_own"),
    });
  }

  return availableTypes;
};

export const AddProduct = () => {
  const { user, logout } = useAuth();

  const { t, i18n } = useTranslation([
    NAMESPACES.addProduct,
    NAMESPACES.validators,
  ]);

  const currentLanguage = i18n.language; // 'en' or 'ar'
  const {
    data: brands,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCarBrandsInfinite();
  const [ref, inView] = useInView();
  const { data: features } = useCarFeatures();

  const allBrands = brands?.pages.flatMap((page) => page.results) || [];

  const [open, setOpen] = useState(false);
  const [days, setDays] = useState<Day[]>([]);

  const body_type = getBodyTypes(currentLanguage);

  const colors = getColors(currentLanguage);

  // const [mainImage, setMainImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<File[]>([]);
  const [rentalTier1, setRentalTier1] = useState({
    min_days: "",
    price_per_day: "",
  });
  const [rentalTier2, setRentalTier2] = useState({
    min_days: "",
    price_per_day: "",
  });
  const [rentalTier3, setRentalTier3] = useState({
    min_days: "",
    price_per_day: "",
  });

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
      staff_only: "false",
      price_negotiable: "false",
      status: "available",
      available_units: 0,
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
      // console.log([...formData.entries()]); // Debug
      handleSubmit(formData);
    },
  });

  const availableVehicleTypes = getAvailableVehicleTypes(
    user?.user_permissions || [],
    user?.is_superuser || false,
    t
  );
  const hasOnlyOneType = availableVehicleTypes.length === 1;
  const isCarListingOnly =
    availableVehicleTypes.length === 2 &&
    availableVehicleTypes.every(
      (type) => type.value === "used" || type.value === "new"
    );

  useEffect(() => {
    if (
      hasOnlyOneType &&
      !isCarListingOnly &&
      availableVehicleTypes[0] &&
      !formik.values.type
    ) {
      formik.setFieldValue("type", availableVehicleTypes[0].value);
    }
  }, [hasOnlyOneType, isCarListingOnly, availableVehicleTypes]);

  useEffect(() => {
    console.log(brands);

    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  async function handleSubmit(form: FormData) {
    try {
      const res = await vehicleService.createVehicle(form);
      console.log(res.data);
      days.forEach((day) => {
        handleButtonClick(res.data.id, day.value, day.calendarValue);
      });

      getRentalArray().forEach((element) => {
        vehicleService.postPriceTiers({
          vehicle: res.data.id,
          ...element,
        });
      });
      toast.success("Product created successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // ✅ Check for HTTP 413
        if (err.code === "ERR_NETWORK") {
          toast.error("⚠️ File is too large. Please upload a smaller file.");
        } else {
          toast.error("Upload failed. Please try again.");
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
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

  const getRentalArray = () => {
    const rentalTiers = [];

    if (rentalTier1.price_per_day && rentalTier1.min_days) {
      rentalTiers.push({
        min_days: parseInt(rentalTier1.min_days),
        price_per_day: parseFloat(rentalTier1.price_per_day),
      });
    }

    if (rentalTier2.price_per_day && rentalTier2.min_days) {
      rentalTiers.push({
        min_days: parseInt(rentalTier2.min_days),
        price_per_day: parseFloat(rentalTier2.price_per_day),
      });
    }

    if (rentalTier3.price_per_day && rentalTier3.min_days) {
      rentalTiers.push({
        min_days: parseInt(rentalTier3.min_days),
        price_per_day: parseFloat(rentalTier3.price_per_day),
      });
    }

    return rentalTiers;
  };

  const addDay = () => {
    const newId = days.length + 1;
    setDays([
      ...days,
      { id: newId, value: "", date: null, open: false, calendarValue: "" },
    ]);
  };

  const handleValueChange = (id: number, newValue: string): void => {
    setDays((prev) =>
      prev.map((day) => (day.id === id ? { ...day, value: newValue } : day))
    );
  };

  const handleCalendarChange = (
    id: number,
    selectedDate: Date | undefined
  ): void => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === id
          ? {
              ...day,
              date: selectedDate ?? null,
              calendarValue: selectedDate
                ? selectedDate.toLocaleDateString()
                : "",
              open: false,
            }
          : day
      )
    );
  };

  const handleOpenChange = (id: number, isOpen: boolean): void => {
    setDays((prev) =>
      prev.map((day) => (day.id === id ? { ...day, open: isOpen } : day))
    );
  };

  const handleButtonClick = (
    id: number,
    value: string | number,
    calendarValue: string
  ): void => {
    const formattedDate = calendarValue
      ? new Date(calendarValue).toISOString().slice(0, 10) // Converts to 'YYYY-MM-DD'
      : "";
    vehicleService.postCarPrice({
      vehicle: id,
      price: value,
      start_date: formattedDate,
    });
  };

  const handleRemoveDay = (id: number): void => {
    setDays((prev) => prev.filter((day) => day.id !== id));
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
                <div>
                  <Label className="mb-2 text-base" htmlFor="type">
                    {t("addProduct:tags")}
                    <span className="text-red-700">*</span>
                  </Label>

                  {/* Show select dropdown only if user has multiple options or car listing permission */}
                  {!hasOnlyOneType || isCarListingOnly ? (
                    <Select
                      onValueChange={(value) => {
                        formik.setFieldValue("type", value);
                      }}
                      value={formik.values.type}
                      dir={i18n.language == "ar" ? "rtl" : "ltr"}
                    >
                      <SelectTrigger className="w-full py-5 sm:text-xl rounded-lg cursor-pointer">
                        <SelectValue placeholder={t("addProduct:used-new")} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVehicleTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <Badge variant={"default"} className="bg-[#B71616]">
                              {type.label}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    /* Show disabled input for single permission (except car listing) */
                    <div className="relative">
                      <Input
                        className="bg-gray-100 border-gray-300 py-5 rounded-lg cursor-not-allowed"
                        value={availableVehicleTypes[0]?.label || ""}
                        disabled
                        readOnly
                      />
                      <Badge
                        variant={"default"}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#B71616]"
                      >
                        {availableVehicleTypes[0]?.label}
                      </Badge>
                    </div>
                  )}

                  {/* Show error message if no permissions */}
                  {availableVehicleTypes.length === 0 && (
                    <p className="text-red-700 mt-2">
                      {t("addProduct:no_permissions")}
                    </p>
                  )}

                  {formik.touched.type && formik.errors.type && (
                    <p className="text-red-700">{formik.errors.type}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 text-base" htmlFor="body_type">
                    {t("addProduct:body_type")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Select
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
                  <label className="mb-2 text-base block">
                    {t("addProduct:brand")}
                    <span className="text-red-700">*</span>
                  </label>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        dir={i18n.language === "ar" ? "rtl" : "ltr"}
                        className="w-full justify-between py-5 sm:text-xl rounded-lg"
                      >
                        {formik.values.brand?.toString()
                          ? allBrands.find(
                              (b) =>
                                b.id.toString() ===
                                formik.values.brand?.toString()
                            )?.name
                          : ""}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput placeholder={"search.."} />
                        <CommandList>
                          <CommandEmpty>
                            {t("addProduct:noBrandFound")}
                          </CommandEmpty>

                          <CommandGroup>
                            {allBrands.map((brand) => (
                              <CommandItem
                                className="text-black"
                                key={brand.id}
                                // ✅ use brand.name for searching
                                value={brand.name.toLowerCase()}
                                onSelect={() => {
                                  formik.setFieldValue(
                                    "brand",
                                    brand.id.toString()
                                  );
                                  setOpen(false);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formik.values.brand?.toString() ===
                                      brand.id.toString()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {brand.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>

                          {/* Infinite scroll footer */}
                          <div
                            ref={ref}
                            className="py-2 text-center text-sm text-gray-500"
                          >
                            {isFetchingNextPage
                              ? "Loading more brands..."
                              : hasNextPage
                              ? "Scroll to load more"
                              : "No more brands"}
                          </div>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {formik.touched.brand && formik.errors.brand && (
                    <p className="text-red-700 mt-1">{formik.errors.brand}</p>
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
                  <Label className="mb-2 text-base" htmlFor="body_type">
                    {t("addProduct:color")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("color", value)
                    }
                    dir={i18n.language == "ar" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger className="w-full py-5 sm:text-xl rounded-lg cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

              {formik.values.type == "rent" && (
                <div className="grid w-full mt-4">
                  <Label className="mb-2 text-base" htmlFor="available_units">
                    {t("available_quantity")}
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                    type="text"
                    id="available_units"
                    name="available_units"
                    value={formik.values.available_units}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.available_units &&
                    formik.errors.available_units && (
                      <p className="text-red-700">
                        {formik.errors.available_units}
                      </p>
                    )}
                </div>
              )}

              {formik.values.type == "rent" && (
                <div className="grid gap-4 w-full mt-4">
                  {/* First Input Set */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <Label
                        className="mb-2 text-base"
                        htmlFor="price_per_day_1"
                      >
                        {t("price_per_day_level_one")}
                        <span className="text-red-700">*</span>
                      </Label>
                      <Input
                        className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                        type="number"
                        value={rentalTier1.price_per_day}
                        onChange={(e) =>
                          setRentalTier1((prev) => ({
                            ...prev,
                            price_per_day: e.target.value,
                          }))
                        }
                        placeholder="BHD 100"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 text-base" htmlFor="min_days_1">
                        {t("min_rental_period_days")}
                      </Label>
                      <Input
                        className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                        type="number"
                        value={rentalTier1.min_days}
                        onChange={(e) =>
                          setRentalTier1((prev) => ({
                            ...prev,
                            min_days: e.target.value,
                          }))
                        }
                        placeholder="1"
                      />
                    </div>
                  </div>

                  {/* Second Input Set */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <Label
                        className="mb-2 text-base"
                        htmlFor="price_per_day_2"
                      >
                        {t("price_per_day_level_two")}
                        <span className="text-red-700">*</span>
                      </Label>
                      <Input
                        className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                        type="number"
                        value={rentalTier2.price_per_day}
                        onChange={(e) =>
                          setRentalTier2((prev) => ({
                            ...prev,
                            price_per_day: e.target.value,
                          }))
                        }
                        placeholder="BHD 80"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 text-base" htmlFor="min_days_2">
                        {t("min_rental_period_days")}
                        <span className="text-red-700">*</span>
                      </Label>
                      <Input
                        className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                        type="number"
                        value={rentalTier2.min_days}
                        onChange={(e) =>
                          setRentalTier2((prev) => ({
                            ...prev,
                            min_days: e.target.value,
                          }))
                        }
                        placeholder="7"
                      />
                    </div>
                  </div>

                  {/* Third Input Set */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <Label
                        className="mb-2 text-base"
                        htmlFor="price_per_day_3"
                      >
                        {t("price_per_day_level_three")}
                        <span className="text-red-700">*</span>
                      </Label>
                      <Input
                        className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                        type="number"
                        value={rentalTier3.price_per_day}
                        onChange={(e) =>
                          setRentalTier3((prev) => ({
                            ...prev,
                            price_per_day: e.target.value,
                          }))
                        }
                        placeholder="BHD 60"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 text-base" htmlFor="min_days_3">
                        {t("min_rental_period_days")}
                        <span className="text-red-700">*</span>
                      </Label>
                      <Input
                        className="bg-transparent border-white py-5 placeholder:font-[400] placeholder:text-neutral-400 rounded-lg"
                        type="number"
                        value={rentalTier3.min_days}
                        onChange={(e) =>
                          setRentalTier3((prev) => ({
                            ...prev,
                            min_days: e.target.value,
                          }))
                        }
                        placeholder="30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(formik.values.type == "new" ||
                formik.values.type == "used") && (
                <div className="grid w-full mt-4">
                  <div className="w-full border border-white py-12 px-8 rounded-lg">
                    <div className="flex max-w-xl gap-4">
                      <RadioGroup
                        defaultValue={formik.values.price_negotiable}
                        onValueChange={(val) =>
                          formik.setFieldValue("price_negotiable", val)
                        }
                        dir="rtl"
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="true" id="r1" />
                          <Label htmlFor="r1">{t("price_negotiable")}</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="false" id="r2" />
                          <Label htmlFor="r2">
                            {t("price_not_negotiable")}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {formik.touched.staff_only && formik.errors.staff_only && (
                      <p className="text-red-700">{formik.errors.staff_only}</p>
                    )}
                  </div>
                </div>
              )}

              {(formik.values.type == "new" ||
                formik.values.type == "used") && (
                <div className="grid grid-cols-1  mt-4">
                  <Label className="mb-2 text-base" htmlFor="currency">
                    {t("addProduct:variable_price")}
                  </Label>
                  <ScrollArea className="border-white border rounded-lg whitespace-nowrap ">
                    <div className="flex  space-x-4 p-4">
                      {days.map((day) => (
                        <DaySelector
                          key={day.id}
                          id={day.id}
                          value={day.value}
                          date={day.date}
                          calendarValue={day.calendarValue}
                          open={day.open}
                          onValueChange={handleValueChange}
                          onCalendarChange={handleCalendarChange}
                          onOpenChange={handleOpenChange}
                          onRemove={handleRemoveDay}
                        />
                      ))}

                      {/* Plus Button to Add More */}
                      <div className="flex items-center justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="w-16 h-16"
                          onClick={addDay}
                        >
                          <Plus className="size-6" />
                        </Button>
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              )}

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
                <Label className="mb-2 text-base" htmlFor="staff_car">
                  {t("addProduct:staff_car")}
                  <span className="text-red-700">*</span>
                </Label>
                <div className="w-full border border-white py-12 px-8 rounded-lg">
                  <div className="flex max-w-xl gap-4">
                    <RadioGroup
                      value={formik.values.staff_only}
                      onValueChange={(value) =>
                        formik.setFieldValue("staff_only", value)
                      }
                      className="flex items-center gap-4"
                      dir="rtl"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">{t("common:yes")}</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">{t("common:no")}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {formik.touched.staff_only && formik.errors.staff_only && (
                    <p className="text-red-700">{formik.errors.staff_only}</p>
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
                    accept="image/*"
                    isCreateProduct
                    onChange={(files) => {
                      if (files) {
                        if (files instanceof FileList) {
                          const validFiles = Array.from(files).filter(
                            (file) => file instanceof File
                          );
                          setOtherImages(validFiles);
                        } else if (files instanceof File) {
                          setOtherImages([files]);
                        }
                      } else {
                        setOtherImages([]);
                      }
                    }}
                    value={otherImages}
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

export default AddProduct;
