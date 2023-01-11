import axios from "axios";

axios.defaults.baseURL = "http://api.loc/api"

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("AccessToken")
    config.headers.Authorization = `Bearer ${token}`
    config.headers.get['Content-Type'] = 'application/json';
    return config;

}, function (error) {
    return Promise.reject(error);
});

