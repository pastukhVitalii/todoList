export const CREATE_TODOLIST = 'TodoApp/TodoList/CREATE_TODOLIST';
export const ADD_TASK = 'TodoApp/TodoList/ADD_TASK';
export const CHANGE_TASK = 'TodoApp/TodoList/CHANGE_TASK';
export const DELETE_TODOLIST = 'TodoApp/TodoList/DELETE_TODOLIST';
export const DELETE_TASK = 'TodoApp/TodoList/DELETE_TASK';

const initialState = {
  todolists: [
    {
      id: 0, title: "first",
      tasks: [
        {title: "dd", isDone: false, priority: "low", id: 1}
      ]
    },
    {
      id: 2, title: "second",
      tasks: [
        {title: "dd", isDone: false, priority: "low", id: 3}
      ]
    }
  ]
}
const reducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case CREATE_TODOLIST:
      return {...state, todolists: [...state.todolists, action.newTodolist]}
    case ADD_TASK:
      return {
        ...state, todolists: state.todolists.map(todo => {
          if (todo.id !== action.todolistId) {
            return todo
          } else {
            return {...todo, tasks: [...todo.tasks, action.newTask]}
          }
        })
      }
    case CHANGE_TASK:
      return {
        ...state, todolists: state.todolists.map(todo => {
          if (todo.id !== action.todolistId) {
            return todo
          } else {
            return {
              ...todo, tasks: todo.tasks.map(task => {
                if (task.id !== action.taskId) {
                  return task
                } else {
                  return {...task, ...action.obj}
                }
              })
            }
          }
        })
      }
    case DELETE_TODOLIST:
      return {
        ...state,
        todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
      }
    case DELETE_TASK:
      return {
        ...state, todolists: state.todolists.map(tl => {
          if (tl.id != action.todolistId) {
            return tl
          } else return {
            ...tl, tasks: tl.tasks.filter(task => task.id != action.taskId)
          }
        })
      }
    default:
      return state
  }
}

export default reducer;
export const addTodolistAC = (todolist) => {
  return {
    type: CREATE_TODOLIST,
    newTodolist: todolist
  }
}
export const addTaskAC = (todolistId, newTask) => {
  return {
    type: ADD_TASK,
    newTask, todolistId
  }
}
export const deleteTaskAC = (taskId, todolistId) => {
  return {
    type: DELETE_TASK,
    taskId, todolistId
  }
}
export const deleteTodolistAC = (todolistId) => {
  return {
    type: DELETE_TODOLIST,
    todolistId
  }
}

export const changeTaskAC = (todolistId, taskId, obj) => {
  return {type: CHANGE_TASK, todolistId, taskId, obj}
}