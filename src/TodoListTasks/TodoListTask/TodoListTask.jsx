import React from "react";

class TodoListTask extends React.Component {

  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task, e.currentTarget.checked);
  }

  state = {
    editMode: false
  }

  activateEditMode = () => {
    this.setState({editMode: true});
  }

  deactivateEditMode = (e) => {
    this.props.changeTitle(this.props.task, e.currentTarget.value);
    this.setState({editMode: false});
  }

  onDeleteTask = () => {
    this.props.deleteTask(this.props.task.id);
  }

  render = () => {
    let isDone = this.props.task.status === 2;
    let containerCssClass = isDone ? "todoList-task done" : "todoList-task";
    return (
      <div className={containerCssClass}>
        <input type="checkbox" checked={isDone}
               onChange={this.onIsDoneChanged}/>
        {this.state.editMode
          ? <input onBlur={this.deactivateEditMode} /*onChange={this.onTitleChanged}*/ autoFocus={true}
                   defaultValue={this.props.task.title}/>
          : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
        }, priority: {this.props.task.priority}
        <button onClick={this.onDeleteTask}>X</button>
      </div>
    );
  }
}

export default TodoListTask;