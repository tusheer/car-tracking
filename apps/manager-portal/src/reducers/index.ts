import { combineReducers } from 'redux';
import membersReducer from './membersReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    members: membersReducer,
    user: userReducer,
});

export default rootReducer;
