import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

import { browserHistory } from 'react-router'; 
import { SET_CURRENT_USER } from './types';
import { config } from '../config';

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}


export function userLoginRequest(userData) {
   return dispatch => {
       return axios.post(config.url + '/auth', userData).then( res => {
           const token = res.data.token;
           localStorage.setItem('jwtToken',token);
           setAuthorizationToken(token);
           dispatch(setCurrentUser(jwt.decode(token)));
       })
   } 
}

export function logout(){
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        browserHistory.push('/');
    }
}