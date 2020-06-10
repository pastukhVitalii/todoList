import React from 'react';
import './App.css';

import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter/TodoListFooter';
import TodoListTitle from "./TodoListHeader/TodoListTitle";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC} from "./reducer";

class TodoList extends React.Component {

  state = {
    /*tasks: [
      /!*{id: 1, title: "HTML", isDone: true, priority: "high"},
      {id: 2, title: "css", isDone: true, priority: "high"},
      {id: 3, title: "js", isDone: true, priority: "low"},
      {id: 4, title: "react", isDone: false, priority: "high"}*!/
    ],*/
    filterValue: "All"
  };
  nextTaskId = 10;

  /*saveState = () => {
    let stateAsString = JSON.stringify(this.state);
    localStorage.setItem('state' + this.props.id, stateAsString);
  };

  restoreState = () => {
    let state = {
      task: [],
      filterValue: 'All'
    };
    let stateAsString = localStorage.getItem('state' + this.props.id);
    if (stateAsString) {
      state = JSON.parse(stateAsString);
    }
    this.setState(state, () => {
      this.state.tasks.forEach(t => {
        if (t.id >= this.nextTaskId) {
          this.nextTaskId = t.id + 1
        }
      })
    });
  };*/

  componentDidMount() {
    // this.restoreState();
  };

  addTask = (newText) => {
    let newTask = {
      title: newText,
      isDone: false,
      priority: "low",
      id: this.nextTaskId
      //  id: 10
    };
    this.nextTaskId++;
    // let newTasks = [...this.state.tasks, newTask];
    // this.setState({tasks: newTasks}, this.saveState);
    this.props.addTask(this.props.id, newTask);
  };

  changeFilter = (newFilterValue) => {
    this.setState({filterValue: newFilterValue});
  };

  changeStatus = (taskId, isDone) => {
    this.changeTask(taskId, {isDone: isDone})
  };

  changeTitle = (taskId, title) => {
    this.changeTask(taskId, {title: title})
  };

  changeTask = (taskId, obj) => {
    // debugger;
    this.props.changeTask(this.props.id, taskId, obj)
    /*let newTasks = this.state.tasks.map(t => {
      if (t.id === taskId) {
        return {...t, ...obj}
      }
      return t;
    });
    this.setState({tasks: newTasks}, this.saveState)*/
  };

  deleteTask = (taskId) => {
    // debugger;
    this.props.deleteTask(this.props.id, taskId)
  };

  render = () => {
    // let {tasks = []} = this.props;
    let tasksFilter = this.props.tasks.filter(t => {
      switch (this.state.filterValue) {
        case "Active":
          return t.isDone === false;
        case "Completed":
          return t.isDone === true;
        default:
          return true;
      }
    });
    return (
      <div className="App">
        <div className="todoList">
          <div className="todoList-header">
            <TodoListTitle title={this.props.title} todolistId={this.props.id} deleteTodolist={this.props.deleteTodolist} />
            <AddNewItemForm addItem={this.addTask} />
          </div>
          <TodoListTasks
            changeStatus={this.changeStatus}
            changeTitle={this.changeTitle}
            tasks={tasksFilter}
            deleteTask={this.props.deleteTask}
            todolistId={this.props.id}
          />
          <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  // debugger;
  return {
    addTask: (todolistId, newTask) => {
      /*let action = {
        type: 'ADD_TASK',
        newTask, todolistId
      };*/
      const action = addTaskAC(todolistId, newTask);
      dispatch(action);
    },
    changeTask: (todolistId, taskId, obj) => {
      /*let action = {
        type: 'CHANGE_TASK',
        taskId, todolistId, obj
      };*/
      const action = changeTaskAC(todolistId,taskId,obj);
      dispatch(action)
    },
    deleteTask: (taskId, todolistId) => {

      /*let action = {
        type: 'DELETE_TASK',
        taskId, todolistId
      };*/
      const action = deleteTaskAC(taskId, todolistId);
      dispatch(action);
    }
  }
}
export default connect(null, mapDispatchToProps)(TodoList);




