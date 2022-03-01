import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    initialState: {
        loggedIn: !!localStorage.getItem('token'),
    },
    name: 'user',
    reducers: {
        login(state, { payload }) {
            state.loggedIn = true;
        },
        logout(state, action) {
            localStorage.removeItem('token');
            state.loggedIn = false;
        },
    },
});
export const { login, logout } = user.actions;
export default user.reducer;
