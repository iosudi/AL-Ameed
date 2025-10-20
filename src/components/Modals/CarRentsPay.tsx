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
import axiosInstance from "@/api/axiosInstance";
interface CarRentsPayProps {
  examinationFormImage?: string;
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

  // 🧾 Handle payment button click
  const handlePaymentClick = async (installmentId: number) => {
    try {
      toast.loading("Getting payment link...");
      const response = await axiosInstance.post('/wallets/payment/create/');
      console.log("Payment response:", response);

      if (response.status != 200) {
        throw new Error("Failed to get payment link");
      }

      const data = await response.data;
      console.log("Payment data:", data.value);

      if (data.payment_url) {
        toast.dismiss();
        toast.success("Redirecting to payment...");
        window.location.href = data.payment_url; // Redirect user
      } else {
        toast.error("No payment link received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.dismiss();
      toast.error("Unable to get payment link");
    }
  };

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

  return (
    <div className="space-y-6">
      {examinationFormImage && (
        <div className="text-center">
          <img
            src={examinationFormImage}
            alt="Examination Form"
            className="max-w-full h-auto rounded-lg border border-gray-300"
          />
        </div>
      )}

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
            <TableRow key={installment.id}>
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
                  onClick={() => handlePaymentClick(installment.id)}
                  disabled={installment.is_paid}
                >
                  <GiReceiveMoney className="size-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
