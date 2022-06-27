import { combineReducers } from 'redux';
import { authApi } from '../api/auth';
import { cityApi } from '../api/city';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
});

export default rootReducer;
