import axios from 'axios';

export function userSignupRequest(userData) {
   return dispatch => {
       return axios.post('https://api.ozz.ai/users', userData)
   } 
}