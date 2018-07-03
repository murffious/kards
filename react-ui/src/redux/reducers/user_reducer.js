
import { FETCH_USER, USER_UPDATE } from '../actions/types';
import axios from 'axios';

const API_TOKEN = process.env.REACT_APP_API_TOKEN
const API_URL = process.env.REACT_APP_API_URL_BASE + '/trudigital';

const INITIAL_STATE = { user: {email: null, first_name: null, last_name: null, phone_number: null}};
  export default function userReducer( state = INITIAL_STATE, action) {
    switch (action.type) {
      case `${FETCH_USER}`:
        return Object.assign({}, state, {user: action.payload});
      case `${USER_UPDATE}`:
        return { ...state, [action.payload.prop]: action.payload.value };
      default:
       return state;
    }
  }
 
export function fetchUser(id) {
  let getUserURL = `${API_URL}/user/${id}/`;
    return function (dispatch) {
     axios.get(getUserURL, {
        headers: { Authorization: `Bearer ${API_TOKEN}` }
      })
      .then((response) => {
        dispatch({
          type: FETCH_USER,
          payload: response.data
        });
      })
      .catch(response => dispatch(errorHandler(response.data.error)));
    };
  }

// Maybe use if not delete in refactor when modularizing api calls all to redux
  export function updateUser(dispatch,user) {
    // const requestUrl = API_URL + url;
    // let headers = {};
  
    // if (isAuthReq) {
    //   headers = { headers: { Authorization: cookie.load('token') } };
    // }

  // let updateUserURL = `${API_URL}/user/59e11fe68ff250051c7052b8/edit/`
    // axios.put(updateUserURL, user, {
    //   headers: { Authorization: `Bearer ${API_TOKEN}` }
    // })
    // .then((response) => {
    //   dispatch({
    //     type: USER_UPDATE,
    //     payload: response.data,
    //   });
    // })
    // .catch((error) => {
    //   errorHandler(dispatch, error.response, errorType);
    // });
  }



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

