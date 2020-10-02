import React from 'react';
import './App.css';

import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter/TodoListFooter';
import TodoListTitle from "./TodoListHeader/TodoListTitle";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskTC,
    deleteTaskTC,
    deleteTodolistTC,
    setTaskTC, signInTC, updateTaskTC,
    updateTodolistTC
} from "./todolistReducer";
import {TaskType, TodoUpdateObject} from "./types/entities";
import {AppStateType} from "./store";

type StateType = {
    filterValue: 'All' | 'Completed' | 'Active'
}

type OwnPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    loadingTasks: boolean
}

type MapDispatchPropsType = {
    setTaskTC: (todolistId: string) => void
    signInTC: (login: string, email: string) => void
    deleteTodolistTC: (todolistId: string) => void
    updateTodolistTC: (title: string, todolistId: string) => void
    addTaskTC: (newText: string, todolistId: string) => void
    updateTaskTC: (taskId: string, todolistId: string, task: TaskType) => void
    deleteTaskTC: (taskId: string, todolistId: string) => void
}

class TodoList extends React.Component<OwnPropsType & MapDispatchPropsType, StateType> {

    state: StateType = {
        filterValue: "All"
    };

    componentDidMount() {
        this.props.setTaskTC(this.props.id);
    }

    deleteTodolist = () => {
        this.props.deleteTodolistTC(this.props.id);
    };

    updateTodolist = (title: string) => {
        this.props.updateTodolistTC(title, this.props.id)
    }

    addTask = (newText: string) => {
        this.props.addTaskTC(newText, this.props.id)
    }

    changeFilter = (newFilterValue: 'All' | 'Completed' | 'Active') => {
        this.setState({filterValue: newFilterValue});
    };

    changeTask = (taskId: string, obj: TodoUpdateObject) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });

        if (changedTask) {
            let task = {...changedTask, ...obj};
            this.props.updateTaskTC(taskId, this.props.id, task)
        }
    };

    changeStatus = (task: string, status: number) => {
        this.changeTask(task, {status});
    }

    changeTitle = (task: string, title: string) => {
        this.changeTask(task, {title: title});
    }

    changePriority = (task: string, priority: number) => {
        this.changeTask(task, {priority: priority})
}

    deleteTask = (taskId: string) => {
        this.props.deleteTaskTC(taskId, this.props.id)
    }

    render = () => {
        let {tasks = []} = this.props;
        let tasksFilter = tasks.filter(t => {
            switch (this.state.filterValue) {
                case "Active":
                    return t.status !== 2;
                case "Completed":
                    return t.status === 2;
                default:
                    return true;
            }
        });
        return (
            <div className="App">
                <div className="todoList">
                        <TodoListTitle name={'Delete'}
                                       title={this.props.title}
                                       todolistId={this.props.id}
                                       deleteTodolist={this.deleteTodolist}
                                       updateTodolist={this.updateTodolist}/>
                        <AddNewItemForm addItem={this.addTask} placeholder={'Create task'} btnName={'Create'}/>
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}
                        changePriority={this.changePriority}
                        tasks={tasksFilter}
                        deleteTask={this.deleteTask}
                        loadingTasks={this.props.loadingTasks}
                    />
                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
                </div>
            </div>
        );
    }
}

const ConnectedTodoList = connect<{}, MapDispatchPropsType, OwnPropsType, AppStateType>(null, {
    setTaskTC,
    signInTC,
    deleteTodolistTC,
    updateTodolistTC,
    addTaskTC,
    updateTaskTC,
    deleteTaskTC
})(TodoList);

export default ConnectedTodoList;


