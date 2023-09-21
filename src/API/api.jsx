import axios from "axios";
export const API_URL = "https://www.the-coffee-shop-api.crystalux.site:8003";
// export const API_URL = "http://localhost:2500";
export const api = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem("cs-token")}` },
});
