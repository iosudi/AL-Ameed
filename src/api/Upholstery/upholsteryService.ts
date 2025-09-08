import axiosInstance from "../axiosInstance";

export const getUpholsteryTypes = (carModelId: number, materialId: number) => {
  return axiosInstance.get(
    `/services/upholstery/material-types/?upholstery_material=${materialId}&upholstery_car_model=${carModelId}`
  );
};

export const getUpholsteryMaterials = (materialId?: number) => {
  if (materialId === undefined) {
    return axiosInstance.get("/services/upholstery/materials/");
  }
  return axiosInstance.get(`/services/upholstery/materials/${materialId}`);
};

export const getCarModel = (upholstery_material: number = 1) => {
  return axiosInstance.get(
    `/services/upholstery/car-models/?upholstery_material=${upholstery_material}`
  );
};
