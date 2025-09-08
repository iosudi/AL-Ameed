import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const CompareSheet = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={` fixed top-0 left-0 w-1 z-20 h-full border-r-3 border-red-600 bg-gradient-to-r from-[#000] to-transparent backdrop-blur-md  ${
        isMenuOpen && "max-w-[300px] w-fit sm:px-6 px-4 sm:py-24 py-16"
      }`}
    >
      <Button
        className="absolute md:top-1/2 bottom-5 md:-right-[5.25rem] -right-[3.4rem] -translate-y-1/2 -rotate-90 bg-red-600 hover:bg-red-600 md:px-8 px-4 md:py-6 py-2 md:text-base text-xs rounded-tl-none rounded-tr-none"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {t("compare_sheet.button")}
      </Button>

      <div className="flex flex-col justify-between h-full overflow-hidden">
        <ul>
          <h4 className="text-2xl mb-4"> {t("compare_sheet.title")}</h4>
          {[...Array(4)].map((_, index) => (
            <li className="flex items-center gap-4 mb-4" key={index}>
              <span className="sm:w-28 sm:h-28 w-20 h-20">
                <img
                  className="h-full w-full object-cover object-center rounded-xl"
                  src="https://i.pinimg.com/736x/0c/f3/cf/0cf3cfeb3d172f496cb4d930ce449c8d.jpg"
                  alt="image"
                />
              </span>
              <span>
                <h4 className="sm:text-xl mb-3">BHD 18,7000</h4>
                <h4 className="sm:text-xl ">Genesis G80 2024 (White) </h4>
              </span>
            </li>
          ))}
        </ul>

        <div className="actions flex items-center gap-4 mt-auto ">
          <Button className="bg-[#d40000] border border-[#d40000] hover:bg-transparent  rounded-full grow">
            مقارنة
          </Button>
          <Button className="border border-[#d40000] bg-transparent hover:bg-[#d40000] hover:text-white  rounded-full grow ">
            حذف الكل
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareSheet;
