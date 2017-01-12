import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory, Link } from 'react-router';

import timezones from '../../data/timezones';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false
        }

    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid(){
        console.log(this.state);
        const { errors, isValid } = validateInput(this.state);

        if (!isValid){
            this.setState({ errors })
        }

        return isValid;
    }

    onSubmit(e){
        this.setState({ errors: {}, isLoading:true });
        e.preventDefault();

        if (this.isValid()){
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type:'success',
                        text:'You signed up successfully. Welcome!'
                    })
                    browserHistory.push('/');
                },
                ( error ) => this.setState({ errors: error.response.data, isLoading:false})
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



                <div className="form-group">
                    <button disabled={this.state.isLoading} className="ctas-button" style={{'background':'#58488a','color':'white'}}>
                        Login
                    </button><br/><br/>
                    <p>
                        Don't have an account? &emsp;
                        <Link to="/signup" style={{'textDecoration':'underline','color':'#58488a'}}>
                         Signup
                        </Link>
                    </p>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

export default LoginForm;