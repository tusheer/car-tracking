import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
