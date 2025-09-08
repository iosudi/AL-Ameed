import {
  getUpholsteryMaterials,
  getUpholsteryTypes,
} from "@/api/Upholstery/upholsteryService";
import { useQuery } from "@tanstack/react-query";

export const useUpholsteryTypes = (carModelId: number, materialId: number) => {
  return useQuery({
    queryKey: ["upholsteryTypes", carModelId, materialId],
    queryFn: () => {
      return getUpholsteryTypes(carModelId, materialId);
    },
    refetchOnWindowFocus: false,
  });
};

export const useUpholsteryMaterials = (materialId?: number) => {
  return useQuery({
    queryKey: ["upholsteryMaterials", materialId],
    queryFn: () => {
      return getUpholsteryMaterials(materialId);
    },
    refetchOnWindowFocus: false,
  });
};
