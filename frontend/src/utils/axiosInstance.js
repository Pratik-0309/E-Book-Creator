import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 80000,
    headers:{
        "content-type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true,
});


// responce Intercepter
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await axiosInstance.post("/refresh-token"); // this hits your refreshAccessToken route
      return axiosInstance(originalRequest); // retry original request
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;