import axios from "axios";

const isLocal = window.location.hostname === "localhost";
const local = isLocal
  ? "http://localhost:5000/api"
  : "https://rent-dress.onrender.com";

const instance = axios.create({
  baseURL: local,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
