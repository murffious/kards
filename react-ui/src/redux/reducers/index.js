import { UNAUTH_USER } from '../actions/types';

import { combineReducers }        from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import authReducer         from './auth_reducer';


// Import and combine all reducers to one
const appReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    user: userReducer,
    signUpInfo: signUpReducer,
    notifications: notificationReducer
    // keywords: dashboardReducer
});
// This is a full state reset (no more persist even) if action UNAUTH_USER
const rootReducer = (state, action) => {
    if (action.type === UNAUTH_USER) {
      state = undefined
    }
  
    return appReducer(state, action)
}
export default rootReducer;