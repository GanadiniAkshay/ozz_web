import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'; 
import { userSignupRequest } from '../../actions/signupActions';

import SignupForm from './SignupForm';

class SignupPage extends React.Component{
    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userSignupRequest} = this.props;
        return(
            <div className="fluid-container">
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <h1><b>OZZ.ai</b></h1>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="tagline">
                        <h2>Sign up for free and make your chatbots smarter</h2>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1" style={{'background':'white'}}>
                        <br/>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-1">
                                <br/><br/>
                                <SignupForm  
                                    userSignupRequest={userSignupRequest}
                                />
                                <br/><br/>
                            </div>
                            <div className="col-md-4 col-md-offset-1">
                                <h3 style={{'color':'#ABA0CB'}}>Automated Testing</h3><br/>
                                <p>Run tests with auto expanded test cases to make sure your bot is ready.</p>
                                <h3 style={{'color':'#ABA0CB'}}>Smart Analytics</h3><br/>
                                <p>Get actionable insights and custom text analytics on your conversation data.</p>
                                <h3 style={{'color':'#ABA0CB'}}>Continuous Learning</h3>
                                <p>Make your bot continuously learn from incoming conversations automatically.</p>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest })(SignupPage);