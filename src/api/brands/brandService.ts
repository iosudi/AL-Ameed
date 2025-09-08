import axiosInstance from "../axiosInstance";

export const getAllBrands = (params = {}) =>
  axiosInstance.get("/vehicles/brands/", {
    params: params,
  });
export const getBrandById = (id: number) =>
  axiosInstance.get(`/vehicles/brands/${id}`);
