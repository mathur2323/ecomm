import * as actionType from './../constants';

export const loginSuccess = uid => ({
    type:actionType.LOGIN_REQUEST_SUCCESS,
    payload:uid
})

export const logoutRequest = () => ({
    type:actionType.LOGOUT_REQUEST,
})