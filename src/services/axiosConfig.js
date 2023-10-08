import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

axiosConfig.interceptors.request.use(async (config) => config);
axiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return error.response;
  }
);

export default axiosConfig;
