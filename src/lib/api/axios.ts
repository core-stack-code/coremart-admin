"use client"
import { ApiError } from "@/types/api";
import axios, { AxiosInstance } from "axios";
import { Log } from "../utils";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const api: AxiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


let isRefreshing = false
let isRedirecting = false
let failedQueue: any[] = []
const skipRefreshUrls = ['/login', '/refresh-token', '/logout'];

const processQueue = (error: any) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    })
    failedQueue = [];
}

api.interceptors.request.use(
    (config) => {
        if (isRedirecting) {
            return Promise.reject(new Error('Redirecting...'));
        }
        return config;
    }
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject({
                code: error.response.data?.code || "INTERNAL_SERVER_ERROR",
                message: error.response.data?.message || "Something went wrong",
                success: false,
                status: error.response.status,
            } as ApiError);
        }

        const status = error.response ? error.response.status : error.status;
       
        const isSkipUrl = !!originalRequest.url && skipRefreshUrls.some(url => originalRequest.url.includes(url));

        
        if (status === 401 && !isSkipUrl) {
            if (!originalRequest._retry) {
                
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(() => api(originalRequest));
                }

                originalRequest._retry = true
                isRefreshing = true

                try {
                    const res = await axios.post(`${SERVER_URL}/admin/refresh-token`, {}, {
                        withCredentials: true
                    })
                    
                    processQueue(null)
                    isRefreshing = false
                    
                    return api(originalRequest)

                } catch (refreshError: any) {
                    const errorObj: ApiError = {
                        code: "UNAUTHORIZED",
                        message: "Session expired. Please login again.",
                        success: false,
                        status: 401,
                    }

                    processQueue(errorObj)
                    isRefreshing = false

                    if (typeof window !== "undefined" && !isRedirecting) {
                        isRedirecting = true
                        window.location.replace("/login?redirect=true");
                    }
                    
                    return Promise.reject(errorObj)
                }
            } else {
                if (typeof window !== "undefined" && !isRedirecting) {
                    isRedirecting = true
                    window.location.replace("/login?redirect=true");
                    
                    const errorObj: ApiError = {
                        code: "UNAUTHORIZED",
                        message: "Session expired. Please login again.",
                        success: false,
                        status: 401,
                    }
                    return Promise.reject(errorObj);
                }
            }
        }

        if (!error.response) {
            const errorObj: ApiError = {
                code: "INTERNAL_SERVER_ERROR",
                message: "Unable to reach server. Please check your internet connection.",
                success: false,
                status: 500,
            }

            Log("errorObj", errorObj)

            return Promise.reject(errorObj);
        }

        const errorObj: ApiError = {
            code: error.response.data?.code || "INTERNAL_SERVER_ERROR",
            message: error.response.data?.message || "Something went wrong",
            success: false,
            status: error.response.status,
        }

        Log("errorObj", errorObj)

        return Promise.reject(errorObj);
    }
)

export default api;