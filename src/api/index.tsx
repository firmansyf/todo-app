import axios from "@/api/axios";

// ACTIVITY
export function getAllActivity() {
  return axios({
    method: "get",
    url: "activity-groups?email=yusufstudent2002@gmail.com",
  });
}

export function getActivityById(id: number) {
  return axios({
    method: "get",
    url: `activity-groups/${id}`,
  });
}

export function createNewActivity(params: any) {
  return axios({
    method: "post",
    url: `activity-groups`,
    data: params,
  });
}

export function updateActivity(id: number, params: any) {
  return axios({
    method: "patch",
    url: `activity-groups/${id}`,
    data: params,
  });
}

export function deleteActivity(id: number) {
  return axios({
    method: "delete",
    url: `activity-groups/${id}`,
  });
}

// TODO ACTIVITY
export function getDataTodoActivityById(id: number) {
  return axios({
    method: "get",
    url: `todo-items?activity_group_id=${id}`,
  });
}

export function createToDoActivity(params: any) {
  return axios({
    method: "post",
    url: `todo-items`,
    data: params,
  });
}

export function updateToDoActivity(id: number, params: any) {
  return axios({
    method: "patch",
    url: `todo-items/${id}`,
    data: params,
  });
}

export function deleteToDoActivity(id: number) {
  return axios({
    method: "delete",
    url: `todo-items/${id}`,
  });
}
