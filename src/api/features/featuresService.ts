import axiosInstance from "../axiosInstance";


export const getAllFeatures = () => {
  return axiosInstance.get(`/vehicles/features/`);
};

// Update the service to accept search and condition parameters
export const getFeatureById = (id: number) => {
  return axiosInstance.get(`/vehicles/features/${id}/`);
};


