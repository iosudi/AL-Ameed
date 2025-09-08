import { useAuth } from "@/context/AuthContext";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, user } = useAuth(); // Make sure `user` contains `type` or `role`
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      toast("You're already logged in");
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    if (user?.is_staff) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};

export default GuestRoute;
