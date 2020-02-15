import {userConstants} from '../actions/consts'

const INITIAL_STATE={
    user:null,
    data:null,
    message:null,
}
export function user(state=INITIAL_STATE,action){
        switch(action.type){
            case userConstants.USER_LOGIN_REQUEST:
                return [...state,state.message="login request"]

            case userConstants.USER_LOGIN_SUCCESS:
                return [...state,sate.data=action.payload]

            case userConstants.USER_LOGIN_FAILED:
                return [...state,state.message="login failed"]

            default:
                return state;
        }        
}