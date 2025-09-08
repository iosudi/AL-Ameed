import { Button } from "@/components/ui/button";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { BiSolidPhoneCall } from "react-icons/bi";

export const CallBtn = () => {
  const { t } = useTranslation(NAMESPACES.productDetails);
  return (
    <Button
      variant={"default"}
      size={"lg"}
      className="border  border-white bg-[#202324] text-[#DE0101] hover:text-white lg:text-2xl md:text-xl py-6 w-full gap-6 mb-4"
    >
      {t("carDetails.callNow")}
      <BiSolidPhoneCall className="size-8" />
    </Button>
  );
};

export default CallBtn;
