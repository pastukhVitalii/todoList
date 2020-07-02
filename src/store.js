import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer from "./todolistReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

let reducer = combineReducers({
  todolist: todolistReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;	