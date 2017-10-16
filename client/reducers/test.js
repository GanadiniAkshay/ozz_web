import { SET_CURRENT_REPLY } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  json:{},
  messages : []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_REPLY:
      var new_messages = [];
      new_messages.push({message: action.message, sentByUser: true});

      if (action.json.response.length > 0){
        new_messages.push({message: action.json.response, sentByUser: false});
      }

      return {
        json: action.json,
        messages:state.messages.concat(new_messages)
      };
    default: return state;
  }
}