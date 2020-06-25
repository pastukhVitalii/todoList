import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodolistAC, setTodolistsTC} from "./reducer";
import {api} from "./api/api";

class App extends React.Component {

  addTodoList = (title) => {
    // debugger;
    api.createTodolist(title)
      .then(res => {
        // debugger
        this.props.createTodolists(res.data.item);
      });
  };

  restoreState = () => {
    this.props.getTodo();
    /*api.getTodolist()
      .then(res => {
        // debugger
        this.props.setTodolists(res);
      });*/
  }

  componentDidMount() {
    this.restoreState();
  };

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
    createTodolists: (newTodolist) => {
      /*let action = {
        type: 'CREATE_TODOLIST',
        newTodolist
      };*/
      const action = addTodolistAC(newTodolist);
      dispatch(action);
    },
    getTodo: () => {
      const thunk = setTodolistsTC();
      dispatch(thunk);
    }
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;




