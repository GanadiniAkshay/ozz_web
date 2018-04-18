import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'; 
import { userLoginRequest } from '../../actions/loginActions';
import { getBots } from '../../actions/botActions';

import LoginForm from './LoginForm';

import PropTypes from 'prop-types';

class LoginPage extends React.Component{
    componentWillMount(){
            if (this.props.isAuthenticated){
                browserHistory.push('/bots');
            }
    }

    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userLoginRequest, getBots, user, bots, activeBot } = this.props;
        return(
            <div className="fluid-container full-height login-page">
                <div className="row full-height" style={{margin: 0}}>
                    <div className="col s4 full-height" style={{backgroundColor: '#fafafa', padding: '2% 0 0 2%'}}>
                        <div>
                            <Link to="/">
                                <img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/logo_color_full_2.png" alt="ozz_logo" height="80px" />
                            </Link>
                            <div className="row" style={{margin: '15% 0 0 4%'}}>
                                <span style={{fontSize: 28, display: 'block'}}>Sign In</span>
                                <div style={{paddingTop: 30}}>
                                    <LoginForm
                                        userLoginRequest={userLoginRequest} getBots={getBots} user={user} bots={bots} activeBot={activeBot}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s8 full-height" style={{padding: 0}}>
                        <img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/pexels6.jpg" style={{height: '100%', width: '100%'}}></img>
                    </div>
                </div>

            </div>
        )
    }
}

LoginPage.propTypes = {
    userLoginRequest: PropTypes.func.isRequired,
    getBots: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
    bots:PropTypes.object.isRequired,
    activeBot:PropTypes.object.isRequired
}


function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        bots: state.bots,
        activeBot: state.activeBot.activeBot
    };
}

export default connect(mapStateToProps, { userLoginRequest, getBots })(LoginPage);