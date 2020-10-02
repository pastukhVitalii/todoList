import React from "react";
import '../TodoList.css';
import Button from "../common/Button/button/Button";

type StateType = {
    isHidden: boolean
}

export type OwnPropsType = {
    changeFilter: (newFilterValue: 'All' | 'Completed' | 'Active') => void
    filterValue: 'All' | 'Completed' | 'Active'
}

class TodoListFooter extends React.Component<OwnPropsType, StateType> {
    state: StateType = {
        isHidden: false
    }

    onAllFilterClick = () => {
        this.props.changeFilter('All')
    }
    onCompletedFilterClick = () => {
        this.props.changeFilter('Completed')
    }
    onActiveFilterClick = () => {
        this.props.changeFilter('Active')
    }
    onShowFiltersClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        this.setState({isHidden: true})
    }
    onHideFiltersClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        this.setState({isHidden: false})
    }

    render = () => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
        return (
            <>
                <div className={"todoList-footer-btn"}>
                    {!this.state.isHidden && <>
                        <Button type={`primary + ${classForAll}`} small={true} onClick={this.onAllFilterClick}
                                btnName={'All'}/>
                        <Button type={`primary + ${classForCompleted}`} small={true}
                                onClick={this.onCompletedFilterClick}
                                btnName={'Completed'}/>
                        <Button type={`primary + ${classForActive}`} small={true} onClick={this.onActiveFilterClick}
                                btnName={'Active'}/>
                    </>}
                </div>
                <div className={'todoList-footer-filter'}>{!this.state.isHidden && <span onClick={this.onShowFiltersClick}>Hide filter </span>}
                    {this.state.isHidden && <span onClick={this.onHideFiltersClick}>Show filter </span>}</div>
            </>
        )
    }
}

export default TodoListFooter;
/*

` ${class1} ${this.isDone && class2}`
  ` ${class1} text ${this.isDone && class2}`
*/
