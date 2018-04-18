import axios from 'axios';
import { browserHistory } from 'react-router'; 
import { SET_CURRENT_LOGS } from './types';
import { config } from '../config';

export function setCurrentLogs(logs){
    return {
        type: SET_CURRENT_LOGS,
        logs
    }
}


export function getLogs(payload) {
   return dispatch => {
       return axios.get(config.url + '/analytics/' + payload.bot_guid).then( res => {
           const logs = res.data;
           dispatch(setCurrentLogs(logs));
       })
   } 
}
