import { RentCarForm } from "@/interfaces/RentCarForm";
import { cn } from "@/lib/utils";
import { NAMESPACES } from "@/translations/namespaces";
import { format } from "date-fns";
import { ErrorMessage, useFormikContext } from "formik";
import { CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const RentalDuration = () => {
  const { t } = useTranslation(NAMESPACES.carRent);
  const { values, setFieldValue } = useFormikContext<RentCarForm>();

  return (
    <div className="grid grid-cols-2 sm:gap-16 gap-4 mb-4">
      <div>
        <Label className="mb-2" htmlFor="fromDate">
          {t("carForm.from")}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !values.start_date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {values.start_date ? (
                format(new Date(values.start_date), "PPP")
              ) : (
                <span>{t("carForm.pickDate")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={
                values.start_date ? new Date(values.start_date) : undefined
              }
              onSelect={(date) =>
                setFieldValue(
                  "start_date",
                  date ? format(date, "yyyy-MM-dd") : ""
                )
              }
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </PopoverContent>
        </Popover>
        <ErrorMessage
          name="start_date"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <Label className="mb-2" htmlFor="toDate">
          {t("carForm.to")}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !values.end_date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {values.end_date ? (
                format(new Date(values.end_date), "PPP")
              ) : (
                <span>{t("carForm.pickDate")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={values.end_date ? new Date(values.end_date) : undefined}
              onSelect={(date) =>
                setFieldValue(
                  "end_date",
                  date ? format(date, "yyyy-MM-dd") : ""
                )
              }
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (date < today) return true;
                if (values.start_date) {
                  return date <= new Date(values.start_date);
                }
                return false;
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <ErrorMessage
          name="end_date"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
};

export default RentalDuration;
