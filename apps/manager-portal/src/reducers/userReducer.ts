import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/User';
import { getToken, removeToken, setToken } from '../libs/authClient';

interface IState {
    user: IUser | null;
    token: string | null;
}

const initialState: IState = {
    user: null,
    token: getToken() || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IState>) {
            setToken(action.payload.token as string);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logoutUser(state) {
            removeToken();
            state.user = null;
            state.token = null;
        },
    },
});

export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
