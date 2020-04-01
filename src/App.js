import React from 'react';
import './App.css';

import TodoListHeader from './TodoListHeader/TodoListHeader';
import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter/TodoListFooter';

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader />
          <TodoListTasks />
          <TodoListFooter />
        </div>
      </div>
    );
  }
}

export default App;

