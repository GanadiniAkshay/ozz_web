import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

class Response extends React.Component{
    constructor(props){
        super(props);

        this.state = {};

        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        this.forceUpdate();
    }

    onDelete(e){
        console.log("deleted");
    }

    render(){
        return(
            <div className="collapsible-body" style={{"backgroundColor":"#ede7f6"}}>
                <div className="input-field">
                    <input id={this.props.index} type="text" defaultValue={this.props.response} onKeyPress={this.props.onChange}/>
                </div>
                <div style={{"marginLeft":"95%"}}>
                    <a className="btn-floating waves-effect waves-light red"  onClick={this.props.onIntentDelete}><i className="material-icons" id={"button " + this.props.index}>delete</i></a>
                </div>
            </div>
        )
    }
}

Response.propTypes = {
    index:PropTypes.number.isRequired,
    response:PropTypes.string.isRequired,
    onDelete_:PropTypes.func.isRequired,
    onChange:PropTypes.func.isRequired
}

export default Response;