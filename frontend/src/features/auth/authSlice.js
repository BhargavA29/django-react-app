import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        }
    }
});

export const { setCredentials, clearCredentials, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;