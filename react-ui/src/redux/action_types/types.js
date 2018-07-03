// maybe call this index.js and create separate files


//= =====================
// Notification Actions
//= =====================
export const STORE_NOTIFICATIONS = 'store_notifications';

//= =====================
// Auth Actions
//= =====================
export const AUTH_USER               = 'auth_user',
             UNAUTH_USER             = 'unauth_user',
             AUTH_ERROR              = 'auth_error',
             FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
             RESET_PASSWORD_REQUEST  = 'reset_password_request',
             PROTECTED_TEST          = 'protected_test';

//= =====================
// User Profile Actions
//= =====================
export const FETCH_USER  = 'fetch_user';
export const USER_UPDATE = 'user_update';
export const ADD_USER    = 'add_user';
export const GET_USER    = 'get_user';
export const UPDATE_USER = 'edit_user';
export const DELETE_USER = 'delete_user';