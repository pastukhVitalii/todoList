import React from 'react';
import './App.css';

import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter/TodoListFooter';
import TodoListTitle from "./TodoListHeader/TodoListTitle";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {
  addTaskTC,
  changeTaskAC,
  deleteTaskAC,
  deleteTodolistTC,
  setTaskTC,
  updateTodolistTC
} from "./reducer";
import axios from "axios";
import {api} from "./api/api";

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
    /*axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
      {
        withCredentials: true,
        headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
      })*/

    /*.then(res => {
        // debugger
        this.props.setTask(res.data.items, this.props.id);
      });*/
    /*api.getTasks(this.props.id)
      .then(res => {
        // debugger
        this.props.setTask(res.items, this.props.id);
      });*/
  }

  deleteTodolist = () => {
    this.props.deleteTodolists(this.props.id);
    // debugger;
    /*api.deleteTodolist(this.props.id)
      .then(res => {
        // debugger
        this.props.deleteTodolists(this.props.id);
      });*/
  };

  updateTodolist = (title) => {
    this.props.updateTodolist(title, this.props.id)
    /*api.updateTitleTodolist(title, this.props.id)
      .then(res => {
        if (res.resultCode === 0) {
          this.props.updateTodolist({id: this.props.id, title: title})
        }
      })*/
  }

  addTask = (newText) => {
    this.props.addTask(newText, this.props.id)
    // debugger;
    /*api.createTask(newText, this.props.id)
      .then(res => {
        // debugger;
        this.props.addTask(res.data.data.item, this.props.id);
      });*/
  }

  changeFilter = (newFilterValue) => {
    this.setState({filterValue: newFilterValue});
  };

  /*changeFilter = (newFilterValue) => {
    this.setState({
      filterValue: newFilterValue
    }, () => { });
  }*/

  changeTask = (task, obj) => {
    // debugger;
    /*axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
      {
        ...task,
        ...obj
      },
      {
        withCredentials: true,
        headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
      })*/
    api.updateTask(task, obj, task.id, this.props.id)
      .then(res => {
        // debugger
        this.props.changeTask(task.id, obj, this.props.id);
      });
  }

  changeStatus = (task, isDone) => {
    this.changeTask(task, {status: isDone ? 2 : 0});
  }

  changeTitle = (task, title) => {
    this.changeTask(task, {title: title});
  }

  deleteTask = (taskId) => {
    // debugger;
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
      {
        withCredentials: true,
        headers: {"API-KEY": "0fdd1160-d444-4949-8fed-55c8b35e8906"}
      })
      .then(res => {
        // debugger
        this.props.deleteTask(taskId, this.props.id);
      });
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
    /*setTask(tasks, todolistId) {
      dispatch(setTasksAC(tasks, todolistId));
    },*/
    /*addTask(newTask, todolistId) {
      dispatch(addTaskAC(newTask, todolistId));
    },*/
    changeTask: (todolistId, taskId, obj) => {
      /*let action = {
        type: 'CHANGE_TASK',
        taskId, todolistId, obj
      };*/
      const action = changeTaskAC(todolistId, taskId, obj);
      dispatch(action)
    },
    deleteTask: (taskId, todolistId) => {
      const action = deleteTaskAC(todolistId, taskId);
      dispatch(action)
    },
    /*deleteTodolists: (todolistId) => {
      // debugger
      /!*let action = {
        type: 'DELETE_TODOLIST',
        todolistId
      };*!/
      const action = deleteTodolistAC(todolistId);
      dispatch(action);
    },*/
    /*updateTodolist: (todolist, todolistId) => {
      const action = updateTodolistAC(todolist, todolistId);
      dispatch(action);
    },*/
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
    }


  }
}
export default connect(null, mapDispatchToProps)(TodoList);




