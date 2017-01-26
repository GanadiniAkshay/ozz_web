import React from 'react';
import { browserHistory, Link } from 'react-router';

import Header from './landing/Header';
import Features from './landing/Features';
import SocialProof from './landing/SocialProof';
import Footer from './landing/Footer';

import Navbar from './home/Navbar';

import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
 
class App extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        const { isAuthenticated } = this.props.auth;

        if (isAuthenticated){
            browserHistory.push('/bots');
        }
    }

    render(){
        document.body.style.backgroundColor = 'white';
        const landing = (
            <div>
                <Header />
                <Features/>
                <SocialProof />
                <Footer />
            </div>
        );

        return (
            <div className="fluid-container">
                {landing}
            </div>
        );
    }
}

App.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

function mapStatetoProps(state){
    return {
        auth: state.auth
    };
}

export default connect(mapStatetoProps, { logout })(App);