import {SET_CURRENT_PATTERNS, APPEND_PATTERNS, REMOVE_PATTERNS} from '../actions/types';

const initialState = {
    patterns:[]
}

export default (state=initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_PATTERNS:
            return {
                patterns:action.patterns
            };
        case APPEND_PATTERNS:
            return {
                patterns:
                    state.patterns.concat([action.pattern])
            };
        case REMOVE_PATTERNS:
            var index = parseInt(action.index);
            return Object.assign({}, state,  {
                patterns:
                state.patterns.slice(0,index)
                .concat(state.patterns.slice(index+1))
            });
        default: return state;
    }
}