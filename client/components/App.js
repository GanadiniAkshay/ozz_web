import React from 'react';
import Header from './landing/Header';
import Features from './landing/Features';
import SocialProof from './landing/SocialProof';
import Footer from './landing/Footer';

import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
 
class App extends React.Component {
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(e){
        e.preventDefault();
        this.props.logout();
    }

    render(){
        document.body.style.backgroundColor = 'white';

        const { isAuthenticated } = this.props.auth;

        const landing = (
            <div>
                <Header />
                <Features/>
                <SocialProof />
                <Footer />
            </div>
        );

        const home = (
            <div>
                <h1>This is home</h1>
                <a href="#" onClick={this.logout}>Logout</a>
            </div>
        );

        return (
            <div className="fluid-container">
                { isAuthenticated ? home : landing}
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