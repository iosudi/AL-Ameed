import axiosInstance from "../axiosInstance";

// Update the service to accept search and condition parameters
export const getAllVehicles = (
  params = {},
  offset: number = 0,
  limit: number = 20
) => {
  // Construct the URL with query parameters
  const url = `/vehicles/vehicles/?limit=${limit}&offset=${offset}`;

  return axiosInstance.get(url, {
    params: params,
  });
};

export const getVehicleById = (id: number) =>
  axiosInstance.get(`/vehicles/vehicles/${id}`);

const createVehicle = (payload: FormData) => {
  return axiosInstance.post("/vehicles/vehicles/", payload);
};

const updateVehicle = (payload: FormData, id: string) => {
  return axiosInstance.put(`/vehicles/vehicles/${id}/`, payload);
};

const updateVehicleStatus = (payload: string, id: number) => {
  return axiosInstance.patch(`/vehicles/vehicles/${id}/`, {
    status: payload
  });
};

export const removeVehicle = (id: number) => {
  return axiosInstance.delete(`/vehicles/vehicles/${id}`);
};

export const rateVehicle = (payload: object) => {
  const url = "/reviews/vehicle-review/";

  return axiosInstance.post(url, payload);
};

const postCarPrice = (payload: object) => {
  const url = '/vehicles/vehicle-prices/'
  return axiosInstance.post(url, payload);
}

const postPriceTiers = (payload: object) => {
  const url = '/vehicles/price-tiers/'
  return axiosInstance.post(url, payload);
}

const getStatistics = () => {
  const url = '/vehicles/statistics/'
  return axiosInstance.get(url);
}

const vehicleService = {
  createVehicle, updateVehicle, postCarPrice, getStatistics, updateVehicleStatus, postPriceTiers
};

export default vehicleService;
