import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const DashboardNavbar = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  // user.permissions should be an array of {id, name, codename, content_type}
  const userPermissions = user?.user_permissions?.map((p: number) => p) || [];

  // Define link-permission mapping
  const navLinks = [
    {
      path: "/dashboard",
      label: t("adminNavbar.dashboard"),
      requiredPerms: [], // everyone can see
    },
    {
      path: "/products-list",
      label: t("adminNavbar.products_list"),
      requiredPerms: [],
    },
    {
      path: "/add-product",
      label: t("adminNavbar.add_product"),
      requiredPerms: [],
    },
    {
      path: "/staff-cars",
      label: t("adminNavbar.staff_vehicles"),
      requiredPerms: [0], // example, you can change this
    },
    {
      path: "/users",
      label: t("adminNavbar.users"),
      requiredPerms: [0],
    },
    {
      path: "/sell-requests",
      label: t("adminNavbar.sell_requests"),
      requiredPerms: [144], // you said36can see sell requests
    },
    {
      path: "/rent-requests",
      label: t("adminNavbar.rent_requests"),
      requiredPerms: [176],
    },
    {
      path: "/rent-to-own-requests",
      label: t("adminNavbar.rent_to_own_requests"),
      requiredPerms: [185],
    },
  ];

  // Helper: check if user has any of the required permissions
  const hasPermission = (requiredPerms: number[]) => {
    if (user?.is_superuser) return true;
    if (requiredPerms.length === 0) return true; // public link
    return requiredPerms.some((perm) => userPermissions.includes(Number(perm)));
  };

  return (
    <ul className="flex items-center justify-center flex-wrap sm:gap-8 gap-4 sm:text-xl">
      {navLinks
        .filter((link) => hasPermission(link.requiredPerms))
        .map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {label}
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

export default DashboardNavbar;
