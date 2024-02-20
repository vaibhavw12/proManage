import { configureStore } from '@reduxjs/toolkit';
import toDosSlices from '../slices/ToDosSlices';

export const store = configureStore({
    reducer: {
        todo_type : toDosSlices
    }
})