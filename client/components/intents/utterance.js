import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

class Utterance extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
       const utterance = this.props.utterance;
       const entities = this.props.entities;

       const list = entities.map((entity, index)=>{
            
            if (entity.type == 'builtin'){
                var ent_str = (<span style={{'backgroundColor':'#1de9b6'}}> {utterance.slice(entity.start,entity.end)} </span>);
            }else if (entity.type == 'spacy'){
                var ent_str = (<span style={{'backgroundColor':'#ffff8d'}}> {utterance.slice(entity.start,entity.end)} </span>);
            }else if (entity.type == 'duckling'){
                var ent_str = (<span style={{'backgroundColor':'#ff8a80'}}> {utterance.slice(entity.start,entity.end)} </span>);
            }
            return(
                <li key={index}>
                    {ent_str} : {entity.entity}
                </li>
            )
        });
        
        return(
            <div className="collapsible-body" style={{"backgroundColor":"#ede7f6"}}>
                <h6>Entities:-</h6>
                <ul>
                    {list}
                </ul>
                <div className="input-field">
                    <input id={this.props.index} type="text" defaultValue={utterance} onKeyPress={this.props.onChange}/>
                </div>
                <div style={{"marginLeft":"95%"}}>
                    <a className="btn-floating waves-effect waves-light red"  onClick={this.props.onIntentDelete}><i className="material-icons" id={"button " + this.props.index}>delete</i></a>
                </div>
            </div>
        )
    }
}

Utterance.propTypes = {
    utterance:PropTypes.string.isRequired,
    entities:PropTypes.array.isRequired,
    onChange:PropTypes.func.isRequired,
    onIntentDelete:PropTypes.func.isRequired
}

export default Utterance;