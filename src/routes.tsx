// src/routes.tsx

import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import PageWrapper from "./common/components/PageWrapper";
import GuestRoute from "./guards/GuestRoute";
import StaffRoute from "./guards/StaffRoute";
import AuthLayout from "./Layouts/AuthLayout";
import MainLayout from "./Layouts/MainLayout";

const Home = lazy(() => import("./pages/main/Home"));
const Shop = lazy(() => import("./pages/store/Shop"));
const RentalContract = lazy(() => import("./pages/store/RentalContract"));
const SellCar = lazy(() => import("./pages/store/SellCar"));
const ProductDetails = lazy(() => import("./pages/store/ProductDetails"));
const CompareProducts = lazy(() => import("./pages/store/CompareProducts"));
const Who = lazy(() => import("./pages/main/Who"));
const PrivacyPolicy = lazy(() => import("./pages/main/PrivacyPolicy"));
const UpholsteryOverview = lazy(
  () => import("./pages/main/UpholsteryOverview")
);
const UserDashboard = lazy(() => import("./pages/profile/UserDashboard"));
const Favorites = lazy(() => import("./pages/profile/Favorites"));
const UpholsteryDetails = lazy(() => import("./pages/main/UpholsteryDetails"));
const ContactUs = lazy(() => import("./pages/main/ContactUs"));
const UserLogin = lazy(() => import("./pages/auth/UserLogin"));
const Register = lazy(() => import("./pages/auth/Register"));
const Faqs = lazy(() => import("./pages/main/Faqs"));
const Login = lazy(() => import("./pages/dashboard/Login"));
const ProductsList = lazy(() => import("./pages/dashboard/ProductsList"));
const RentRequests = lazy(() => import("./pages/dashboard/RentRequests"));
const RentRequestDetails = lazy(
  () => import("./pages/dashboard/RentRequestDetails")
);
const RentToOwnRequests = lazy(
  () => import("./pages/dashboard/RentToOwnRequests")
);
const RentToOwnRequestDetails = lazy(
  () => import("./pages/dashboard/RentToOwnRequestDetails")
);
const SellRequests = lazy(() => import("./pages/dashboard/SellRequests"));
const SellRequestDetails = lazy(
  () => import("./pages/dashboard/SellRequestDetails")
);
const Overview = lazy(() => import("./pages/dashboard/Overview"));
const AddProduct = lazy(() => import("./pages/dashboard/AddProduct"));
const EditProduct = lazy(() => import("./pages/dashboard/EditProduct"));
const Users = lazy(() => import("./pages/dashboard/Users"));
const UserDetails = lazy(() => import("./pages/dashboard/UserDetails"));
const StaffCars = lazy(() => import("./pages/dashboard/StaffCars"));
const Soon = lazy(() => import("./pages/Soon"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: (
          <PageWrapper title="Home | Al Ameed">
            <Home />
          </PageWrapper>
        ),
      },
      {
        path: "/soon",
        element: <Soon />,
      },
      {
        path: "shop",
        element: (
          <PageWrapper title="Cars Gallery | Al Ameed">
            <Shop />
          </PageWrapper>
        ),
      },
      {
        path: "rent-car",
        element: (
          <PageWrapper title="Rent car | Al Ameed">
            <RentalContract contractType="rental" />
          </PageWrapper>
        ),
      },
      {
        path: "rent-to-own",
        element: (
          <PageWrapper title="Rent to own car | Al Ameed">
            <RentalContract contractType="rent_to_own" />
          </PageWrapper>
        ),
      },
      {
        path: "sell-car",
        element: (
          <PageWrapper title="Sell your car | Al Ameed">
            <SellCar />
          </PageWrapper>
        ),
      },
      {
        path: "product-details",
        element: (
          <PageWrapper title="Product Details | Al Ameed">
            <ProductDetails />
          </PageWrapper>
        ),
      },
      {
        path: "compare-products",
        element: (
          <PageWrapper title="Compare Products | Al Ameed">
            <CompareProducts />
          </PageWrapper>
        ),
      },
      {
        path: "favorites",
        element: (
          <PageWrapper title="Your favorites | Al Ameed">
            <Favorites />
          </PageWrapper>
        ),
      },
      {
        path: "upholstery-overview",
        element: (
          <PageWrapper title="Upholstery overview | Al Ameed">
            <UpholsteryOverview />
          </PageWrapper>
        ),
      },
      {
        path: "upholstery-details",
        element: (
          <PageWrapper title="Upholstery details | Al Ameed">
            <UpholsteryDetails />
          </PageWrapper>
        ),
      },
      {
        path: "who",
        element: (
          <PageWrapper title="Who are we | Al Ameed">
            <Who />
          </PageWrapper>
        ),
      },
      {
        path: "contact-us",
        element: (
          <PageWrapper title="Contact us | Al Ameed">
            <ContactUs />
          </PageWrapper>
        ),
      },
      {
        path: "faqs",
        element: (
          <PageWrapper title="Faqs | Al Ameed">
            <Faqs />
          </PageWrapper>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <PageWrapper title="Privacy policy | Al Ameed">
            <PrivacyPolicy />
          </PageWrapper>
        ),
      },
      {
        path: "account-dashboard",
        element: (
          <PageWrapper title="Account Dashboard | Al Ameed">
            <UserDashboard />
          </PageWrapper>
        ),
      },
      {
        path: "user-login",
        element: (
          <GuestRoute>
            <PageWrapper title="Login | Al Ameed">
              <UserLogin />
            </PageWrapper>
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <PageWrapper title="Register | Al Ameed">
              <Register />
            </PageWrapper>
          </GuestRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <GuestRoute>
            <PageWrapper title="Login as Admin | Al Ameed">
              <Login />
            </PageWrapper>
          </GuestRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <StaffRoute>
            <PageWrapper title="Admin Dashboard | Al Ameed">
              <Overview />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/products-list",
        element: (
          <StaffRoute>
            <PageWrapper title="Products list | Al Ameed">
              <ProductsList />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/add-product",
        element: (
          <StaffRoute>
            <PageWrapper title="Add new product | Al Ameed">
              <AddProduct />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/edit-product",
        element: (
          <StaffRoute>
            <PageWrapper title="Add new product | Al Ameed">
              <EditProduct />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/staff-cars",
        element: (
          <StaffRoute>
            <PageWrapper title="Staff Cars | Al Ameed">
              <StaffCars />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/sell-requests",
        element: (
          <StaffRoute>
            <PageWrapper title="Sell requests | Al Ameed">
              <SellRequests />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/sell-request-details/:id",
        element: (
          <StaffRoute>
            <PageWrapper title="Rent request | Al Ameed">
              <SellRequestDetails />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <StaffRoute>
            <PageWrapper title="Users | Al Ameed">
              <Users />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <StaffRoute>
            <PageWrapper title="User | Al Ameed">
              <UserDetails />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/rent-requests",
        element: (
          <StaffRoute>
            <PageWrapper title="Rent requests | Al Ameed">
              <RentRequests />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/rent-to-own-requests",
        element: (
          <StaffRoute>
            <PageWrapper title="Rent to own requests | Al Ameed">
              <RentToOwnRequests />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/rent-request-details/:id",
        element: (
          <StaffRoute>
            <PageWrapper title="Rent request | Al Ameed">
              <RentRequestDetails />
            </PageWrapper>
          </StaffRoute>
        ),
      },
      {
        path: "/rent-to-own-request-details/:id",
        element: (
          <StaffRoute>
            <PageWrapper title="Rent request | Al Ameed">
              <RentToOwnRequestDetails />
            </PageWrapper>
          </StaffRoute>
        ),
      },
    ],
  },
];
