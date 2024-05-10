import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://10.0.2.2:8000'

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${SecureStore.getItem('access_token')}`
    return config
})

$api.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get('/refresh', { baseURL: API_URL, withCredentials: true })
            SecureStore.setItem('access_token', response.data.access_token)
            return $api.request(originalRequest)
        } catch (e) {
            await SecureStore.deleteItemAsync('access_token')
            console.log('Не авторизован');
        }
    }
    throw error
})

export default $api