import React from 'react';
import { Route, IndexRoute, NotFoundRoute, browserHistory } from 'react-router';

import App from './components/App';
// import SignupPage from './components/signup/SignupPage';
import SignupPage from './components/signup/SignupPageNew';
// import LoginPage from './components/login/LoginPage';
import LoginPage from './components/login/LoginPageNew';
import ContactPage from './components/contact/ContactPage';
import ForgotPage from './components/forgot/ForgotPage';
import ResetPage from './components/forgot/ResetPage';


import Bot from './components/bots/Bot';
import BotAddPage from './components/bots/BotAddPage';

import TosPage from './components/terms/TosPage';
import PrivacyPage from './components/terms/PrivacyPage';

import LearningDocsPage from './components/docs/LearningDocsPage';

import LearningPage from './components/learning/LearningPage';
import LearningDemoPage from './components/learning/LearningDemo';

import IntentsPage from './components/intents/IntentsPage';
import IntentEditPage from './components/intents/IntentEditPage';

import EntitiesPage from './components/entities/EntitiesPage';
import EntityEditPage from './components/entities/EntityEditPage';

import SettingsPage from './components/settings/SettingsPage';

import AnalyticsPage from './components/analytics/analyticsPage';

import KnowledgePage from './components/knowledge/knowledge';

import PersonaPage from './components/persona/personaPage';

import DemoPage from './components/demo/demoPage';
import ContextDemoPage from './components/demo/contextDemo';
import ActiveDemoPage from './components/demo/active';
import KnowledgeDemoPage from './components/demo/knowledge';

import NotFound from './components/common/NotFound'; 

import requireAuth from './utils/requireAuth';
import requireBotAuth from './utils/requireBotAuth';

export default (
    <Route path="/" history={browserHistory}>
        <IndexRoute component={App} />
        <Route path="demos" component={DemoPage} />
        <Route path="demos/context" component={ContextDemoPage}/>
        <Route path="demos/active"  component={ActiveDemoPage}/>
        <Route path="demos/knowledge" component={KnowledgeDemoPage}/>
        <Route path="signup" component={SignupPage} />
        <Route path="login"  component={LoginPage} />
        <Route path="contact" component={ContactPage} />
        <Route path="tos" component={TosPage} />
        <Route path="privacy" component={PrivacyPage} />
        <Route path="forgot_password" component={ForgotPage} />
        <Route path="reset_password" component={ResetPage} />
        <Route path="bots" component={requireAuth(Bot)}/>
        <Route path="bots/add" component={requireAuth(BotAddPage)}/>
        <Route path="bots/:botname/settings" component={requireBotAuth(SettingsPage)}/>
        <Route path="bots/:botname/intents"  component={requireBotAuth(IntentsPage)}/>
        <Route path="bots/:botname/intents/:intentname" component={requireBotAuth(IntentEditPage)}/>
        <Route path="bots/:botname/entities"  component={requireBotAuth(EntitiesPage)}/>
        <Route path="bots/:botname/entities/:entityname" component={requireBotAuth(EntityEditPage)} />
        <Route path="bots/:botname/analytics" component={requireBotAuth(AnalyticsPage)} />
        <Route path="bots/:botname/knowledge" component={requireBotAuth(KnowledgePage)} />
        <Route path="bots/:botname/learn" component={requireBotAuth(LearningDemoPage)} />
        <Route path="bots/:botname/persona" component={requireBotAuth(PersonaPage)} />
        <Route path="*" component={NotFound}/>
    </Route>
)
