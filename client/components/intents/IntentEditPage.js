import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

import { getBots } from '../../actions/botActions';
import { getIntents } from '../../actions/intentActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

import PropTypes from 'prop-types';

import IntentTable from './IntentTable';
import ResponsesTable from './ResponsesTable';

class IntentEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id:'',
            bot_guid:'',
            name:'',
            button:'save',
            disabled:true,
            loader:true,
            errors:{}
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = decodeURI(url_path[2]);
                    var intent_name = decodeURI(url_path[4]);

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
                        this.setState({name:intent_name,id:activeBot.id,bot_guid:activeBot.bot_guid});
                    }
                }
        );
    }
    
    
    onChange(e){
        if ( e.target.name != 'file'){
            this.setState({ [e.target.name]: e.target.value });
        }
    }


    render(){
        const { errors } = this.state;
        
        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <IntentTable />
                    <ResponsesTable/>
                </main>
                
            </div>
        )
    }
}

IntentEditPage.propTypes = {
    activeBot:PropTypes.object.isRequired,
    getBots:PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        bots:state.bots,
        activeBot: state.activeBot,
        utterances:state.utterances
    }
}


export default connect(mapStateToProps, { getBots, getIntents })(IntentEditPage);