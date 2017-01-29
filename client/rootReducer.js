import { combineReducers } from 'redux';

import auth from './reducers/auth';
import bots from './reducers/bots';
import activeBot from './reducers/activeBot';

export default combineReducers({
    auth,
    bots,
    activeBot
})