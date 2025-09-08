import axiosInstance from "../axiosInstance";

const AddToFavorite = (payload: number) => {
  return axiosInstance.post(
    "/vehicles/favorite/add_to_favorites/",
    { vehicle_id: payload },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const GetFavorites = () => {
  return axiosInstance.get("/vehicles/favorite/");
};

const RemoveFromFavorites = () => {
  return axiosInstance.get("/vehicles/favorite/remove_from_favorites/");
};

const AddToCompare = (payload: number) => {
  return axiosInstance.post(
    "/services/car-comparison/add_vehicle/",
    { vehicle_id: payload },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const GetCompare = () => {
  return axiosInstance.get("/services/car-comparison/");
};

const RemoveFromCompare = () => {
  return axiosInstance.get("/services/car-comparison/remove_vehicle/");
};

const profileService = {
  AddToFavorite,
  GetFavorites,
  RemoveFromFavorites,
  AddToCompare,
  GetCompare,
  RemoveFromCompare,
};

export default profileService;
