import { createSlice } from '@reduxjs/toolkit';

const toDosSlices = createSlice({
    name: 'todo_type',
    initialState: {
        backlog: [],
        todo: [],
        progress: [],
        done: [],
        collapse: false,
        update : false
    },
    reducers: {
        setBacklog: (state, action) => {
            state.backlog = action.payload;
        },
        setToDo: (state, action) => {
            state.todo = action.payload;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        setDone: (state, action) => {
            state.done = action.payload;
        },
        setCollapse: (state) =>{
            state.collapse = !state.collapse
        },
        setUpdate: (state) =>{
            state.update = !state.update
        }
    },
});

export const { setBacklog, setToDo, setProgress, setDone, setCollapse, setUpdate } = toDosSlices.actions;
export default toDosSlices.reducer;