import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import { getBots } from '../../actions/botActions';
import { getUtterances, changeUtterances, addUtterance, dropUtterances, getPatterns, addPattern, dropPattern } from '../../actions/intentActions';

import Navbar from '../navbar/Navbar';
import PropTypes from 'prop-types';

import Utterance from './utterance';
import Pattern from './pattern';
import { config } from '../../config';

class IntentTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            "bot_guid":"",
            "intent_name":"",
            "utterances":[],
            "patterns":[],
            "intent_name":"",
            "old_intent_name":""
        };

        this.onChange = this.onChange.bind(this);
        this.onIntentAdd = this.onIntentAdd.bind(this);
        this.onPatternAdd = this.onPatternAdd.bind(this);
        this.onDelete_ = this.onDelete_.bind(this);
        this.onPatternDelete_ = this.onPatternDelete_.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onNameChangeConfirm = this.onNameChangeConfirm.bind(this);
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        $('ul.tabs').tabs();
        this.props.getBots(this.state).then(
            () => {
                var current_bots = this.props.bots.bots;
                
                var url_path = window.location.pathname.split('/');
                var bot_name = decodeURI(url_path[2]);
                var intent_name = decodeURI(url_path[4]);

                var activeBot = current_bots.find(function(o){ return o.name == bot_name});
                
                if (!activeBot){
                    activeBot = current_bots[0];
                    browserHistory.push('/bots/'+activeBot.name+'/intents');
                }else{
                    this.setState({bot_guid:activeBot.bot_guid, intent_name:intent_name, old_intent_name:intent_name});

                    this.props.getUtterances(this.state).then(
                        () => {
                            this.setState({utterances:this.props.utterances.utterances});
                        }
                    )

                    this.props.getPatterns(this.state).then(
                        () => {
                            this.setState({patterns:this.props.patterns.patterns});
                        }
                    )
                }
            }
        );

        $('.tooltipped').tooltip({delay: 50});
        $('#intent_form').modal('close');

        $(document).ready(function(){
            $('.collapsible').collapsible();
        });
    }


    onDelete_(e){
        var index = e.target.id.split(" ")[1];
        var payload = {};
        
        payload['index'] = index;
        payload['utterance'] = this.state.utterances[index].utterance;
        payload['bot_guid'] = this.state.bot_guid;
        payload['intent_name'] = this.state.intent_name;
        this.props.dropUtterances(payload).then(
            () => {
                this.setState({utterances:this.props.utterances.utterances})
            }
        );
    }

    onChange(e){
        var key = e.which || e.keyCode;
        if (key === 13){
            var payload = {};
            
            payload['index'] = e.target.id;
            payload['value'] = e.target.value;
            payload['bot_guid'] = this.state.bot_guid;
            payload['intent_name'] = this.state.intent_name;
            payload['old_utterance'] = this.state.utterances[e.target.id].utterance;
            
            this.props.changeUtterances(payload).then(
                () => {
                    this.setState({utterances:this.props.utterances.utterances});
                }
            );
        }
    }

    onPatternAdd(e){
        e.preventDefault();
        var pattern = document.getElementById('pattern_input').value;
        document.getElementById('pattern_input').value = '';
        var payload = {};

        payload['value'] = pattern;
        payload['bot_guid'] = this.state.bot_guid;
        payload['intent_name'] = this.state.intent_name;

        this.props.addPattern(payload).then(
            () => {
                this.setState({"patterns":this.props.patterns.patterns});
            }
        )
    }

    onPatternDelete_(e){
        e.preventDefault();
        var index = e.target.id.split(" ")[1];
        var payload = {};
        
        payload['index'] = index;
        payload['pattern'] = this.state.patterns[index].string;
        payload['bot_guid'] = this.state.bot_guid;
        payload['intent_name'] = this.state.intent_name;

        this.props.dropPattern(payload).then(
            () => {
                this.setState({"patterns":this.props.patterns.patterns})
            }
        )
    }

    onIntentAdd(e){
        e.preventDefault();
        var intent = document.getElementById('intent').value;
        document.getElementById('intent').value = '';
        var payload = {};
        
        payload['value'] = intent;
        payload['bot_guid'] = this.state.bot_guid;
        payload['intent_name'] = this.state.intent_name;

        this.props.addUtterance(payload).then(
            () => {
                this.setState({utterances:this.props.utterances.utterances});
            }
        );

        this.props.addPattern(payload).then(
            () => {
                this.setState({"patterns":this.props.patterns.patterns});
            }
        );
    }

    onNameChange(e){
        this.setState({intent_name:e.target.value});
    }

    onNameChangeConfirm(e){
        var key = e.which || e.keyCode;
        if (key === 13){
            var url = config.url + '/intents/' +this.state.bot_guid;
            
            var payload = {}
            payload["old_name"] = this.state.old_intent_name;
            payload["new_name"] = this.state.intent_name;
    
            axios.put(url,payload).then(
                (res) => {
                    this.setState({old_intent_name:this.state.intent_name});
                },
                (error) => {console.log(error);this.setState({button:'save'})}
            )
        }
    }

    render(){
        var utterances = this.state.utterances;
        var patterns   = this.state.patterns;
        
        const patterns_list = patterns.map((pattern, index)=>{
            var start_str = pattern.string;
            var ent_str = "";
            var end_str = "";
            var entity_list = ""; 
            var entities = [];

            return (
                <li className="collection-item" key={index}>
                    <div className="collapsible-header"><i className="material-icons">format_quote</i>
                        {start_str}
                        {ent_str}
                        {end_str}
                    </div>
                    <Pattern pattern={start_str} index={index} onDelete={this.onPatternDelete_}/>
                </li>
            )
        })

        const utterance_list = utterances.map((utterance, index)=>{
            var utterance_str = utterances[index].utterance;
            var entities = utterance.entities;

            if (entities.length > 0){
                for (var i=0; i<entities.length; i++){
                    var start_str = utterance_str.slice(0,entities[i].start);
                    if (entities[i].type == 'builtin'){
                        var ent_str = (<span className="tooltipped" style={{'backgroundColor':'#1de9b6'}} data-position="bottom" data-delay="50" data-tooltip={entities[i].entity}> {utterance_str.slice(entities[i].start,entities[i].end)} </span>);
                    }else if (entities[i].type == 'spacy'){
                        var ent_str = (<span className="tooltipped" style={{'backgroundColor':'#ffff8d'}} data-position="bottom" data-delay="50" data-tooltip={entities[i].entity}> {utterance_str.slice(entities[i].start,entities[i].end)} </span>);
                    }else if (entities[i].type == 'duckling'){
                        var ent_str = (<span className="tooltipped" style={{'backgroundColor':'#ff8a80'}} data-position="bottom" data-delay="50" data-tooltip={entities[i].entity}> {utterance_str.slice(entities[i].start,entities[i].end)} </span>);
                    }
                    
                    var end_str = utterance_str.slice(entities[i].end);                    
                }

                const entity_list = entities.map((entity)=>{
                    return (
                        <li>{entity.entity}</li>
                    )
                });
            }
            else{
                var start_str = utterance_str;
                var ent_str = "";
                var end_str = "";
                var entity_list = "";
            }

            return (
                <li className="collection-item" key={index}>
                    <div className="collapsible-header"><i className="material-icons">format_quote</i>
                        {start_str}
                        {ent_str}
                        {end_str}
                    </div>
                    <Utterance utterance={utterance_str} index={index} entities={entities} onChange={this.onChange} onIntentDelete={this.onDelete_}/>
                </li>
            )
        });
        
        return (
            <div>
                <div className="container">
                    <h3>
                            <div className="input-field-none" style={{"height":"100%"}}>
                                <input autoComplete="off" type="text" value={this.state.intent_name} style={{"fontSize":"1em","height":"100%"}} onChange={this.onNameChange} onKeyPress={this.onNameChangeConfirm}/>
                            </div>
                    </h3>
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs">
                                <li className="tab col s3"><a href="#test1">ML Utterances</a></li>
                                <li className="tab col s3"><a href="#test2">Simple Patterns</a></li>
                            </ul>
                        </div>
                        <div id="test1" className="col s12">
                            <div>
                                <div>
                                    <form className="col s12" id="json" encType="multipart/form-data" onSubmit={this.onIntentAdd}>
                                        <div className="input-field">
                                            <input autoComplete="off" id="intent" type="text" placeholder="Add utterance" />
                                        </div>
                                        <div className="file-field input-field" >
                                            <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white','float':'right','marginTop':'-2%'}} onClick={this.onIntentAdd}>
                                                <span>Add Utterance</span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <br/><br/><br/>
                            <br/><br/><br/>
                            <div className="container">
                                <div className="row">
                                    <ul className="collapsible popout" data-collapsible="accordion">
                                        {utterance_list}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="test2" className="col s12">
                            <div>
                                <div>
                                    <form className="col s12" id="json" encType="multipart/form-data" onSubmit={this.onPatternAdd}>
                                        <div className="input-field">
                                            <input autoComplete="off" id="pattern_input" type="text" placeholder="Add pattern" />
                                        </div>
                                        <div className="file-field input-field" >
                                            <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white','float':'right','marginTop':'-2%'}} onClick={this.onPatternAdd}>
                                                <span>Add Pattern</span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <br/><br/><br/>
                            <br/><br/><br/>
                            <div className="container">
                                <div className="row">
                                    <ul className="collapsible popout" data-collapsible="accordion" style={{"width":"100%"}}>
                                        {patterns_list}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// IntentTable.propTypes = {
//     bot_guid: PropTypes.string.isRequired,
//     intent_name: PropTypes.string.isRequired
// }

function mapStateToProps(state){
    return {
        bots:state.bots,
        activeBot: state.activeBot,
        utterances:state.utterances,
        patterns: state.patterns
    }
}

export default connect(mapStateToProps, { getBots, getUtterances, changeUtterances, addUtterance, dropUtterances, getPatterns, addPattern, dropPattern})(IntentTable);