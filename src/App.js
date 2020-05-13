import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";

class App extends React.Component {
  state = {
    todoLists: [
    ]
  }
  nextTodoId = 4;

  addTodoList = (title) => {
    let newTodo = {
      id: this.nextTodoId,
      title: title
    };
    this.nextTodoId++;
    let newTodos = [...this.state.todoLists, newTodo];
    this.setState({todoLists: newTodos}, this.saveState);
  };

  saveState = () => {
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
      this.state.todoLists.forEach(t => {
        if (t.id >= this.nextTodoId) {
          this.nextTodoId = t.id + 1
        }
      })
    });
  };

  componentDidMount() {
    this.restoreState();
  };
  render = () => {
    const todolist = this.state.todoLists.map(tl =>
      <TodoList key={tl.id} id={tl.id} title={tl.title}/>)
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

export default App;




