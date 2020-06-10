import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, deleteTodolistAC} from "./reducer";

class App extends React.Component {

  nextTodoId = 10;

  addTodoList = (title) => {
    // debugger;
    let newTodo = {
      id: this.nextTodoId,
      // id: 10,
      title: title,
      tasks: []
    };
    this.props.createTodolists(newTodo);
    this.nextTodoId++;
    /*let newTodos = [...this.state.todolistsists, newTodo];
    this.setState({todolists: newTodos}, this.saveState);*/
  };

  /*saveState = () => {
    let stateAsString = JSON.stringify(this.state);
    localStorage.setItem('todolists', stateAsString);
  };
  restoreState = () => {
    let state = {
      task:[],
    };
    let stateAsString = localStorage.getItem('todolists' );
    if (stateAsString) {
      state = JSON.parse(stateAsString);
    }
    this.setState(state, () => {
      this.state.todolists.forEach(t => {
        if (t.id >= this.nextTodoId) {
          this.nextTodoId = t.id + 1
        }
      })
    });
  };*/

  componentDidMount() {
    // this.restoreState();
  };

  deleteTodolist = (todolistId) => {
    // debugger;
    this.props.deleteTodolist(todolistId)
  };

  render = () => {
    // debugger;
    const todolist = this.props.todolists.map(tl =>
      <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks} deleteTodolist={this.props.deleteTodolist}/>)
    return (
      <div>
        <div>
          <AddNewItemForm addItem={this.addTodoList}/>
        </div>
        <div className="App">
          {todolist }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todolists: state.todolists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTodolists: (newTodolist) => {
      /*let action = {
        type: 'CREATE_TODOLIST',
        newTodolist
      };*/
      const action = addTodolistAC(newTodolist);
      dispatch(action);
    },
    deleteTodolist: (todolistId) => {
      // debugger
      /*let action = {
        type: 'DELETE_TODOLIST',
        todolistId
      };*/
      const action = deleteTodolistAC(todolistId);
      dispatch(action);
    }
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;




