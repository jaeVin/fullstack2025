import axios from 'axios'

export const http = axios.create({
    baseURL: "http://backend.vm1.test/api",
    withCredentials: true,
    withXSRFToken: true,
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json" 
    }
});

await http.get('/sanctum/csrf-cookie');
