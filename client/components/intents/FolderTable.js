import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import { getBots } from '../../actions/botActions';
import { getIntents, addIntent, removeIntent, removeFolders } from '../../actions/intentActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

import IntentCard from './IntentCard';
import PropTypes from 'prop-types';

import { config } from '../../config';


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
            folder_name:"",
            int_button: 'Add',
            show_folder: true,
            show_multi: false,
            name_state:0,
            is_selected:[],
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
         this.navigate_folder = this.navigate_folder.bind(this);
         this.onNameChange = this.onNameChange.bind(this);
         this.onNameChangeConfirm = this.onNameChangeConfirm.bind(this);
         this.multiSelect = this.multiSelect.bind(this);
         this.changeMultiSelect = this.changeMultiSelect.bind(this);
         this.cancelFoldersRemove = this.cancelFoldersRemove.bind(this);
         this.deleteFolders = this.deleteFolders.bind(this);
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
                    const current_folder = this.state.base.split('/').pop();
                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    this.setState({name:activeBot.name,id:activeBot.id,bot_guid:activeBot.bot_guid,folder_name:current_folder,old_folder_name:current_folder+'%'});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
                        this.props.getIntents(this.state).then(
                            () => {
                                this.setState({loader:false,activeIntents:this.props.activeIntents.activeIntents})
                                
                            }
                        ).catch(
                            () => {
                                console.log('here');
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
        var name = this.state.base.split('/').join('.')+'%';
        var payload = {};
        
        payload['intent'] =  name;
        payload['bot_guid'] = this.state.bot_guid;

        $("#delete_form").modal('close');
        this.props.removeIntent(payload).then(
            () => {
                var path = '/' + window.location.href.split('/').slice(3,-1).join('/');
                browserHistory.push(path);
            }
        ).catch(
           () => {
               console.log('here');
           } 
        )
    }

    changeFolderView(e){
        var checked = document.getElementById("switch").checked;
        this.setState({show_folder:checked});
    }

    navigate_folder(e){
        var clicked = e.currentTarget.id;
        var folders = this.state.base.split('/').slice(1);

        var link = '/bots/' + this.state.name + '/intents'

        for (var i=0;i<folders.length;i++){
            if (folders[i]== clicked){
                link += '/' + folders[i];
                break;
            }else{
                link += '/' + folders[i];
            }
        }

        browserHistory.push(link);
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

    onNameChange(e){
        this.setState({folder_name:e.target.value});
    }

    multiSelect(e){
        var folder_name = e.target.id.slice(2);
        var event_type  = e.target.id.slice(0,1);

        if (event_type == 'l'){
            var input = document.getElementById('i_' + folder_name);
            input.checked = !input.checked;
            var is_selected = this.state.is_selected;

            if (input.checked == true){
                if (!is_selected.includes(folder_name)){
                    is_selected.push(folder_name);
                }
            }else{
                var index = is_selected.indexOf(folder_name);
                if (index !== -1) is_selected.splice(index,1);
            }
            this.setState({is_selected:is_selected});
        }else{
            var url_path = window.location.pathname+"/"+folder_name;
            browserHistory.push(url_path);
        }
    }

    changeMultiSelect(){
        this.setState({show_multi:!this.state.show_multi});
    }

    onNameChangeConfirm(e){
        var key = e.which || e.keyCode;
        if (key === 13){
            var url = config.url + '/intents/' +this.state.bot_guid;
            
            var payload = {}
            payload["old_name"] = this.state.old_folder_name;
            payload["new_name"] = this.state.folder_name;
    
            axios.put(url,payload).then(
                (res) => {
                    var old_name = this.state.old_folder_name.slice(0,-1);
                    var new_base = this.state.base.replace(old_name,this.state.folder_name);
                    this.setState({old_folder_name:this.state.folder_name,base:new_base});
                    var path = '/' + window.location.href.split('/').slice(3,-1).join('/') + '/' + this.state.folder_name;
                    browserHistory.push(path);
                },
                (error) => {console.log(error)}
            )
        }
    }

    //change the current state for sort type of name.
    // 0-No sort 1-Descending 2-Ascending
    name_state_change(){
        var current_state = (this.state.name_state + 1)%3;
        this.setState({name_state:current_state});

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

        var current_intents = this.state.activeIntents;

        var new_intents = current_intents.sort(function(a,b){
            if(a.modified<b.modified){
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

    cancelFoldersRemove(e){
        $("#del_form").modal('close');
    }

    deleteFolders(e){
        var folders = this.state.is_selected;
        var payload = {};
        
        payload['folders'] =  folders;
        payload['bot_guid'] = this.state.bot_guid;
        payload['base'] = this.state.base;

        $("#delete_form").modal('close');

        if (this.state.is_selected.length == this.state.activeIntents.length){
            this.props.removeFolders(payload).then(
                () => {
                    var path = '/' + window.location.href.split('/').slice(3,-1).join('/');
                    browserHistory.push(path);
                }
            ) 
        }else{
            this.props.removeFolders(payload).then(
                () => {
                    window.location.reload();
                }
            ) 
        }
    }


    render(){
        const { errors } = this.state;
        const current_intents = this.state.activeIntents;

        const loader = (<img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/loader.gif" alt="loader animation" style={{'marginTop':'15%','marginLeft':'25%'}}/>);

        const bases = this.state.base.split('/').slice(1);
        
        const heading = bases.map((current_folder, index) => {
            return (
                <Link key={index} id={current_folder} style={{"cursor":"pointer","color":"rgb(88, 72, 138)"}} onClick={this.navigate_folder}>/{current_folder}</Link>
            )
        })

        const folder_edit = (
            <div className="container" style={{"width":"100%"}}>
                <div className="row">
                    <div className="col s1 m1" style={{"paddingRight":"0","paddingTop":"1%"}}>
                        <i className="material-icons">edit</i>
                    </div>
                    <div className="col s9 m9" style={{"padding":"0","marginLeft":"-25px"}}>
                        <h5 style={{"margin":"0"}}>
                            <div className="input-field-none">
                                <input autoComplete="off" type="text" value={this.state.folder_name} style={{"fontSize":"1em","margin":"0"}} onChange={this.onNameChange} onKeyPress={this.onNameChangeConfirm}/>
                            </div>
                        </h5>
                    </div>
                    <div className="col s2 m2" style={{"paddingRight":"0","paddingTop":"1%"}}>
                        <a className="waves-effect waves-light btn modal-trigger" href="#delete_form" style={{'background':'#58488a','color':'white'}}><i className="material-icons">delete</i></a>
                    </div>
                </div>
            </div>
        )

        const selected_folders = this.state.is_selected.map((folder_name,index) => {
            return (
                    <li key={index}><b><i className="material-icons">folder</i>{folder_name}</b></li>
            )
            
        });

        const error_message = (
            <li><b>No folders selected</b></li>
        )

        const folder_del_button = (
            <div className="col s3 btn waves-effect waves-light" style={{'background':'#ef5350','color':'white'}} onClick={this.deleteFolders}>
                Confirm Delete
            </div>
                            
        )

        const folders_multi = current_intents.map((current_intent,index) => {
            var modified = moment(current_intent.modified).local().fromNow();//format('MMMM Do YYYY, h:mm:ss a');
            if (current_intent.is_folder == true){
                return (
                    <tr style={{"cursor":"pointer"}} key={index} name={current_intent.name} >
                        <td width="40%" style={{"paddingLeft":"25px","textAlign":"left","color":"black"}} id={'t_' + current_intent.name} onClick={this.multiSelect}>
                            <input type="checkbox" id={'i_' + current_intent.name}/>
                            <label style={{"color":"black"}} id={'l_' + current_intent.name}>
                                <i className="material-icons" id={'m_' + current_intent.name}>folder</i><span id={'s_' + current_intent.name}>{current_intent.name}</span>   
                            </label>                         
                        </td>
                        <td>{current_intent.count}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{modified}</td>
                    </tr>
                )
            } 
        });

        const folders = current_intents.map((current_intent,index) => {
            var modified = moment(current_intent.modified).local().fromNow();//format('MMMM Do YYYY, h:mm:ss a');
            if (current_intent.is_folder == true){
                return (
                    <tr style={{"cursor":"pointer"}} key={index} name={current_intent.name} >
                        <td width="40%" style={{"paddingLeft":"25px","textAlign":"left","color":"black"}} id={'t_' + current_intent.name} onClick={this.multiSelect}>
                            <i className="material-icons" id={'m_' + current_intent.name}>folder</i><span id={'s_' + current_intent.name}>{current_intent.name}</span>                            
                        </td>
                        <td>{current_intent.count}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{modified}</td>
                    </tr>
                )
            } 
        });

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

        const del_button = (
            <a className="waves-effect waves-light btn modal-trigger" href="#del_form" style={{'background':'#58488a','color':'white','marginRight':'30px','float':'right'}}>Delete Selection</a>
        )
        
        const multi_select = (
            <div className="switch" style={{"paddingLeft":"25px"}}>
                <label>Show Multiple Select
                    <input id="switch" type="checkbox" onChange={this.changeMultiSelect}/>
                    <span className="lever"></span>
                </label>
                {this.state.show_multi?del_button:null}
            </div>
        )

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
                                        <h5 style={{"paddingLeft":"25px"}}>
                                            <Link to={'/bots/' + this.state.name + '/intents'} style={{"color":"rgb(88, 72, 138)"}}>..</Link>
                                            {heading}
                                        </h5>
                                    </span>
                                    <div className="switch" style={{"paddingLeft":"25px"}}>
                                        <label>Show Folders
                                            <input id="switch" type="checkbox" defaultChecked onChange={this.changeFolderView}/>
                                            <span className="lever"></span>
                                        </label>
                                    </div>
                                    {this.state.show_folder?multi_select:null}
                                    <br/>
                                    {this.state.base == '/'? null :folder_edit}
                                    <hr/>
                                    <table className="bordered highlight centered">
                                        <thead>
                                        <tr style={{"cursor":"pointer"}}>
                                            <th id="name_header" className="no_sort"style={{"paddingLeft":"25px","textAlign":"left"}} onClick={this.name_state_change}>
                                                Name 
                                                {this.state.name_state == 1?<i className="material-icons">keyboard_arrow_up</i>:null }
                                                {this.state.name_state == 2?<i className="material-icons">keyboard_arrow_down</i>:null }
                                            </th>
                                            <th id="intent_header" className="no_sort" onClick={this.intent_count_state_change}>
                                                Intents
                                                {this.state.intent_count_state == 1?<i className="material-icons">keyboard_arrow_up</i>:null }
                                                {this.state.intent_count_state == 2?<i className="material-icons">keyboard_arrow_down</i>:null }
                                            </th>
                                            <th id="utterance_header" className="no_sort" onClick={this.utterance_count_state_change}>
                                                Utterances
                                                {this.state.utterance_count_state == 1?<i className="material-icons">keyboard_arrow_up</i>:null }
                                                {this.state.utterance_count_state == 2?<i className="material-icons">keyboard_arrow_down</i>:null }
                                            </th>
                                            <th id="response_header" className="no_sort" onClick={this.response_count_state_change}>
                                                Responses
                                                {this.state.response_count_state == 1?<i className="material-icons">keyboard_arrow_up</i>:null }
                                                {this.state.response_count_state == 2?<i className="material-icons">keyboard_arrow_down</i>:null }
                                            </th>
                                            <th id="api_header" className="no_sort" onClick={this.api_count_state_change}>
                                                API Calls
                                                {this.state.api_count_state == 1?<i className="material-icons">keyboard_arrow_up</i>:null }
                                                {this.state.api_count_state == 2?<i className="material-icons">keyboard_arrow_down</i>:null }
                                            </th>
                                            <th id="modified_header" className="no_sort" onClick={this.modified_state_change}>
                                                Last Modified
                                                {this.state.modified_state == 1?<i className="material-icons">keyboard_arrow_up</i>:null }
                                                {this.state.modified_state == 2?<i className="material-icons">keyboard_arrow_down</i>:null }
                                            </th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.show_folder?
                                                (this.state.show_multi?folders_multi:folders)
                                                :null}
                                            {this.state.loader? loader: intents}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="delete_form" className="modal">
                    <div className="modal-content">
                        <h4>Delete {this.state.intent_name}</h4>
                        <p>This will delete the folder and all containing intents and folders permanently, are you sure?</p>
                        <br/>
                        <div className="row">
                            <div className="col s3 btn waves-effect waves-light" style={{'background':'#ef5350','color':'white'}} onClick={this.deleteIntent}>
                                Confirm Delete
                            </div>
                            <div className="col s3 offset-s1 btn waves-effect waves-light"  style={{'background':'#58488a','color':'white'}} onClick={this.cancelRemove}>
                                Cancel
                            </div>
                        </div>  
                    </div>
                </div>
                <div id="del_form" className="modal">
                    <div className="modal-content">
                        <h4>Delete Folders</h4>
                        <p>This will delete the following folders and all it's contents permanently, are you sure?</p>
                        <br/>
                        <ul>
                            {this.state.is_selected.length == 0?error_message:selected_folders}
                        </ul>
                        <br/>
                        <div className="row">
                            {this.state.is_selected.length == 0?null:folder_del_button}
                            <div className="col s3 offset-s1 btn waves-effect waves-light"  style={{'background':'#58488a','color':'white'}} onClick={this.cancelFoldersRemove}>
                                Cancel
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


export default connect(mapStateToProps, { getBots, getIntents, addIntent, removeIntent, removeFolders })(FolderTable);