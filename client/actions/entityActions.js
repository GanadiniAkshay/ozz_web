import axios from 'axios';

import {SET_CURRENT_ENTITIES, ADD_NEW_ENTITY, REMOVE_ENTITY, GET_EXAMPLES, ADD_EXAMPLES, REMOVE_EXAMPLES, ADD_SYNONYM} from './types';

import { config } from '../config';

/*======================================================================*/
//                     Handle Entities                                  //
/*======================================================================*/

export function setActiveEntities(activeEntities){
    return {
        type: SET_CURRENT_ENTITIES,
        activeEntities
    }
}

export function addNewEntity(name){
    return {
        type: ADD_NEW_ENTITY,
        name
    }
}

export function deleteEntity(index){
    return {
        type: REMOVE_ENTITY,
        index
    }
}

export function getEntities(payload){
    return dispatch => {
        return axios.get(config.url + '/entities/'+ payload.bot_guid).then(res => {
            const entities = res.data.entities;
            dispatch(setActiveEntities(entities));
        })
    }
}

export function addEntity(payload){
    return dispatch => {
        return axios.post(config.url + '/entities/'+ payload.bot_guid, payload).then(res => {
            const data = res.data;
            dispatch(addNewEntity(payload.name));
        })
    }
}

export function removeEntity(payload){
    return dispatch => {
        return axios.delete(config.url + '/entities/'+ payload.bot_guid, {"params":payload}).then(res => {
            const data = res.data;
            dispatch(deleteEntity(payload.index));
        })
    }
}

/*======================================================================*/
//                     Handle Examples                                  //
/*======================================================================*/

export function setExamples(examples){
    return {
        type: GET_EXAMPLES,
        examples
    }
}

export function appendExample(example){
    return {
        type: ADD_EXAMPLES,
        example
    }
}

export function deleteExample(example){
    return {
        type: REMOVE_EXAMPLES,
        example
    }
}

export function getExamples(payload){
    return dispatch => {
        return axios.get(config.url +  '/entities/' + payload.bot_guid + '/' + payload.name).then(res => {
            const examples = res.data.examples;
            dispatch(setExamples(examples));
        })
    }
}

export function addExample(payload){
    return dispatch => {
        return axios.post(config.url + '/entities/' + payload.bot_guid + '/' + payload.name, payload).then(res => {
            const data = res.data;
            dispatch(appendExample(payload.new_example))
        })
    }
}

export function removeExample(payload){
    return dispatch => {
        return axios.delete(config.url + '/entities/' + payload.bot_guid + '/' + payload.name, {'params':payload}).then(res => {
            const data = res.data;
            dispatch(deleteExample(payload.old_example))
        })
    }
}

/*======================================================================*/
//                     Handle Synonyms                                  //
/*======================================================================*/

export function appendSyn(payload){
    return {
        type: ADD_SYNONYM,
        payload
    }
}

export function addSyn(payload){
    return dispatch => {
        return axios.post(config.url + '/entities/' + payload.bot_guid + '/' + payload.name + '/' + payload.example, payload).then( res => {
            const data = res.data;
            dispatch(appendSyn(payload));
        })
    }
}

export function removeSyn(payload){
    return dispatch => {
        return axios.delete(config.url + '/entities/' + payload.bot_guid + '/' + payload.name + '/' + payload.example, {"params":payload}).then( res => {
            const data = res.data;
        })
    }
}