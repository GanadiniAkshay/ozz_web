import axios from 'axios';
import { browserHistory } from 'react-router'; 
import { SET_CURRENT_REPLY } from './types';
import { config } from '../config';

export function setCurrentReply(json){
    return {
        type: SET_CURRENT_REPLY,
        json
    }
}


export function sendMessage(payload) {
   return dispatch => {
       return axios.post(config.url + '/parse/' + payload.bot_guid, payload).then( res => {
           const json = res.data;
           dispatch(setCurrentReply(json));
       })
   } 
}