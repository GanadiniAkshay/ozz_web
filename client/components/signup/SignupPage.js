import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'; 
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages'; 

import SignupForm from './SignupForm';

class SignupPage extends React.Component{
    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userSignupRequest, addFlashMessage } = this.props;
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
                                    addFlashMessage={addFlashMessage}
                                />
                                <br/><br/>
                            </div>
                            <div className="col-md-4 col-md-offset-1">
                                <h3 style={{'color':'#ABA0CB'}}>Automated Testing</h3><br/>
                                <p>Run scheduled or on demand tests with auto expanded test cases to make sure your bot is ready to the delight the customers.</p>
                                <h3 style={{'color':'#ABA0CB'}}>Smart Analytics</h3><br/>
                                <p>Get actionable insights instead of just plain simple reports. Run on demand custom text analytics on your conversation data.</p>
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
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);