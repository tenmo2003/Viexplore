import axios from "axios";

const baseURL = "http://192.168.0.101:8085/api/";

const service = axios.create({
  baseURL: baseURL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  }
});

export default service;