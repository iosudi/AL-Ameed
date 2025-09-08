import { filterOptions } from "@/data/FilterOptions";
import { useCarBrands } from "@/hooks/useBrands";
import { useFilters } from "@/hooks/useFilters";
import { Brands } from "@/interfaces/Brands";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

export interface SelectedFilters {
  [key: string]: string | string[];
}

export const FilterBox = () => {
  const { t } = useTranslation(NAMESPACES.shop);
  const { data, isLoading } = useCarBrands();
  const {
    selectedFilters,
    handleInputChange,
    handleCheckboxChange,
    clearFilter,
  } = useFilters();

  return (
    <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] p-6">
      <div className="header flex items-center justify-between gap-4 pb-2  border-b border-[#FFFFFF1F]">
        <p>{t("filter")}</p>
        <Button variant={"ghost"} onClick={clearFilter}>
          {t("reset")}
        </Button>
      </div>

      {/* <ul className=" py-4  border-b border-[#FFFFFF1F] flex flex-wrap gap-3">
        <li>
          <Badge
            variant={"outline"}
            className="border-[#d80000] text-md rounded-full"
          >
            مستعملة
            <HiMiniXMark className="!size-5 cursor-pointer !pointer-events-auto" />
          </Badge>
        </li>
      </ul> */}

      <Accordion type="multiple" className="w-full">
        {filterOptions.map((filter) => (
          <AccordionItem
            className="border-[#FFFFFF1F]"
            value={filter.id}
            key={filter.id}
          >
            <AccordionTrigger className="hover:no-underline cursor-pointer text-lg">
              {filter.name}
            </AccordionTrigger>

            {/* Render based on type */}
            <AccordionContent className="flex flex-col gap-2">
              {filter.type === "checkbox" &&
                filter.options?.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      className="cursor-pointer"
                      id={option.id}
                      checked={
                        Array.isArray(selectedFilters[filter.id]) &&
                        selectedFilters[filter.id].includes(option.id)
                      }
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(filter.id, option.id, checked)
                      }
                    />
                    <label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}

              {filter.type === "text" && (
                <Input
                  type="text"
                  placeholder={`Enter ${filter.name}`}
                  className="border-[#d40000] rounded p-2 text-white"
                  value={selectedFilters[filter.id] || ""}
                  onChange={(e) => handleInputChange(filter.id, e.target.value)}
                />
              )}

              {filter.type === "api" && (
                <div>
                  {isLoading ? (
                    <p className="text-sm text-gray-400">Loading brands...</p>
                  ) : (
                    data?.data?.results?.map((brand: Brands) => (
                      <div
                        key={brand.id}
                        className="flex items-center gap-2 mb-1.5"
                      >
                        <Checkbox
                          className="cursor-pointer"
                          id={brand.id.toString()}
                          checked={
                            Array.isArray(selectedFilters["brand"]) &&
                            selectedFilters["brand"].includes(
                              brand.id.toString()
                            )
                          }
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "brand",
                              brand.id.toString(),
                              checked
                            )
                          }
                        />

                        <label
                          htmlFor={brand.id.toString()}
                          className="cursor-pointer"
                        >
                          {brand.name}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
export default FilterBox;
