import http from "./http-common";
import {apiConfig} from "./config";


/* Tasks */
export async function tasksAll() {
    return await http.get(apiConfig.url + "/tasks").then(response => response.data)
}

export async function taskCreate(task) {
    return await http.post(apiConfig.url + "/tasks", task).then(response => response.data)
}

export async function taskUpdate(task) {
    return await http.put(apiConfig.url + "/tasks/" + task.id, task).then(response => response.data)
}

/* End Tasks */

/* ----------------------------------------------------------------------------- */

/* Projects */
export async function allProjects() {
    return await http.get(apiConfig.url + "/projects").then(response => response.data)
}

export async function createProject(task) {
    return await http.post(apiConfig.url + "/projects", task).then(response => response.data)
}

/* End Projects */
