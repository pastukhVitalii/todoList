import React, {ChangeEvent, KeyboardEvent} from "react";
import '../TodoList.css'
import Button from "../common/Button/button/Button";

export type OwnPropsType = {
    addItem: (newText: string) => void,
    placeholder: string,
    btnName: string
}

type StateType = {
    error: boolean
    title: string
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {

    state: StateType = {
        error: false,
        title: ''
    }

    onAddItemClick = () => {
        let newText = this.state.title;
        if (newText.trim() === "") {
            this.setState({error: true})
        } else {
            this.props.addItem(newText);
            this.setState({
                error: false,
                title: ''
            });
        }
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    }

    onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    }

    render = () => {
        let classNameForInput = (this.state.error) ? 'error' : '';
        return (
            <div className="item-form">
                <input
                    type="text" placeholder={this.props.placeholder}
                    className={`${classNameForInput} + input-form`}
                    onChange={this.onTitleChanged}
                    onKeyPress={this.onKeyPress}
                    value={this.state.title}
                />
                <Button type={'primary'} small={true} onClick={this.onAddItemClick} btnName={this.props.btnName}/>
            </div>
        )
    }
}

export default AddNewItemForm;