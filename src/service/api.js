import http from "./http-common";
import {apiConfig} from "./config";

/* Register user */

/* Login user */

/* Logout user */

/* Get all tasks */

export async function upcoming() {
    return await http.get(apiConfig.url + "/tasks/upcoming").then(response => response.data)
}
export async function today() {
    return await http.get(apiConfig.url + "/today").then(response => response.data)
}
export async function all() {
    return await http.get(apiConfig.url + "/tasks").then(response => response.data)
}
export async function inbox() {
    return await http.get(apiConfig.url + "/tasks/inbox").then(response => response.data)
}
export async function anytime() {
    return await http.get(apiConfig.url + "/tasks/anytime").then(response => response.data)
}

/* Get upcoming tasks */
// export async function getUpcoming() {
//     return await http.get(apiConfig.url + "/tasks").then(response => response.data)
// }
/* Get filtered tasks */

/* Create task */

/* Update tasks */
