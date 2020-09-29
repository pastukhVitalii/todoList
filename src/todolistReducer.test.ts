import todolistReducer, {
    addTodolistAC,
    deleteTodolistAC,
    initialStateType,
    loadingTodoAC,
    updateTodolistAC
} from "./todolistReducer";

const startStates: initialStateType = {
    todolists: [
        {
            id: '1',
            addedDate: 'string',
            order: 1,
            title: 'learn js',
            tasks: [
                {
                    description: 'string',
                    title: 'new task',
                    completed: false,
                    status: 1,
                    priority: 1,
                    startDate: 'string',
                    deadline: 'string',
                    id: '123',
                    todoListId: '321',
                    order: 2,
                    addedDate: 'string',
                    loading: false

                }
            ]
        }
    ],
    loadingTodo: false,
    loadingTasks: false,
    userId: '',
    email: '',
    login: '',
    isAuth: false
}

test('correct todolist should be removed', () => {

    /*const endState = todolistReducer(startStates,
        {type: 'TodoApp/TodoList/DELETE_TODOLIST', todolistId: '1'})*/
    const endState = todolistReducer(startStates, deleteTodolistAC('1'));
    expect(endState.todolists.length).toBe(0);
});

test('title should be find job', () => {
    // const endState = todolistReducer(startStates,
    // {type: 'TodoList/Reducer/UPDATE_TITLE_TODOLIST', todolistId: '1', title: 'find job'});
    const endState = todolistReducer(startStates, updateTodolistAC('find job', '1'));
    expect(endState.todolists[0].title).toBe('find job');
})

test('should be create new todo list', () => {
    let newTodo = {
        id: '1',
        addedDate: 'string',
        order: 1,
        title: 'learn js',
        tasks: [
            {
                description: 'string',
                title: 'new task',
                completed: false,
                status: 1,
                priority: 1,
                startDate: 'string',
                deadline: 'string',
                id: '123',
                todoListId: '321',
                order: 2,
                addedDate: 'string',
                loading: false

            }
        ]
    };
    const endState = todolistReducer(startStates, addTodolistAC(newTodo));
    expect(endState.todolists.length).toBe(2);
})

test('todolists should be loaded', () => {
    const endState = todolistReducer(startStates,
        {
            type: 'TodoList/Reducer/SET_TODOLIST', todolists: [
                {
                    id: '1',
                    addedDate: 'string',
                    order: 1,
                    title: 'learn js',
                    tasks: [
                        {
                            description: 'string',
                            title: 'new task',
                            completed: false,
                            status: 1,
                            priority: 1,
                            startDate: 'string',
                            deadline: 'string',
                            id: '123',
                            todoListId: '321',
                            order: 2,
                            addedDate: 'string',
                            loading: false

                        }
                    ]
                }
            ],
        })
    expect(endState.todolists.length).toBe(1);
})

test('is loading', () => {
    const endState = todolistReducer(startStates,
        loadingTodoAC(true));
    expect(endState.loadingTodo).toBeTruthy();
})