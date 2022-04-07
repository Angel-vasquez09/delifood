import axios from 'axios';


export const foodApi = axios.create({
    baseURL: '/api',
})

export default foodApi;