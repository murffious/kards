import { GET_BUSINESS_LIST, COMPLETE_SIGNUP, STORE_SIGN_UP_INFO, STORE_RATES, STORE_PLAN, STORE_PLAYER, STORE_SHIPPING, STORE_PAYMENT, STORE_PAYMENT_EDIT} from '../actions/types';
import axios from 'axios';

const API_TOKEN = process.env.REACT_APP_API_TOKEN
const API_URL = process.env.REACT_APP_API_URL_BASE + '/trudigital';

const INITIAL_STATE = {rates: {}};

export default function signUpReducer( state = INITIAL_STATE, action) {
    switch (action.type) {
        case `${GET_BUSINESS_LIST}`:
            return {...state, locations: action.payload, is_current: true}
        case `${COMPLETE_SIGNUP}`:
            return {...state, auth_user: action.payload};
        case `${STORE_SIGN_UP_INFO}`:
            return Object.assign({}, state, action.payload);
        case `${STORE_RATES}`:
            return Object.assign({}, state, {rates:action.payload});
        case `${STORE_PLAN}`:
            return Object.assign({}, state, {plan:action.payload});
        case `${STORE_PLAYER}`:
            return Object.assign({}, state, {player:action.payload});
        case `${STORE_SHIPPING}`:
            return Object.assign({}, state, {shipping:action.payload});
        case `${STORE_PAYMENT}`:
            return Object.assign({}, state, {payment:action.payload});
        case `${STORE_PAYMENT_EDIT}`:
            return Object.assign({}, state, {payment_edit:action.payload});
        default:
            return state;
    }
}

export function storeSignUpInfo(signUpInfo, verifiedAddress, orgId) {
  
  signUpInfo.push({verified_address: verifiedAddress}, {org_id:orgId});

    return function (dispatch) {
        dispatch({
          type: STORE_SIGN_UP_INFO,
          payload: signUpInfo
        });
     
    };
}

export function storeRates(rates) {
  
      return function (dispatch) {
        
          dispatch({
            type: STORE_RATES,
            payload: rates
          });
       
      };
}

export function storePlanInfo(plan) {
  return function (dispatch) {
          
            dispatch({
              type: STORE_PLAN,
              payload: plan
            });
      
        };
}

export function storePlayerInfo(player) {
  return function (dispatch) {
          
            dispatch({
              type: STORE_PLAYER,
              payload: player
            });
      
        };
}

export function storeShippingInfo(shipping) {
  return function (dispatch) {
          
            dispatch({
              type: STORE_SHIPPING,
              payload: shipping
            });
      
        };
}      

export function storePaymentInfo(payment) {
  return function (dispatch) {
          
            dispatch({
              type: STORE_PAYMENT,
              payload: payment
            });
      
        };
}   

export function storePaymentEditState(edit_state) {
    return function (dispatch) {
            
              dispatch({
                type: STORE_PAYMENT_EDIT,
                payload: edit_state
              });
        
          };
  }  

            
