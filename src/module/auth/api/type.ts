import axios, { AxiosInstance } from "axios";

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
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)