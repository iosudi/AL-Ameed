import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TbCamera, TbFileUpload } from "react-icons/tb";

type FileUploadProps = {
  label: string;
  multiple?: boolean;
  required?: boolean;
  accept?: string; // New prop for file type filtering
  // capture?: boolean | "user" | "environment"; // New prop for camera capture
  onChange: (files: File | FileList | null) => void;
  value?: File | File[] | null;
};

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  multiple = false,
  required = false,
  accept,
  // capture,
  onChange,
  value,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

  // Determine if this is likely an image upload based on accept prop
  const isImageUpload = accept?.includes("image");

  return (
    <div className="space-y-2">
      <Label className="mb-3 text-base">
        {label}
        {required && <span className="text-red-700">*</span>}
      </Label>
      <div
        className="w-50 h-40 flex items-center justify-center p-5 rounded-lg border border-[#d40000] cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <div className="text-white text-center overflow-hidden">
            {Array.isArray(value) ? (
              // Show count when multiple files are selected
              <p>
                {value.length} {t("files_selected")}
              </p>
            ) : (
              // Show single file name
              <p>{value.name}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {isImageUpload ? (
              <TbCamera className="size-17 text-white" />
            ) : (
              <TbFileUpload className="size-17 text-white" />
            )}
            {isImageUpload && (
              <p className="text-white text-sm text-center">
                {t("tap_to_take_photo_or_select")}
              </p>
            )}
          </div>
        )}
      </div>
      <Button
        type="button"
        className="mt-1 px-2 py-0.5 h-auto"
        onClick={() => inputRef.current?.click()}
      >
        {isImageUpload ? t("take_photo_or_choose") : t("choose_file")}
      </Button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={accept}
        // capture={capture}
        multiple={multiple}
        onChange={(e) => {
          const files = e.target.files;
          if (multiple) {
            onChange(files);
          } else {
            onChange(files?.[0] ?? null);
          }
        }}
      />
    </div>
  );
};

export default FileUpload;
