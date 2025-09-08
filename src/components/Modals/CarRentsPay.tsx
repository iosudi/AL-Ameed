import { Installment } from "@/interfaces/RentalRequest";
import { NAMESPACES } from "@/translations/namespaces";
import { formatDate } from "@/utils/dateHelpers";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { GiReceiveMoney } from "react-icons/gi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DigitalSignature from "./DigitalSignature";

interface CarRentsPayProps {
  examinationFormImage?: string; // URL or base64 of examination form image
  onSignatureSubmit?: (signatureData: string) => Promise<void>;
  installments: Installment[];
}

export default function CarRentsPay({
  examinationFormImage,
  onSignatureSubmit,
  installments,
}: CarRentsPayProps) {
  const { t, i18n } = useTranslation(NAMESPACES.modals);
  const [isSigningMode, setIsSigningMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignatureConfirm = async (signatureData: string) => {
    if (!onSignatureSubmit) {
      console.warn("No onSignatureSubmit handler provided");
      setIsSigningMode(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSignatureSubmit(signatureData);
      toast.success(t("signature_submitted"));
      setIsSigningMode(false);
    } catch (error) {
      console.error("Error submitting signature:", error);
      toast.error("Failed to submit signature");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignatureCancel = () => {
    setIsSigningMode(false);
  };

  // If in signing mode, show the digital signature component
  if (isSigningMode && examinationFormImage) {
    return (
      <DigitalSignature
        onSignatureConfirm={handleSignatureConfirm}
        examination_image={examinationFormImage}
        onCancel={handleSignatureCancel}
        isSubmitting={isSubmitting}
      />
    );
  }

  // Default view with payment table and examination form
  return (
    <div className="space-y-6">
      {/* Examination Form Image */}
      {examinationFormImage && (
        <div className="text-center">
          <img
            src={examinationFormImage}
            alt="Examination Form"
            className="max-w-full h-auto rounded-lg border border-gray-300"
          />
        </div>
      )}

      {/* Payment Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">{t("payment_date")}</TableHead>
            <TableHead className="text-center">{t("status")}</TableHead>
            <TableHead className="text-center">{t("payment_amount")}</TableHead>
            <TableHead className="text-center">{t("payment")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installments.map((installment: Installment) => (
            <TableRow>
              <TableCell className="text-center">
                {formatDate(installment.due_date, i18n.language)}
              </TableCell>

              <TableCell className="text-center">
                {installment.is_paid ? (
                  <Badge
                    variant={"outline"}
                    className="border-green-400 text-green-400"
                  >
                    {t("paid")}
                  </Badge>
                ) : (
                  <Badge
                    variant={"outline"}
                    className="border-red-400 text-red-400"
                  >
                    {t("not_paid")}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                BHD {installment.amount}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="justify-self-center"
                >
                  <GiReceiveMoney className="size-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Sign Form Button */}
      {examinationFormImage && onSignatureSubmit && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => setIsSigningMode(true)}
            disabled={isSubmitting}
            className="bg-[#B71616] hover:bg-[#A01414] text-white px-8 py-3 text-lg"
          >
            {t("sign_form")}
          </Button>
        </div>
      )}
    </div>
  );
}
