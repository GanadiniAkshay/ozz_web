import axios from 'axios';

import {SET_CURRENT_BOTS, SET_ACTIVE_BOT } from './types';


export function setBots(bots){
    return {
        type:SET_CURRENT_BOTS,
        bots
    }
}

export function setActiveBot(activeBot){
    return {
        type:SET_ACTIVE_BOT,
        activeBot
    }
}

export function getBots(event){
    return dispatch => {
        return axios.get('/bots').then(res => {
            const bots = res.data.bots;
            dispatch(setBots(bots))
        })
    }
}

export function createBot(payload){
    return dispatch => {
        return axios.post('/bots',payload).then(res => {
            dispatch(setActiveBot(payload))
        })
    }
}

export function updateBot(paylod){
    return dispatch => {
        return axios.put('/bots/' + paylod.id, paylod).then(res => {
            dispatch(setActiveBot(paylod));
        })
    }
}