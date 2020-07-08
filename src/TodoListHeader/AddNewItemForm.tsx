import React, { ChangeEvent, KeyboardEvent } from "react";

type OwnPropsType = {
    addItem: (newText: string) => void
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
    })
  }
  onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.onAddItemClick();
    }
  }

  render = () => {
    let classNameForInput = (this.state.error) ? 'error' : '';
    return (
      <div className="todoList-header">
        <div className="todoList-newTaskForm">
          <input
            type="text" placeholder="New item name"
            className={classNameForInput}
            onChange={this.onTitleChanged}
            onKeyPress={this.onKeyPress}
            value={this.state.title}
          />
          <button onClick={this.onAddItemClick}>Add</button>
        </div>
      </div>
    )
  }
}

export default AddNewItemForm;