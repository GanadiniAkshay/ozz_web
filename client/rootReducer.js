import { combineReducers } from 'redux';

import auth from './reducers/auth';
import bots from './reducers/bots';
import activeBot from './reducers/activeBot';
import activeIntents from './reducers/activeIntents';
import activeEntities from './reducers/activeEntities';
import utterances from './reducers/utterances';
import patterns from './reducers/patterns';
import responses from './reducers/responses';
import examples from './reducers/examples';
import test from './reducers/test';
import analytics from './reducers/analytics';

export default combineReducers({
    auth,
    bots,
    activeBot,
    activeIntents,
    activeEntities,
    utterances,
    patterns,
    responses,
    examples,
    test,
    analytics
})