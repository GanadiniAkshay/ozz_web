import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

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
                    var bot_name = url_path[2].replace('%20',' ');

                    
                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});
                    var that = this;

                    setTimeout(function(){
                        if(activeBot){
                            that.props.updateBot(activeBot);
                        }else{
                            activeBot = current_bots[0];
                            browserHistory.push('/bots/'+activeBot.name+'/learning');
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
        isAuthenticated: React.PropTypes.bool.isRequired,
        bots: React.PropTypes.object.isRequired,
        getBots: React.PropTypes.func.isRequired,
        setActiveBot: React.PropTypes.func.isRequired,
        updateBot: React.PropTypes.func.isRequired
    }

    function mapStateToProps(state){
        return {
            isAuthenticated: state.auth.isAuthenticated,
            bots: state.bots
        };
    }

    return connect(mapStateToProps, { getBots, setActiveBot, updateBot })(BotAuthenticate);
}
