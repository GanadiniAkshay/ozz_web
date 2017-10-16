import React from 'react';
import { connect } from 'react-redux';

import { browserHistory, Link} from 'react-router';
import OzzBase from '../widget/OzzBase';

import PropTypes from 'prop-types';
import { config } from '../../config';

class KnowledgeDemoPage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            messages:[],
            json:{}
        }
        this.goHome = this.goHome.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    goHome(){
        browserHistory.push('/demos');
    }

    sendMessage(){
        var message = $('#message-bar').val();
        $('#message-bar').val("");
        var msgs = this.state.messages;
        msgs.push({message:message,sentByUser:true});
        this.setState({messages:msgs});

        var that = this;
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/kquery",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "f5c9233e-2842-f90a-54b8-315bc7c25d15"
            },
            "processData": false,
            "data": JSON.stringify({query:message})
        }
          
          $.ajax(settings,that).done(function (response){
            var msgs = that.state.messages;
            msgs.push({message:response.answer,sentByUser:false});
            console.log(msgs);
            that.setState({message:msgs,json:{response:response.answer,entities:[]}});
          });
    }

    render(){
        document.body.style.backgroundColor = '#F8F8F8';
        const config = {
            name: "Demo",
            'color':'#58488a',
            'token':'YKUKHHEn4vY.cwA.c8g.NKBFH6f8Y7u6ztJRHLrokp1ZgiRWdVcie_zyfZb0bGk'
        }
        return (
            <div className="full">
                <main>
                    <div className="fluid-container" style={{"height":"100%"}}>
                        <div className="row" style={{"height":"100%"}}>
                            <div className="col s7" style={{"textAlign":"center"}}>
                            <h4>
                                <button className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white',"float":"left","fontSize":"0.5em"}} onClick={this.goHome}>
                                    Go Back
                                </button>
                                Knowledge API
                            </h4>
                            <OzzBase active={true} config={config} messages={this.state.messages} sendMessage={this.sendMessage.bind(this)} json={this.state.json} isDemo={true}/>
                            </div>
                            <div className="col s5" style={{"height":"100%","color":"white","backgroundColor":"black"}}>
                                <h5>Knowledge</h5>
                                <p>Knowledge let's developers add any documents or websites that the chatbot can use to answer the questions on top off</p>

                                <br/><br/>
                                <p>The Current system uses a retrieval based model, however v2 of the model (potential release by December) wil use generative models</p>
                                <br/>
                                <p>Also currently the data pre-processing and cleaning hasn't been automated yet</p>

                                <br/><br/>
                                <p>This demo is being built as part of a pilot for manning publications for making chatbots answer questions using textbooks as a knowledge base. This demo
                                   is using the following books:</p>
                                
                                <br/>
                                <ol>
                                    <li><b>Express in Action</b> - <a style={{"color":"blue"}} href="https://www.manning.com/books/express-in-action">Open Link</a></li>
                                    <li><b>Javascript Ninja</b> - <a style={{"color":"blue"}} href="https://www.manning.com/books/secrets-of-the-javascript-ninja">Open Link</a></li>
                                </ol>

                                <br/>
                                <h6><b>Sample Questions</b></h6>
                                <p>What is express?</p>
                                <p>What are closures?</p>
                                <p>How to use heroku?</p>
                                <p>How to install grunt?</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}




export default KnowledgeDemoPage;