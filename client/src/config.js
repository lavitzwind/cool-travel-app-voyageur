import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://cool-travel-app-voyageur.vercel.app/api",
});
