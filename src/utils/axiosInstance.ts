import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_USER_SERVICES_URL || "http://localhost:8080",
    withCredentials: true
});

export default axiosInstance;