// api.js

import axios from "axios";

const api = axios.create({
  // baseURL: "http://13.213.208.92:7080/ecssms/api/",
  baseURL: "http://13.213.208.92:8084/ecsenrich/api/",
  // baseURL: "https://artylearning.com/artylearning/api/",
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    // const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKYWNrMTIzIiwiaWF0IjoxNzE3Mzk1OTUyLCJleHAiOjE3MjI1Nzk5NTJ9.Emy9155gHqO7wER-SvQ8oAk_TLAO-d3M3rA1oyDFnIFVXpjEiLFETF4wPpgzVujFSavClWt6Us0deJqBfuELZA";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
