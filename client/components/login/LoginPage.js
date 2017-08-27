import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'; 
import { userLoginRequest } from '../../actions/loginActions';
import { getBots } from '../../actions/botActions';

import LoginForm from './LoginForm';

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
            <div className="fluid-container" style={{'marginTop':'5%'}}>
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <img src="https://d1wi3kcd7kachl.cloudfront.net/v0.0.2/img/logo_white_full.png" alt="ozz_logo" height="100px" style={{"marginTop":"10px"}}/> 
                        </Link>
                    </div>
                </div>
                <div className="row" style={{'marginTop':'5%'}}>
                    <div className="col s6 offset-s3" style={{'background':'white','textAlign':'center'}}>
                        <h4 style={{'color':'#ABA0CB'}}>Log in to your account</h4>
                        <br/>
                        <LoginForm  
                            userLoginRequest={userLoginRequest} getBots={getBots} user={user} bots={bots} activeBot={activeBot}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    userLoginRequest: React.PropTypes.func.isRequired,
    getBots: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    user:React.PropTypes.object.isRequired,
    bots:React.PropTypes.object.isRequired,
    activeBot:React.PropTypes.object.isRequired
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