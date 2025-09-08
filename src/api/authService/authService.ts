// src/services/authService.js

import axiosInstance from "../axiosInstance";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("authentication/login/", {
    username,
    password,
  });

  const { access_token, refresh_token } = response.data;
  setTokens(access_token, refresh_token);

  return response.data;
};


const register = async (first_name: string, last_name: string, email: string, password: string) => {
  const response = await axiosInstance.post("authentication/registration/", {
    first_name,
    last_name,
    email,
    password,
  });

  return response.data;
};

const refreshToken = async () => {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) throw new Error("No refresh token available");

  const response = await axiosInstance.post("/authentication/token/refresh/", {
    refresh: refreshTokenValue,
  });

  const { access_token: accessToken, refresh_token: newRefreshToken } =
    response.data;
  setTokens(accessToken, newRefreshToken);

  return accessToken;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

};

const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

const authService = {
  login,
  register,
  refreshToken,
  logout,
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
};

export default authService;
