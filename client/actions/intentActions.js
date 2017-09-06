import axios from 'axios';

import {SET_CURRENT_INTENTS} from './types';
import { config } from '../config';

export function setActiveIntents(activeIntents){
    return {
        type:SET_CURRENT_INTENTS,
        activeIntents
    }
}

export function getIntents(payload){
    return dispatch => {
        return axios.get(config.url + '/intents/'+payload.bot_guid).then(res => {
            const intents = res.data.intents;
            dispatch(setActiveIntents(intents));
        })
    }
}