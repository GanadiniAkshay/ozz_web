import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import { getBots } from '../../actions/botActions';

import { getResponses, changeResponses, addResponses, dropResponses } from '../../actions/intentActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

import Response from './Response';
import Utterance from './utterance';

class ResponsesTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            "bot_guid":"",
            "intent_name":"",
            "responses":[],
            "intent_name":""
        };

        this.onChange = this.onChange.bind(this);
        this.onDelete_ = this.onDelete_.bind(this);
        this.onResponseAdd = this.onResponseAdd.bind(this);
    }

    componentDidMount(){
        this.props.getBots(this.state).then(
            () => {
                var current_bots = this.props.bots.bots;
                
                var url_path = window.location.pathname.split('/');
                var bot_name = url_path[2].replace('%20',' ');
                var intent_name = url_path[4].replace('%20',' ');

                var activeBot = current_bots.find(function(o){ return o.name == bot_name});
                
                if (!activeBot){
                    activeBot = current_bots[0];
                    browserHistory.push('/bots/'+activeBot.name+'/intents');
                }else{
                    this.setState({bot_guid:activeBot.bot_guid, intent_name:intent_name});

                    this.props.getResponses(this.state).then(
                        () => {
                            this.setState({responses:this.props.responses.responses});
                        }
                    )
                }
            }
        )

        $(document).ready(function(){
            $('.collapsible').collapsible();
        });
    }

    onChange(e){
        var key = e.which || e.keyCode;
        if (key && key === 13){
            var payload = {};
            
            payload['index'] = e.target.id;
            payload['value'] = e.target.value;
            payload['bot_guid'] = this.state.bot_guid;
            payload['intent_name'] = this.state.intent_name;
            payload['old_response'] = this.state.responses[e.target.id];

            console.log(payload);
            
            this.props.changeResponses(payload).then(
                () => {
                    this.setState({responses:this.props.responses.responses});
                }
            );
        }
    }

    onDelete_(e){
        var index = e.target.id.split(' ')[1];
        var payload = {};
        
        payload['index'] = index;
        payload['response'] = this.state.responses[index];
        payload['bot_guid'] = this.state.bot_guid;
        payload['intent_name'] = this.state.intent_name;

        this.props.dropResponses(payload).then(
            () => {
                this.setState({responses:this.props.responses.responses})
            }
        );
    }

    onResponseAdd(e){
        e.preventDefault();
        var response = document.getElementById('response').value;
        document.getElementById('response').value = '';

        var payload = {};
        
        payload['value'] = response;
        payload['bot_guid'] = this.state.bot_guid;
        payload['intent_name'] = this.state.intent_name;

        this.props.addResponses(payload).then(
            () => {
                this.setState({responses:this.props.responses.responses});
                this.forceUpdate();
            }
        );
    }

    render(){
        var responses = this.state.responses;

        const response_list = responses.map((response,index) => {
            var response_str = responses[index];
            return (
                <li className="collection-item" key={index}>
                    <div className="row hoverize" style={{"margin":"-0.7%"}}>
                        <div className="col s10 input-field-none"> 
                            {response_str}
                        </div>
                        <div className="col s1 offset-s1">
                            <i className="material-icons" id={"button " + index} onClick={this.onDelete_} style={{"cursor":"pointer"}}>delete</i>
                        </div>
                    </div>
                </li>
            )
        });

        return (
            <div>
                <div className="container">
                    <div>
                        <form className="col s8 offset-s2" id="json" encType="multipart/form-data" onSubmit={this.onResponseAdd}>
                            <div className="input-field">
                                <input id="response" type="text" placeholder="Add response" />
                            </div>
                            <div className="file-field input-field" >
                                <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white','float':'right','marginTop':'-2%'}} onClick={this.onResponseAdd}>
                                    <span>Add Response</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <br/><br/><br/>
                <div className="container">
                    <div className="row">
                        <ul className="collection">
                            {response_list}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        bots:state.bots,
        activeBot: state.activeBot,
        responses:state.responses
    }
}

export default connect(mapStateToProps, { getBots, getResponses, changeResponses, addResponses, dropResponses})(ResponsesTable);