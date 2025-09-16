import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbCamera, TbFileUpload } from "react-icons/tb";

type FileUploadProps = {
  label: string;
  multiple?: boolean;
  required?: boolean;
  accept?: string;
  onChange: (files: File | FileList | null) => void;
  value?: File | File[] | null;
  isCreateProduct?: boolean;
};

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  multiple = false,
  required = false,
  accept,
  onChange,
  value,
  isCreateProduct = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

  const isImageUpload = accept?.includes("image");

  // ✅ Manage previews
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (isImageUpload && value) {
      const files = Array.isArray(value) ? value : [value];
      const objectUrls = files.map((file) => URL.createObjectURL(file));
      setPreviews(objectUrls);

      return () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviews([]);
    }
  }, [value, isImageUpload]);

  return (
    <div className="space-y-3">
      <Label className="text-base">
        {label}
        {required && <span className="text-red-700">*</span>}
      </Label>

      {/* ✅ Create Product Mode → show images in boxes */}
      {isCreateProduct && isImageUpload && previews.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {previews.map((src, index) => (
            <div
              key={index}
              className="w-32 h-32 rounded-lg border border-[#d40000] overflow-hidden flex items-center justify-center bg-gray-100"
            >
              <img
                src={src}
                alt={`preview-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        /* Default box if no image selected */
        <div
          className="w-50 h-40 flex items-center justify-center p-5 rounded-lg border border-[#d40000] cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            {isImageUpload ? (
              <TbCamera className="size-17 text-white" />
            ) : (
              <TbFileUpload className="size-17 text-white" />
            )}
            {isImageUpload && (
              <p className="text-white text-sm text-center">
                {t("choose_file")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ✅ Button to re-open file input */}
      <Button
        type="button"
        className="px-2 py-1 h-auto"
        onClick={() => inputRef.current?.click()}
      >
        {t("choose_file")}
      </Button>

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={accept}
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
