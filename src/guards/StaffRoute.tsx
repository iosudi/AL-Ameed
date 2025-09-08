import { useAuth } from "@/context/AuthContext";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

const StaffRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user && !user.is_staff) {
      toast.error("You don't have the permission to proceed to this page.");
    }
  }, [user]);

  if (!user?.is_staff) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default StaffRoute;
