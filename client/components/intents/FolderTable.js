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


class FolderTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id:'',
            bot_guid:'',
            name:'',
            base:'/',
            json_button: 'Import JSON',
            activeIntents:[],
            int_button: 'Add',
            show_folder: true,
            name_state:0,
            intent_count_state:0,
            utterance_count_state:0,
            response_count_state:0,
            api_count_state:0,
            modified_state:0,
            button:'save',
            disabled:true,
            loader:true,
            errors:{}
        }

         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.addIntent = this.addIntent.bind(this);
         this.addKeyIntent = this.addKeyIntent.bind(this);
         this.addFolder = this.addFolder.bind(this);
         this.addKeyFolder = this.addKeyFolder.bind(this);
         this.openIntent = this.openIntent.bind(this);
         this.deleteIntent = this.deleteIntent.bind(this);
         this.changeFolderView = this.changeFolderView.bind(this);
         this.name_state_change = this.name_state_change.bind(this);
         this.intent_count_state_change = this.intent_count_state_change.bind(this);
         this.utterance_count_state_change = this.utterance_count_state_change.bind(this);
         this.response_count_state_change = this.response_count_state_change.bind(this);
         this.api_count_state_change = this.api_count_state_change.bind(this);
         this.modified_state_change = this.modified_state_change.bind(this);
    }

    componentDidMount(){
        this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = decodeURI(url_path[2]);

                    var base = '/';

                    var items = url_path.slice(4);

                    if (items.length == 0){
                        this.setState({"base":base});
                    }else{
                        base = decodeURI('/'+items.join('/'));
                        this.setState({"base":base});
                    }

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    this.setState({name:activeBot.name,id:activeBot.id,bot_guid:activeBot.bot_guid});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
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
        payload['is_folder'] = false;
        payload['base'] = this.state.base;

        this.props.addIntent(payload).then(
            () => {
                this.setState({int_button:"Add", activeIntents:this.props.activeIntents.activeIntents});
                if (this.state.base == '/'){
                    browserHistory.push('/bots/'+ this.state.name +'/intents'+ this.state.base + intent_name); 
                }else{
                    browserHistory.push('/bots/'+ this.state.name +'/intents'+ this.state.base +'/' + intent_name);
                }
            }
        )

        $('#intent_form').modal('close');
    }

    addFolder(e){
        var intent_name = document.getElementById('folder').value;
        this.setState({int_button:"Adding..."});

        var payload = {};

        payload['name'] =  intent_name;
        payload['bot_guid'] = this.state.bot_guid;
        payload['utterances'] = [];
        payload['responses'] = [];
        payload['has_entities'] = true;
        payload['is_folder'] = true
        payload['base'] = this.state.base;

        this.props.addIntent(payload).then(
            () => {
                this.setState({int_button:"Add", activeIntents:this.props.activeIntents.activeIntents});
                if (this.state.base == '/'){
                    browserHistory.push('/bots/'+ this.state.name +'/intents'+ this.state.base + intent_name);
                }else{
                    browserHistory.push('/bots/'+ this.state.name +'/intents'+ this.state.base +'/' + intent_name);
                }
                
            }
        )
        $('#folder_form').modal('close');
    }

    addKeyFolder(e){
        var key = e.which || e.keyCode;
        
        if (key && key == 13){
            this.addFolder();
        }
    }

    addKeyIntent(e){
        var key = e.which || e.keyCode;
        
        if (key && key == 13){
            this.addIntent();
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

    changeFolderView(e){
        var checked = document.getElementById("switch").checked;
        this.setState({show_folder:checked});
    }

    openIntent(e){
        var button = e.currentTarget;
        var name = button.attributes.name.value
        var url_path = window.location.pathname+"/"+name;
        browserHistory.push(url_path);
    }


    onSubmit(e){
        this.setState({ errors: {}, button:"saving..." });
        e.preventDefault();
    }

    //change the current state for sort type of name.
    // 0-No sort 1-Descending 2-Ascending
    name_state_change(){
        var current_state = (this.state.name_state + 1)%3;
        this.setState({name_state:current_state});
        var ele =document.getElementById('name_header');
        switch (current_state){
             
            case 0:
                ele.className = "no_sort";
                break;
            case 1:
                ele.className = "descending";
                break;
            case 2:
                ele.className = "ascending";
                break;
        }

        var current_intents = this.state.activeIntents;

        var new_intents = current_intents.sort(function(a,b){
            if(a.name<b.name){
                if (current_state == 1){
                    return -1
                }else if (current_state == 2){
                    return 1;
                }else{
                    return 0;
                }
            }else{
                if (current_state == 1){
                    return 1
                }else if (current_state == 2){
                    return -1;
                }else{
                    return 0;
                }
            }
        });
    }

    //change the current state for sort type of intent count.
    // 0-No sort 1-Descending 2-Ascending
    intent_count_state_change(){
        var current_state = (this.state.intent_count_state + 1)%3;
        this.setState({intent_count_state:current_state});
        var ele =document.getElementById('intent_header');
        switch (current_state){
             
            case 0:
                ele.className = "no_sort";
                break;
            case 1:
                ele.className = "descending";
                break;
            case 2:
                ele.className = "ascending";
                break;
        }

        var current_intents = this.state.activeIntents;

        var new_intents = current_intents.sort(function(a,b){
            if(a.count<b.count){
                if (current_state == 1){
                    return -1
                }else if (current_state == 2){
                    return 1;
                }else{
                    return 0;
                }
            }else{
                if (current_state == 1){
                    return 1
                }else if (current_state == 2){
                    return -1;
                }else{
                    return 0;
                }
            }
        });
    }

    //change the current state for sort type of utterance count.
    // 0-No sort 1-Descending 2-Ascending
    utterance_count_state_change(){
        var current_state = (this.state.utterance_count_state + 1)%3;
        this.setState({utterance_count_state:current_state});
        var ele =document.getElementById('utterance_header');
        switch (current_state){
             
            case 0:
                ele.className = "no_sort";
                break;
            case 1:
                ele.className = "descending";
                break;
            case 2:
                ele.className = "ascending";
                break;
        }

        var current_intents = this.state.activeIntents;

        var new_intents = current_intents.sort(function(a,b){
            if(a.utterances<b.utterances){
                if (current_state == 1){
                    return -1
                }else if (current_state == 2){
                    return 1;
                }else{
                    return 0;
                }
            }else{
                if (current_state == 1){
                    return 1
                }else if (current_state == 2){
                    return -1;
                }else{
                    return 0;
                }
            }
        });
    }

    //change the current state for sort type of response count.
    // 0-No sort 1-Descending 2-Ascending
    response_count_state_change(){
        var current_state = (this.state.response_count_state + 1)%3;
        this.setState({response_count_state:current_state});
        var ele =document.getElementById('response_header');
        switch (current_state){
             
            case 0:
                ele.className = "no_sort";
                break;
            case 1:
                ele.className = "descending";
                break;
            case 2:
                ele.className = "ascending";
                break;
        }

        var current_intents = this.state.activeIntents;

        var new_intents = current_intents.sort(function(a,b){
            if(a.responses<b.responses){
                if (current_state == 1){
                    return -1
                }else if (current_state == 2){
                    return 1;
                }else{
                    return 0;
                }
            }else{
                if (current_state == 1){
                    return 1
                }else if (current_state == 2){
                    return -1;
                }else{
                    return 0;
                }
            }
        });
    }

    //change the current state for sort type of api calls.
    // 0-No sort 1-Descending 2-Ascending
    api_count_state_change(){
        var current_state = (this.state.api_count_state +1)%3;
        this.setState({api_count_state:current_state});
        var ele =document.getElementById('api_header');
        switch (current_state){
             
            case 0:
                ele.className = "no_sort";
                break;
            case 1:
                ele.className = "descending";
                break;
            case 2:
                ele.className = "ascending";
                break;
        }

        var current_intents = this.state.activeIntents;

        var new_intents = current_intents.sort(function(a,b){
            if(a.calls<b.calls){
                if (current_state == 1){
                    return -1
                }else if (current_state == 2){
                    return 1;
                }else{
                    return 0;
                }
            }else{
                if (current_state == 1){
                    return 1
                }else if (current_state == 2){
                    return -1;
                }else{
                    return 0;
                }
            }
        });
    }

    //change the current state for sort type of modified.
    // 0-No sort 1-Descending 2-Ascending
    modified_state_change(){
        var current_state = (this.state.modified_state+1)%3;
        this.setState({modified_state:current_state});
        var ele =document.getElementById('modified_header');
        switch (current_state){
             
            case 0:
                ele.className = "no_sort";
                break;
            case 1:
                ele.className = "descending";
                break;
            case 2:
                ele.className = "ascending";
                break;
        }
    }


    render(){
        const { errors } = this.state;
        const current_intents = this.state.activeIntents;

        const loader = (<img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/loader.gif" alt="loader animation" style={{'marginTop':'15%','marginLeft':'25%'}}/>);

        const folders = current_intents.map((current_intent,index) => {
            var modified = moment(current_intent.modified).local().fromNow();//format('MMMM Do YYYY, h:mm:ss a');
            if (current_intent.is_folder == true){
                return (
                    <tr style={{"cursor":"pointer"}} key={index} name={current_intent.name} onClick={this.openIntent}>
                        <td width="40%" style={{"paddingLeft":"25px","textAlign":"left"}}><i className="material-icons">folder</i><span>{current_intent.name}</span></td>
                        <td>{current_intent.count}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{modified}</td>
                    </tr>
                )
            } 
        })
        const intents = current_intents.map((current_intent,index) => {
            var modified = moment(current_intent.modified).local().fromNow();//format('MMMM Do YYYY, h:mm:ss a');
            if (current_intent.is_folder == false){
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
            }  
        })

        return (
            <div>
                <div className="fluid-container" style={{"backgroundColor":"white","top":0,"position":"sticky","zIndex":2,"height":"65px"}}>
                    <div className="row" style={{"color":"black"}}>
                        <div className="col s6 m6">
                            <h4 style={{"marginLeft":"25px"}}>Intents</h4>
                        </div>
                        <div className="col s3 m3">
                            <div className="file-field input-field" >
                                <a className="waves-effect waves-light btn modal-trigger" href="#folder_form" style={{'background':'#58488a','color':'white'}}>Add Folder</a>
                            </div>
                        </div>
                        <div className="col s3 m3">
                            <div className="file-field input-field" >
                                <a className="waves-effect waves-light btn modal-trigger" href="#intent_form" style={{'background':'#58488a','color':'white'}}>Add Intent</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="folder_form" className="modal">
                    <div className="modal-content">
                        <h4>Add Folder</h4>
                        <div className="input-field col s12">
                            <input id="folder" type="text" onKeyPress={this.addKeyFolder}/>
                            <label htmlFor="intent">Folder Name</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="waves-effect waves-green btn-flat" onClick={this.addFolder}>{this.state.int_button}</a>
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
                                        <h5 style={{"paddingLeft":"25px"}}>{this.state.base}</h5>
                                    </span>
                                    <div className="switch" style={{"paddingLeft":"25px"}}>
                                        <label>Show Folders
                                            <input id="switch" type="checkbox" defaultChecked onChange={this.changeFolderView}/>
                                            <span className="lever"></span>
                                        </label>
                                    </div>
                                    <br/>
                                    <table className="bordered highlight centered">
                                        <thead>
                                        <tr style={{"cursor":"pointer"}}>
                                            <th id="name_header" className="no_sort"style={{"paddingLeft":"25px","textAlign":"left"}} onClick={this.name_state_change}>Name</th>
                                            <th id="intent_header" className="no_sort" onClick={this.intent_count_state_change}>Intents</th>
                                            <th id="utterance_header" className="no_sort" onClick={this.utterance_count_state_change}>Utterances</th>
                                            <th id="response_header" className="no_sort" onClick={this.response_count_state_change}>Responses</th>
                                            <th id="api_header" className="no_sort" onClick={this.api_count_state_change}>API Calls</th>
                                            <th id="modified_header" className="no_sort" onClick={this.modified_state_change}>Last Modified</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.show_folder?(folders):null}
                                            {this.state.loader? loader: intents}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FolderTable.propTypes = {
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


export default connect(mapStateToProps, { getBots, getIntents, addIntent, removeIntent })(FolderTable);