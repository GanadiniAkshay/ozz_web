import axios from 'axios';
import { browserHistory } from 'react-router'; 
import { SET_CURRENT_REPLY, CLEAR_WINDOW } from './types';
import { config } from '../config';

export function setCurrentReply(json,message){
    return {
        type: SET_CURRENT_REPLY,
        json,
        message
    }
}

export function clearChatWindow(){
	return{
		type: CLEAR_WINDOW
	}
}

export function sendMessage(payload) {
   return dispatch => {
       return axios.post(config.url + '/parse/' + payload.bot_guid, payload).then( res => {
           const json = res.data;
           const message = payload.q;
           dispatch(setCurrentReply(json, message));
       })
   } 
}

export function clearBox(){
    return dispatch => {
		dispatch(clearChatWindow());
	}
}
