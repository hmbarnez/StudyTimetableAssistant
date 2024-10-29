// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.error = null;
        },
        logout(state) {
            state.user = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        update(state, action) {
            state.user = action.payload;
            state.error = null;
        },
    },
});


export const { login, logout, setLoading, setError, update } = userSlice.actions;

export default userSlice.reducer;
