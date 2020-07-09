import {TaskType} from "./types/entities";

type initialStateType = {
    id: number
    tasks: Array<TaskType>
    title: string
}

const initialState: initialStateType = {
    id: 1,
    tasks: [],
    title: 'ddd'
}
const profileReducer = (state = initialState, action: any): initialStateType => {
    // debugger;
    switch (action.type) {

        default:
            return state
    }
};


export default profileReducer;
