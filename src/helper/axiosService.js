import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  updateHeaderConfig("Authorization", token);
};

getToken();

const baseURL = "https://viexplore.onrender.com/api/";

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
