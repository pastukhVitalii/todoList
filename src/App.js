import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, setTodolistAC, setTodolistsTC} from "./reducer";

class App extends React.Component {

  componentDidMount() {
    this.restoreState();
  };

  addTodoList = (title) => {
    this.props.addTodo(title);
    // debugger;
    /*api.createTodolist(title)
      .then(res => {
        // debugger
        this.props.createTodolists(res.data.item);
      });*/
  };

  restoreState = () => {
    this.props.getTodo();
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
                tasks={tl.tasks}
      />)
    return (
      <div>
        <div>
          <AddNewItemForm addItem={this.addTodoList}/>
        </div>
        <div className="App">
          {todolist}
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
    setTodolists: (newTodolist) => {
      const action = setTodolistAC(newTodolist);
      dispatch(action)
    },
    /*createTodolists: (newTodolist) => {
      /!*let action = {
        type: 'CREATE_TODOLIST',
        newTodolist
      };*!/
      const action = addTodolistAC(newTodolist);
      dispatch(action);
    },*/
    getTodo: () => {
      const thunk = setTodolistsTC();
      dispatch(thunk);
    },
    addTodo: (title) => {
      dispatch(addTodolistTC(title));
    }
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;




