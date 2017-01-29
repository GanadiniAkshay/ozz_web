import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory, Link } from 'react-router';

import timezones from '../../data/timezones';

class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            button:"sign up",
            password: '',
            passwordConfirmation: '',
            errors: {}
        }

    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid(){
        const { errors, isValid } = validateInput(this.state);

        if (!isValid){
            this.setState({ errors, button:"sign up" })
        }

        return isValid;
    }

    onSubmit(e){
        this.setState({ errors: {}, button:"signing up..."});
        e.preventDefault();

        if (this.isValid()){
            this.props.userSignupRequest(this.state).then(
                () => {
                    browserHistory.push('/');
                },
                ( error ) => this.setState({ errors: error.response.data.errors || error.response.data, button:"sign up"  })
            );
        }
        
    }

    render(){
        const { errors } = this.state;
        const options = map(timezones, (val,key) => 
            <option key={val} value={val}>{key}</option>
        );

        return (
            <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                    error={errors.name}
                    label="Name"
                    onChange={this.onChange}
                    value={this.state.name}
                    field="name"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    type="email"
                    field="email"
                />

                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    field="password"
                />

                <TextFieldGroup
                    error={errors.passwordConfirmation}
                    label="Password Confirmation"
                    onChange={this.onChange}
                    value={this.state.passwordConfirmation}
                    type="password"
                    field="passwordConfirmation"
                />

                <br/><br/>
                <div className="input-field">
                    <button className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}}>
                        {this.state.button} <i className="material-icons right">send</i>
                    </button><br/><br/>
                    <p>
                        Already have an account? &emsp;
                        <Link to="/login" style={{'textDecoration':'underline','color':'#58488a'}}>
                         Login
                        </Link>
                    </p>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;