import { SET_CURRENT_LOGS } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  logs:{},
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_LOGS:
      return {
        logs: action.logs
      }
    default: return state;
  }
}