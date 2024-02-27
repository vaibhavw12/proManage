import { createSlice } from '@reduxjs/toolkit';

const activeTab = createSlice({
    name: 'tabs',
    initialState: {
        board: true,
        analytics: false,
        settings: false,
    },
    reducers: {
        setBoard: (state, action) => {
            state.board = action.payload;
            state.analytics = !action.payload;
            state.settings = !action.payload;
        },
        setAnalytics: (state, action) => {
            state.board = !action.payload;
            state.analytics = action.payload;
            state.settings = !action.payload;
        },
        setSettings: (state, action) => {
            state.board = !action.payload;
            state.analytics = !action.payload;
            state.settings = action.payload;
        },
    },
});

export const { setBoard, setAnalytics, setSettings } = activeTab.actions;
export default activeTab.reducer;