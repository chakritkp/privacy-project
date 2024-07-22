import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api-services" || import.meta.env.VITE_USER_SERVICES_URL,
    withCredentials: true
});

export default axiosInstance;