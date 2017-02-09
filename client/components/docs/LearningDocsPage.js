import React from 'react';
import {Link} from 'react-router';

class LearningDocsPage extends React.Component{
    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userSignupRequest} = this.props;
        return(
            <div className="fluid-container">
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <img src="/img/logo_white_full.png" alt="ozz_logo" height="100px" style={{"marginTop":"10px"}}/> 
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="tagline">
                        <h4>Developer Documentation</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s10 offset-s1" style={{'background':'white'}}>
                        <h5>Conversations</h5>
                        <hr/>
                        <h6>You only have to provide us data for the conversation model.</h6>
                        <h6>The model includes the following data points</h6>
                        <ul>
                            <li>
                                <p><code>bot_guid :</code> (string, required) A unique identifier for your bot. Can be found on the settings page of your bot.</p>
                            </li>
                            <li>
                                <p><code>message :</code> (string, required) The conversational message either being sent or recieved by the bot.</p>
                            </li>
                            <li>
                                <p><code>isBotReply : </code> (bool, required) True if its a reply from the bot, False otherwise.</p>
                            </li>
                            <li>
                                <p><code>payload : </code> (json, optional) Any json payload you are sending as a reply.</p>
                            </li>
                            <li>
                                <p><code>sender_id : </code> (string, optional) A unique identifier for a sender.</p>
                            </li>
                            <li>
                                <p><code>sender_name : </code> (string, optional) Name of a sender.</p>
                            </li>
                        </ul>
                        <br/>
                        <hr/>
                        <h6>We natively support all the bot platforms and any kind of conversational interface. We are also programming language agnoistic. 
                            However if you are using node.js we recommend the use of our npm module <a href="https://www.npmjs.com/package/ozz" style={{"textDecoration":"underline"}}>ozz</a>. We have a REST API which can be used for other languages.</h6>
                        <p><b>Tutorial:</b> You can read a full step by step tutorial here</p>
                        <br/><br/>
                        <hr/>
                        <div className="row">
                            <div className="col s12">
                            <ul className="tabs" >
                                <li className="tab col s3"><a href="#test1">Node.js</a></li>
                                <li className="tab col s3"><a class="active" href="#test2">REST API</a></li>
                            </ul>
                            </div>
                            <div id="test1" className="col s12">
                                <h6>Get your bot_guid from the bot's settings page</h6>
                                <br/>
                                <div>
                                    <h6>Install npm package</h6>
                                    <pre className="language-markup">
                                        <code className="language-markup">
                                            npm install --save ozz
                                        </code>
                                    </pre>
                                </div>
                                <br/>
                                <div>
                                    <h6>Include ozz</h6>
                                    <pre className="language-markup">
                                        <code className="language-markup">
                                            var ozz = require('ozz')(process.env.bot_guid);
                                        </code>
                                    </pre>
                                </div>
                                <br/>
                                <div>
                                    <h6>Log Incoming Messages</h6>
                                    <pre className="language-markup">
                                        <code className="language-markup">
                                            var ozz_data = {'{"message":"hey","sender_id":"123","sender_name":"akshay"}'};
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            ozz.logIncoming(ozz_data);
                                        </code>
                                    </pre>
                                </div>
                                <br/>
                                <div>
                                    <h6>Log Outgoing Messages</h6>
                                    <p>You can use the same data object you created for incoming messages by modifying the message field or creating a new object.</p>
                                    <pre className="language-markup">
                                        <code className="language-markup">
                                            ozz_data['message'] = 'Hi';
                                        </code><br/>
                                        <code className="language-markup">
                                            ozz.logOutgoing(ozz_data);
                                        </code>
                                    </pre>
                                </div>
                            </div>
                            <div id="test2" className="col s12">
                                <h6>Get your bot_guid from the bot's settings page</h6>
                                <br/>
                                <div>
                                    <h6><b>Log Incoming Messages</b></h6>
                                    <pre className="language-markup">
                                        <code className="language-markup">
                                            url = 'https://api.ozz.ai/conversations'
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            method = POST
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            Data = {'{"bot_guid":<bot_guid>,"message":<message>,"isBotReply":"false","sender_id":<sender_id>,"sender_name":<sender_name>}'}
                                        </code>
                                    </pre>
                                    <p>Sample cURL request</p>
                                    <pre className="language-markup">
                                        <code className="language-markup">
                                            {'curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" \\'}
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            {'-d \'{"bot_guid":<bot_guid>,"message":<message>,"isBotReply":"false"}\'\\'} 
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            {'"https://api.ozz.ai/conversations"'}
                                        </code>
                                    </pre>

                                    <br/><br/>
                                    <h6><b>Log Outgoing Messages</b></h6>
                                    <pre className="language-markup">
                                        <code className="language-markup">
                                            url = 'https://api.ozz.ai/conversations'
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            method = POST
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            Data = {'{"bot_guid":<bot_guid>,"message":<message>,"isBotReply":"true"}'}
                                        </code>
                                    </pre>
                                    <p>Sample cURL request</p>
                                    <pre className="language-markup">
                                        <code className="language-markup">
                                            {'curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" \\'}
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            {'-d \'{"bot_guid":<bot_guid>,"message":<message>,"isBotReply":"true"}\'\\'} 
                                        </code>
                                        <br/>
                                        <code className="language-markup">
                                            {'"https://api.ozz.ai/conversations"'}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default LearningDocsPage;