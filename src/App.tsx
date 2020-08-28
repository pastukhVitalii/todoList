import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, setTodolistsTC} from "./todolistReducer";
import {AppStateType} from "./store";
import {TodoType} from "./types/entities";

type MapStatePropsType = {
    todolists: Array<TodoType>
    loadingTodo: boolean
    loadingTasks: boolean
}

type MapDispatchPropsType = {
    setTodolistsTC: () => void;
    addTodolistTC: (title: string) => void;
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class App extends React.Component<PropsType> {

    componentDidMount() {
        this.restoreState();
    };

    addTodoList = (title: string) => {
        this.props.addTodolistTC(title);
    };

    restoreState = () => {
        this.props.setTodolistsTC();
    }

    render = () => {
        const todolist = this.props.todolists.map(tl =>
            <TodoList key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tl.tasks}
                      loadingTasks={this.props.loadingTasks}
            />)
        return (
            <div>
                <>
                    <AddNewItemForm addItem={this.addTodoList} placeholder={'Create a new task list'}
                                    btnName={'Create'}/>
                </>
                <div className="App">
                    {this.props.loadingTodo ? <span>Loading...</span> : todolist}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.todolist.todolists,
        loadingTodo: state.todolist.loadingTodo,
        loadingTasks: state.todolist.loadingTasks
    }
}

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setTodolistsTC,
    addTodolistTC
})(App);
export default ConnectedApp;



