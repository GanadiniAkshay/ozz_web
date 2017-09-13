import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory, Link } from 'react-router';

import PropTypes from 'prop-types';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            button:"login",
            password: '',
            errors: {}
        }

    
        this.onChange = this.onChange.bind(this);
        this.getBots  = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        this.setState({ errors: {}, button:"logging in..." });
        e.preventDefault();

        this.props.userLoginRequest(this.state).then(
                (res) => {
                    this.props.getBots(this.state).then(
                        (res) => {
                            if (this.props.bots.bots.length == 0){
                                browserHistory.push('/bots');
                            }else{
                                var current_bots = this.props.bots.bots;
                                var max_time = Math.max.apply(Math, current_bots.map(function(o){return o.used}));
                                var activeBot = current_bots.find(function(o){ return o.used == max_time});

                                browserHistory.push('/bots/' + activeBot.name + '/intents');
                            }
                        },
                        (error) => { console.log(error)}
                    )
                },
                ( error ) => this.setState({ errors: error.response.data.errors || error.response.data, button:"login" })
            );
    }

    render(){
        const { errors } = this.state;

        return (
            <form className="col s8 offset-s2" onSubmit={this.onSubmit}>


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
                    <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                        {this.state.button} <i className="material-icons right">send</i>
                    </button>
                    <br/><br/>
                    <Link to="/forgot_password" style={{'textDecoration':'underline','color':'#58488a'}}>
                         Forgot Password
                    </Link>
                    <br/><br/>
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
    userLoginRequest: PropTypes.func.isRequired,
    getBots: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    bots: PropTypes.object.isRequired,
    activeBot: PropTypes.object.isRequired
}

export default LoginForm;