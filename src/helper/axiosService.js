import axios from "axios";

const baseURL = "http://192.168.30.108:8080/api/";

const service = axios.create({
  baseURL: baseURL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
  timeout: 5000,
});

function updateHeaderConfig(key, value) {
  service.defaults.headers.common[key] = value;
}

export default service;
export { updateHeaderConfig };