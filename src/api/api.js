import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
  headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
})

export const api = {

  createTodolist(title) {
    // debugger;
    return instance.post("",{title: title})
      .then(res => res.data);
  },
  updateTitleTodolist(title, todolistId) {
    // debugger;
    return instance.put(`/${todolistId}/`,{title: title})
      .then(res => res.data);
  },
  getTodolist() {
    return axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
      .then(res => res.data)
  },
  getTasks(todolistId) {
    return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      {
        withCredentials: true,
        headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
      })
      .then(res => res.data)
  },
  deleteTodolist(todolistId) {
    // debugger;
    return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      {
        withCredentials: true,
        headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
      })
      .then(res => res.data)
  },
  createTask(newText, todolistId) {
    // debugger;
    return instance.post(`/${todolistId}/tasks`,{title: newText});
  },
  updateTask(task, obj, todolistId, taskId) {
    return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      {
        ...task,
        ...obj
      },
      {
        withCredentials: true,
        headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
      })
      .then(res => res.data)
  }
}