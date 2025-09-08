import rentService from "@/api/rentService/rentService";
import UploadExaminationForm from "@/components/Modals/UploadExaminationForm";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  CustomerData,
  RentalRequest,
  RentalResults,
} from "@/interfaces/RentalRequest";
import { VehicleDetails } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsEye } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi2";
import { RiFileEditLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

interface UseProductColumnsProps {
  setRentalRequests: React.Dispatch<React.SetStateAction<RentalRequest>>;
}

export const useProductColumns = ({
  setRentalRequests,
}: UseProductColumnsProps): ColumnDef<RentalResults>[] => {
  const { t, i18n } = useTranslation([
    NAMESPACES.dataTable,
    NAMESPACES.common,
    NAMESPACES.rentRequests,
  ]);
  // Track which row's dialog is open by storing the row's unique identifier
  const [openDialogRowId, setOpenDialogRowId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentVehicleId, setCurrentVehicleId] = useState<number | null>(null);

  const handleOpenChange = (open: boolean, rowId?: string) => {
    if (open && rowId) {
      setOpenDialogRowId(rowId);
    } else {
      setOpenDialogRowId(null);
    }
  };

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
      const res = await rentService.removeRentRequest(currentVehicleId);

      // Update the local state to remove the deleted item
      setRentalRequests((prev) => ({
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
      accessorKey: "vehicle", // Access the whole vehicle object
      header: t("dataTable:images"),
      cell: ({ row }) => {
        const vehicle: VehicleDetails = row.getValue("vehicle");
        const imageUrl = vehicle?.images?.[0]?.image || "/placeholder.png"; // fallback if no image

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
          <h5>{`${row.original.vehicle.brand_details.name} ${row.original.vehicle.model} / ${row.original.vehicle.year} (${row.original.vehicle.color})`}</h5>
          <span className="block font-bold">
            {row.original.vehicle.currency}{" "}
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
            }).format(row.original.vehicle.price)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "customer_data",
      header: t("rentRequests:tenant"),
      cell: ({ row }) => {
        const customer: CustomerData = row.getValue("customer_data");
        const name = customer?.first_name
          ? `${customer?.first_name} ${customer?.middle_name} ${customer?.last_name}`
          : "";

        return (
          <div className="capitalize sm:text-xl text-base text-center">
            {name}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "status",
    //   header: t("status"),
    //   cell: ({ row }) => (
    //     <div className="capitalize sm:text-xl text-base text-center">
    //       {row.getValue("status")}
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
      cell: ({ row }) => {
        // Create a unique identifier for this row using the row's ID
        const rowId = row.original.id.toString();
        const isThisDialogOpen = openDialogRowId === rowId;

        return (
          <div className="flex items-center justify-center gap-3">
            <Button
              size={"icon"}
              variant={"outline"}
              className="size-10"
              onClick={() => handleOpenChange(true, rowId)}
            >
              <RiFileEditLine className="size-6" />
            </Button>

            {/* {row.original.inspection_form && (
              <a
                href={row.original.inspection_form}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size={"icon"} variant={"outline"} className="size-10">
                  <BsEye className="size-6" />
                </Button>
              </a>
            )} */}

            <NavLink to={`/rent-request-details/${row.original.id}`}>
              <Button size={"icon"} variant={"outline"} className="size-10">
                <BsEye className="size-6" />
              </Button>
            </NavLink>

            <Button
              size={"icon"}
              variant={"outline"}
              className="size-10"
              onClick={() => handleOpenDeleteDialog(row.original.id)}
            >
              <HiOutlineTrash className="size-6" />
            </Button>

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

            <Dialog
              open={isThisDialogOpen}
              onOpenChange={(open) => handleOpenChange(open, rowId)}
            >
              <DialogContent className="sm:max-w-[725px]">
                <UploadExaminationForm requestId={rowId} />
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];
};
