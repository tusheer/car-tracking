import { combineReducers } from 'redux';
import { baseApi } from '../config';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
