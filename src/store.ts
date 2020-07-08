import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer from "./todolistReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import profileReducer from "./profileReducer";

let rootReducer = combineReducers({
    todolist: todolistReducer,
    profile: profileReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;