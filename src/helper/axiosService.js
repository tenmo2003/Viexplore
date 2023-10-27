import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    updateHeaderConfig("Authorization", token);
  }
};

getToken();

const baseURL = "http://192.168.0.101:8080/api/";
// const baseURL = "https://viexplore.onrender.com/api/";

const service = axios.create({
  baseURL: baseURL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
  timeout: 20000,
});

function updateHeaderConfig(key, value) {
  service.defaults.headers.common[key] = value;
}

function removeHeaderConfig(key) {
  delete service.defaults.headers.common[key];
}

export default service;
export { updateHeaderConfig, removeHeaderConfig };
