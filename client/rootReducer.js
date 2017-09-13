import { combineReducers } from 'redux';

import auth from './reducers/auth';
import bots from './reducers/bots';
import activeBot from './reducers/activeBot';
import activeIntents from './reducers/activeIntents';
import utterances from './reducers/utterances';
import responses from './reducers/responses';

export default combineReducers({
    auth,
    bots,
    activeBot,
    activeIntents,
    utterances,
    responses
})