import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 
import fileDownload from 'js-file-download';

import { getBots, updateBot, deleteBot } from '../../actions/botActions';

import PropTypes from 'prop-types';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

import {config} from '../../config';

class SettingsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id:'',
            bot_guid:'',
            name:'',
            platform:'',
            nlp_platform:'',
            nlp_app_secret:'',
            button:'save',
            disabled:true,
            client_label:'Client Secret',
            json_button: 'Import Ozz',
            json_button_api: 'Import Dialogflow',
            json_button_wit: 'Import Wit.ai',
            tsv_button:'Import TSV',
            webhook:'',
            app_secret:'',
            errors:{}
        }

         this.onSelectChange = this.onSelectChange.bind(this);
         this.onChange = this.onChange.bind(this);
         this.onDelete = this.onDelete.bind(this);
         this.onJsonChange = this.onJsonChange.bind(this);
         this.onTSVChange = this.onTSVChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.onExport = this.onExport.bind(this);
    }

    componentWillMount(){
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
                        this.setState({name:activeBot.name,platform:activeBot.platform,nlp_platform:activeBot.nlp_platform,id:activeBot.id,bot_guid:activeBot.bot_guid,webhook:activeBot.webhook,app_secret:activeBot.app_secret});
                        Materialize.updateTextFields();
                        $('select').material_select(this.onSelectChange.bind(this));
                        if (this.state.nlp_platform == 'wit'){
                            this.setState({disabled:false,'nlp_app_secret':activeBot.nlp_app_secret,'client_label':'Server Access Token'});
                            Materialize.updateTextFields();
                        }else if(this.state.nlp_platform == 'api'){
                            this.setState({disabled:false,'nlp_app_secret':activeBot.nlp_app_secret, 'client_label':'Developer Access Token'});
                            Materialize.updateTextFields();
                        }else{
                            this.setState({'nlp_app_secret':'Support Coming Soon'});
                            Materialize.updateTextFields();
                        }
                    }
                }
        );
    } 

    componentDidMount(){
        $('select').material_select(this.onSelectChange.bind(this));
        $('.modal').modal();
        $('ul.tabs').tabs();
    }


    onSelectChange(){
        var nlp_platform = $('#nlp_platform').val();
        var platform = $('#platform').val();

        this.setState({nlp_platform:nlp_platform,platform:platform});

        if (nlp_platform == 'wit'){
            this.setState({disabled:false, 'client_label':'Server Access Token', 'nlp_app_secret':''});
        }else if(nlp_platform == 'api'){
            this.setState({disabled:false, 'client_label':'Developer Access Token', 'nlp_app_secret':''});
        }else{
            this.setState({'nlp_app_secret':'Support Coming Soon',disabled:true});
            Materialize.updateTextFields();
        }
    }

    onJsonChange(e){
        if ( e.target.name != 'file'){
            this.setState({ [e.target.name]: e.target.value });
        }else{
            this.setState({ errors: {}, json_button:"Imported" });

            //create new formdata object
            var token = localStorage.getItem('jwtToken');
            var form_data = new FormData($('#json')[0]);
            var bot_guid  = this.state.bot_guid;
            $.ajax({
                type: 'POST',
                url: config.url + '/upload/' + bot_guid,
                headers:{'Authorization':'Bearer ' + token},
                data: form_data,
                contentType: false,
                processData: false,
                dataType: 'json'
            }).done(function(data, textStatus, jqXHR){
                console.log(data);
            }).fail(function(data){
                alert('error!');
            });
        }
    }

    onTSVChange(e){
        if ( e.target.name != 'file'){
            this.setState({ [e.target.name]: e.target.value });
        }else{
            this.setState({ errors: {}, tsv_button:"Imported" });

            //create new formdata object
            var token = localStorage.getItem('jwtToken');
            // var tsv = document.getElementById('tsvfile').files[0];
            var form_data = new FormData($('#tsv')[0]);
            var bot_guid  = this.state.bot_guid;
            $.ajax({
                type: 'POST',
                url: config.url + '/upload_csv/' + bot_guid,
                headers:{'Authorization':'Bearer ' + localStorage.jwtToken},
                data: form_data,
                contentType: false,
                processData: false,
                dataType: 'json'
            }).done(function(data, textStatus, jqXHR){
                console.log(data);
            }).fail(function(data){
                alert('error!');
            });
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.id == 'delete'){
            if(e.target.value == this.state.name){
                this.setState({"disabled":false});
            }else{
                this.setState({"disabled":true});
            }
        }
    }

    validate(data){
        var isValid = true
        var errors  = {}
        if (data.name == ''){
            errors.name = 'Name cannot be empty';
            isValid = false;
        }

        return { isValid, errors };
    }

    onSubmit(e){
        e.preventDefault();

        const {isValid, errors } = this.validate(this.state);

        if (!isValid){
            this.setState({errors:errors});
        } else{
            this.props.updateBot(this.state);
        }
    }

    onExport(e){
        e.preventDefault();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + '/download/' + this.state.bot_guid,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "Authorization": "Bearer " + localStorage.jwtToken
            }
        }
            
        $.ajax(settings).done(function (response) {
            console.log(response);
            fileDownload(JSON.stringify(response,null,2),'data.json');
        });
    }

    onDelete(e){
        e.preventDefault();
        this.props.deleteBot(this.state).then(
            () => {
                $('#deleteModal').modal('close');
                browserHistory.push('/bots');
            }
        )
    }

    render(){

        const { errors } = this.state;
        

        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <div className="container full">
                        <h4>Settings</h4>

                        <div className="row">
                            <div className="col s12">
                            <ul className="tabs">
                                <li className="tab col s3"><a href="#test1">General</a></li>
                                <li className="tab col s3"><a href="#test2">Import/Export</a></li>
                            </ul>
                            </div>
                            <div id="test1" className="col s12">
                                <br/><br/>
                                <form className="col s8 offset-s2" onSubmit={this.onSubmit} autoComplete="off">
                                    <TextFieldGroup
                                        error={errors.name}
                                        label="Name"
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        type="text"
                                        field="name"
                                    />

                                    <br/>

                                    <TextFieldGroup
                                        id = 'bot_guid'
                                        error= {errors.none}
                                        label="Bot GUID"
                                        value={this.state.bot_guid}
                                        type="text"
                                        field="bot key"
                                    />

                                    <div className="form-group">
                                        <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                                            {this.state.button} <i className="material-icons right">send</i>
                                        </button>
                                        <br/><br/>
                                        <button className="btn waves-effect waves-light modal-trigger" id="button" style={{'background':'#ef5350','color':'white'}} data-target="deleteModal">
                                            Delete <i className="material-icons right">delete_forever</i>
                                        </button>
                                        <br/><br/>
                                    </div>
                                    <div id="deleteModal" className="modal">
                                        <div className="modal-content">
                                            <h4>Delete {this.state.name}</h4>
                                            <p><b>Deleting a bot is permanent and all data will be lost!</b></p>

                                            <div className="row">
                                                <div className="col s12">
                                                    Enter bot name to confirm:
                                                    <div className="input-field inline">
                                                        <input id="delete" type="text" onChange={this.onChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button disabled={this.state.disabled} onClick={this.onDelete} className="btn waves-effect waves-light" id="button" style={{'background':'#ef5350','color':'white'}}>
                                                <i className="material-icons">delete_forever</i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div id="test2" className="col s12">
                                <br/><br/>
                                    <div className="row">
                                        <h5>Import</h5>
                                        <hr/>
                                        <form className="col s4" id="json" encType="multipart/form-data" autoComplete="off">
                                            <div className="file-field input-field">
                                                <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}}>
                                                    <span>{this.state.json_button}</span>
                                                    <input 
                                                        type="file" 
                                                        id="jsfile"
                                                        onChange={this.onJsonChange} 
                                                        name="file"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                        <form className="col s4" id="json_wit" encType="multipart/form-data" autoComplete="off">
                                        <div className="file-field input-field">
                                            <div className="btn waves-effect waves-light" disabled style={{'background':'#58488a','color':'white'}}>
                                                <span>{this.state.json_button_wit}</span>
                                                <input 
                                                    type="file" 
                                                    id="js_witfile"
                                                    onChange={this.onJsonChange} 
                                                    name="file"
                                                />
                                            </div>
                                        </div>
                                        </form>
                                        <form className="col s4" id="json_api" encType="multipart/form-data" autoComplete="off">
                                        <div className="file-field input-field">
                                            <div className="btn waves-effect waves-light" disabled style={{'background':'#58488a','color':'white'}}>
                                                <span>{this.state.json_button_api}</span>
                                                <input 
                                                    type="file" 
                                                    id="js_apifile"
                                                    onChange={this.onJsonChange} 
                                                    name="file"
                                                />
                                            </div>
                                        </div>
                                        </form>
                                        <form className="col s4" id="tsv" encType="multipart/form-data" autoComplete="off">
                                        <div className="file-field input-field">
                                            <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}}>
                                                <span>{this.state.tsv_button}</span>
                                                <input 
                                                    type="file" 
                                                    id="tsvfile"
                                                    onChange={this.onTSVChange} 
                                                    name="file"
                                                />
                                            </div>
                                        </div>
                                        </form>
                                    </div>
                                    <br/><br/>
                                    <div className="row">
                                        <h5>Export</h5>
                                        <hr/>
                                        <div className="file-field input-field col s4" >
                                            <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}} onClick={this.onExport}>
                                                Export Ozz
                                            </div>
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

SettingsPage.propTypes = {
    activeBot:PropTypes.object.isRequired,
    getBots:PropTypes.func.isRequired,
    updateBot:PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        activeBot: state.activeBot
    }
}


export default connect(mapStateToProps, { getBots, updateBot, deleteBot })(SettingsPage);