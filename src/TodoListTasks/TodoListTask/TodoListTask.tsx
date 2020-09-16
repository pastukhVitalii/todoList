import React, {ChangeEvent} from "react";
import {TaskType} from "../../types/entities";
import Button from "../../common/Button/button/Button";
import '../../TodoList.css';

type StateType = {
    editMode: boolean
    title: string
}

type OwnPropsType = {
    changeStatus: (id: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    changePriority: (id: string, priority: number) => void
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

    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };

    onPriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.props.changePriority(this.props.task.id, +event.currentTarget.value)
    };

    render = () => {
        let containerCssClass = this.props.task.status ? " done" : "";
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
        return (
            <div className={'todoList-task'}>
                <div className={containerCssClass}>
                    <input className={'checkBox'} type="checkbox"
                           checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}/>
                    {this.state.editMode
                        ? <input onBlur={this.deactivateEditMode}
                                 onChange={this.onTitleChanged}
                                 autoFocus={true}
                                 value={this.state.title}/>
                        : <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                    }, <b>priority:</b>
                    <select className={'select'} value={this.props.task.priority} onChange={this.onPriorityChange}>
                        <option value='2'>High</option>
                        <option value='1'>Middle</option>
                        <option value='0'>Low</option>
                    </select>
                </div>
                <Button type={'delete'} onClick={this.onDeleteTask} btnName={'x'}/>
            </div>
        );
    }
}

export default TodoListTask;