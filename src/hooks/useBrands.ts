import { getAllBrands, getBrandById } from "@/api/brands/brandService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useCarBrands = (params = {}) => {
  return useQuery({
    queryKey: ["carBrands"],
    queryFn: () => {
      return getAllBrands(params);
    },
    refetchOnWindowFocus: false,
  });
};

export const useCarBrandsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["carBrandsInfinite"],
    queryFn: ({ pageParam = 0 }) =>
      getAllBrands({ limit: 20, offset: pageParam }).then((res) => res.data),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      // Extract offset from next URL
      const url = new URL(lastPage.next);
      const params = new URLSearchParams(url.search);
      return Number(params.get("offset")) || undefined;
    },
    initialPageParam: 0,
  });
};

export const useBrandId = (id: number) => {
  return useQuery({
    queryKey: ["carBrand", id],
    queryFn: () => getBrandById(id),
    refetchOnWindowFocus: false,
  });
};
