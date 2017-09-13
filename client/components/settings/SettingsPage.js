import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

import { getBots } from '../../actions/botActions';

import PropTypes from 'prop-types';

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
            webhook:'',
            app_secret:'',
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
                    var bot_name = url_path[2].replace('%20',' ');

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

            var url = '/bots/' + this.state.id;
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
                                label="Bot GUID"
                                value={this.state.bot_guid}
                                type="text"
                                field="bot key"
                            />

                            {/*<TextFieldGroup
                                error={errors.nlp_app_secret}
                                disabled={this.state.disabled}
                                label={this.state.client_label}
                                onChange={this.onChange}
                                value={this.state.nlp_app_secret}
                                type="text"
                                field="nlp_app_secret"
                            />*/}

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
    activeBot:PropTypes.object.isRequired,
    getBots:PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        activeBot: state.activeBot
    }
}


export default connect(mapStateToProps, { getBots })(SettingsPage);