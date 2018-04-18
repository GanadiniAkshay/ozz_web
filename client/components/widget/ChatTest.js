import React from 'react';
import {Motion, spring} from 'react-motion';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Send from 'material-ui/svg-icons/content/send';
import {fullWhite} from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class ChatTest extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            message:"lalala",
            token:props.config.token
        };
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
        if (!e.shiftKey && e.which == 13){
            this.send();
        }
    }

    send(){
        var message = this.state.message;
        console.log(this.state.token);
        ChatActions.sendBotMessage(message);
        this.setState({
            message:''
        });
    }

    render(){
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <div>
                        <TextField id="message_bar" multiLine={true} value={this.state.message} onKeyUp={this._handleEnter.bind(this)} onChange={this._handleTextFieldChange.bind(this)}/>
                    </div>
                    <div>
                        <a onClick={this.send.bind(this)} className="send-button">
                            <i className="material-icons">&#xE163;</i>
                        </a>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default ChatTest;