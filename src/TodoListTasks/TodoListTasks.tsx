import React from "react";
import TodoListTask from "./TodoListTask/TodoListTask";
import {TaskType} from "../types/entities";
import '../TodoList.css'

type OwnPropsType = {
    tasks: Array<TaskType>
    changeStatus: (id: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    changePriority: (id: string, priority: number) => void
    deleteTask: (id: string) => void
    loadingTasks: boolean
}
class TodoListTasks extends React.Component<OwnPropsType> {
  render = () => {
    let tasksElements = this.props.tasks.map(task => {
      return (
        <TodoListTask
          task={task}
          changeStatus={this.props.changeStatus}
          changeTitle={this.props.changeTitle}
          changePriority={this.props.changePriority}
          key={task.id}
          deleteTask={this.props.deleteTask}
        />
      )
    });
    return (
      <div className="todoList-tasks">
          {this.props.loadingTasks?<div>Loading...</div> : tasksElements}
          {this.props.tasks.length === 0 && !this.props.loadingTasks? <div>Hey create a new tasks</div>:  <span></span> }
      </div>
    )
  }
}

export default TodoListTasks;