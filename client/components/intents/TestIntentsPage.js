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

class TestIntentsPage extends React.Component{
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

        const loader = (<img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/loader.gif" alt="loader animation" style={{'marginTop':'15%','marginLeft':'25%'}}/>);

        const intents = current_intents.map((current_intent,index) => {
            var modified = moment(current_intent.modified).local().fromNow();//format('MMMM Do YYYY, h:mm:ss a');
            return (
                <tr style={{"cursor":"pointer"}} key={index} name={current_intent.name} onClick={this.openIntent}>
                    <td width="30%" style={{"paddingLeft":"25px","textAlign":"left"}}><i className="material-icons">assignment</i><span>{current_intent.name}</span></td>
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
                    <div className="fluid-container" style={{"backgroundColor":"rgb(88, 72, 138)","top":0,"position":"sticky","zIndex":2}}>
                        <div className="row" style={{"color":"white"}}>
                            <div className="col s7 m7">
                                <h4 style={{"marginLeft":"25px"}}>Intents</h4>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

TestIntentsPage.propTypes = {
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


export default connect(mapStateToProps, { getBots, getIntents, addIntent, removeIntent })(TestIntentsPage);