import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbCamera, TbFileUpload, TbX } from "react-icons/tb";

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

  // ✅ Manage files and previews separately for better control
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Initialize files from value prop
  useEffect(() => {
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      setSelectedFiles(files);
    } else {
      setSelectedFiles([]);
    }
  }, [value]);

  // Update previews when files change
  useEffect(() => {
    if (isImageUpload && selectedFiles.length > 0) {
      const objectUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviews(objectUrls);

      return () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviews([]);
    }
  }, [selectedFiles, isImageUpload]);

  // Move a specific image to the start of the array
  const setAsCover = (index: number) => {
    const updatedFiles = [
      selectedFiles[index], // cover photo goes first
      ...selectedFiles.filter((_, i) => i !== index),
    ];
    setSelectedFiles(updatedFiles);

    if (multiple) {
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      onChange(dataTransfer.files);
    } else {
      onChange(updatedFiles[0] || null);
    }
  };

  // Handle new file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    if (multiple) {
      // Add new files to existing ones
      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);

      // Create FileList-like object for onChange
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      onChange(dataTransfer.files);
    } else {
      // Single file mode
      const file = newFiles[0] || null;
      setSelectedFiles(file ? [file] : []);
      onChange(file);
    }

    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  // Remove specific file
  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(updatedFiles);

    if (multiple) {
      if (updatedFiles.length === 0) {
        onChange(null);
      } else {
        // Create FileList-like object
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach((file) => dataTransfer.items.add(file));
        onChange(dataTransfer.files);
      }
    } else {
      onChange(updatedFiles[0] || null);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-base">
        {label}
        {required && <span className="text-red-700">*</span>}
      </Label>

      {/* ✅ Create Product Mode → show images in boxes with delete option */}
      {isCreateProduct && isImageUpload && previews.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative w-32 h-32 rounded-lg border border-[#d40000] overflow-hidden flex items-center justify-center bg-gray-100"
            >
              <img
                src={src}
                alt={`preview-${index}`}
                className="w-full h-full object-cover"
              />

              {/* Delete button */}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <TbX className="w-4 h-4" />
              </button>

              {/* ✅ Cover button */}
              {multiple && index !== 0 && (
                <button
                  type="button"
                  onClick={() => setAsCover(index)}
                  className="absolute bottom-1 left-1 px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors"
                >
                  Set as Cover
                </button>
              )}

              {/* Optional indicator if it's the cover */}
              {index === 0 && (
                <span className="absolute bottom-1 left-1 px-2 py-1 text-xs bg-green-600 text-white rounded">
                  Cover
                </span>
              )}
            </div>
          ))}

          {/* Add more button for multiple files */}
          {multiple && (
            <div
              className="w-32 h-32 rounded-lg border-2 border-dashed border-[#d40000] flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => inputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-1">
                <TbCamera className="w-8 h-8 text-[#d40000]" />
              </div>
            </div>
          )}
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

      {/* ✅ Button to select files */}
      <Button
        type="button"
        className="px-2 py-1 h-auto"
        onClick={() => inputRef.current?.click()}
      >
        {multiple && selectedFiles.length > 0
          ? t("add_more_files") || "Add More Files"
          : t("choose_file")}
      </Button>

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
