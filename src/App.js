import React from 'react';
import './App.css';

import TodoListHeader from './TodoListHeader/TodoListHeader';
import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter/TodoListFooter';

class App extends React.Component {
   task = [
    {title: "HTML", isDone: true, priority: "high"},
    {title: "css", isDone: true, priority: "high"},
    {title: "js", isDone: true, priority: "low"},
    {title: "react", isDone: true, priority: "high"}
  ];
  filterValue = "Completed";


  render = () => {

    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader />
          <TodoListTasks tasks={this.task}/>
          <TodoListFooter filterValue={this.filterValue}/>
        </div>
      </div>
    );
  }
}

export default App;




