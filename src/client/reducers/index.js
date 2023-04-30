import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import adminsReducer from './adminsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  admins: adminsReducer,
  auth: authReducer,
});

export default rootReducer;
