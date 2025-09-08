import rentService from "@/api/rentService/rentService";
import { NAMESPACES } from "@/translations/namespaces";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import DigitalSignature from "./DigitalSignature";

interface SignExaminationFormProps {
  requestId: string;
  examination_image: string;
  onClose?: () => void;
}

export default function SignExaminationForm({
  requestId,
  examination_image,
  onClose,
}: SignExaminationFormProps) {
  const { t } = useTranslation(NAMESPACES.modals);
  const [isSigningMode, setIsSigningMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignatureConfirm = async (signatureData: string) => {
    setIsSubmitting(true);

    try {
      // Convert base64 to blob
      const response = await fetch(signatureData);
      const blob = await response.blob();

      // Create FormData and append signature as file
      const formData = new FormData();
      formData.append("inspection_form", blob, "signature.png");

      // Submit to backend
      const res = await rentService.updateInspectionForm(formData, requestId);

      if (res) {
        toast.success(t("signature_submitted"));
        setIsSigningMode(false);
        onClose?.(); // Close the modal if callback provided
        window.location.reload();
      }
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
  if (isSigningMode) {
    return (
      <DigitalSignature
        onSignatureConfirm={handleSignatureConfirm}
        onCancel={handleSignatureCancel}
        examination_image={examination_image}
        isSubmitting={isSubmitting}
      />
    );
  }

  // Default view with examination form image and sign button
  return (
    <div className="space-y-4 flex flex-col justify-center items-center">
      {/* Examination Form Image */}
      {examination_image ? (
        <img
          className="h-60 w-auto rounded-lg border border-gray-300"
          src={examination_image}
          alt="Examination Form"
        />
      ) : (
        <span className="mb-4">{t("empty")}</span>
      )}

      {/* Sign Form Button */}
      <Button
        variant={"destructive"}
        size={"lg"}
        onClick={() => setIsSigningMode(true)}
        disabled={isSubmitting}
        className="bg-[#B71616] hover:bg-[#A01414]"
      >
        {t("sign_form")}
      </Button>
    </div>
  );
}
