import { useVehicles } from "@/hooks/useVehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import ProductCard from "../../common/components/ProductCard";
import { Vehicles } from "../../interfaces/Vehicles";

export const CarsGallery = () => {
  const { t } = useTranslation(NAMESPACES.home);
  const { data } = useVehicles();
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicles[]>([]);
  const [activeFilter, setActiveFilter] = useState("new");

  // Filter function
  function filterVehicles(type: string): void {
    const vehicles = data?.data?.results.filter(
      (vehicle: Vehicles) => vehicle.type === type
    );

    if (vehicles) {
      setFilteredVehicles(vehicles);
      setActiveFilter(type);
    }
  }

  // Initialize with "new" cars once data is loaded
  useEffect(() => {
    if (data?.data?.results) {
      const newCars = data.data.results.filter(
        (vehicle: Vehicles) => vehicle.type === "new"
      );
      setFilteredVehicles(newCars);
    }
  }, [data]);

  return (
    <section className="my-8">
      <div className="container mx-auto px-2">
        <div>
          <h2 className="text-center md:text-4xl text-2xl">
            {t("cars_gallery.heading")}
          </h2>

          <ul className="flex items-center justify-center gap-4 my-8">
            <li
              className={`cursor-pointer ${
                activeFilter == "new" && "active-link"
              }`}
              onClick={() => filterVehicles("new")}
            >
              {t("cars_gallery.new_cars")}
            </li>
            <li
              className={`cursor-pointer ${
                activeFilter == "used" && "active-link"
              }`}
              onClick={() => filterVehicles("used")}
            >
              {t("cars_gallery.used_cars")}
            </li>
          </ul>

          <div className="grid lg:grid-cols-3 grid-cols-2 md:gap-8 gap-4">
            {filteredVehicles.slice(0, 15).map((vehicle) => (
              <NavLink to={`/product-details?id=${vehicle.id}`}>
                <ProductCard key={vehicle.id} vehicle={vehicle} />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarsGallery;
