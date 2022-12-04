import axios from "axios";
const baseUrl = "https://todo.api.devcode.gethired.id/";

// ====================== ACTIVITY API =======================//
export function getAllActivity() {
  return axios({
    method: "get",
    url: `${baseUrl}activity-groups?email=yusufstudent2002@gmail.com`,
  });
}

export function getActivityById(id) {
  return axios({
    method: "get",
    url: `${baseUrl}activity-groups/${id}`,
  });
}

export function createNewActivity(params) {
  return axios({
    method: "post",
    url: `${baseUrl}activity-groups`,
    data: params,
  });
}

export function deleteActivity(id) {
  return axios({
    method: "delete",
    url: `${baseUrl}activity-groups/${id}`,
  });
}

export function updateActivity(id, params) {
  return axios({
    method: "patch",
    url: `${baseUrl}activity-groups/${id}`,
    data: params,
  });
}

// ====================== TODO API =======================//

export function getDataTodoActivityById(id) {
  return axios({
    method: "get",
    url: `${baseUrl}todo-items?activity_group_id=${id}`,
  });
}

export function getToDoItem(id) {
  return axios({
    method: "get",
    url: `${baseUrl}todo-items/${id}`,
  });
}

export function createToDoActivity(params) {
  return axios({
    method: "post",
    url: `${baseUrl}todo-items`,
    data: params,
  });
}

export function deleteToDo(id) {
  return axios({
    method: "delete",
    url: `${baseUrl}todo-items/${id}`,
  });
}

export function updateToDo(id, params) {
  return axios({
    method: "patch",
    url: `${baseUrl}todo-items/${id}`,
    data: params,
  });
}
