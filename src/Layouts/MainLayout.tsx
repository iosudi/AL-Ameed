// src/common/layouts/MainLayout.tsx
import Footer from "@/common/components/Footer";
import Navbar from "@/common/components/Navbar";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="relative">
      <Navbar />

      <div className="fixed top-1/2 left-4 -translate-y-1/2 flex flex-col gap-4 z-40">
        <NavLink to={"/compare-products"}>
          <Button size={"icon"} variant={"secondary"} className="!rounded-full">
            <FaScaleUnbalanced className="size-4" />
          </Button>
        </NavLink>
        <NavLink to={"/favorites"}>
          <Button size={"icon"} variant={"secondary"} className="!rounded-full">
            <CiHeart className="size-4" />
          </Button>
        </NavLink>
      </div>
      {/* <CompareSheet /> */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      {/* Background image */}
      <div className="absolute top-0 left-0 h-[478px] -z-10">
        <img
          className="-scale-x-100 top-0 left-0 object-cover h-full opacity-20"
          src="/Home/r-shape.svg"
          alt="bg"
        />
      </div>
    </div>
  );
};

export default MainLayout;
