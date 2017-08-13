import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory, Link } from 'react-router';




class BotAddForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            button:"Add",
            platform: '',
            nlp_platform:'',
            app_secret:'',
            webhook:'',
            errors: {}
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        $('select').material_select(this.onSelectChange.bind(this));
    }


    onSelectChange(){
        var nlp_platform = $('#nlp_platform').val();
        var platform = $('#platform').val();

        this.setState({nlp_platform:nlp_platform,platform:platform});
    }
    
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    validate(data){
        var isValid = true;
        var errors  = {};
        if (data.name == ""){
            errors.name = 'Name cannot be empty';
            isValid = false;
        }

        if (data.webhook == ""){
            errors.webhook = 'Webhook cannot be empty';
            isValid = false;
        }

        if (data.app_secret == ""){
            errors.app_secret = 'Facebook App Secret cannot be empty';
            isValid = false;
        }

        // if (data.platform == ""){
        //     errors.platform = 'Platform cannot be empty';
        //     isValid = false;
        // }

        if(data.nlp_platform == ""){
            errors.nlp_platform = 'NLP Platform cannot be empty';
            isValid = false;
        }

        return { isValid, errors };
    }

    onSubmit(e){
        this.setState({ errors: {}, button:"adding..." });
        e.preventDefault();

        const {isValid, errors } = this.validate(this.state);

        if (!isValid){
            this.setState({errors:errors, button:'Add'});
        } else{
            this.setState({errors:{}, button:'Add'});
            var payload = {};
            payload['name'] = this.state.name;
            payload['user_id'] = this.props.user.id;
            payload['platform'] = this.state.platform;
            payload['nlp_platform'] = this.state.nlp_platform;
            payload['app_secret'] = this.state.app_secret;
            payload['webhook'] = this.state.webhook;

            this.props.createBot(payload).then(
                () => {browserHistory.push('/')}
            );
        }
    }


    render(){
        const { errors } = this.state;

        return (
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
                        <option value="other">Other</option>
                        <option value="none">None</option>
                    </select>
                    <label>NLP Platform</label>
                    <span style={{"color":"red"}}>{this.state.errors.nlp_platform}</span>
                </div>

                <br/>

                <TextFieldGroup
                    error={errors.webhook}
                    label="Webhook"
                    onChange={this.onChange}
                    value={this.state.webhook}
                    type="text"
                    field="webhook"
                />

                <TextFieldGroup
                    error={errors.app_secret}
                    label="Facebook App Secret"
                    onChange={this.onChange}
                    value={this.state.app_secret}
                    type="text"
                    field="app_secret"
                />

                <br/><br/>

                <div className="form-group">
                    <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                        {this.state.button} <i className="material-icons right">add</i>
                    </button><br/><br/>
                </div>
            </form>
        )
    }
}

BotAddForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    createBot: React.PropTypes.func.isRequired
}


export default BotAddForm;