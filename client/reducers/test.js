import { SET_CURRENT_REPLY } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  json:{}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_REPLY:
      return {
        json: action.json
      };
    default: return state;
  }
}