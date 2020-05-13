import React from "react";


class TodoListTask extends React.Component {
  state = {
    isEditMode: false
  };
  activatedEditMode = () => {
    this.setState({isEditMode: true})
  };
  deActivatedEditMode = () => {
    this.setState({isEditMode: false})
  };

  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
  };

  onTitleChanged = (e) => {
    this.props.changeTitle(this.props.task.id, e.currentTarget.value)
  };

  render = () => {
    let taskIsDoneClass = this.props.task.isDone ? 'todoList-task done': 'todoList-task'
    return (
      <div className={taskIsDoneClass}>
        <input
          type="checkbox"
          checked={this.props.task.isDone}
          onChange={this.onIsDoneChanged} />
        {this.state.isEditMode
          ? <input
            value={this.props.task.title}
            autoFocus={true}
            onBlur={this.deActivatedEditMode}
            onChange={this.onTitleChanged}/>
          : <span onClick={this.activatedEditMode}>{this.props.task.id}: {this.props.task.title}</span>
        }
        {/*<span>{this.props.task.title}</span>*/}
        <span>{` priority: ${this.props.task.priority} ${this.props.task.id}`}</span>
        {/*<span>{this.props.task.id}</span>*/}
      </div>
    )
  }
}

export default TodoListTask;