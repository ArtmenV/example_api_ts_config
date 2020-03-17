import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import { endpoints } from './endpoints'

import queryString from 'query-string';

const API_BASE_URL = 'http://warehouse.dev.biopicmedical.com/warehouseApi/';
const API_KEY = '13c6f01b5226beceb1eab144f04c2f75'

class Api {
    instance: AxiosInstance;
    // instanceAuth: AxiosInstance;

    constructor(baseUrl: string) {
        this.instance = axios.create({
            baseURL: baseUrl,
            withCredentials: false,
            headers: {
                get: { 'Content-Type': 'application/json; charset=utf-10', 'x-dsi-restful': 7},
                post: { 'Content-Type': 'application/json' },
                put: { 'Content-Type': 'application/json' },
            },
        });

        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            if (API_KEY.length) {
                config.headers.Authorization = API_KEY
            } else {
                delete config.headers.Authorization;
            }
            return config
        });

        // const interceptor = this.instance.interceptors.response.use(
        //     response => response,
        //     error => {
        //         // Reject promise if usual error
        //         if (error.status !== 401) {
        //             return Promise.reject(error);
        //         }
        
        //         /* 
        //          * When response code is 401, try to refresh the token.
        //          * Eject the interceptor so it doesn't loop in case
        //          * token refresh causes the 401 response
        //          */
        //         axios.interceptors.response.eject(interceptor);
        
        //         return axios.post('/api/refresh_token', {
        //             'refresh_token': JSON.parse(localStorage.getItem('token'))['refresh_token']
        //         }).then(response => {
        //             /*saveToken();*/
        //             localStorage.setItem('token', JSON.stringify(response.data));
        //             error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
        //             return axios(error.response.config);
        //         }).catch(error => {
        //             /*destroyToken();*/
        //             localStorage.setItem('token', '');
        //             this.router.push('/login');
        //             return Promise.reject(error);
        //         }).finally(createAxiosResponseInterceptor);
        //     }
        // );
    }

    // instance: AxiosInstance;

    // constructor(baseUrl: string) {

    // }



    getAuth<T, R = AxiosResponse<T>>(query?: object, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.get(`${endpoints.getData}?${queryString.stringify({
            ...query,
        })}`, config);
    }

    post<T, R = AxiosResponse<T>>(path: string, data: object, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.post(path, data, config);
    }
}

export const $Api = new Api(API_BASE_URL);
