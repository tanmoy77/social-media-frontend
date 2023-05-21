import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8600/api',
    withCredentials: true,
    credentials: 'include',
})