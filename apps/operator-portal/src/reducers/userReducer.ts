import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken, removeToken, setToken } from '../utils/authClient';
import { User } from 'types';

interface IState {
    user: Omit<User, 'assignedCar' | 'assignedCity'> | null;
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
        setUser(state: IState, action: PayloadAction<IState>) {
            setToken({ token: action.payload.token || '' });
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logoutUser(state: IState) {
            removeToken();
            state.user = null;
            state.token = null;
        },
    },
});

export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
