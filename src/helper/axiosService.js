import axios from "axios";
import * as SecureStore from "expo-secure-store";

const baseURL = "http://192.168.0.116:8080/api/";

const getToken = async() => {
  const token = await SecureStore.getItemAsync("token");
  updateHeaderConfig("Authorization", token);
}

getToken();

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

export default service;
export { updateHeaderConfig };