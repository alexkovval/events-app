import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
    id: number;
    username: string;
};

type AuthState = {
    token: string | null;
    user: User | null;
    expiresAt: number | null;
};

const initialState: AuthState = {
    token: null,
    user: null,
    expiresAt: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ token: string; user: User }>) {
            state.token = action.payload.token;
            state.expiresAt = Date.now() + 3600 * 1000;
            state.user = action.payload.user;
        },
    },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;