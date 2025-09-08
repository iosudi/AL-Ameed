import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { IoMdClose } from "react-icons/io";

interface DaySelectorProps {
  id: number;
  value: string | number;
  date: Date | null;
  calendarValue: string;
  open: boolean;
  onValueChange: (id: number, newValue: string) => void;
  onCalendarChange: (id: number, selectedDate: Date | undefined) => void;
  onOpenChange: (id: number, isOpen: boolean) => void;
  onRemove: (id: number) => void;
}

const DaySelector: FC<DaySelectorProps> = ({
  id,
  value,
  date,
  calendarValue,
  open,
  onValueChange,
  onCalendarChange,
  onOpenChange,
  onRemove,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-18 h-18 text-2xl flex items-center justify-center bg-red-600 rounded-xl relative">
        <span className="font-bold ">{id}</span>

        <IoMdClose
          className="absolute top-1 right-1 z-20 cursor-pointer"
          size={18}
          onClick={() => onRemove(id)}
        />
      </div>

      <Input
        type="number"
        value={value}
        onChange={(e) => onValueChange(id, e.target.value)}
        className="w-24 py-1 h-7 !text-xs"
        min={0}
      />

      <div className="relative flex items-center gap-2 w-24 !text-xs">
        <Input
          value={calendarValue}
          placeholder="June 01, 2025"
          className="bg-background pr-10 h-7"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              onOpenChange(id, true);
            }
          }}
          readOnly
        />

        <Popover
          open={open}
          onOpenChange={(isOpen) => onOpenChange(id, isOpen)}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            alignOffset={-8}
            sideOffset={10}
            className="p-0"
          >
            <Calendar
              mode="single"
              selected={date ?? undefined}
              onSelect={(selectedDate) => onCalendarChange(id, selectedDate)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DaySelector;
