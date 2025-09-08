import profileService from "@/api/profileService/profileService";
import ProductCard from "@/common/components/ProductCard";
import { Vehicles } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const Favorites = () => {
  const [products, setProducts] = useState<Vehicles[] | null>(null);
  const { t } = useTranslation(NAMESPACES.favorites);

  React.useEffect(() => {
    FetchFavoriteList();
  }, []);

  async function FetchFavoriteList() {
    const res = await profileService.GetFavorites();
    console.log(res);
    setProducts(res.data.vehicles); // Check if the response is right first
  }

  return (
    <>
      <section>
        <div className="container mx-auto px-2">
          <h1 className="md:text-6xl/relaxed text-4xl text-center md:mt-16 mt-8 mb-8">
            {t("title")}
          </h1>

          <div className="p-[2px] rounded-2xl bg-gradient-to-b from-[#999999EB] via-[#ADADAD75] to-[#99999900] ">
            <div className="rounded-2xl bg-linear-to-r from-[#17191A] to-[#1A1C1D] pt-16 pb-4 xl:px-28 lg:px-15 md:px-8 px-4">
              {products?.length ? (
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1  md:gap-8 gap-2">
                  {products?.map((product) => (
                    <ProductCard key={product.id} vehicle={product} />
                  ))}
                </div>
              ) : (
                <h2 className="text-3xl text-center">لا يوجد</h2>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorites;
