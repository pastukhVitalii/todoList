import React, {ChangeEvent} from "react";
import '../TodoList.css'
import Button from "../common/Button/button/Button";

type StateType = {
    editMode: boolean,
    title: string
}

type OwnPropsType = {
    title: string
    todolistId: string
    deleteTodolist: (todolistId: string) => void
    updateTodolist: (title: string) => void
    name: string
}

class TodoListTitle extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        editMode: false,
        title: ''
    }
    onDelete = () => {
        this.props.deleteTodolist(this.props.todolistId)
    }
    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateTodolist(this.state.title);
    }

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
    }

    render = () => {
        return (
            <div className="todoList-header">
                <span className="todoList-header-title">
                    {this.state.editMode
                        ? <input onBlur={this.deactivateEditMode} onChange={this.onTitleChanged} autoFocus={true}
                                 defaultValue={this.props.title}/>
                        : <span onClick={this.activateEditMode}>{this.props.title}</span>
                    }
                </span>
                <Button type={'primary'} small={true} onClick={this.onDelete} btnName={this.props.name}/>
            </div>
        )
    }
}

export default TodoListTitle;