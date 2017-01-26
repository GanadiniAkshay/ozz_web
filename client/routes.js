import React from 'react';
import { Route, IndexRoute, NotFoundRoute, browserHistory } from 'react-router';



import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage';

import Bot from './components/bots/Bot';
import BotAddPage from './components/bots/BotAddPage';

import LearningPage from './components/learning/LearningPage';

import SettingsPage from './components/settings/SettingsPage';

import NotFound from './components/common/NotFound'; 

import requireAuth from './utils/requireAuth';

export default (
    <Route path="/" history={browserHistory}>
        <IndexRoute component={App} />
        <Route path="signup" component={SignupPage} />
        <Route path="login"  component={LoginPage} />
        <Route path="new-event" component={requireAuth(NewEventPage)} />
        <Route path="bots">
            <IndexRoute component={Bot}/>
            <Route path="add" component={BotAddPage}/>
            <Route path=":botname/learning">
                <IndexRoute component={LearningPage}/>
            </Route>
            <Route path=":botname/settings">
                <IndexRoute component={SettingsPage}/>
            </Route>
        </Route>
        <Route path="*" component={NotFound}/>
    </Route>
)
