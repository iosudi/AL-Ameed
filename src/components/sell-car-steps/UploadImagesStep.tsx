import { useFormikContext } from "formik";
import { Label } from "../ui/label";

export const UploadImagesStep = () => {
  const { setFieldValue } = useFormikContext<{ car_images: File[] }>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const filesArray = Array.from(event.currentTarget.files);
      setFieldValue("uploaded_images", filesArray);
    }
  };

  return (
    <div className="mb-6">
      <Label htmlFor="uploaded_images" className="block mb-2 text-base">
        ارفع صور السيارة (صور خارجية وداخلية)
      </Label>
      <input
        id="uploaded_images"
        name="uploaded_images"
        type="file"
        multiple
        accept="image/*"
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImagesStep;
