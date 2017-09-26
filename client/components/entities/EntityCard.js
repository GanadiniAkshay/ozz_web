import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import { getBots } from '../../actions/botActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

class EntityCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {};
        this.openEntity = this.openEntity.bind(this);
    }

    openEntity(e){
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
                            <span className="card-title">{this.props.entity}</span>
                            
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="col s4">
                                    <i className="material-icons">list</i>
                                    <p>{this.props.num_examples} Examples</p>
                                </div>
                                <div className="col s3 offset-s2 btn waves-effect waves-light"  style={{'background':'#58488a','color':'white'}} name={this.props.entity} onClick={this.openEntity}>
                                    Open
                                </div>
                                <div className="col s2 offset-s1 btn waves-effect waves-light"  style={{'background':'#58488a','color':'white'}} name={this.props.entity +"|*|*|" + this.props.index} onClick={this.props.onRemove}>
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

EntityCard.propTypes = {
    entity: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    num_examples: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default EntityCard;