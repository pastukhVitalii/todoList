import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, setTodolistsTC} from "./todolistReducer";
import {AppStateType} from "./store";
import {TodoType} from "./types/entities";

type OwnPropsType = {
    title: string
}

type MapStatePropsType = {
    todolists: Array<TodoType>
    loading: boolean
}

type MapDispatchPropsType = {
    setTodolistsTC: () => void;
    addTodolistTC: (title: string) => void;
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class App extends React.Component<PropsType> {

    componentDidMount() {
        // this.props.title;
        this.restoreState();
    };

    addTodoList = (title: string) => {
        this.props.addTodolistTC(title);
        // debugger;
        /*api.createTodolist(title)
          .then(res => {
            // debugger
            this.props.createTodolists(res.data.item);
          });*/
    };

    restoreState = () => {
        this.props.setTodolistsTC();
        /*api.getTodolist()
          .then(res => {
            // debugger
            this.props.setTodolists(res);
          });*/
    }

    render = () => {
        // debugger;
        const todolist = this.props.todolists.map(tl =>
            <TodoList key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tl.task}
            />)
        return (
            <div>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {this.props.loading ? <span>Loading...</span> : todolist}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.todolist.todolists,
        loading: state.todolist.loading
    }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    getTodo: () => {
      const thunk = setTodolistsTC();
      dispatch(thunk);
    },
    addTodo: (title) => {
      dispatch(addTodolistTC(title));
    }
  }
}*/

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    setTodolistsTC,
    addTodolistTC
})(App);
export default ConnectedApp;




