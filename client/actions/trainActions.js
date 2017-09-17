import axios from 'axios';

import { config } from '../config';

export function beginTraining(payload){
    return dispatch => {
        return axios.get(config.url + '/train/' + payload.bot_guid).then( res => {
            const data = res.data;
        });
    }
}