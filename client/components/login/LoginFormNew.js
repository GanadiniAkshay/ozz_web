import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroupMod from '../common/TextFieldGroupMod';
import { browserHistory, Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            button:"Login",
            password: '',
            errors: {},
            step: 1
        }

    
        this.onChange = this.onChange.bind(this);
        this.getBots  = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        this.setState({ errors: {}, button:"Logging in..." });
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

    componentDidMount(){
        console.log(this.refs);
    }

    render(){
        const { errors } = this.state;

        const passwordDiv = (
            <div style={{height: 'inherit'}}>
                <ReactCSSTransitionGroup
                    transitionName="passwordInput"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    style={{height: 'inherit'}}
                >
                    <TextFieldGroupMod
                        error={errors.password}
                        label="Password"
                        placeholder="Password"
                        value={this.state.password}
                        key="password"
                        field="password"
                        type="password"
                        onChange={this.onChange}
                        parentStyle={{margin: 0, display: 'inline'}}
                        inputStyle={{height: 'inherit', width: '75%'}}
                        labelStyle={{display: 'none'}}
                    />
                    <button
                        id="button"
                        key="login-button"
                        style={{background:'#26a69a',color: 'white', width: '22%', height: 'inherit'}}
                        type="submit"
                    >
                        {this.state.button}
                    </button>
                </ReactCSSTransitionGroup>
            </div>
        );

        const emailDiv = (
            <div style={{height: 'inherit'}}>
                <TextFieldGroupMod
                    error={errors.email}
                    label=""
                    placeholder="Email"
                    value={this.state.email}
                    field="email"
                    type="email"
                    onChange={this.onChange}
                    parentStyle={{margin: 0, display: 'inline'}}
                    inputStyle={{height: 'inherit', width: '70%'}}
                    labelStyle={{display: 'none'}}
                />
                <button
                    id="button"
                    style={{background:'#26a69a',color: 'white', width: '27%', height: 'inherit'}}
                    onClick={() => this.setState({step: 2})}
                >
                    Continue
                </button>
            </div>
        );
        const forgotPassword = this.state.step == 1? null: (
                <div style={{padding: 15}}>
                    <Link to="/forgot_password" className="link">
                        Forgot Password
                    </Link>
                </div>
            );
        const currentStep = this.state.step == 1? emailDiv : passwordDiv;

        return (
            <div className="full-height">
                <form className="" onSubmit={this.onSubmit}>
                    <div className="card" style={{padding: 0, margin: '0 -15% 0 0', height: 48}}>
                        {currentStep}
                    </div>
                </form>
                {forgotPassword}
            </div>
        )
    }
}

LoginForm.propTypes = {
    userLoginRequest: React.PropTypes.func.isRequired,
    getBots: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
    bots: React.PropTypes.object.isRequired,
    activeBot: React.PropTypes.object.isRequired
}

export default LoginForm;