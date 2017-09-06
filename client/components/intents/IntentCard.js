import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import { getBots } from '../../actions/botActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

class IntentCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        return (
            <div className="row">
                <div className="col s12 m8" style={{'width':'75%'}}>
                    <div className="card purple lighten-5">
                        <div className="card-content">
                            <span className="card-title">{this.props.intent}</span>
                            
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="col s4 m3">
                                    <i className="material-icons">list</i>
                                    <p>{this.props.utterances} Utterances</p>
                                </div>
                                <div className="col s4 m3">
                                    <i className="material-icons">reply</i>
                                    <p>{this.props.responses} Responses</p>
                                </div>
                                <div className="col s4 m4">
                                    <i className="material-icons">trending_up</i>
                                    <p>{this.props.calls} API Calls</p>
                                </div>
                                <div className="col s4 m2 btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}}>
                                    <i className="material-icons">launch</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

IntentCard.propTypes = {
    intent: React.PropTypes.string.isRequired,
    utterances: React.PropTypes.number.isRequired,
    responses: React.PropTypes.number.isRequired,
    calls: React.PropTypes.number.isRequired
}

export default IntentCard;