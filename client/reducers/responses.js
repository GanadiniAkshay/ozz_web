import {SET_CURRENT_RESPONSES, RESET_RESPONSES, APPEND_RESPONSES, REMOVE_RESPONSES} from '../actions/types';

const initialState = {
    responses:[]
}

export default (state=initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_RESPONSES:
            return {
                responses:action.responses
            };
        case RESET_RESPONSES:
            var index = parseInt(action.index);
            return Object.assign({}, state,  {
                responses:
                state.responses.slice(0,index)
                .concat([action.value])
                .concat(state.responses.slice(index+1))
            });
        case APPEND_RESPONSES:
            return Object.assign({},state,{
                responses:
                    state.responses.concat([action.value])
            });
        case REMOVE_RESPONSES:
            var index = parseInt(action.index);
            return Object.assign({}, state,  {
                responses:state.responses.slice(0,index).concat(state.responses.slice(index+1))
            });
        default: return state;
    }
}