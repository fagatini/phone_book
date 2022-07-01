import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    // Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});
