import axios from 'axios';
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStoragemanager'

let baseURL = "http://localhost:4000/";

if (process.env.NODE_ENV === 'production') {
    baseURL = process.env.REACT_APP_SERVER_BASE_URL;
}

export const axiosClient = axios.create({
    baseURL,
    withCredentials: true
});

axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN)
    request.headers["Authorization"] = `Bearer ${accessToken}`
    return request
})

axiosClient.interceptors.response.use(async (response) => {
    const data = response.data
    if (data.status === 'ok') {
        return data
    }

    const originalRequest = response.config
    const statusCode = data.statusCode
    const error = data.message

    if (statusCode === 401 && !originalRequest._retry) {

        originalRequest._retry = true;

        try {
            const response = await axios.create({
                withCredentials: true
            }).get(`${baseURL}auth/refresh`)

            console.log('refresh accessToken API called');

            if (response.data.status === 'ok') {
                setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)

                originalRequest.headers["Authorization"] = `Bearer ${response.data.result.accessToken}`

                console.log('New accessToekn', response.data.result.accessToken);

                return axios(originalRequest)
            } else {
                removeItem(KEY_ACCESS_TOKEN)
                console.log('User logedout for refreshToken expire');
                window.location.replace('/login', '_self')

                return Promise.reject(error)
            }

        } catch (refreshError) {
            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace('/login', '_self');

            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(new Error(error))

}, (error) => {
    return Promise.reject(error);
})