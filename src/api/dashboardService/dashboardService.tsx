import axiosInstance from "../axiosInstance";

const getUsers = (offset?: number, limit?: number, user?: number) => {
  return axiosInstance.get("/users/users/", {
    params: {
      offset: offset,
      limit: limit,
      user: user,
    },
  });
};

const getUserById = (user?: number) => {
  return axiosInstance.get(`/users/users/${user}`);
};

const dashboardService = {
  getUsers,
  getUserById,
};

export default dashboardService;
