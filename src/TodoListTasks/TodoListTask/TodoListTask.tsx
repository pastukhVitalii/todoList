import React, {ChangeEvent} from "react";
import {TaskType} from "../../types/entities";

type StateType = {
    editMode: boolean
    title: string
}

type OwnPropsType = {
    changeStatus: (id: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    deleteTask: (id: string) => void
    task: TaskType
}

class TodoListTask extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        editMode: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status);
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value});
    };

    activateEditMode = (e: React.MouseEvent<HTMLElement>) => {
        this.setState({editMode: true});
    };

    deactivateEditMode = (e: React.FocusEvent<HTMLInputElement>) => {
        this.props.changeTitle(this.props.task.id, this.state.title);
        this.setState({editMode: false});
    };
    onDeleteTask = (event: React.MouseEvent<HTMLSpanElement>) => {
        this.props.deleteTask(this.props.task.id);
    };
    render = () => {
        let containerCssClass = this.props.task.status ? "todoList-task done" : "todoList-task";
        let priotityTitle = "";
        switch (this.props.task.priority) {
            case 0:
                priotityTitle = "Low";
                break;
            case 1:
                priotityTitle = "Middle";
                break;
            case 2:
                priotityTitle = "High";
                break;
            case 3:
                priotityTitle = "Urgently";
                break;
            case 4:
                priotityTitle = "Later";
                break;
        }
        debugger;
        return (
            <div className={containerCssClass}>
                <input type="checkbox" checked={this.props.task.status === 2}
                       onChange={this.onIsDoneChanged}/>
                {this.state.editMode
                    ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                             value={this.state.title}/>
                    : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                }, priority: {priotityTitle}
                <button onClick={this.onDeleteTask}>X</button>
            </div>
        );
    }
}

export default TodoListTask;