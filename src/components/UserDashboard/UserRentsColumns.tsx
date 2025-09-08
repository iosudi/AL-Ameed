import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RentalResults } from "@/interfaces/RentalRequest";
import { VehicleDetails } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsBoxArrowUpRight, BsCalendarPlus, BsEye } from "react-icons/bs";
import CarRentsPay from "../Modals/CarRentsPay";
import ExtendRentalModal from "../Modals/ExtendRentalModal";
import SignExaminationForm from "../Modals/SignExaminationForm";

export const useProductColumns = (): ColumnDef<RentalResults>[] => {
  const { t, i18n } = useTranslation([
    NAMESPACES.dataTable,
    NAMESPACES.common,
    NAMESPACES.modals,
  ]);

  const [activeExtendId, setActiveExtendId] = useState<string | null>(null);
  const [activeExaminationId, setActiveExaminationId] = useState<string | null>(
    null
  );
  const [activePaymentId, setActivePaymentId] = useState<string | null>(null);

  return [
    {
      accessorKey: "vehicle",
      header: t("dataTable:images"),
      cell: ({ row }) => {
        const vehicle: VehicleDetails = row.getValue("vehicle");
        const imageUrl = vehicle?.images?.[0]?.image || "/placeholder.png";

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
        <div className={i18n.language === "ar" ? "text-right" : "text-left"}>
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
      accessorKey: "condition",
      header: t("modals:examination_form"),
      cell: ({ row }) => {
        const requestId = row.original.id.toString();
        const examinationImage = row.original.inspection_form;

        return (
          <div className="capitalize sm:text-xl text-base text-center">
            <Button
              size={"icon"}
              variant={"outline"}
              className="size-10"
              onClick={() => setActiveExaminationId(requestId)}
            >
              <BsEye className="size-6" />
            </Button>

            {activeExaminationId === requestId && (
              <Dialog
                open={true}
                onOpenChange={() => setActiveExaminationId(null)}
              >
                <DialogContent className="sm:max-w-[725px] sm:max-h-[400px] overflow-y-auto">
                  <SignExaminationForm
                    requestId={requestId}
                    examination_image={examinationImage}
                    onClose={() => setActiveExaminationId(null)}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => {
        const requestId = row.original.id.toString();
        console.log(requestId);

        return (
          <div className="flex items-center justify-center gap-3">
            {/* Payment button */}
            <Button
              size={"icon"}
              variant={"ghost"}
              className="size-10"
              onClick={() => setActivePaymentId(requestId)}
            >
              <BsBoxArrowUpRight className="size-6" />
            </Button>

            {activePaymentId === requestId && (
              <Dialog open={true} onOpenChange={() => setActivePaymentId(null)}>
                <DialogContent className="sm:max-w-[725px]">
                  <CarRentsPay installments={row.original.installments} />
                </DialogContent>
              </Dialog>
            )}

            {/* Extend rental button */}
            <Button
              size={"icon"}
              variant={"ghost"}
              className="size-10"
              onClick={() => setActiveExtendId(requestId)}
            >
              <BsCalendarPlus className="size-6" />
            </Button>

            {activeExtendId === requestId && (
              <ExtendRentalModal
                rentalId={requestId}
                open={true}
                onClose={() => setActiveExtendId(null)}
              />
            )}
          </div>
        );
      },
    },
  ];
};
