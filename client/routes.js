import React from 'react';
import { Route, IndexRoute, NotFoundRoute, browserHistory } from 'react-router';



import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ContactPage from './components/contact/ContactPage';

import Bot from './components/bots/Bot';
import BotAddPage from './components/bots/BotAddPage';



import LearningPage from './components/learning/LearningPage';

import SettingsPage from './components/settings/SettingsPage';

import NotFound from './components/common/NotFound'; 

import requireAuth from './utils/requireAuth';
import requireBotAuth from './utils/requireBotAuth';

export default (
    <Route path="/" history={browserHistory}>
        <IndexRoute component={App} />
        <Route path="signup" component={SignupPage} />
        <Route path="login"  component={LoginPage} />
        <Route path="contact" component={ContactPage} />
        <Route path="bots">
            <IndexRoute component={requireAuth(Bot)}/>
            <Route path="add" component={requireAuth(BotAddPage)}/>
            <Route path=":botname/learning">
                <IndexRoute component={requireBotAuth(LearningPage)}/>
            </Route>
            <Route path=":botname/settings">
                <IndexRoute component={requireBotAuth(SettingsPage)}/>
            </Route>
        </Route>
        <Route path="*" component={NotFound}/>
    </Route>
)
