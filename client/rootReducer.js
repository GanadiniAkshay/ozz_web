import { combineReducers } from 'redux';

import auth from './reducers/auth';
import bots from './reducers/bots';

export default combineReducers({
    auth,
    bots
})