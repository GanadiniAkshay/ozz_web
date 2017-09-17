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
            var index = parseInt(action.index);
            return {
                activeIntents:
                    state.activeIntents.slice(0,index)
                        .concat(state.activeIntents.slice(index+1))
            }
        default: return state;
    }
}