import { configureStore } from '@reduxjs/toolkit';
import locationReudcer from './travelSlice'

// 用 configureStore建立 reducer
export default configureStore({
    reducer: {
        location: locationReudcer
    },
});