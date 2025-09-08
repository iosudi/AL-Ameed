import rentService from "@/api/rentService/rentService";
import { NAMESPACES } from "@/translations/namespaces";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function StaffCarsRent({ carId }: { carId: number }) {
  const { t } = useTranslation(NAMESPACES.staffCars);
  const [openFromDate, setOpenFromDate] = React.useState(false);
  const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined);
  const [opentoDate, setOpenToDate] = React.useState(false);
  const [toDate, setToDate] = React.useState<Date | undefined>(undefined);

  async function handleSubmit() {
    const res = await rentService.createStaffCarRentRequest({
      start_date: fromDate?.toISOString().slice(0, 10),
      end_date: toDate?.toISOString().slice(0, 10),
      vehicle: carId,
    });
    console.log(res);
  }

  return (
    <>
      <div className="grid grid-cols-2  gap-8 relative z-50 ">
        <div>
          <Label htmlFor="date" className="px-1 mb-3">
            {t("reservation_date")}
          </Label>
          <Popover open={openFromDate} onOpenChange={setOpenFromDate}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="from_date"
                className="w-full justify-between font-normal"
              >
                {fromDate ? fromDate.toLocaleDateString() : t("select_date")}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0 pointer-events-auto"
              align="start"
            >
              <Calendar
                mode="single"
                selected={fromDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setFromDate(date);
                  setOpenFromDate(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="date" className="px-1 mb-3">
            {t("return_date")}
          </Label>
          <Popover open={opentoDate} onOpenChange={setOpenToDate}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal"
              >
                {toDate ? toDate.toLocaleDateString() : t("select_date")}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0 pointer-events-auto"
              align="start"
            >
              <Calendar
                mode="single"
                selected={toDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setToDate(date);
                  setOpenToDate(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button variant={"default"} onClick={handleSubmit}>
        {t("book")}
      </Button>
    </>
  );
}
