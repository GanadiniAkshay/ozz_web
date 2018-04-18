import {SET_CURRENT_BOTS} from '../actions/types';

const initialState = {
    bots:[]
}

export default (state= initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_BOTS:
            return {
                bots:action.bots
            };
        default: return state;
    }
}