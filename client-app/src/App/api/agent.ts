import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/activity';

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


const responseBody = <T> (response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    deteails: (id: string) => request.get(`/activities/${id}`),
    create: (activity: Activity) => request.post('/activities', activity),
    update: (activity: Activity) => request.put(`/activities/${activity.id}`, activity),
    del: (id: string) => request.del(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;