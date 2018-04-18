import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import { getBots, setActiveBot, updateBot } from '../actions/botActions';

export default function(ComposedComponent){
    class BotAuthenticate extends React.Component{
        constructor(props){
            super(props);
        }

        componentWillMount(){
            if (!this.props.isAuthenticated){
                browserHistory.push('/login');
            }

            this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = decodeURI(url_path[2]);

                    
                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});
                    var that = this;

                    setTimeout(function(){
                        if(activeBot){
                            that.props.updateBot(activeBot);
                        }else{
                            activeBot = current_bots[0];
                            browserHistory.push('/bots/'+activeBot.name+'/intents');
                        }  
                    },100);
                }
            );
        }

        render(){
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    BotAuthenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        bots: PropTypes.object.isRequired,
        getBots: PropTypes.func.isRequired,
        setActiveBot: PropTypes.func.isRequired,
        updateBot: PropTypes.func.isRequired
    }

    function mapStateToProps(state){
        return {
            isAuthenticated: state.auth.isAuthenticated,
            bots: state.bots
        };
    }

    return connect(mapStateToProps, { getBots, setActiveBot, updateBot })(BotAuthenticate);
}
