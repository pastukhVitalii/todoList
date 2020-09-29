import axios from "axios";
import {TaskType, TodoType} from "../types/entities";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {}
})

/*resultCode: 0
messages: [],
    data: {
    item:   {
        "id": "a2dfe62b-ebce-4b37-9581-1cc77ebc999f",
            "title": "important",
            "addedDate": "2019-07-30T12:23:49.677",
            "order": 0*/

type CommonApiType<T> = {
    resultCode: 0| 1 | 100
    messages: Array<string>
    data: T,

}

/*type CreateTodoType = {
    resultCode: 0| 1 | 100
    messages: Array<string>
    data: {
        item: TodoType
    }
}

type ResponseTaskType2 = {
    resultCode: 0 | 1 | 100
    messages: Array<string>
    data: {
        item: TaskType
    }
}
type ResponseTaskType3 = {
    resultCode: 0 | 1 | 100
    messages: Array<string>
    data: {}
}*/

export const api = {

  createTodolist(title: string) {
    return instance.post<CommonApiType<{item: TodoType}>>("todo-lists",{title: title})
      .then(res => res.data);
  },
  updateTitleTodolist(title: string, todolistId: string) {
    return instance.put(`/todo-lists/${todolistId}/`,{title: title})
      .then(res => res.data);
  },
  getTodolist() {
    return instance.get("todo-lists" )
      .then(res => res.data)
  },
  getTasks(todolistId: string) {
    return instance.get(`/todo-lists/${todolistId}/tasks`)
      .then(res => res.data)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete(`/todo-lists/${todolistId}`)
      .then(res => res.data)
  },
  createTask(newText: string, todolistId: string) {
    return instance.post<CommonApiType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`,{title: newText});
  },
  updateTask(taskId: string, todolistId: string, task: TaskType) {
    return instance.put<CommonApiType<{item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, task);
  },
  deleteTask(taskId: string, todolistId: string) {
    return instance.delete<CommonApiType<{ }>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  me() {
    return instance.get<CommonApiType<{ id: string, login: string, email: string}>>(`/auth/me`);
  },
  login(email: string, password: string) {
    return instance.post<CommonApiType<{email: string, password: string}>>(`/auth/login`, {
      email,
      password});
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}