import React from 'react';
import './App.css';

import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter/TodoListFooter';
import TodoListTitle from "./TodoListHeader/TodoListTitle";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {
  addTaskTC,
  deleteTaskAC, deleteTaskTC,
  deleteTodolistTC,
  setTaskTC, updateTaskAC, updateTaskTC,
  updateTodolistTC
} from "./todolistReducer";

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

  componentDidMount() {

    this.props.setTask(this.props.id);
  }

  deleteTodolist = () => {
    this.props.deleteTodolists(this.props.id);

  };

  updateTodolist = (title) => {
    this.props.updateTodolist(title, this.props.id)
  }

  addTask = (newText) => {
    this.props.addTask(newText, this.props.id)
  }

  changeFilter = (newFilterValue) => {
    this.setState({filterValue: newFilterValue});
  };

  changeTask = (taskId, obj) => {
    debugger;
    let changedTask = this.props.tasks.find(task => {
      return task.id === taskId
    });

    let task = {...changedTask, ...obj};
    this.props.updateTask(taskId, this.props.id, task)
  };

  changeStatus = (task, isDone) => {
    debugger;
    this.changeTask(task, {status: isDone ? 2 : 0});
  }

  changeTitle = (task, title) => {
    debugger;
    this.changeTask(task, {title: title});
  }

  deleteTask = (taskId) => {
    debugger;
    this.props.deleteteTask(taskId, this.props.id)
    /*// debugger;
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
      {
        withCredentials: true,
        headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
      })
      .then(res => {
        // debugger
        this.props.deleteTask(taskId, this.props.id);
      });*/
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

const mapDispatchToProps = (dispatch) => {
  // debugger;
  return {
    /*updateTask: (todolistId, taskId, obj) => {
      debugger;
      const action = updateTaskAC(todolistId, taskId, obj);
      dispatch(action)
    },*/

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
}
export default connect(null, mapDispatchToProps)(TodoList);




