// src/components/Modals/ExtendRentalModal.tsx
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NAMESPACES } from "@/translations/namespaces";
import axios from "axios";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface ExtendRentalModalProps {
  rentalId: string;
  open: boolean;
  onClose: () => void;
}

export default function ExtendRentalModal({
  rentalId,
  open,
  onClose,
}: ExtendRentalModalProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(NAMESPACES.modals);

  const handleExtend = async () => {
    if (!date) return;
    try {
      setLoading(true);
      await axiosInstance.post(`/rentals/rentals/${rentalId}/extend/`, {
        end_date: format(date, "yyyy-MM-dd"),
      });
      onClose();
    } catch (error) {
      console.error("Failed to extend rental:", error);
      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.detail || "Failed to extend rental");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("extend_rental")}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button onClick={handleExtend} disabled={!date || loading}>
            {loading ? <Loader2 className="animate-spin" /> : t("extend")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
