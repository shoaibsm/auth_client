import axios from 'axios'
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStoragemanager'

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:4000',
    withCredentials: true
})

// for interceptors
// request intercep
axiosClient.interceptors.request.use(
    (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN)

        console.log('access token in axiosClient __01 ', accessToken);

        request.headers['Authorization'] = `Bearer ${accessToken}`

        return request
    }
)

// response intercept

axiosClient.interceptors.response.use(
    async (response) => {
        const data = response.data;

        console.log('response in  interceptors.response', response);

        console.log('data in  interceptors.response', data);

        console.log('status in response ', response.data.status);
        console.log('data.result.status ', response.data.status);

        if (data.status === 'ok') {
            console.log('data . status got ok');
        }

        console.log('data in interceptor :--', data);

        if (data.status === 'ok') {
            return data
        }


        const originalRequest = response.config
        const statusCode = data.statusCode
        const error = data.message

        console.log('originalRequest in response interceptor: ', originalRequest);

        console.log('statusCode in response interceptor: ', statusCode);

        console.log('error in response interceptor: ', error);

        if (statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                const response = await axios.create({
                    withCredentials: true,
                }).get('http://localhost:4100/auth/refresh')

                console.log('response in response interceptor', response);

                // if (response.data.statusCode === '200') {
                if (response.data.status === 'ok') {
                    setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)

                    console.log('New Access Token from Refresh:', response.data.result.accessToken);

                    originalRequest.headers['Authorization'] = `Bearer ${response.data.result.accessToken}`

                    console.log('New Access Token from Refresh:', response.data.result.accessToken);


                    return axios(originalRequest)
                } else {
                    removeItem(KEY_ACCESS_TOKEN)
                    window.location.replace('/login', '_self')
                    return Promise.reject(error);
                }

            } catch (error) {
                console.error('Error during refresh:', error);
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace('/login', '_self');
                return Promise.reject(error);
            }

        }
        return Promise.reject(error);
    }
)