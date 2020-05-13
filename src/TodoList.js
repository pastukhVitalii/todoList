import React from 'react';
import './App.css';

import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter/TodoListFooter';
import TodoListTitle from "./TodoListHeader/TodoListTitle";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";

class TodoList extends React.Component {

  state = {
    tasks: [
      /*{id: 1, title: "HTML", isDone: true, priority: "high"},
      {id: 2, title: "css", isDone: true, priority: "high"},
      {id: 3, title: "js", isDone: true, priority: "low"},
      {id: 4, title: "react", isDone: false, priority: "high"}*/
    ],
    filterValue: "All"
  };
  nextTaskId = 1;

  saveState = () => {
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
  };

  componentDidMount() {
    this.restoreState();
  };

  addTask = (newText) => {
    let newTask = {
      title: newText,
      isDone: false,
      priority: "low",
      id: this.nextTaskId
    };
    this.nextTaskId++;
    let newTasks = [...this.state.tasks, newTask];
    this.setState({tasks: newTasks}, this.saveState);
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
    let newTasks = this.state.tasks.map(t => {
      if (t.id === taskId) {
        return {...t, ...obj}
      }
      return t;
    });
    this.setState({tasks: newTasks}, this.saveState)
  };

  render = () => {
    return (
      <div className="App">
        <div className="todoList">
          <div className="todoList-header">
            <TodoListTitle title={this.props.title}/>
            <AddNewItemForm addItem={this.addTask}/>
          </div>
          <TodoListTasks
            changeStatus={this.changeStatus}
            changeTitle={this.changeTitle}
            tasks={this.state.tasks.filter(t => {
              switch (this.state.filterValue) {
                case "Active":
                  return t.isDone === false;
                case "Completed":
                  return t.isDone === true;
                default:
                  return true;
              }
            })}

          />
          <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
        </div>
      </div>
    );
  }
}

export default TodoList;




