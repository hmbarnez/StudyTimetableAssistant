// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';
import scheduleSlice from './reducers/scheduleReducer'

const store = configureStore({
    reducer: {
        user: userSlice,
        schedule: scheduleSlice,
    },
});

export default store;
