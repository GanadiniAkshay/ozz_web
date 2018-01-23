import axios from 'axios';

import {SET_CURRENT_INTENTS, ADD_NEW_INTENT, REMOVE_INTENT, SET_CURRENT_UTTERANCES, RESET_UTTERANCES, APPEND_UTTERANCES, REMOVE_UTTERANCES, SET_CURRENT_RESPONSES, RESET_RESPONSES, APPEND_RESPONSES, REMOVE_RESPONSES, SET_CURRENT_PATTERNS, APPEND_PATTERNS, REMOVE_PATTERNS} from './types';

import { config } from '../config';

/*======================================================================*/
//                     Handle Intents                                   //
/*======================================================================*/

export function setActiveIntents(activeIntents){
    return {
        type:SET_CURRENT_INTENTS,
        activeIntents
    }
}

export function addNewIntent(name){
    return {
        type: ADD_NEW_INTENT,
        name
    }
}

export function deleteIntent(index){
    return {
        type: REMOVE_INTENT,
        index
    }
}

export function getIntents(payload){
    return dispatch => {
        return axios.get(config.url + '/intents/'+ payload.bot_guid + '?base=' + payload.base).then(res => {
            const intents = res.data.intents;
            dispatch(setActiveIntents(intents));
        })
    }
}

export function addIntent(payload){
    return dispatch => {
        return axios.post(config.url + '/intents/' + payload.bot_guid+ '?base=' + payload.base, payload).then(res => {
            const success = res.data;
            dispatch(addNewIntent(payload.name));
        })
    }
}

export function removeIntent(payload){
    return dispatch => {
        return axios.delete(config.url + '/intents/' + payload.bot_guid, {"params":payload}).then(res => {
            const success = res.data;
            dispatch(deleteIntent(payload.index));
        })
    }
}

/*======================================================================*/
//                     Handle Utterances                                //
/*======================================================================*/

export function setCurrentUtterances(utterances){
    return {
        type:SET_CURRENT_UTTERANCES,
        utterances
    }
}

export function resetUtterances(index,value, entities){
    return {
        type: RESET_UTTERANCES,
        index,
        value,
        entities
    }
}

export function appendUtterances(value,entities){
    return {
        type: APPEND_UTTERANCES,
        value,
        entities
    }
}

export function removeUtterances(index){
    return {
        type: REMOVE_UTTERANCES,
        index
    }
}

export function getUtterances(payload){
    console.log(payload);
    return dispatch => {
        return axios.get(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name).then(res => {
            const utterances = res.data.utterances;
            dispatch(setCurrentUtterances(utterances));
        })
    }
}

export function addUtterance(payload){
    return dispatch => {
        return axios.post(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/utterances',payload).then(res => {
            const data = res.data;
            if (data.entities){
                dispatch(appendUtterances(payload.value,data.entities));
            }
        })
    }
}

export function changeUtterances(payload){
    return dispatch => {
        return axios.put(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/utterances',payload).then(res => {
            const data = res.data;
            dispatch(resetUtterances(payload.index,payload.value,data.entities));
        })
    }
}

export function dropUtterances(payload){
    return dispatch => {
        return axios.delete(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/utterances',{"params":payload}).then(res => {
            const data = res.data;
            dispatch(removeUtterances(payload.index));
        })
    }
}


/*======================================================================*/
//                     Handle Patterns                                  //
/*======================================================================*/
export function setCurrentPatterns(patterns){
    return {
        type:SET_CURRENT_PATTERNS,
        patterns
    }
}

export function appendPatterns(pattern){
    return {
        type: APPEND_PATTERNS,
        pattern
    }
}

export function removePattern(index){
    return {
        type: REMOVE_PATTERNS,
        index
    }
}

export function getPatterns(payload){
    return dispatch => {
        return axios.get(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/patterns').then(res => {
            const patterns = res.data.patterns;
            dispatch(setCurrentPatterns(patterns));
        })
    }
}

export function addPattern(payload){
    return dispatch => {
        return axios.post(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/patterns',payload).then(res => {
            const data = res.data.pattern;
            dispatch(appendPatterns(data));
        })
    }
}

export function dropPattern(payload){
    return dispatch => {
        return axios.delete(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/patterns',{"params":payload}).then(res => {
            dispatch(removePattern(payload.index));
        })
    }
}


/*======================================================================*/
//                     Handle Responses                                 //
/*======================================================================*/

export function setCurrentResponses(responses){
    return {
        type:SET_CURRENT_RESPONSES,
        responses
    }
}

export function resetResponses(index,value, entities){
    return {
        type: RESET_RESPONSES,
        index,
        value
    }
}

export function appendResponses(value){
    return {
        type: APPEND_RESPONSES,
        value
    }
}

export function removeResponses(index){
    return {
        type: REMOVE_RESPONSES,
        index
    }
}

export function getResponses(payload){
    return dispatch => {
        return axios.get(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name).then(res => {
            const responses = res.data.responses;
            dispatch(setCurrentResponses(responses));
        })
    }
}

export function addResponses(payload){
    return dispatch => {
        return axios.post(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/responses',payload).then(res => {
            const data = res.data;
            dispatch(appendResponses(payload.value));
        })
    }
}

export function changeResponses(payload){
    return dispatch => {
        return axios.put(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/responses',payload).then(res => {
            const data = res.data;
            console.log(data);
            dispatch(resetResponses(payload.index,payload.value));
        })
    }
}

export function dropResponses(payload){
    return dispatch => {
        return axios.delete(config.url + '/intents/' + payload.bot_guid + '/' + payload.intent_name + '/responses',{"params":payload}).then(res => {
            const data = res.data;
            dispatch(removeResponses(payload.index));
        })
    }
}

