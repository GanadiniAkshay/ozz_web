import React from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';

import { getLogs } from '../../actions/analyticsActions';
import { browserHistory, Link} from 'react-router';

import Navbar from '../navbar/Navbar';
import PropTypes from 'prop-types';

class KnowledgePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            "button":"Add"
        };
        this.onAdd = this.onAdd.bind(this);
    }

    onAdd(){
        var kid = $('#kid').val();
        console.log(kid);
        $('#kid').val('');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/knowledge/" + this.props.activeBot.activeBot.bot_guid,
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "cache-control": "no-cache",
            },
            "processData": false,
            "data": JSON.stringify({"kid":kid})
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        this.setState({button:"Added"});
        console.log(this.props.activeBot.activeBot.bot_guid);
    }

    render(){
        const data = this.state.data;
        const intent_count = this.state.intent_count;


        return (
            <div className="full">
                <Navbar active="app_new"/>
                <main>
                    <div className="container">
                        <h4>Knowledge</h4>
                        <div className="row" style={{"height":"100%"}}>
                            <input autoComplete="off" id="kid" type="text" placeholder="Enter knowledge ID" style={{"fontSize":"1em","height":"100%"}} />
                            <button onClick={this.onAdd}>{this.state.button}</button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

KnowledgePage.PropTypes = {
    getLogs: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        activeBot: state.activeBot
    }
}


export default connect(mapStateToProps, { getLogs })(KnowledgePage);