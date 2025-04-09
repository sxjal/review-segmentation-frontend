import axios from "axios";

export const axiosi = axios.create({
  withCredentials: true,
  baseURL: "https://review-segmentation-backend.vercel.app",
});
