import {SET_ACTIVE_BOT} from '../actions/types';

const initialState = {
    activeBot:{}
}

export default (state= initialState, action={}) => {
    switch(action.type){
        case SET_ACTIVE_BOT:
            return {
                activeBot:action.activeBot
            };
        default: return state;
    }
}