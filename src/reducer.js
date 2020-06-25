import {api} from "./api/api";

export const CREATE_TODOLIST = 'TodoApp/TodoList/CREATE_TODOLIST';
export const ADD_TASK = 'TodoApp/TodoList/ADD_TASK';
export const CHANGE_TASK = 'TodoApp/TodoList/CHANGE_TASK';
export const DELETE_TODOLIST = 'TodoApp/TodoList/DELETE_TODOLIST';
export const DELETE_TASK = 'TodoApp/TodoList/DELETE_TASK';
export const SET_TODOLIST = "TodoList/Reducer/SET_TODOLIST";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";
export const UPDATE_TITLE_TODOLIST = "TodoList/Reducer/UPDATE_TITLE_TODOLIST";

const initialState = {
  todolists: []
}
const reducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case SET_TODOLIST:
      return {
        ...state,
        todolists: action.todolists
      }
    case CREATE_TODOLIST:
      return {...state, todolists: [action.newTodolist, ...state.todolists]};
    case UPDATE_TITLE_TODOLIST:
      debugger
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id !== action.newTodolist.id) {
            // debugger
            return tl
          } else {
            return {
              ...tl,
              title: action.newTodolist.title
            }
          }
        })
      }
    case SET_TASKS:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id != action.todolistId) return tl;
          else {
            return {
              ...tl,
              tasks: action.tasks
            }
          }
        })
      }
    case ADD_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {...tl, tasks: [...tl.tasks, action.newTask]}
          } else {
            return tl
          }
        })
      }
    case CHANGE_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {
              ...tl,
              tasks: tl.tasks.map(t => {
                if (t.id != action.taskId) {
                  return t;
                } else {
                  return {...t, ...action.obj};
                }
              })
            }
          } else {
            return tl
          }
        })
      }
    case DELETE_TODOLIST:
      // debugger;
      return {
        ...state,
        todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
      }
    case DELETE_TASK:
      return {
        ...state,
        todolists: state.todolists.map(tl => {
          if (tl.id === action.todolistId) {
            return {
              ...tl,
              tasks: tl.tasks.filter(t => t.id != action.taskId)
            }
          } else {
            return tl
          }
        })
      }
  }
return state
}

export default reducer;
export const addTodolistAC = (todolist) => {
  return {
    type: CREATE_TODOLIST,
    newTodolist: todolist
  }
}
export const updateTodolistAC = (todolist) => {
  return {type: UPDATE_TITLE_TODOLIST, newTodolist: todolist}
}
export const addTaskAC = (newTask, todolistId) => {
  return {type: ADD_TASK, newTask, todolistId};
}
export const deleteTaskAC = (todolistId, taskId) => {
  return {type: DELETE_TASK, todolistId, taskId};
}
export const deleteTodolistAC = (todolistId) => {
  return {
    type: DELETE_TODOLIST,
    todolistId
  }
}
export const changeTaskAC = (taskId, obj, todolistId) => {
  return {type: CHANGE_TASK, taskId, obj, todolistId};
}

export const setTodolistAC = (todolists) => {
  return {
    type: SET_TODOLIST,
    todolists: todolists
  }
}
export const setTasksAC = (tasks, todolistId) => {
  return {
    type: SET_TASKS,
    tasks, todolistId
  }
}

export const setTodolistsTC = () => (dispatch, getState) => {
  // debugger;
  api.getTodolist()
    .then(res => {
      // debugger
      dispatch(setTodolistAC(res));
    });
}