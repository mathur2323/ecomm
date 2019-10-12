import * as actionType from './../constants';

const defaultState = {
    uid:''
}

const authReducer = (state = defaultState,action) => {
    switch(action.type){
        case actionType.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                uid:action.payload
            }

        case actionType.LOGOUT_REQUEST:
            return{
                ...state,
                uid:''
            }

        default:
            return state
    }
}

export default authReducer