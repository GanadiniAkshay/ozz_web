import {SET_CURRENT_ENTITIES, ADD_NEW_ENTITY, REMOVE_ENTITY} from '../actions/types';

const initialState = {
    activeEntities:[]
}

export default (state= initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_ENTITIES:
            return {
                activeEntities:action.activeEntities
            };
        case ADD_NEW_ENTITY:
            return {
                activeEntities:state.activeEntities.concat([{"name":action.name,"examples":{},"num_examples":0}])
            }
        case REMOVE_ENTITY:
            var index = parseInt(action.index);
            return {
                activeEntities:
                    state.activeEntities.slice(0,index)
                    .concat(state.activeEntities.slice(index+1))
            }
        default: return state;
    }
}