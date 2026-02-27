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
let failedQueue: any[] = []

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


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                 .then(() => api(originalRequest))
                 .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                await axios.post(`${SERVER_URL}/admin/refresh-token`, {}, {
                    withCredentials: true
                })

                processQueue(null)
                return api(originalRequest)

            } catch (refreshError) {
                processQueue(refreshError)

                window.location.href = "/login"
                
                const error: ApiError = {
                    code: "UNAUTHORIZED",
                    message: "Session expired. Please login again.",
                    success: false,
                }
                return Promise.reject(error)
            } finally {
                isRefreshing = false
            }
        }

        if (!error.response) {
            const error: ApiError = {
                code: "INTERNAL_SERVER_ERROR",
                message: "Unable to reach server. Please check your internet connection.",
                success: false,
                status: 500,
            }

            Log("errorObj", error)

            return Promise.reject(error);
        }

        const errorObj: ApiError = {
            code: error.response.data?.code || "INTERNAL_SERVER_ERROR",
            message: error.response.data?.message || "Something went wrong",
            success: false,
            status: error.status,
        }

        Log("errorObj", errorObj)

        return Promise.reject(errorObj);
    }
)

export default api;