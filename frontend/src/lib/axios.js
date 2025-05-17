import axios from "axios";

export const  axiosInstance = axios.create({
    baseURL:"https://annova-chat-app.onrender.com/api",
    withCredentials:true,});

