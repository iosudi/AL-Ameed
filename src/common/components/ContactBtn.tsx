import { Button } from "@/components/ui/button";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { ImWhatsapp } from "react-icons/im";

export const ContactBtn = () => {
  const { t } = useTranslation(NAMESPACES.productDetails);
  return (
    <Button
      variant={"default"}
      size={"lg"}
      className="border border-white bg-[#202324] text-[#00D44E] lg:text-2xl md:text-xl py-6 w-full gap-6"
    >
      {t("carDetails.whatsapp")}
      <ImWhatsapp className="size-8" />
    </Button>
  );
};

export default ContactBtn;
