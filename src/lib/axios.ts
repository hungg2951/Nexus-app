// lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

let accessToken = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Tự gắn accessToken vào mỗi request
instance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Tự refresh token khi hết hạn
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    const isAuthEndpoint =
      original.url?.includes("/auth/login") ||
      original.url?.includes("/auth/register");

    if (error.response?.status === 401 && !original._retry && !isAuthEndpoint) {
      original._retry = true;

      try {
        const res = await instance.post("/auth/refresh");
        const newToken = res.data.data.accessToken;
        setAccessToken(newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return instance(original);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error.response?.data ?? error);
  },
);

export default instance;
