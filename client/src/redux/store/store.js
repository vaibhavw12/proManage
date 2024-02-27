import { configureStore } from '@reduxjs/toolkit';
import toDosSlices from '../slices/ToDosSlices';
import activeTab from '../slices/activeTab'

export const store = configureStore({
    reducer: {
        todo_type : toDosSlices,
        tabs : activeTab
    }
})