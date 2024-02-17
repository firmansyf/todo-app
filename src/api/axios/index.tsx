import ax from "axios";

const axios = ax.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: false,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  },
});

export default axios;
