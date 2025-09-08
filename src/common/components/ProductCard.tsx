import profileService from "@/api/profileService/profileService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vehicles } from "@/interfaces/Vehicles";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CiHeart } from "react-icons/ci";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  showControls?: boolean;
  vehicle: Vehicles;
}

export const ProductCard = ({
  showControls = false,
  vehicle,
}: ProductCardProps) => {
  const { t, i18n } = useTranslation();

  async function AddToFavorites(vehichle_id: number) {
    const res = await profileService.AddToFavorite(vehichle_id);
    if (res.data.status == "success") toast.success(res.data.message);
  }

  async function AddToCompare(vehichle_id: number) {
    const res = await profileService.AddToCompare(vehichle_id);
    if (res.data.status == "success") toast.success(res.data.message);
  }

  return (
    <div className="md:p-4 p-2 rounded-2xl bg-[#202324]">
      <div className="preview relative md:h-56 h-36 mb-4">
        {showControls && (
          <>
            {vehicle.type === "new" && (
              <Badge
                variant={"default"}
                className="bg-[#d80000] absolute top-3 left-3"
              >
                جديد
              </Badge>
            )}
            {vehicle.type === "used" && (
              <Badge
                variant={"default"}
                className="bg-[#d80000] absolute top-3 left-3"
              >
                مستعمل
              </Badge>
            )}
          </>
        )}

        {vehicle.status != "available" && (
          <Badge
            variant={"default"}
            className="bg-[#d80000] absolute top-3 right-3"
          >
            {vehicle.status}
          </Badge>
        )}

        <img
          className="h-full w-full object-cover object-center rounded-xl"
          src={`${import.meta.env.VITE_API_BASE_URL}${vehicle.primary_image}`}
          alt="image"
        />

        {showControls && (
          <div className="absolute bottom-0 left-0 w-full flex items-center justify-end gap-3 sm:px-4 px-1 py-2">
            <Button
              variant={"outline"}
              className="border-[#d80000] bg-transparent rounded-full sm:text-base text-xs px-2 py-1 h-auto "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                AddToCompare(vehicle.id);
              }}
            >
              {t("compare_btn")}
              <FaScaleUnbalanced className="sm:size-5 size-4  " />
            </Button>

            <Button
              variant={"outline"}
              size={"icon"}
              className="border-[#d80000] bg-transparent rounded-full size-7"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                AddToFavorites(vehicle.id);
              }}
            >
              <CiHeart className="sm:size-6 size-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="card-body">
        <h5 className="border-b border-[#FFFFFF1F] pb-4 text-center sm:text-lg text-xs">
          {`${vehicle.brand_name} ${vehicle.model} ${vehicle.year}`}
        </h5>

        <ul className="flex flex-wrap items-center justify-around gap-2 my-4 border-b border-[#FFFFFF1F] pb-4 ">
          <li>
            <img
              className="mx-auto block md:h-8 h-5 "
              src="/Home/speed_counter.svg"
              alt="icon"
            />
            <p className="text-center md:text-base text-xs">
              {vehicle.mileage}
            </p>
          </li>
          <li>
            <img
              className="mx-auto block md:h-8 h-5 "
              src="/Home/bump.svg"
              alt="icon"
            />
            <p className="text-center md:text-base text-xs">
              {vehicle.engine_type}
            </p>
          </li>
          <li>
            <img
              className="mx-auto block md:h-8 h-5 "
              src="/Home/car_type.svg"
              alt="icon"
            />
            <p className="text-center md:text-base text-xs">
              {vehicle.transmission}
            </p>
          </li>
        </ul>

        <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-2">
          <Badge
            variant="secondary"
            className="sm:text-lg text-base text-white bg-[#242728] rounded md:w-fit w-full"
          >
            {vehicle.currency}{" "}
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
            }).format(vehicle.current_price)}
          </Badge>

          <NavLink to={`/product-details?id=${vehicle.id}`}>
            <Button
              variant={"ghost"}
              className="sm:text-md text-xs text-[#D40000] cursor-pointer p-0"
            >
              {t("offer_details")}
              {i18n.language == "ar" ? (
                <IoIosArrowBack />
              ) : (
                <IoIosArrowForward />
              )}
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
