import { getAllVehicles, getVehicleById } from "@/api/vehicles/vehiclesService";
import { useQuery } from "@tanstack/react-query";

// Update the hook to accept searchQuery and condition as arguments
export const useVehicles = (
  params = {},
  offset: number = 0,
  limit: number = 20
) => {
  return useQuery({
    queryKey: ["Vehicles", params, offset], // Include searchQuery and condition in the queryKey for cache management
    queryFn: () => getAllVehicles(params, offset, limit),
    refetchOnWindowFocus: false,
  });
};

export const useCarVehicleId = (id: number) => {
  return useQuery({
    queryKey: ["carBrand", id],
    queryFn: () => getVehicleById(id),
    refetchOnWindowFocus: false,
  });
};
