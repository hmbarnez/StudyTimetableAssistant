import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {},
    reducers: {
        setSchedule: (state, action) => {
            return action.payload; // Set the schedule to the provided payload
        },
        clearSchedule: () => {
            return {}; // Clear the schedule
        },
    },
});

export const { setSchedule, clearSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;