import axios from "axios";

export const baseURL: string =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1";
export const authURL: string = baseURL + "/auth";

export const publicAxios = axios.create({
  baseURL,
});

publicAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
