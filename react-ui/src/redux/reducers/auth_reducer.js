import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from '../actions/types';
// import default from 'redux-form/lib/defaultShouldValidate'; may not use yet

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false, loggedInUser:{} };

export default function authReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    // setting user to authenticated 
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true, loggedInUser: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, message: action.payload.message };
    case RESET_PASSWORD_REQUEST:
      return { ...state, message: action.payload.message };
    case PROTECTED_TEST:
      return { ...state, content: action.payload.message };
      
    default:
      return state
  }
    
  return state;
}
