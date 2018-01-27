import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'; 
import { userSignupRequest } from '../../actions/signupActions';

import SignupForm from './SignupForm';
import PropTypes from 'prop-types';

class SignupPage extends React.Component{
    componentWillMount(){
            if (this.props.isAuthenticated){
                browserHistory.push('/bots');
            }
    }

    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userSignupRequest} = this.props;
        return(
            <div className="fluid-container">
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/logo_white_full.png" alt="ozz_logo" height="100px" style={{"marginTop":"10px"}}/> 
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
                                <p>Make your bot continuously learn from incoming conversations.</p>
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
    userSignupRequest: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, { userSignupRequest })(SignupPage);