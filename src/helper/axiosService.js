import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { showAlert } from "./CustomAlert";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    updateHeaderConfig("Authorization", token);
  }
};

getToken();

const baseURL = "http://192.168.0.102:8080/api/";
// const baseURL = "https://viexplore.onrender.com/api/";

const service = axios.create({
  baseURL: baseURL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
  timeout: 20000,
});

async function removeToken() {
  await SecureStore.deleteItemAsync("token");
  removeHeaderConfig("Authorization");
}

service.interceptors.response.use(
  (response) => {
    if (response.data.status === 401 && response.data.message !== "Unauthorized") {
      removeToken();
      console.log("Token invalid")
      showAlert("Phiên đăng nhập đã hết hạn");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function updateHeaderConfig(key, value) {
  service.defaults.headers.common[key] = value;
}

function removeHeaderConfig(key) {
  delete service.defaults.headers.common[key];
}

function getAllHeaderConfig() {
  return service.defaults.headers.common;
}

export default service;
export { updateHeaderConfig, removeHeaderConfig, getAllHeaderConfig };
