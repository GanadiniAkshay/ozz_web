import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'; 
import { userLoginRequest } from '../../actions/loginActions';

import LoginForm from './LoginForm';

class LoginPage extends React.Component{
    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userLoginRequest } = this.props;
        return(
            <div className="fluid-container" style={{'marginTop':'5%'}}>
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <h1 style={{'fontSize':'1.2em'}}><b>OZZ.ai</b></h1>
                        </Link>
                    </div>
                </div>
                <div className="row" style={{'marginTop':'5%'}}>
                    <div className="col-md-4 col-md-offset-4" style={{'background':'white','textAlign':'center'}}>
                        <h3 style={{'color':'#ABA0CB'}}>Log in to your account</h3>
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
    userLoginRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userLoginRequest })(LoginPage);