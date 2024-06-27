import axios from "axios";

export const baseURL: string = import.meta.env.VITE_BASE_URL;
export const authURL: string = import.meta.env.VITE_BASE_URL + "/auth";

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
