import {SET_CURRENT_INTENTS} from '../actions/types';

const initialState = {
    activeIntents:[]
}

export default (state= initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_INTENTS:
            return {
                activeIntents:action.activeIntents
            };
        default: return state;
    }
}