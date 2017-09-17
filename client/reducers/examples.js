import {GET_EXAMPLES, ADD_EXAMPLES, REMOVE_EXAMPLES, ADD_SYNONYM} from '../actions/types';

const initialState = {
    examples:{}
}

export default (state=initialState, action={}) => {
    switch(action.type){
        case GET_EXAMPLES:
            return {
                examples:action.examples
            };
        case ADD_EXAMPLES:
            var new_data = {};
            new_data[action.example] = [];
            return {
                examples:Object.assign({},state.examples,new_data)
            }
        case REMOVE_EXAMPLES:
            return {
                examples: Object.keys(state.examples).reduce((result,key) => {
                    if (key != action.example){
                        result[key] = state.examples[key];
                    }
                    return result
                },{})
            }
        case ADD_SYNONYM:
            return {
                examples: Object.keys(state.examples).reduce((result,key) => {
                    if (key != action.payload.example){
                        result[key] = state.examples[key];
                    }else{
                        result[key] = state.examples[key].concat([action.payload.synonym])
                    }
                    return result
                },{})
            }
        default: return state;
    }
}