import CarRentsNotify from "@/components/Modals/CarRentsNotify";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RentalResults } from "@/interfaces/RentalRequest";
import { VehicleDetails } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { formatDate } from "@/utils/dateHelpers";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGear } from "react-icons/bs";

export const useProductColumns = (): ColumnDef<RentalResults>[] => {
  const { t, i18n } = useTranslation([
    NAMESPACES.dataTable,
    NAMESPACES.common,
    NAMESPACES.modals,
  ]);
  // Track which row's dialog is open by storing the row's unique identifier
  const [openDialogRowId, setOpenDialogRowId] = useState<string | null>(null);

  const handleOpenChange = (open: boolean, rowId?: string) => {
    if (open && rowId) {
      setOpenDialogRowId(rowId);
    } else {
      setOpenDialogRowId(null);
    }
  };

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
      accessorKey: "start_date",
      header: t("modals:start_date"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {formatDate(row.getValue("start_date"), i18n.language)}
        </div>
      ),
    },
    {
      accessorKey: "end_date",
      header: t("modals:end_date"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {formatDate(row.getValue("end_date"), i18n.language)}
        </div>
      ),
    },

    {
      accessorKey: "action",
      header: t("modals:rent_payment_date"),
      cell: ({ row }) => {
        // Create a unique identifier for this row
        const rowId =
          row.original.id.toString() ||
          `${row.original.vehicle.id}-${row.original.start_date}`;
        const isThisDialogOpen = openDialogRowId === rowId;

        return (
          <div className="flex items-center justify-center gap-3">
            <Button
              size={"icon"}
              variant={"outline"}
              className="size-10"
              onClick={() => handleOpenChange(true, rowId)}
            >
              <BsGear className="size-6" />
            </Button>
            <Dialog
              open={isThisDialogOpen}
              onOpenChange={(open) => handleOpenChange(open, rowId)}
            >
              <DialogContent className="sm:max-w-[725px] ">
                <CarRentsNotify installments={row.original.installments} />
              </DialogContent>
            </Dialog>

            {/* <Button size={"icon"} variant={"outline"} className="size-10">
              <BiEditAlt className="size-6" />
            </Button> */}
          </div>
        );
      },
    },
  ];
};
