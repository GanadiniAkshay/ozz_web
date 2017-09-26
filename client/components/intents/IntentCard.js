import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import { getBots } from '../../actions/botActions';
import { removeIntent } from  '../../actions/intentActions';

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
                    <div className="card white lighten-5">
                        <div className="card-content">
                            <span className="card-title">{this.props.intent}</span>
                            
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="col s4">
                                    <i className="material-icons">list</i>
                                    <p>{this.props.utterances} Utterances</p>
                                </div>
                                <div className="col s4">
                                    <i className="material-icons">reply</i>
                                    <p>{this.props.responses} Responses</p>
                                </div>
                                <div className="col s4">
                                    <i className="material-icons">trending_up</i>
                                    <p>{this.props.calls} API Calls</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s3 offset-s6 btn waves-effect waves-light" name={this.props.intent} style={{'background':'#58488a','color':'white'}} onClick={this.openIntent}>
                                    Open
                                </div>
                                <div className="col s2 offset-s1 btn waves-effect waves-light" name={this.props.intent +"|*|*|" + this.props.index} style={{'background':'#58488a','color':'white'}} onClick={this.props.onRemove}>
                                    <i className="material-icons">delete</i>
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
    index: PropTypes.number.isRequired,
    utterances: PropTypes.number.isRequired,
    responses: PropTypes.number.isRequired,
    calls: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default IntentCard;