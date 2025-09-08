import { removeVehicle } from "@/api/vehicles/vehiclesService";
import StaffCarsRent from "@/components/Modals/StaffCarsRent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useVehicles } from "@/hooks/useVehicles";
import { Vehicles } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { HiOutlineTrash } from "react-icons/hi2";

export const useProductColumns = (): ColumnDef<Vehicles>[] => {
  const { t, i18n } = useTranslation([NAMESPACES.dataTable, NAMESPACES.common]);
  const vehicles = useVehicles();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  async function handleRemoveProduct(id: number) {
    try {
      const res = await removeVehicle(id);
      vehicles.refetch();
      toast.success(t("common:success_delete"));
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error(t("common:error_delete") || "Failed to delete.");
    }
  }

  return [
    {
      accessorKey: "primary_image",
      header: t("dataTable:images"), // translated
      cell: ({ row }) => (
        <div className="capitalize w-fit mx-auto">
          <img
            className="sm:w-38 sm:h-38 min-w-32 h-32 rounded-2xl object-contain object-center"
            src={`${import.meta.env.VITE_API_BASE_URL}${row.getValue(
              "primary_image"
            )}`}
            alt="image"
          />
        </div>
      ),
    },
    {
      accessorKey: "info",
      header: () => (
        <div
          className={` ${i18n.language == "ar" ? "text-right" : "text-left"}`}
        >
          {t("dataTable:info")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base">
          <h5>{`${row.original.brand_name} ${row.original.model} / ${row.original.year} (${row.original.color})`}</h5>
          <span className="block font-bold">
            {row.original.currency}{" "}
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
            }).format(row.original.price)}
          </span>
        </div>
      ),
    },
    // {
    //   accessorKey: "date",
    //   header: t("dataTable:date"),
    //   cell: ({ row }) => (
    //     <div className="capitalize sm:text-xl text-base text-center">
    //       {row.getValue("date")}
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "condition",
    //   header: t("status"),
    //   cell: ({ row }) => (
    //     <div className="capitalize sm:text-xl text-base text-center">
    //       {row.getValue("condition")}
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "views",
    //   header: t("views"),
    //   cell: ({ row }) => (
    //     <div className="capitalize sm:text-xl text-base text-center">
    //       {row.getValue("views")}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <Button
            size={"icon"}
            variant={"outline"}
            className="size-10"
            onClick={() => setIsDialogOpen(true)}
          >
            <HiOutlineTrash className="size-6" />
          </Button>

          {row.original.is_available && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"} variant={"outline"} className="size-10">
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.25586 6.80908C3.25586 5.15223 4.59901 3.80908 6.25586 3.80908H26.2559C27.9128 3.80908 29.2559 5.15224 29.2559 6.80908V16.8091C29.2559 17.3613 28.8081 17.8091 28.2559 17.8091C27.7036 17.8091 27.2559 17.3613 27.2559 16.8091V6.80908C27.2559 6.25679 26.8081 5.80908 26.2559 5.80908H6.25586C5.70358 5.80908 5.25586 6.2568 5.25586 6.80908V26.8091C5.25586 27.3613 5.70357 27.8091 6.25586 27.8091H16.2559C16.8081 27.8091 17.2559 28.2568 17.2559 28.8091C17.2559 29.3613 16.8081 29.8091 16.2559 29.8091H6.25586C4.59902 29.8091 3.25586 28.466 3.25586 26.8091V6.80908Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.5891 19.1423C19.9323 19.1423 18.5891 20.4855 18.5891 22.1423C18.5891 23.7991 19.9323 25.1423 21.5891 25.1423C23.2459 25.1423 24.5891 23.7991 24.5891 22.1423C24.5891 20.4855 23.2459 19.1423 21.5891 19.1423ZM16.5891 22.1423C16.5891 19.3809 18.8276 17.1423 21.5891 17.1423C24.3506 17.1423 26.5891 19.3809 26.5891 22.1423C26.5891 24.9038 24.3506 27.1423 21.5891 27.1423C18.8276 27.1423 16.5891 24.9038 16.5891 22.1423Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M24.1418 24.1845C24.4867 23.7531 25.1161 23.6833 25.5473 24.0282L28.8806 26.6949C29.3119 27.0399 29.3818 27.6693 29.0369 28.1005C28.6918 28.5318 28.0626 28.6017 27.6313 28.2566L24.2979 25.5899C23.8667 25.245 23.7967 24.6157 24.1418 24.1845Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.58911 11.4758C8.58911 10.9236 9.03683 10.4758 9.58911 10.4758H22.9224C23.4747 10.4758 23.9224 10.9236 23.9224 11.4758C23.9224 12.0281 23.4747 12.4758 22.9224 12.4758H9.58911C9.03683 12.4758 8.58911 12.0281 8.58911 11.4758Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.58911 16.8091C8.58911 16.2568 9.03683 15.8091 9.58911 15.8091H14.9224C15.4747 15.8091 15.9224 16.2568 15.9224 16.8091C15.9224 17.3613 15.4747 17.8091 14.9224 17.8091H9.58911C9.03683 17.8091 8.58911 17.3613 8.58911 16.8091Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <StaffCarsRent carId={row.original.id} />
              </DialogContent>
            </Dialog>
          )}

          {/* <Button size={"icon"} variant={"outline"} className="size-10">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_4_360)">
                <path
                  d="M5.38921 0.521484C4.61601 0.521484 3.98921 1.14829 3.98921 1.92148V2.42548C2.38344 2.65726 1.19111 4.03241 1.18921 5.65482V25.2548C1.19127 27.0581 2.6526 28.5194 4.45588 28.5215H24.0559C25.8592 28.5194 27.3205 27.0581 27.3225 25.2548V5.65482C27.3194 4.03286 26.1277 2.65838 24.5225 2.42548V1.92148C24.5225 1.14829 23.8957 0.521484 23.1225 0.521484C22.3493 0.521484 21.7225 1.14829 21.7225 1.92148V2.38815H18.9225V1.92148C18.9225 1.14829 18.2957 0.521484 17.5225 0.521484C16.7493 0.521484 16.1225 1.14829 16.1225 1.92148V2.38815H12.3892V1.92148C12.3892 1.14829 11.7624 0.521484 10.9892 0.521484C10.216 0.521484 9.58921 1.14829 9.58921 1.92148V2.38815H6.78921V1.92148C6.78921 1.14829 6.16241 0.521484 5.38921 0.521484ZM4.92254 1.92148C4.92254 1.66375 5.13148 1.45482 5.38921 1.45482C5.64694 1.45482 5.85588 1.66375 5.85588 1.92148V3.78815C5.85588 4.04588 5.64694 4.25482 5.38921 4.25482C5.13148 4.25482 4.92254 4.04588 4.92254 3.78815V1.92148ZM24.0559 27.5882H4.45588C3.16785 27.5866 2.12409 26.5428 2.12254 25.2548V7.52148H26.3892V25.2548C26.3877 26.5428 25.3439 27.5866 24.0559 27.5882ZM22.6559 1.92148C22.6559 1.66375 22.8648 1.45482 23.1225 1.45482C23.3803 1.45482 23.5892 1.66375 23.5892 1.92148V3.78815C23.5892 4.04588 23.3803 4.25482 23.1225 4.25482C22.8648 4.25482 22.6559 4.04588 22.6559 3.78815V1.92148ZM17.0559 1.92148C17.0559 1.66375 17.2648 1.45482 17.5225 1.45482C17.7803 1.45482 17.9892 1.66375 17.9892 1.92148V3.78815C17.9892 4.04588 17.7803 4.25482 17.5225 4.25482C17.2648 4.25482 17.0559 4.04588 17.0559 3.78815V1.92148ZM10.5225 1.92148C10.5225 1.66375 10.7315 1.45482 10.9892 1.45482C11.2469 1.45482 11.4559 1.66375 11.4559 1.92148V3.78815C11.4559 4.04588 11.2469 4.25482 10.9892 4.25482C10.7315 4.25482 10.5225 4.04588 10.5225 3.78815V1.92148ZM9.58921 3.32148V3.78815C9.58921 4.56135 10.216 5.18815 10.9892 5.18815C11.7624 5.18815 12.3892 4.56135 12.3892 3.78815V3.32148H16.1225V3.78815C16.1225 4.56135 16.7493 5.18815 17.5225 5.18815C18.2957 5.18815 18.9225 4.56135 18.9225 3.78815V3.32148H21.7225V3.78815C21.7225 4.56135 22.3493 5.18815 23.1225 5.18815C23.8957 5.18815 24.5225 4.56135 24.5225 3.78815V3.36815C25.6082 3.59142 26.3878 4.54644 26.3892 5.65482V6.58815H2.12254V5.65482C2.12394 4.54644 2.90355 3.59142 3.98921 3.36815V3.78815C3.98921 4.56135 4.61601 5.18815 5.38921 5.18815C6.16241 5.18815 6.78921 4.56135 6.78921 3.78815V3.32148H9.58921Z"
                  fill="white"
                />
                <path
                  d="M3.98924 8.45483H3.52257C3.26484 8.45483 3.05591 8.66377 3.05591 8.9215C3.05591 9.17923 3.26484 9.38817 3.52257 9.38817H3.98924C4.24697 9.38817 4.45591 9.17923 4.45591 8.9215C4.45591 8.66377 4.24697 8.45483 3.98924 8.45483Z"
                  fill="white"
                />
                <path
                  d="M5.85583 9.38817H18.4558C18.7136 9.38817 18.9225 9.17923 18.9225 8.9215C18.9225 8.66377 18.7136 8.45483 18.4558 8.45483H5.85583C5.59809 8.45483 5.38916 8.66377 5.38916 8.9215C5.38916 9.17923 5.59809 9.38817 5.85583 9.38817Z"
                  fill="white"
                />
                <path
                  d="M9.82254 18.2548C8.98692 18.1964 8.25938 18.82 8.18921 19.6548C8.25938 20.4895 8.98692 21.1131 9.82254 21.0548C10.6582 21.1131 11.3857 20.4895 11.4559 19.6548C11.3857 18.82 10.6582 18.1964 9.82254 18.2548ZM9.82254 20.1214C9.44921 20.1214 9.12254 19.9035 9.12254 19.6548C9.12254 19.406 9.44921 19.1881 9.82254 19.1881C10.1959 19.1881 10.5225 19.406 10.5225 19.6548C10.5225 19.9035 10.1959 20.1214 9.82254 20.1214Z"
                  fill="white"
                />
                <path
                  d="M18.6892 18.2548C17.8536 18.1964 17.1261 18.82 17.0559 19.6548C17.1261 20.4895 17.8536 21.1131 18.6892 21.0548C19.5249 21.1131 20.2524 20.4895 20.3226 19.6548C20.2524 18.82 19.5249 18.1964 18.6892 18.2548ZM18.6892 20.1214C18.3159 20.1214 17.9892 19.9035 17.9892 19.6548C17.9892 19.406 18.3159 19.1881 18.6892 19.1881C19.0626 19.1881 19.3892 19.406 19.3892 19.6548C19.3892 19.9035 19.0626 20.1214 18.6892 20.1214Z"
                  fill="white"
                />
                <path
                  d="M15.1893 19.1882H13.3226C13.0649 19.1882 12.856 19.3972 12.856 19.6549C12.856 19.9126 13.0649 20.1216 13.3226 20.1216H15.1893C15.447 20.1216 15.656 19.9126 15.656 19.6549C15.656 19.3972 15.447 19.1882 15.1893 19.1882Z"
                  fill="white"
                />
                <path
                  d="M22.1892 15.4549H20.0504L18.6593 12.1168C18.443 11.5942 17.9327 11.2539 17.3671 11.2549H11.1446C10.5791 11.2539 10.0689 11.594 9.85236 12.1164L8.46169 15.4549H6.32249C5.80703 15.4549 5.38916 15.8728 5.38916 16.3882V17.3216C5.38916 17.837 5.80703 18.2549 6.32249 18.2549H6.78916V21.0549C6.78916 21.8281 7.41596 22.4549 8.18916 22.4549V24.3216C8.18916 24.837 8.60703 25.2549 9.12249 25.2549H10.5225C11.038 25.2549 11.4558 24.837 11.4558 24.3216V22.4549H17.0558V24.3216C17.0904 24.8681 17.559 25.2847 18.1058 25.2549H19.2725C19.8193 25.2847 20.288 24.8681 20.3225 24.3216V22.4549C21.0957 22.4549 21.7225 21.8281 21.7225 21.0549V18.2549H22.1892C22.7046 18.2549 23.1225 17.837 23.1225 17.3216V16.3882C23.1225 15.8728 22.7046 15.4549 22.1892 15.4549ZM10.7143 12.4752C10.7867 12.3016 10.9564 12.1884 11.1446 12.1882H17.3671C17.5555 12.1883 17.7255 12.3017 17.7978 12.4757L19.3089 16.1026L19.6225 16.8549H8.88916L9.20229 16.1036L10.7143 12.4752ZM6.32249 17.3216V16.3882H8.07249L7.86249 16.8983C7.58871 16.9644 7.34139 17.112 7.15316 17.3216H6.32249ZM10.5225 24.3216H9.12249V22.4549H10.5225V24.3216ZM19.3994 24.2814C19.3635 24.3099 19.3183 24.3242 19.2725 24.3216H18.1058C18.0714 24.3193 18.0372 24.3152 18.0032 24.3094C17.9943 24.3094 17.9892 24.3118 17.9892 24.3206V22.4549H19.3892L19.3994 24.2814ZM20.7892 21.0549C20.7892 21.3126 20.5802 21.5216 20.3225 21.5216H8.18916C7.93143 21.5216 7.72249 21.3126 7.72249 21.0549V18.2549C7.72249 17.9972 7.93143 17.7882 8.18916 17.7882H20.3225C20.5802 17.7882 20.7892 17.9972 20.7892 18.2549V21.0549ZM22.1892 17.3216H21.3585C21.1709 17.1124 20.9244 16.9649 20.6515 16.8983L20.4392 16.3882H22.1892V17.3216Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_4_360">
                  <rect
                    width="28"
                    height="28"
                    fill="white"
                    transform="translate(0.255859 0.521484)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Button> */}

          <AlertDialog open={isDialogOpen} onOpenChange={handleOpenChange}>
            <AlertDialogContent dir="ltr">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-right">
                  هل انت متأكد من حذفك لهذا المنتج؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-right">
                  لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك
                  نهائيًا وإزالة بياناتك من خوادمنا.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleRemoveProduct(row.original.id)}
                >
                  نعم
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];
};
