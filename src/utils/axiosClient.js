import axios from 'axios'
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStoragemanager'

let baseURL = 'http://localhost:4000'

console.log('env is ', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    baseURL = process.env.REACT_APP_SERVER_BASE_URL
}

export const axiosClient = axios.create({
    baseURL,
    withCredentials: true
})

// request intercep
axiosClient.interceptors.request.use(
    (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers["Authorization"] = `Bearer ${accessToken}`;
        console.log('accessToken in request interceptor', accessToken);
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// response intercept
axiosClient.interceptors.response.use(

    (response) => {
        const data = response.data;
        return data;
    },
    async (error) => {
        const originalRequest = error.config;
        const statusCode = error.response.data?.statusCode;
        const errorMsg = error.response.data?.message || error.message;

        if (statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const response = await axios.create({
                withCredentials: true,
            }).get(`${baseURL}/auth/refresh`)

            if (response.data.status === 'ok') {
                setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)

                originalRequest.headers['Authorization'] = `Bearer ${response.data.result.accessToken}`

                console.log('New Access Token :', response.data.result.accessToken);

                return axios(originalRequest)
            } else {
                removeItem(KEY_ACCESS_TOKEN)
                window.location.replace('/login', '_self')
                return Promise.reject(new Error('Unauthorized'));
            }
        }
        return Promise.reject(error.response?.data || errorMsg);
    }
)