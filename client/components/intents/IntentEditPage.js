import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

import { getBots } from '../../actions/botActions';
import { getIntents, getUtterances  } from '../../actions/intentActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

import PropTypes from 'prop-types';

import FolderTable from './FolderTable';
import IntentTable from './IntentTable';
import ResponsesTable from './ResponsesTable';

import {config} from '../../config';

class IntentEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id:'',
            bot_guid:'',
            intent_name:'',
            button:'save',
            utterances:'',
            is_folder:true,
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
                    var bot_name = this.props.params.botname;
                    var intent_name = this.props.params.intentname;

                    //check if multi path
                    var path = this.props.params.splat;

                    if (path){
                        intent_name = intent_name + '.' + path.split('/').join('.');
                    }

                    console.log(intent_name);

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
                        this.setState({intent_name:intent_name,id:activeBot.id,bot_guid:activeBot.bot_guid});
                        return axios.get(config.url + '/intents_is_folder/' + activeBot.bot_guid + '/' + intent_name).then( res => {
                            const is_folder = res.data.is_folder;
                            this.setState({"is_folder":is_folder});
                        });
                    }
                }
        );
    }
    
    
    onChange(e){
        if ( e.target.name != 'file'){
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    // <main>
    //                 <IntentTable />
    //                 <ResponsesTable/>
    //             </main>

    render(){
        const { errors } = this.state;
        console.log(this.state.is_folder);
        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    {this.state.is_folder?(<FolderTable/>):(<IntentTable/>)}
                </main>
            </div>
        )
    }
}

IntentEditPage.propTypes = {
    activeBot:PropTypes.object.isRequired,
    getBots:PropTypes.func.isRequired,
    getUtterances: PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        bots:state.bots,
        activeBot: state.activeBot,
        utterances:state.utterances
    }
}


export default connect(mapStateToProps, { getBots, getIntents, getUtterances })(IntentEditPage);