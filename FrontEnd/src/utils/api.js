import axios from "axios";
import { getToken, logout } from "../store/authHelpers";
import { toast } from "react-hot-toast";

export const BackEndURI = import.meta.env.VITE_BACKEND_URL;
// export const BackEndURI = 'http://localhost:3000'

const API = axios.create({
  baseURL: `${BackEndURI}/api`,
  timeout: 10000,
});

API.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      logout();
      toast.error("Session expired. Please login again.");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;
