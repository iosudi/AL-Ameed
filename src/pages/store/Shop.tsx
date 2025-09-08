import Pagination from "@/common/components/Pagination";
import ProductCard from "@/common/components/ProductCard";
import FilterBox from "@/components/Shop/FilterBox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVehicles } from "@/hooks/useVehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsSortDown } from "react-icons/bs";
import { PiSlidersHorizontalThin } from "react-icons/pi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Vehicles } from "../../interfaces/Vehicles";

interface CarParams {
  type?: string;
  brand?: string;
  year?: string;
  body_type?: string;
  engine_type?: string;
  transmission?: string;
  is_featured?: string;
}

export const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(NAMESPACES.shop);
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1", 10) - 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const offset = currentPage * 20;

  const params = {
    type: searchParams.get("type") || "",
    brand: searchParams.get("brand") || "",
    year: searchParams.get("year") || "",
    body_type: searchParams.get("body_type") || "",
    engine_type: searchParams.get("engine_type") || "",
    transmission: searchParams.get("transmission") || "",
    is_featured: searchParams.get("is_featured") || "",
  };

  const getConditionKey = (params: CarParams) => {
    if (params.type === "new") return "carsTitle.new";
    if (params.type === "used") return "carsTitle.used";
    if (params.type === "rent") return "carsTitle.rent";
    if (params.type === "rent_to_own") return "carsTitle.rent_to_own";
    return "carsTitle.all";
  };

  const conditionKey = getConditionKey(params);

  const condition = t(conditionKey);

  const { data } = useVehicles(params, offset);
  const [sortedResults, setSortedResults] = useState<Vehicles[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", (currentPage + 1).toString()); // 1-based for user
    navigate(`/shop?${params.toString()}`);
  }, [currentPage]);

  useEffect(() => {
    if (data?.data?.results) {
      setSortedResults(data.data.results);
    }
  }, [data]);

  const handleSort = (type: string) => {
    const sorted = [...sortedResults].sort((a, b) => {
      switch (type) {
        case "highest":
          return b.price - a.price;
        case "lowest":
          return a.price - b.price;
        // case "newest":
        //   return (
        //     new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        //   );
        // case "oldest":
        //   return (
        //     new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        //   );
        default:
          return 0;
      }
    });

    setSortedResults(sorted);
  };

  return (
    <section>
      <div className="container mx-auto px-2 pb-4">
        <h1 className="md:text-6xl/relaxed text-3xl text-center md:mt-16 mt-8 mb-8">
          {params.type === "new"
            ? t("cars.new")
            : params.type === "used"
            ? t("cars.used")
            : params.type === "rent"
            ? t("cars.rent")
            : params.type === "rent_to_own"
            ? t("cars.rent_to_own")
            : t("cars.all")}
        </h1>

        {params.type == "rent" && (
          <h4 className="py-7 px-4 rounded-lg bg-red-200/10 border border-red-500 mb-6">
            {t("note")}
          </h4>
        )}

        <div className="grid lg:grid-cols-4 gap-4 ">
          <div className="lg:block hidden  h-fit p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
            <FilterBox />
          </div>

          <div className="col-span-3 ">
            <div className="header flex items-center justify-between mb-4">
              <h4 className="text-xl">
                {t("carsTitle.summary", {
                  type: condition || t("carsTitle.all"),
                  count: data?.data?.count || 0,
                })}
              </h4>

              <Select
                onValueChange={(value) => handleSort(value)}
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
              >
                <SelectTrigger className="w-fit md:min-w-[12rem] min-w-[8rem] shadow-none bg-[#1A1C1D] border border-[#d80000] py-6 cursor-pointer rounded-xl md:flex hidden ">
                  <div className=" flex gap-1 items-center text-white">
                    <BsSortDown className="size-6 text-white" />
                    <SelectValue placeholder={t("sort_placeholder")} />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#1a1c1d] text-white rounded-xl border-neutral-800">
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem className="cursor-pointer" value="highest">
                      {t("shop:highest_price")}
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="lowest">
                      {t("shop:lowest_price")}
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="newest">
                      {t("shop:latest")}
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="oldest">
                      {t("shop:oldest")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-2 my-4 md:hidden">
              <Button className="flex items-center gap-2 grow py-5 bg-[#1A1C1D] border border-[#d80000] rounded-xl ">
                <PiSlidersHorizontalThin className="size-5 text-white" />
                {t("shop:filter")}
              </Button>

              <Select
                onValueChange={(value) => handleSort(value)}
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
              >
                <SelectTrigger className="w-fit md:min-w-[12rem] min-w-[8rem] shadow-none bg-[#1A1C1D] border border-[#d80000] py-5 cursor-pointer rounded-xl grow ">
                  <div className=" flex gap-1 items-center text-white">
                    <BsSortDown className="size-6 text-white" />
                    <SelectValue placeholder="رتب" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#1a1c1d] text-white rounded-xl border-neutral-800">
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem className="cursor-pointer" value="highest">
                      أعلى سعر
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="lowest">
                      أقل سعر
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="newest">
                      الأحدث
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="oldest">
                      الأقدم
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
              {sortedResults.map((vehicle: Vehicles) => (
                <NavLink to={`/product-details?id=${vehicle.id}`}>
                  <ProductCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    showControls={true}
                  />
                </NavLink>
              ))}
            </div>

            <div dir="ltr">
              <Pagination
                pageCount={Math.ceil(data?.data.count / 20) || 0}
                currentPage={currentPage}
                onPageChange={(selected) => {
                  setCurrentPage(selected);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
