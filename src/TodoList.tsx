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
  setTaskTC, updateTaskTC,
  updateTodolistTC
} from "./todolistReducer";
import {TaskType, TodoType, TodoUpdateObject} from "./types/entities";
import {AppStateType} from "./store";

type StateType = {
    filterValue: string
}

type OwnPropsType = {
    id: string
    title: string
    newFilterValue: string
    newText: string
    tasks: Array<TaskType>
    setTask: (id: string) => void
    deleteTodolists: (id: string) => void
    updateTodolist: (title: string, id: string) => void
    addTask: (newText: string, id: string) => void
    updateTask: (taskId: string, id: string, task: {status: number, title: string}) => void
    changeTask: (task: {status: number, title: string}, obj: {status: number}) => void
    deleteteTask: (taskId: string, id: string) => void
}

type MapDispatchPropsType = {
    setTaskTC: (todolistId: string) => void
    deleteTodolistTC: (todolistId: string) => void
    updateTodolistTC: (todolist: TodoType, todolistId: string) => void
    addTaskTC: (newText: string, todolistId: string) => void
    updateTaskTC: (taskId: string, obj: TodoUpdateObject, todolistId: string) => void
    deleteTaskTC: (taskId: string, todolistId: string) => void
}

class TodoList extends React.Component<OwnPropsType & MapDispatchPropsType, StateType> {

  state: StateType = {

    filterValue: "All"
  };
  nextTaskId = 10;

  componentDidMount() {
    this.props.setTask(this.props.id);
  }

  deleteTodolist = () => {
    this.props.deleteTodolists(this.props.id);

  };

  updateTodolist = (title: string) => {
    this.props.updateTodolist(title, this.props.id)
  }

  addTask = (newText: string) => {
    this.props.addTask(newText, this.props.id)
  }

  changeFilter = (newFilterValue: string) => {
    this.setState({filterValue: newFilterValue});
  };

  changeTask = (taskId: string, obj: TodoUpdateObject) => {
    debugger;
    let changedTask = this.props.tasks.find(task => {
      return task.id === taskId
    });

    // if(obj &  obj.title & obj.status) {
        let task = {...changedTask, ...obj};
        this.props.updateTask(taskId, this.props.id, task)
    // }

  };

  changeStatus = (task: string, status: number ) => {
    // debugger;
    this.changeTask(task, {status});
  }

  changeTitle = (task: string, title: string) => {
    // debugger;
    this.changeTask(task, {title: title});
  }

  deleteTask = (taskId: string) => {
    // debugger;
    this.props.deleteteTask(taskId, this.props.id)
  }

  render = () => {
    // debugger;
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
          <div className="todoList-header">
            <TodoListTitle title={this.props.title}
                           todolistId={this.props.id}
                           deleteTodolist={this.deleteTodolist}
                           updateTodolist={this.updateTodolist}/>
            <AddNewItemForm addItem={this.addTask}/>
          </div>
          <TodoListTasks
            changeStatus={this.changeStatus}
            changeTitle={this.changeTitle}
            tasks={tasksFilter}
            deleteTask={this.deleteTask}
            todolistId={this.props.id}
          />
          <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
        </div>
      </div>
    );
  }
}

/*const mapDispatchToProps = (dispatch) => {
  // debugger;
  return {
    /!*updateTask: (todolistId, taskId, obj) => {
      debugger;
      const action = updateTaskAC(todolistId, taskId, obj);
      dispatch(action)
    },*!/

    deleteTask: (taskId, todolistId) => {
      const action = deleteTaskAC(todolistId, taskId);
      dispatch(action)
    },
    setTask: (todolistId) => {
      dispatch(setTaskTC(todolistId));
    },
    deleteTodolists: (todolistId) => {
      dispatch(deleteTodolistTC(todolistId));
    },
    updateTodolist: (todolist, todolistId) => {
      dispatch(updateTodolistTC(todolist, todolistId))
    },
    addTask: (newText, todolistId) => {
      dispatch(addTaskTC(newText, todolistId))
    },
    updateTask: (taskId, obj, todolistId) => {
      const thunk = updateTaskTC(taskId, obj, todolistId);
      dispatch(thunk);
    },
    deleteteTask: (taskId, todolistId) => {
      dispatch(deleteTaskTC(taskId, todolistId))
    }
  }
}*/

export default connect<{}, MapDispatchPropsType, OwnPropsType, AppStateType>(null, {
    setTaskTC,
    deleteTodolistTC,
    updateTodolistTC,
    addTaskTC,
    updateTaskTC,
    deleteTaskTC
})(TodoList);




