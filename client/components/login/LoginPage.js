import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'; 
import { userLoginRequest } from '../../actions/loginActions';

import LoginForm from './LoginForm';

class LoginPage extends React.Component{
    componentWillMount(){
            if (this.props.isAuthenticated){
                browserHistory.push('/bots');
            }
    }

    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userLoginRequest } = this.props;
        return(
            <div className="fluid-container" style={{'marginTop':'5%'}}>
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <img src="/img/logo_white_full.png" alt="ozz_logo" height="100px" style={{"marginTop":"10px"}}/> 
                        </Link>
                    </div>
                </div>
                <div className="row" style={{'marginTop':'5%'}}>
                    <div className="col s6 offset-s3" style={{'background':'white','textAlign':'center'}}>
                        <h4 style={{'color':'#ABA0CB'}}>Log in to your account</h4>
                        <br/>
                        <LoginForm  
                            userLoginRequest={userLoginRequest}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    userLoginRequest: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired
}


function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, { userLoginRequest })(LoginPage);