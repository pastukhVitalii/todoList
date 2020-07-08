import React from "react";
import TodoListTask from "./TodoListTask/TodoListTask";
import {TaskType} from "../types/entities";

type OwnPropsType = {
    tasks: Array<TaskType>
    changeStatus: (id: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    deleteTask: (id: string) => void
}
class TodoListTasks extends React.Component<OwnPropsType> {
  render = () => {
    let tasksElements = this.props.tasks.map(task => {
      return (
        <TodoListTask
          task={task}
          changeStatus={this.props.changeStatus}
          changeTitle={this.props.changeTitle}
          key={task.id}
          deleteTask={this.props.deleteTask}/>
      )
    });
    debugger;
    return (
      <div className="todoList-tasks">
        {tasksElements}
      </div>
    )
  }
}

export default TodoListTasks;