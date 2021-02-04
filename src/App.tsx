import React, {ChangeEvent} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistTC, setAuthUserDataTC, setTodolistsTC, signInTC, signOutTC} from "./todolistReducer";
import {AppStateType} from "./store";
import {TodoType} from "./types/entities";
import Input from "./common/Button/input/Input";
import Button from "./common/Button/button/Button";

type MapStatePropsType = {
    todolists: Array<TodoType>
    loadingTodo: boolean
    loadingTasks: boolean
    login: string
    isAuth: boolean
}

type MapDispatchPropsType = {
    setTodolistsTC: () => void;
    addTodolistTC: (title: string) => void;
    setAuthUserDataTC: () => void;
    signInTC: (email: string, password: string) => void;
    signOutTC: () => void;
}

type StateType = {
    email: string
    password: string
    error: boolean
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class App extends React.Component<PropsType, StateType> {

    state: StateType = {
        email: '',
        password: '',
        error: false
    }

    componentDidMount() {
        this.restoreState();
        this.props.setAuthUserDataTC();
    };

    addTodoList = (title: string) => {
        this.props.addTodolistTC(title);
    };

    restoreState = () => {
        this.props.setTodolistsTC();
    }

    setLogin = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: e.currentTarget.value
        })
    }
    setPassword = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.currentTarget.value
        })
    }
    signIn = () => {
        if (this.state.email.trim() === "") {
            this.setState({error: true})
        } else {
            this.props.signInTC(this.state.email, this.state.password);
        }
    }
    signOut = () => {
        this.props.signOutTC();
    }
    render = () => {
        const todolist = this.props.todolists.map(tl =>
            <TodoList key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tl.tasks}
                      loadingTasks={this.props.loadingTasks}
            />)
        return (
            <div>
                <>
                    <AddNewItemForm addItem={this.addTodoList} placeholder={'Create a new task list'}
                                    btnName={'Create'}/>
                </>
                <div className="authorization">
                    {this.props.isAuth ? this.props.login :
                        <div className={'authorizationForm'}>
                            <div className={'authFree'}>Hey!! For testing please use this email pastukh.v.7@gmail.com
                                and this password SNSqwerty07
                            </div>
                            <Input value={this.state.email} placeholder={'Login'} onChange={this.setLogin} error={this.state.error}/>
                            <Input value={this.state.password} placeholder={'Password'} onChange={this.setPassword} error={this.state.error}/>
                            <Button btnName={'sign in'} type={'primary'} onClick={this.signIn}/>
                        </div>}
                    {this.props.isAuth ?
                        <Button btnName={'Logout'} type={'primary'} onClick={this.signOut} small={true}/> : ''}
                </div>
                <div className="App">
                    {this.props.loadingTodo ? <span>Loading...</span> : todolist}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.todolist.todolists,
        loadingTodo: state.todolist.loadingTodo,
        loadingTasks: state.todolist.loadingTasks,
        login: state.todolist.login,
        isAuth: state.todolist.isAuth
    }
}

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setTodolistsTC,
    addTodolistTC,
    setAuthUserDataTC,
    signInTC,
    signOutTC
})(App);
export default ConnectedApp;




