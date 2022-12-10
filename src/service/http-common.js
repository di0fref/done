import axios from "axios";
import {apiConfig} from "./config";
import {getAuth, signOut} from "firebase/auth";

const http = axios.create({
    baseURL: apiConfig.url,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`,
    },
});


http.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    if(error.response.status === 401){



       // /* Try refresh token */
       //  http.post("refresh").then((response) => {
       //      console.log(response)
       //  })

        // signOut(getAuth()).then(() => {
        //     console.log("Signed out Firebase");
        // }).catch((error) => {
        //     console.log("ERROR::Signed out Firebase");
        // });
    }
    return Promise.reject(error);
});

export default http;
