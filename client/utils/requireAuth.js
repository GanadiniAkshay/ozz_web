import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(ComposedComponent){
    class Authenticate extends React.Component{
        componentWillMount(){
            if (!this.props.isAuthenticated){
                browserHistory.push('/login');
            }
        }

        render(){
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired
    }

    function mapStateToProps(state){
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps)(Authenticate);
}
