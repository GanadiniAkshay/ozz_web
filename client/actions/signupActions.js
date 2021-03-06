import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

import { SET_CURRENT_USER } from './types';
import { setCurrentUser } from './loginActions';
import { config } from '../config';

export function userSignupRequest(userData) {
   return dispatch => {
       return axios.post(config.url + '/users', userData).then( res => {
           const token = res.data.token;
           localStorage.setItem('jwtToken',token);
           setAuthorizationToken(token);
           dispatch(setCurrentUser(jwt.decode(token)));
       })
   } 
}