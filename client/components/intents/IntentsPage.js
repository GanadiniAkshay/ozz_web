import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import { getBots } from '../../actions/botActions';
import { getIntents, addIntent, removeIntent } from '../../actions/intentActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

import IntentCard from './IntentCard';
import PropTypes from 'prop-types';

class IntentsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id:'',
            bot_guid:'',
            name:'',
            json_button: 'Import JSON',
            activeIntents:[],
            int_button: 'Add',
            button:'save',
            disabled:true,
            loader:true,
            errors:{}
        }

         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.addIntent = this.addIntent.bind(this);
         this.addKeyIntent = this.addKeyIntent.bind(this);
         this.openIntent = this.openIntent.bind(this);
         this.deleteIntent = this.deleteIntent.bind(this);
         this.openTest = this.openTest.bind(this);
    }

    componentDidMount(){
        this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = decodeURI(url_path[2]);

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
                        this.setState({name:activeBot.name,id:activeBot.id,bot_guid:activeBot.bot_guid});

                        this.props.getIntents(this.state).then(
                            () => {
                                this.setState({loader:false,activeIntents:this.props.activeIntents.activeIntents})
                            }
                        )
                    }
                }
        );

        $(document).ready(function(){
            // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
        });
    }
    
    


    onChange(e){
       this.setState({ [e.target.name]: e.target.value }); 
    }

    addIntent(e){
        var intent_name = document.getElementById('intent').value;
        this.setState({int_button:"Adding..."});

        var payload = {};

        payload['name'] =  intent_name;
        payload['bot_guid'] = this.state.bot_guid;
        payload['utterances'] = [];
        payload['responses'] = [];
        payload['has_entities'] = true;

        this.props.addIntent(payload).then(
            () => {
                this.setState({int_button:"Add", activeIntents:this.props.activeIntents.activeIntents});
                browserHistory.push('/bots/'+ this.state.name +'/intents/'+ intent_name);
            }
        )
    }

    addKeyIntent(e){
        var key = e.which || e.keyCode;
        
        if (key && key == 13){
            var intent_name = document.getElementById('intent').value;
            intent_name = intent_name.toLowerCase()
            this.setState({int_button:"Adding..."});
    
            var payload = {};
    
            payload['name'] =  intent_name;
            payload['bot_guid'] = this.state.bot_guid;
            payload['utterances'] = [];
            payload['responses'] = [];
            payload['has_entities'] = true;
    
            this.props.addIntent(payload).then(
                () => {
                    this.setState({int_button:"Add", activeIntents:this.props.activeIntents.activeIntents});
                    $('#intent_form').modal('close');
                    browserHistory.push('/bots/'+ this.state.name +'/intents/'+ intent_name);
                }
            )
        }
    }

    deleteIntent(e){
        var button = e.currentTarget;
        var values = button.attributes.name.value.split('|*|*|');

        var name = values[0];
        var index = values[1];
        var payload = {};
        
        payload['intent'] =  name;
        payload['bot_guid'] = this.state.bot_guid;
        payload['index'] = index;

        $("#deleteModal"+name).modal('close');
        this.props.removeIntent(payload).then(
            () => {
                this.setState({activeIntents:this.props.activeIntents.activeIntents});
            }
        )
    }

    openIntent(e){
        var button = e.currentTarget;
        var name = button.attributes.name.value
        var url_path = window.location.pathname+"/"+name;
        browserHistory.push(url_path);
    }

    openTest(e){
        console.log("test window opens");
    }


    onSubmit(e){
        this.setState({ errors: {}, button:"saving..." });
        e.preventDefault();
    }

    render(){
        const { errors } = this.state;
        const current_intents = this.state.activeIntents;

        const loader = (<img src="https://d1wi3kcd7kachl.cloudfront.net/v0.6.10/img/loader.gif" alt="loader animation" style={{'marginTop':'15%','marginLeft':'25%'}}/>);

        const intents = current_intents.map((current_intent,index) => {
            var modified = moment(current_intent.modified).local().fromNow();//format('MMMM Do YYYY, h:mm:ss a');
            return (
                <tr style={{"cursor":"pointer"}} key={index} name={current_intent.name} onClick={this.openIntent}>
                    <td width="40%" style={{"paddingLeft":"25px","textAlign":"left"}}><i className="material-icons">assignment</i><span>{current_intent.name}</span></td>
                    <td>-</td>
                    <td>{current_intent.utterances}</td>
                    <td>{current_intent.responses} </td>
                    <td>{current_intent.calls}</td>
                    <td>{modified}</td>
                </tr>
            )
        })

        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <div className="fluid-container" style={{"backgroundColor":"rgb(88, 72, 138)","top":0,"position":"sticky","zIndex":2,"height":"65px"}}>
                        <div className="row" style={{"color":"white"}}>
                            <div className="col s9 m9">
                                <h4 style={{"marginLeft":"25px"}}>Intents</h4>
                            </div>
                            <div className="col s3 m3">
                                <div className="file-field input-field" >
                                    <a className="waves-effect waves-light btn modal-trigger" href="#intent_form" style={{'background':'white','color':'#58488a'}}>Add Intent</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="intent_form" className="modal">
                        <div className="modal-content">
                            <h4>Add Intent</h4>
                            <div className="input-field col s12">
                                <input id="intent" type="text" onKeyPress={this.addKeyIntent}/>
                                <label htmlFor="intent">Intent Name</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a className="waves-effect waves-green btn-flat" onClick={this.addIntent}>{this.state.int_button}</a>
                        </div>
                    </div>
                    <div className="fluid-container full">
                        <div className="row">
                            <div className="col s12 m12">
                                <div className="card" style={{"zIndex":0}}>
                                    <div className="card-content" style={{"margin":0,"padding":0,"border":0}}>
                                        <br/>
                                        <span className="card-title">
                                            <h5 style={{"paddingLeft":"25px"}}>Intents</h5>
                                        </span>
                                        <table className="bordered highlight centered">
                                            <thead>
                                            <tr>
                                                <th style={{"paddingLeft":"25px","textAlign":"left"}}>Name</th>
                                                <th>Intents</th>
                                                <th>Utterances</th>
                                                <th>Responses</th>
                                                <th>API Calls</th>
                                                <th>Last Modified</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                                {this.state.loader? loader: intents}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

IntentsPage.propTypes = {
    activeBot:PropTypes.object.isRequired,
    getBots:PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        bots:state.bots,
        activeBot: state.activeBot,
        activeIntents: state.activeIntents
    }
}


export default connect(mapStateToProps, { getBots, getIntents, addIntent, removeIntent })(IntentsPage);