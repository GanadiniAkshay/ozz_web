import React from 'react';
import {Motion, spring} from 'react-motion';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Send from 'material-ui/svg-icons/content/send';
import {fullWhite} from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import PropTypes from 'prop-types';

const style = {
  width: 70,
};

class OzzFooter extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            message:"",
            convoId:props.convoId,
            token:props.token};
    }

    onChange(state){
        this.setState(state);
    }

    _handleTextFieldChange(e){
        this.setState({
            message:e.target.value
        });
    }

    _handleEnter(e){
        if (!e.shiftKey && (e.which == 13 || e.which == 10)){
            e.preventDefault();
            this.send();
        }
    }

    send(){
        this.props.sendMessage();
    }

    componentDidMount(){
        this.refs.messager.focus();
    }

    render(){
        const style = {
            borderColor:'#ABA0CB'
        }

        setTimeout(function(){
            var list = $('.ozz-list');
            list.prop('scrollTop',(list.prop('scrollHeight'))); 
        },100);

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
               <footer className="ozz-footer">
                   <div className="message-bar">
                       <TextField id="message-bar"
                                  ref='messager'
                                  multiLine={true} 
                                  hintText='Send a message...' 
                                  underlineFocusStyle={style}
                                  onKeyPress={this._handleEnter.bind(this)}/>
                   </div>
                   <div className="send">
                        <a onClick={this.send.bind(this)} className="send-button" style={{'color':'black','cursor':'pointer'}}>
                            <i className="material-icons">&#xE163;</i>
                        </a>
                   </div>
                </footer>
            </MuiThemeProvider>
        )
    }
};

OzzFooter.propTypes = {
    'sendMessage':PropTypes.func.isRequired
}

export default OzzFooter;