import axiosInstance from "../axiosInstance";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const TOKEN_EXPIRY_KEY = "tokenExpiry";


const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("authentication/login/", {
    username,
    password,
  });

  const { access_token, refresh_token, expires_in } = response.data;
  setTokens(access_token, refresh_token, expires_in);

  return response.data;
};

const register = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string
) => {
  const response = await axiosInstance.post("authentication/registration/", {
    first_name,
    last_name,
    email,
    password,
  });

  return response.data;
};

// Improved token refresh with better error handling
const refreshToken = async (): Promise<string> => {
  const refreshTokenValue = getRefreshToken();

  if (!refreshTokenValue) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axiosInstance.post("/authentication/token/refresh/", {
      refresh: refreshTokenValue,
    });

    const { access_token: accessToken, refresh_token: newRefreshToken, expires_in } = response.data;
    setTokens(accessToken, newRefreshToken || refreshTokenValue, expires_in);

    return accessToken;
  } catch (error) {
    // If refresh fails, clear all tokens
    logout();
    throw error;
  }
};

const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Improved token setting with expiry tracking
const setTokens = (accessToken: string, refreshToken: string, expiresIn?: number): void => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

  // Calculate and store token expiry time
  if (expiresIn) {
    const expiryTime = Date.now() + (expiresIn * 1000); // Convert to milliseconds
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  }
};

// Check if token is expired
const isTokenExpired = (): boolean => {
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiryTime) {
    // If no expiry time is stored, assume token might be expired
    return false; // or true, depending on your security preference
  }

  return Date.now() >= parseInt(expiryTime);
};

// Enhanced authentication check
const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;

  // If token is expired, try to refresh it
  if (isTokenExpired()) {
    return false; // Let the interceptor handle the refresh
  }

  return true;
};

// Method to proactively refresh token before it expires
const refreshTokenIfNeeded = async (): Promise<void> => {
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiryTime) return;

  const timeUntilExpiry = parseInt(expiryTime) - Date.now();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Refresh token if it expires within 5 minutes
  if (timeUntilExpiry <= fiveMinutes && timeUntilExpiry > 0) {
    try {
      await refreshToken();
    } catch (error) {
      console.error('Failed to refresh token proactively:', error);
    }
  }
};

// Get user info from token (if JWT)
const getUserFromToken = () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    // Decode JWT token to get user info (if it's a JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const authService = {
  login,
  register,
  refreshToken,
  logout,
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  isTokenExpired,
  refreshTokenIfNeeded,
  getUserFromToken,
};

export default authService;

