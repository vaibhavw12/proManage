import { createSlice } from '@reduxjs/toolkit';

const toDosSlices = createSlice({
    name: 'todo_type',
    initialState: {
        backlog: [],
        todo: [],
        progress: [],
        done: []
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
    },
});

export const { setBacklog, setToDo, setProgress, setDone } = toDosSlices.actions;
export default toDosSlices.reducer;