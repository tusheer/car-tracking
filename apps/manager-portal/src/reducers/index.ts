import { combineReducers } from 'redux';
import { authApi } from '../api/auth';
// import userReducer from './userReducer';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
