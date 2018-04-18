import {SET_CURRENT_UTTERANCES, RESET_UTTERANCES, APPEND_UTTERANCES, REMOVE_UTTERANCES} from '../actions/types';

const initialState = {
    utterances:[]
}

export default (state=initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_UTTERANCES:
            return {
                utterances:action.utterances
            };
        case RESET_UTTERANCES:
            var index = parseInt(action.index);
            return Object.assign({}, state,  {
                utterances:
                state.utterances.slice(0,index)
                .concat([{"entities":action.entities,"utterance":action.value}])
                .concat(state.utterances.slice(index+1))
            });
        case APPEND_UTTERANCES:
            return Object.assign({},state,{
                utterances:
                    state.utterances.concat([{"entities":action.entities,"utterance":action.value}])
            });
        case REMOVE_UTTERANCES:
            var index = parseInt(action.index);
            return Object.assign({}, state,  {
                utterances:
                state.utterances.slice(0,index)
                .concat(state.utterances.slice(index+1))
            });
        default: return state;
    }
}