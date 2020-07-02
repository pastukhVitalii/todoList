import React from "react";

class TodoListTitle extends React.Component {

  state = {
    editMode: false,
    title: ''
  }
  onDelete = () => {
    // debugger
    this.props.deleteTodolist(this.props.todolistId)
  }
  activateEditMode = () => {
    this.setState({editMode: true});
  }

  deactivateEditMode = () => {
    this.setState({editMode: false});
    this.props.updateTodolist(this.state.title);
  }

  onTitleChanged = (e) => {
    this.setState({title: e.currentTarget.value})
  }

  render = () => {
    return (
      <div className="todoList-header">
        <h3 className="todoList-header__title">
          {this.state.editMode
            ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                     defaultValue={this.props.title}/>
            : <span onClick={this.activateEditMode}>{this.props.title}</span>
          }
        </h3>
        <button onClick={this.onDelete}>X</button>
      </div>
    )
  }
}

export default TodoListTitle;