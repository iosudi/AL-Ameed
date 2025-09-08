import { NAMESPACES } from "@/translations/namespaces";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

interface DigitalSignatureProps {
  onSignatureConfirm: (signatureData: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  examination_image: string;
}

export default function DigitalSignature({
  onSignatureConfirm,
  onCancel,
  examination_image,
  isSubmitting,
}: DigitalSignatureProps) {
  const { t } = useTranslation(NAMESPACES.modals);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = examination_image; // 📝 Replace with your image path

    img.onload = () => {
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;

      // Set the canvas size to match the image dimensions
      canvas.width = imageWidth;
      canvas.height = imageHeight;

      // Optional: Make canvas visually smaller but maintain drawing scale
      canvas.style.width = `${imageWidth}px`;
      canvas.style.height = `${imageHeight}px`;

      // Draw the image
      ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

      setBackgroundImage(img);
    };
  }, []);

  const drawBackground = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !backgroundImage) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, rect.width, rect.height);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    const touch = e.touches[0];
    if (!rect) return;

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    const touch = e.touches[0];
    if (!rect) return;

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const clearSignature = () => {
    drawBackground();
    setHasSignature(false);
  };

  const confirmSignature = () => {
    if (!hasSignature) {
      toast.error(t("signature_required"));
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Compress as JPEG with 0.5 quality (adjust as needed)
    const signatureData = canvas.toDataURL("image/jpeg", 0.5);

    onSignatureConfirm(signatureData);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{t("digital_signature")}</h3>
        <p className="text-gray-400">{t("draw_signature")}</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
        <canvas
          ref={canvasRef}
          className="border border-gray-200 rounded cursor-crosshair bg-white"
          width={400}
          height={200}
          style={{ width: "400px", height: "200px" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawingTouch}
          onTouchMove={drawTouch}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex gap-4 w-full max-w-md">
        <Button
          variant="outline"
          onClick={clearSignature}
          className="flex-1"
          disabled={!hasSignature}
        >
          {t("clear_signature")}
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          {t("cancel_signature")}
        </Button>
        <Button
          variant="default"
          onClick={confirmSignature}
          className="flex-1 bg-[#B71616] hover:bg-[#A01414]"
        >
          {!isSubmitting ? (
            t("confirm_signature")
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );
}
