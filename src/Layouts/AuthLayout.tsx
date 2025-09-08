// src/common/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="relative">
      <main className="flex-grow">
        <Outlet />
      </main>

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
export default AuthLayout;
