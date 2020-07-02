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
    return instance.get("" )
      .then(res => res.data)
  },
  getTasks(todolistId) {
    return instance.get(`/${todolistId}/tasks`)
      .then(res => res.data)
  },
  deleteTodolist(todolistId) {
    // debugger;
    return instance.delete(`/${todolistId}`)
      .then(res => res.data)
  },
  createTask(newText, todolistId) {
    // debugger;
    return instance.post(`/${todolistId}/tasks`,{title: newText});
  },
  updateTask(taskId, todolistId, task) {
    debugger;
    return instance.put(`/${todolistId}/tasks/${taskId}`, task);
  },
  deleteTask(taskId, todolistId) {
    debugger;
    return instance.delete(`/${todolistId}/tasks/${taskId}`);
  }
}