import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { getToken } from '../utils';

const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Accept: 'application/json' },
});

instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token: string = getToken() || '';
        config.headers = { Authorization: token };
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
