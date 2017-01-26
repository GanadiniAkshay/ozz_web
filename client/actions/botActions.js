import axios from 'axios';

import {SET_CURRENT_BOTS} from './types';

export function setBots(bots){
    return {
        type:SET_CURRENT_BOTS,
        bots
    }
}

export function getBots(event){
    return dispatch => {
        return axios.get('https://api.ozz.ai/bots').then(res => {
            const bots = res.data.bots;
            dispatch(setBots(bots))
        })
    }
}

export function createBot(payload){
    return dispatch => {
        return axios.post('https://api.ozz.ai/bots',payload).then(res => {
            dispatch(getBots(payload))
        })
    }
}