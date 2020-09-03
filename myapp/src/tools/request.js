import axios  from 'axios';
const baseURL = process.env.NODE_ENV === 'production' ? "http://121.36.51.131/" : "http://localhost:3000/"
const request = axios.create({
   baseURL: baseURL+"api",
   withCredentials: true
});

export default request;