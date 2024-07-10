import axios from "axios"
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { filterType } from "../pages/Productlist";

const userServices = axios.create({
    baseURL: "http://localhost:3000/api-services" || import.meta.env.VITE_USER_SERVICES_URL,
    withCredentials: true
});

const useApi = () => {
    const navigate = useNavigate();

    const useGetUser = async () => {
        try {

            const { data } = await userServices.get('/users')

            return data
        } catch (error: any) {
            console.error('Error during sign in:', error.message);
        }
    }

    const useGetRole = async () => {
        try {

            const { data } = await userServices.get('/roles')

            return data
        } catch (error: any) {
            console.error('Error during sign in:', error.message);
        }
    }

    const useSignIn = async (value: any) => {
        try {
            const { username, password } = value;
            const isPhoneNumber = /^\d+$/.test(username);
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

            const headers = {
                'email': null,
                'password': password,
                'phone_number': null,
            };

            if (isPhoneNumber) {
                headers.phone_number = username;
            } else if (isEmail) {
                headers.email = username;
            } else {
                throw new Error("Invalid username format. Must be either a valid email or phone number.");
            }

            const { data } = await userServices.post('/user-login-services', {}, { headers });

            if (!data) {
                console.error('Signing failed')
                return data.message
            } else {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate('/')
                return data.message
            }

        } catch (error: any) {
            console.error('Error during sign in:', error.message);
            enqueueSnackbar(error.message, { variant: "error" });
            return error.message
        }

    }

    const useSignUp = async (value: any) => {
        try {
            const { email, password, phone_number } = value
            const headers = {
                'email': email,
                'password': password,
                'phone_number': phone_number,
            }

            const { data } = await userServices.post('/user-register-services', {}, { headers })

            if (!data) {
                console.error('Signup failed')
                return data.message
            } else {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate("/sign-in");
                return data.message
            }

        } catch (error: any) {
            console.error('Error during sign in:', error.message);
            enqueueSnackbar("E-mail or phone number is already.", { variant: "error" });
            return error.messages
        }
    }

    const useLogout = async () => {
        try {
            const { data } = await userServices.post('/user-logout-services');
            if (!data) {
                console.error('Signup failed')
                return data.message
            } else {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate("/sign-in");
                return data.message
            }
        } catch (error) {

        }
    }

    const useGetProducts = async (filter: filterType) => {
        try {
            const { data } = await userServices.get('/products', {
                params: { ...filter }
            });

            return data
        } catch (error: any) {
            console.error('Error during sign in:', error.message);
        }
    }

    return { useGetUser, useGetProducts, useGetRole, useSignIn, useSignUp, useLogout }
}

export default useApi