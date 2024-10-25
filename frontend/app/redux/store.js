// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';

const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export default store;
