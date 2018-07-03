import 'dotenv/config';
import axios from 'axios';
import { errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from './types';
import { setRootFolder } from '../../redux/actions/file_manager';
import { logoutUser } from './auth';
import Cookies from 'universal-cookie';

const queryString = require('query-string');
const cookies = new Cookies();

const API_URL = process.env.REACT_APP_API_URL_BASE + '/trudigital';


//= ===============================
// Authentication actions
//= ===============================
let config = {
    headers: { 
        "accept": "application/json", 
        'content-type':'application/x-www-form-urlencoded',
        'authorization': 'Bearer ' + process.env.REACT_APP_API_TOKEN 
    }
};

// TO-DO: Add expiration to cookie
export function loginUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${API_URL}/user/auth/`, queryString.stringify({
            email,
            password
        }), config)
        .then((response) => {
            const token = response.data.token
            cookies.set('token', response.data.token, { path: '/' });
            dispatch({ 
                type: AUTH_USER,
                payload: response.data
            });

            // Get the organization root folder now that we are logged in.
            dispatch(setRootFolder());

        })
        .catch((error) => {
            errorHandler(dispatch, error.response, AUTH_ERROR);
        }); 
    };
}

export function logoutUser(error) {

    return function (dispatch) {
        dispatch({ type: UNAUTH_USER, payload: error || '' });
        cookies.remove('token', { path: '/' });
    };
}

//= ===============================
// Utility actions
//= ===============================

export function errorHandler(dispatch, error, type) {

    let errorMessage = error.response ? error.response.data : error;

    // NOT AUTHENTICATED ERROR
    // if (error.status === 401 || error.response.status === 401) {
    //   errorMessage = 'You are not authorized to do this.';
    //   return dispatch(logoutUser(errorMessage));
    // }

    dispatch({
        type,
        payload: errorMessage,
    });
}
