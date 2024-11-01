import { combineReducers } from 'redux';
import userReducer from './userReducer';
// import other reducers if needed

const rootReducer = combineReducers({
    user: userReducer,
    // other reducers if needed
});

export default rootReducer;