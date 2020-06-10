import React from "react";

class TodoListTitle extends React.Component {
  onDelete = () => {
    // debugger
    this.props.deleteTodolist(this.props.todolistId)
  }
  render = () => {
    return (
      <div className="todoList-header">
        <h3 className="todoList-header__title">{this.props.title}</h3>
        <button onClick={this.onDelete}>X</button>
      </div>
    )
  }
}
export default TodoListTitle;