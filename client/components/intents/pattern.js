import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'; 

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

class Pattern extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
       const pattern = this.props.pattern;

       
        
        return(
            <div className="collapsible-body" style={{"backgroundColor":"#ede7f6"}}>
                <div style={{"marginLeft":"95%"}}>
                    <a className="btn-floating waves-effect waves-light red"  onClick={this.props.onDelete}><i className="material-icons" id={"button " + this.props.index}>delete</i></a>
                </div>
            </div>
        )
    }
}

Pattern.propTypes = {
    pattern:PropTypes.string.isRequired,
    onDelete:PropTypes.func.isRequired
}

export default Pattern;