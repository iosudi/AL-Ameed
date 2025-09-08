import { getAllFeatures, getFeatureById } from "@/api/features/featuresService";
import { VehicleDetails } from "@/interfaces/Vehicles";
import { useQueries, useQuery } from "@tanstack/react-query";


export const useCarFeatures = () => {
  return useQuery({
    queryKey: ['carFeatures'],
    queryFn: getAllFeatures,
    refetchOnWindowFocus: false
  });
};

export const useGetFeaturesById = (ids: number[], carData: VehicleDetails) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["feature", id],
      queryFn: () => getFeatureById(id), // this should be your API call function
      enabled: !!carData, // only run when carData is available
    })),
  });
};
