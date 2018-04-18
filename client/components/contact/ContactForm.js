import React from 'react';
import axios from 'axios';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory, Link } from 'react-router';

import PropTypes from 'prop-types';


class ContactForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            name:'',
            message:'',
            button:"send",
            errors: {}
        }

    
        this.onChange = this.onChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onTextChange(){
        var textarea = $('#message').val();
        this.setState({'message':textarea})
    }

    validate(data){
        var errors = {}
        var isValid = true;
        if (data.name == ''){
            errors.name = 'Name is required'
            isValid = false
        }

        if(data.email == ''){
            errors.email = 'Email is required'
            isValid = false
        }

        if(data.message == ''){
            errors.message = 'Message is required'
            isValid = false
        }
        
        return { isValid, errors }
    }

    onSubmit(e){
        this.setState({ errors: {}, button:"sending" });
        e.preventDefault();

         const {isValid, errors } = this.validate(this.state);

         if (!isValid){
             this.setState({errors:errors, button:'send'});
         } else{
             var messageData = {'name':this.state.name,'email':this.state.email,'message':this.state.message} 
             axios.post('https://api.ozz.ai/contact',messageData).then(
                 () => {this.setState({button:'send'})},
                 (error) => { this.setState({button:'send'})}
             )
         }
    }

    render(){
        const { errors } = this.state;

        return (
            <form className="col s8 offset-s2" onSubmit={this.onSubmit}>


                <TextFieldGroup
                    error={errors.name}
                    label="Name"
                    onChange={this.onChange}
                    value={this.state.name}
                    type="text"
                    field="name"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    type="email"
                    field="email"
                />

                <div className="input-field">
                    <textarea id="message" className="materialize-textarea" value={this.state.message} onChange={this.onTextChange}></textarea>
                    <label>Message</label>
                    <span style={{'color':'red'}}>{this.state.errors.message}</span>
                </div>



                <div className="form-group">
                    <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                        {this.state.button} <i className="material-icons right">send</i>
                    </button><br/><br/>
                </div>
            </form>
        )
    }
}



export default ContactForm;