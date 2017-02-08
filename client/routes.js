import React from 'react';
import { Route, IndexRoute, NotFoundRoute, browserHistory } from 'react-router';



import App from './components/App';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ContactPage from './components/contact/ContactPage';
import ForgotPage from './components/forgot/ForgotPage';
import ResetPage from './components/forgot/ResetPage';


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
        <Route path="forgot_password" component={ForgotPage} />
        <Route path="reset_password" component={ResetPage} />
        <Route path="bots" component={requireAuth(Bot)}/>
        <Route path="bots/add" component={requireAuth(BotAddPage)}/>
        <Route path="bots/:botname/learning" component={requireBotAuth(LearningPage)}/>
        <Route path="bots/:botname/settings" component={requireBotAuth(SettingsPage)}/>
        <Route path="*" component={NotFound}/>
    </Route>
)
