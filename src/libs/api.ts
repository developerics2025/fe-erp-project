import { environment } from "@/config/environment";
import axios from "axios";

const api = axios.create({
  baseURL: environment.apiBaseUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/account/token/refresh/");

        return api(originalRequest);
      } catch (err) {
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
