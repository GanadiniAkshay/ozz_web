import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import { getBots } from '../../actions/botActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

class IntentCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {};
        this.openIntent = this.openIntent.bind(this);
    }

    openIntent(e){
        var button = e.currentTarget;
        var name = button.attributes.name.value
        var url_path = window.location.pathname+"/"+name;
        browserHistory.push(url_path);
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
                                <div className="col s4 m2 btn waves-effect waves-light" name={this.props.intent} style={{'background':'#58488a','color':'white'}} onClick={this.openIntent}>
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
    intent: PropTypes.string.isRequired,
    utterances: PropTypes.number.isRequired,
    responses: PropTypes.number.isRequired,
    calls: PropTypes.number.isRequired
}

export default IntentCard;