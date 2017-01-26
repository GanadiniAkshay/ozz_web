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
                        <h4>Sign up for free and make your chatbots smarter</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s10 offset-s1" style={{'background':'white'}}>
                        <br/>
                        <div className="row">
                            <div className="col s4 offset-s1">
                                <br/><br/>
                                <SignupForm  
                                    userSignupRequest={userSignupRequest}
                                />
                                <br/><br/>
                            </div>
                            <div className="col s4 offset-s1" style={{"marginTop":"5%"}}>
                                <h4 style={{'color':'#ABA0CB'}}>Continuous Learning</h4>
                                <p>Make your bot continuously learn from incoming conversations automatically.</p>
                                <h4 style={{'color':'#ABA0CB'}}>Automated Testing</h4>
                                <p>Run tests with auto expanded test cases to make sure your bot is ready.</p>
                                <h4 style={{'color':'#ABA0CB'}}>Smart Analytics</h4>
                                <p>Get actionable insights and custom text analytics on your conversation data.</p>
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