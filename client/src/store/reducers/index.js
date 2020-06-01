// Redux
import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: userReducer
})