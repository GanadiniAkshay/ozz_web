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