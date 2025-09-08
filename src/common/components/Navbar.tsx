import logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { LucideUser } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe2, BsList, BsX } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const { i18n, t } = useTranslation();
  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isCompareMenuOpen, setIsCompareMenuOpen] = useState(false);

  // const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const currentLanguage = i18n.language;

  const navLinks = [
    { path: "/", label: t("navbar.home") },
    { path: "/shop?type=new", label: t("navbar.shop") },
    { path: "/who", label: t("navbar.about") },
    { path: "/contact-us", label: t("navbar.contact") },
  ];

  return (
    <nav className="py-8 px-4 relative">
      <div className="container mx-auto bg-[#17191AC7] border border-neutral-400 rounded-2xl flex items-center justify-between md:px-16 py-3 px-6">
        <div className="flex items-center gap-16">
          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="AlAmeed" className="sm:h-auto h-15" />
          </NavLink>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-xl">
            {navLinks.map(({ path, label }) => (
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
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <Button
            className="hidden md:flex text-xl"
            variant="ghost"
            size="lg"
            onClick={() =>
              currentLanguage == "ar"
                ? i18n.changeLanguage("en")
                : i18n.changeLanguage("ar")
            }
          >
            {currentLanguage == "ar" ? "EN" : "العربيه"}
            <BsGlobe2 className="size-5 " />
          </Button>

          {/* Profile btn */}
          <DropdownMenu dir={currentLanguage == "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
              <Button
                className="hidden md:flex  text-xl"
                variant="ghost"
                size="icon"
              >
                <LucideUser className="size-8" />
              </Button>
            </DropdownMenuTrigger>
            {user ? (
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel className="text-neutral-400 text-sm mb-2">
                  {t("navbar.my_account")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {user?.is_staff && (
                    <NavLink to="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        {t("adminNavbar.dashboard")}
                      </DropdownMenuItem>
                    </NavLink>
                  )}
                  <NavLink to="/account-dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.dashboard")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/favorites">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.favorites")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/compare-products">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.compare_list")}
                    </DropdownMenuItem>
                  </NavLink>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600"
                    onClick={logout}
                  >
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                  <NavLink to="/user-login">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.login")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/register">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.register")}
                    </DropdownMenuItem>
                  </NavLink>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>

        <div className="md:hidden flex items-center gap-4">
          {/* Profile btn */}
          <DropdownMenu dir={currentLanguage == "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
              <Button className=" md:flex  text-xl" variant="ghost" size="icon">
                <LucideUser className="size-8" />
              </Button>
            </DropdownMenuTrigger>
            {user ? (
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel className="text-neutral-400 text-sm mb-2">
                  {t("navbar.my_account")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {user?.is_staff && (
                    <NavLink to="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        {t("adminNavbar.dashboard")}
                      </DropdownMenuItem>
                    </NavLink>
                  )}
                  <NavLink to="/account-dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.dashboard")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/favorites">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.favorites")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/compare-products">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.compare_list")}
                    </DropdownMenuItem>
                  </NavLink>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600"
                    onClick={logout}
                  >
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                  <NavLink to="/user-login">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.login")}
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/register">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("navbar.register")}
                    </DropdownMenuItem>
                  </NavLink>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          {/* Mobile Hamburger */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <div className="md:hidden flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isMenuOpen ? (
                    <BsX className="size-10" />
                  ) : (
                    <BsList className="size-10" />
                  )}
                </Button>
              </SheetTrigger>
            </div>

            <SheetContent side="right" className="bg-[#17191A]">
              <SheetHeader className="flex-row justify-between mb-6">
                <SheetTitle className="text-2xl  ">
                  {t("navbar.menu")}
                </SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className=" text-white">
                    <BsX className="size-8" />
                  </Button>
                </SheetClose>
              </SheetHeader>

              <div className="flex flex-col gap-6 mt-6 px-4">
                {navLinks.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-xl !border-0 ${isActive ? "active-link" : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}

                <Select
                  dir={currentLanguage === "ar" ? "rtl" : "ltr"}
                  onValueChange={(val) => i18n.changeLanguage(val)}
                  defaultValue={currentLanguage}
                >
                  <SelectTrigger className="w-full md:min-w-[12rem] min-w-[8rem] shadow-none bg-[#1A1C1D] border border-[#d80000] py-6 cursor-pointer rounded-xl">
                    <div className="flex gap-3 items-center text-white">
                      <BsGlobe2 className="size-6 text-white" />
                      <SelectValue placeholder={t("navbar.language")} />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1c1d] text-white rounded-xl border-neutral-800">
                    <SelectGroup>
                      <SelectItem className="cursor-pointer" value="ar">
                        العربية
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="en">
                        English
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
