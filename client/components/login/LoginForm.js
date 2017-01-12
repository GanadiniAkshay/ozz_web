import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory, Link } from 'react-router';


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

    onSubmit(e){
        this.setState({ errors: {}, isLoading:true });
        e.preventDefault();

        this.props.userLoginRequest(this.state).then(
                () => {
                    browserHistory.push('/');
                },
                ( error ) => this.setState({ errors: error.response.data })
            );
    }

    render(){
        const { errors } = this.state;

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
                    <button className="ctas-button" style={{'background':'#58488a','color':'white'}}>
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
    userLoginRequest: React.PropTypes.func.isRequired
}

export default LoginForm;