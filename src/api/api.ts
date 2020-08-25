import axios from "axios";
import {TaskType, TodoType} from "../types/entities";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
  headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
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
    data: T
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
    // debugger;
    return instance.post<CommonApiType<{item: TodoType}>>("",{title: title})
      .then(res => res.data);
  },
  updateTitleTodolist(title: string, todolistId: string) {
    // debugger;
    return instance.put(`/${todolistId}/`,{title: title})
      .then(res => res.data);
  },
  getTodolist() {
    return instance.get("" )
      .then(res => res.data)
  },
  getTasks(todolistId: string) {
      // debugger
    return instance.get(`/${todolistId}/tasks`)
      .then(res => res.data)
  },
  deleteTodolist(todolistId: string) {
    // debugger;
    return instance.delete(`/${todolistId}`)
      .then(res => res.data)
  },
  createTask(newText: string, todolistId: string) {
    // debugger;
    return instance.post<CommonApiType<{item: TaskType}>>(`/${todolistId}/tasks`,{title: newText});
  },
  updateTask(taskId: string, todolistId: string, task: TaskType) {
    return instance.put<CommonApiType<{item: TaskType }>>(`/${todolistId}/tasks/${taskId}`, task);
  },
  deleteTask(taskId: string, todolistId: string) {
    return instance.delete<CommonApiType<{ }>>(`/${todolistId}/tasks/${taskId}`);
  }
}