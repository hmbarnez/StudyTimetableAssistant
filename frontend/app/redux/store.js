// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';
import scheduleSlice from './reducers/scheduleReducer'

const store = configureStore({
    reducer: {
        user: userSlice,
        chedule: scheduleSlice,
    },
});

export default store;
