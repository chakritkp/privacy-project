import axios, { AxiosInstance } from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

type UserType = {
    email: string;
    password: string;
    phoneNumber: string;
};

type HeardersUserType = {
    email: string;
    password: string;
    phone_number: string;
};

type LoginType = {
    username: string;
    password: string;
};

type FilterType = {
    search?: string;
    page?: number;
    limit?: number;
};

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api-services" || import.meta.env.VITE_USER_SERVICES_URL,
})

const navigate = useNavigate();

export default class Users {

    async login(value: Partial<LoginType>, path: string) {
        try {
            const { username, password } = value;
            const isPhoneNumber = /^\d+$/.test(username || '');
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username || '');

            const headers: HeardersUserType = {
                'email': null || '',
                'password': password || '',
                'phone_number': null || '',
            };

            if (isPhoneNumber) {
                headers.phone_number = username || '';
            } else if (isEmail) {
                headers.email = username || '';
            } else {
                throw new Error("Invalid username format. Must be either a valid email or phone number.");
            }

            const { data } = await api.post('/user-login-services', {}, { headers, withCredentials: true });

            if (!data) {
                console.error('Signing failed')
                return data.message
            } else {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate(path)
                return data.message
            }

        } catch (error: any) {
            console.error('Error during sign in:', error.message);
            enqueueSnackbar("Invalid username or password", { variant: "error" });
            return error.message
        }
    }
}