import {SET_CURRENT_INTENTS, ADD_NEW_INTENT, REMOVE_INTENT} from '../actions/types';

const initialState = {
    activeIntents:[]
}

export default (state= initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_INTENTS:
            return {
                activeIntents:action.activeIntents
            };
        case ADD_NEW_INTENT:
            return {
                activeIntents:
                    state.activeIntents.concat([{"calls":0,"utterances":0,"responses":0,"name":action.name}])
            };
        case REMOVE_INTENT:
            return {
                activeIntents:
                    state.activeIntents
            }
        default: return state;
    }
}