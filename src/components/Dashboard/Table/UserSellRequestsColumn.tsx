import sellService from "@/api/sellService/sellService";
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
import {
  Image,
  SellRequest,
  SellRequestResult,
} from "@/interfaces/SellRequest";
import { NAMESPACES } from "@/translations/namespaces";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsEye } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

interface UseProductColumnsProps {
  setProducts: React.Dispatch<React.SetStateAction<SellRequest>>;
}

export const useProductColumns = ({
  setProducts,
}: UseProductColumnsProps): ColumnDef<SellRequestResult>[] => {
  const { t, i18n } = useTranslation([
    NAMESPACES.dataTable,
    NAMESPACES.common,
    NAMESPACES.sellRequests,
  ]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentVehicleId, setCurrentVehicleId] = useState<number | null>(null);

  const handleOpenDeleteDialog = (id: number) => {
    setCurrentVehicleId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCurrentVehicleId(null);
    // Force remove pointer-events-none from body with a small delay
    setTimeout(() => {
      document.body.style.pointerEvents = "auto";
    }, 100);
  };

  async function handleRemoveProduct() {
    if (!currentVehicleId) return;

    try {
      const res = await sellService.removeSellRequest(currentVehicleId);

      // Update the local state to remove the deleted item
      setProducts((prev) => ({
        ...prev,
        results: prev.results.filter((item) => item.id !== currentVehicleId),
        count: prev.count - 1, // Decrease the count
      }));

      toast.success(t("common:success_delete"));
      console.log(res);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
      toast.error(t("common:error_delete") || "Failed to delete.");
      handleCloseDeleteDialog();
    }
  }

  return [
    {
      accessorKey: "images", // Access the whole vehicle object
      header: t("dataTable:images"),
      cell: ({ row }) => {
        const image: Image[] = row.getValue("images");
        const imageUrl = image?.[0]?.image; // fallback if no image

        return (
          <div className="capitalize w-fit mx-auto">
            <img
              className="sm:w-38 sm:h-38 min-w-32 h-32 rounded-2xl object-contain object-center"
              src={imageUrl}
              alt="Vehicle"
            />
          </div>
        );
      },
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
          <h5>{`${row.original.brand_model} / ${row.original.year} (${row.original.color})`}</h5>
          <span className="block font-bold">
            {"BHD "}
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
            }).format(row.original.price)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "seller_name",
      header: t("sellRequests:seller"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {row.getValue("seller_name")}
        </div>
      ),
    },
    {
      accessorKey: "seller_phone",
      header: t("sellRequests:phone_number"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {row.getValue("seller_phone")}
        </div>
      ),
    },
    {
      accessorKey: "price_negotiable",
      header: t("sellRequests:negotiate"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {row.getValue("price_negotiable")
            ? "قابل للتفاوض"
            : " غير قابل للتفاوض"}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <Button
            size={"icon"}
            variant={"outline"}
            className="size-10"
            onClick={() => handleOpenDeleteDialog(row.original.id)}
          >
            <HiOutlineTrash className="size-6" />
          </Button>

          <NavLink to={`/sell-request-details/${row.original.id}`}>
            <Button size={"icon"} variant={"outline"} className="size-10">
              <BsEye className="size-6" />
            </Button>
          </NavLink>

          <AlertDialog
            open={isDeleteDialogOpen && currentVehicleId === row.original.id}
            onOpenChange={(open) => {
              if (!open) {
                handleCloseDeleteDialog();
              }
            }}
          >
            <AlertDialogContent dir="ltr">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-right">
                  هل انت متأكد من حذفك لهذا الطلب؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-right">
                  لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك
                  نهائيًا وإزالة بياناتك من خوادمنا.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemoveProduct}>
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
