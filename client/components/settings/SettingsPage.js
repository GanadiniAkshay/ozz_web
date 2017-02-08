import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

import { getBots } from '../../actions/botActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

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
            errors:{}
        }

         this.onSelectChange = this.onSelectChange.bind(this);
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = url_path[2];

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    if (!activeBot){
                        browserHistory.push('/bots');
                    }else{
                        this.setState({name:activeBot.name,platform:activeBot.platform,nlp_platform:activeBot.nlp_platform,id:activeBot.id,bot_guid:activeBot.bot_guid});
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

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    validate(data){
        var isValid = true
        var errors  = {}
        if (data.name == ''){
            errors.name = 'Name cannot be empty';
            isValid = false;
        }

        if (data.platform == ""){
            errors.platform = 'Platform cannot be empty';
            isValid = false;
        }

        if(data.nlp_platform == ""){
            errors.nlp_platform = 'NLP Platform cannot be empty';
            isValid = false;
        }

        if (data.nlp_app_secret == ''){
            errors.nlp_app_secret = 'This field cannot be empty';
            isValid = false;
        }

        return { isValid, errors };
    }

    onSubmit(e){
        this.setState({ errors: {}, button:"saving..." });
        e.preventDefault();

        const {isValid, errors } = this.validate(this.state);

        if (!isValid){
            this.setState({errors:errors, button:'Add'});
        } else{
            var bot_obj = {}

            bot_obj['id'] = this.state.id;
            bot_obj['name'] = this.state.name;
            bot_obj['app_secret'] = '';
            bot_obj['platform'] = this.state.platform;
            bot_obj['nlp_platform'] = this.state.nlp_platform;
            bot_obj['nlp_app_secret'] = this.state.nlp_app_secret;
            bot_obj['webhook'] = '';

            var url = 'https://api.ozz.ai/bots/' + this.state.id;
            axios.put(url,bot_obj).then(
                (res) => {
                    this.setState({button:'save'});

                    Materialize.toast('Saved', 2000, 'rounded'); 
                },
                (error) => {console.log(error);this.setState({button:'save'})}
            )
        }
    }

    render(){

        const { errors } = this.state;
        

        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <div className="container full">
                        <h4>Settings</h4>

                        <form className="col s8 offset-s2" onSubmit={this.onSubmit}>
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
                                label="Bot Key"
                                onChange={this.onChange}
                                value={this.state.bot_guid}
                                type="text"
                                field="bot key"
                            />

                            <br/>

                            <div className="input-field">
                                <select value={this.state.platform} id="platform" className="validate[required] invalid">
                                    <option value="">Choose Platform</option>
                                    <option value="messenger">Messenger</option>
                                    <option value="slack">Slack</option>
                                    <option value="telegram">Telegram</option>
                                    <option value="skype">Skype</option>
                                    <option value="sms">SMS</option>
                                    <option value="web">Web</option>
                                    <option value="email" style={{"color":"#ABA0CB"}}>Email</option>
                                    <option value="other">Other</option>
                                </select>
                                <label className="control-label">Platform</label>
                                <span style={{"color":"red"}}>{this.state.errors.platform}</span>
                            </div>

                            <br/>

                            <div className="input-field">
                                <select value={this.state.nlp_platform} id="nlp_platform">
                                    <option value="">Choose NLP Platform</option>
                                    <option value="wit">Wit.ai</option>
                                    <option value="api">Api.ai</option>
                                    <option value="luis">LUIS</option>
                                    <option value="rasa">Rasa</option>
                                    <option value="other">Other</option>
                                    <option value="none">None</option>
                                </select>
                                <label>NLP Platform</label>
                                <span style={{"color":"red"}}>{this.state.errors.nlp_platform}</span>
                            </div>

                            <br/>

                            <TextFieldGroup
                                error={errors.nlp_app_secret}
                                disabled={this.state.disabled}
                                label={this.state.client_label}
                                onChange={this.onChange}
                                value={this.state.nlp_app_secret}
                                type="text"
                                field="nlp_app_secret"
                            />

                            <div className="form-group">
                                <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                                    {this.state.button} <i className="material-icons right">send</i>
                                </button>
                                <br/><br/>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}

SettingsPage.propTypes = {
    activeBot:React.PropTypes.object.isRequired,
    getBots:React.PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        activeBot: state.activeBot
    }
}


export default connect(mapStateToProps, { getBots })(SettingsPage);