import vehicleService, { removeVehicle } from "@/api/vehicles/vehiclesService";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVehicles } from "@/hooks/useVehicles";
import { Vehicles } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiEditAlt } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

export const useProductColumns = ({
  params = {},
  offset = 0,
  limit = 0,
}): ColumnDef<Vehicles>[] => {
  const { t, i18n } = useTranslation([NAMESPACES.dataTable, NAMESPACES.common]);
  const vehicles = useVehicles(params, offset, limit);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [currentVehicleId, setCurrentVehicleId] = useState<number | null>(null);

  const handleOpenDeleteDialog = (id: number) => {
    setCurrentVehicleId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleOpenStatusDialog = (id: number, currentStatus: string) => {
    setCurrentVehicleId(id);
    setSelectedStatus(currentStatus);
    setIsStatusDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCurrentVehicleId(null);
    // Force remove pointer-events-none from body with a small delay
    setTimeout(() => {
      document.body.style.pointerEvents = "auto";
    }, 100);
  };

  const handleCloseStatusDialog = () => {
    setIsStatusDialogOpen(false);
    setCurrentVehicleId(null);
    setSelectedStatus("");
    // Force remove pointer-events-none from body with a small delay
    setTimeout(() => {
      document.body.style.pointerEvents = "auto";
    }, 100);
  };

  async function handleRemoveProduct() {
    if (!currentVehicleId) return;

    try {
      const res = await removeVehicle(currentVehicleId);
      vehicles.refetch();
      toast.success(t("common:success_delete"));
      console.log(res);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
      toast.error(t("common:error_delete") || "Failed to delete.");
      handleCloseDeleteDialog();
    }
  }

  async function handleChangeCarStatus() {
    if (!currentVehicleId || !selectedStatus) return;

    try {
      const res = await vehicleService.updateVehicleStatus(
        selectedStatus,
        currentVehicleId
      );
      console.log(res);
      vehicles.refetch();
      toast.success(
        t("common:success_update") || "Status updated successfully!"
      );
      handleCloseStatusDialog();
    } catch (error) {
      console.error(error);
      toast.error(t("common:error_update") || "Failed to update status.");
      handleCloseStatusDialog();
    }
  }

  return [
    {
      accessorKey: "primary_image",
      header: t("dataTable:images"),
      cell: ({ row }) => (
        <div className="capitalize w-fit mx-auto">
          <img
            className="sm:w-38 sm:h-38 min-w-32 h-32 rounded-2xl object-contain object-center"
            src={`${import.meta.env.VITE_API_BASE_URL}${row.getValue(
              "primary_image"
            )}`}
            alt="vehicle image"
          />
        </div>
      ),
    },
    {
      accessorKey: "price",
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
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        return (
          <div className="capitalize sm:text-xl text-base text-center">
            <Button
              variant="outline"
              onClick={() =>
                handleOpenStatusDialog(row.original.id, row.getValue("status"))
              }
            >
              {row.getValue("status")}
            </Button>

            {/* Status Change Dialog */}
            <Dialog
              open={isStatusDialogOpen && currentVehicleId === row.original.id}
              onOpenChange={(open) => {
                if (!open) {
                  handleCloseStatusDialog();
                }
              }}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-right">تغيير الحالة</DialogTitle>
                  <DialogDescription className="text-right">
                    تغيير حالة السيارة
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="rented">Rented</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleChangeCarStatus}>
                    تغيير
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">إلغاء</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
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
          <NavLink to={`/edit-product?id=${row.original.id}`}>
            <Button size={"icon"} variant={"outline"} className="size-10">
              <BiEditAlt className="size-6" />
            </Button>
          </NavLink>

          {/* Delete Confirmation Dialog */}
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
                  هل انت متأكد من حذفك لهذا المنتج؟
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
