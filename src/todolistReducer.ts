import {api} from "./api/api";
import {TaskType, TodoType, TodoUpdateObject} from "./types/entities";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";

export const CREATE_TODOLIST = 'TodoApp/TodoList/CREATE_TODOLIST';
export const ADD_TASK = 'TodoApp/TodoList/ADD_TASK';
export const UPDATE_TASK = 'TodoApp/TodoList/UPDATE_TASK';
export const DELETE_TODOLIST = 'TodoApp/TodoList/DELETE_TODOLIST';
export const DELETE_TASK = 'TodoApp/TodoList/DELETE_TASK';
export const SET_TODOLIST = "TodoList/Reducer/SET_TODOLIST";
export const SET_TODOLIST_ERROR = "TodoList/Reducer/SET_TODOLIST_ERROR";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";
export const UPDATE_TITLE_TODOLIST = "TodoList/Reducer/UPDATE_TITLE_TODOLIST";
export const LOADING = "TodoList/Reducer/LOADING";
export const LOADING_TASKS = "TodoList/Reducer/LOADING_TASKS";

type initialStateType = {
    todolists: Array<TodoType>
    loading: boolean,
}

const initialState: initialStateType = {
    todolists: [],
    loading: false,
}
const todolistReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todolists
            }
        case CREATE_TODOLIST:
            return {...state, todolists: [action.newTodolist, ...state.todolists]};
        case UPDATE_TITLE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl
                    } else {
                        return {
                            ...tl,
                            title: action.title
                        }
                    }
                })
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) return tl;
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
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
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
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
        case LOADING:
            return {
                ...state, loading: action.isActive
            }
        /*case SET_TODOLIST_ERROR:
            return {
                ...state, //error: 'error'
            }*/
    }
    return state
}

export default todolistReducer;

type ActionsType =
    UpdateTaskSuccessActionType
    | DeleteTodoSuccessActionType
    | DeleteTaskSuccessActionType
    | UpdateTodolistTitleSuccessActionType
    | AddTaskSuccessActionType
    | GetTasksSuccessActionType
    | AddTodolistSuccessActionType
    | GetTodolistsSuccessActionType
    | LoadingTodolistActionType
    | LoadingTasksActionType


type UpdateTaskSuccessActionType = {
    type: typeof UPDATE_TASK
    taskId: string
    obj: TodoUpdateObject
    todolistId: string
}
type DeleteTodoSuccessActionType = {
    type: typeof DELETE_TODOLIST
    todolistId: string
}
type DeleteTaskSuccessActionType = {
    type: typeof DELETE_TASK
    taskId: string
    todolistId: string
}
type UpdateTodolistTitleSuccessActionType = {
    type: typeof UPDATE_TITLE_TODOLIST
    todolistId: string
    title: string
}
type AddTaskSuccessActionType = {
    type: typeof ADD_TASK
    newTask: TaskType
    todolistId: string
}
type GetTasksSuccessActionType = {
    type: typeof SET_TASKS
    tasks: Array<TaskType>
    todolistId: string
}
type AddTodolistSuccessActionType = {
    type: typeof CREATE_TODOLIST
    newTodolist: TodoType
}
type GetTodolistsSuccessActionType = {
    type: typeof SET_TODOLIST
    todolists: Array<TodoType>
}
type LoadingTodolistActionType = {
    type: typeof LOADING
    isActive: boolean
}
type LoadingTasksActionType = {
    type: typeof LOADING_TASKS
    isActive: boolean
}

// Action creator

export const addTodolistAC = (todolist: TodoType): AddTodolistSuccessActionType => {
    return {type: CREATE_TODOLIST, newTodolist: todolist}
}
export const updateTodolistAC = (title: string, todolistId: string): UpdateTodolistTitleSuccessActionType => {
    return {type: UPDATE_TITLE_TODOLIST, title, todolistId}
}
export const addTaskAC = (newTask: TaskType, todolistId: string): AddTaskSuccessActionType => {
    return {type: ADD_TASK, newTask, todolistId};
}
export const deleteTaskAC = (taskId: string, todolistId: string): DeleteTaskSuccessActionType => {
    return {type: DELETE_TASK, taskId, todolistId};
}
export const deleteTodolistAC = (todolistId: string): DeleteTodoSuccessActionType => {
    return {type: DELETE_TODOLIST, todolistId}
}
/*export const setTodolistError = (todolists: Array<TodoType>) => {
    return {type: SET_TODOLIST_ERROR}
}*/
export const updateTaskAC = (taskId: string, todolistId: string, obj: TodoUpdateObject): UpdateTaskSuccessActionType => ({
    type: UPDATE_TASK,
    taskId,
    todolistId,
    obj
});
export const loadingTodolistAC = (isActive: boolean): LoadingTodolistActionType => ({type: LOADING, isActive});
export const setTodolistAC = (todolists: Array<TodoType>): GetTodolistsSuccessActionType => {
    return {type: SET_TODOLIST, todolists: todolists}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): GetTasksSuccessActionType => {
    return {type: SET_TASKS, tasks, todolistId}
}

// THUNK

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;
type ThunkDispatch1 = ThunkDispatch<AppStateType, unknown, ActionsType>;

export const setTaskTC = (todolistId: string): ThunkType => (dispatch: ThunkDispatch1) => {
    api.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.items, todolistId));
        });
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch1) => {
    api.deleteTodolist(todolistId)
        .then(res => {
            dispatch(deleteTodolistAC(todolistId));
        });
}
export const updateTodolistTC = (title: string, todolistId: string) => (dispatch: ThunkDispatch1) => {
    api.updateTitleTodolist(title, todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(updateTodolistAC(title, todolistId))
            }
        })
}
export const addTaskTC = (newText: string, todolistId: string) => (dispatch: ThunkDispatch1) => {
    api.createTask(newText, todolistId)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item, todolistId));
        });
}
export const updateTaskTC = (taskId: string, todolistId: string, task: TaskType) => (dispatch: ThunkDispatch1) => {
    api.updateTask(taskId, todolistId, task)
        .then(res => {
            dispatch(updateTaskAC(taskId, todolistId, task));
        });
}
export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatch1) => {
    api.deleteTask(taskId, todolistId)
        .then(res => {
            dispatch(deleteTaskAC(taskId, todolistId));
        });
}
export const setTodolistsTC = (): ThunkType => (dispatch: ThunkDispatch1) => {
    dispatch(loadingTodolistAC(true))
    api.getTodolist()
        .then(res => {
            dispatch(setTodolistAC(res));
            dispatch(loadingTodolistAC(false));
        })
    /*.catch((error) => {
        dispatch(setTodolistError())
    })*/
}
export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch1) => {
    api.createTodolist(title)
        .then(res => {
            let todolist = res.data.item;
            dispatch(addTodolistAC(todolist));
        });
}
