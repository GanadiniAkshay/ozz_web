import React from 'react';
import {Motion, spring} from 'react-motion';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import CardList from './CardList';
import QuickReply from './QuickReply';
import Message from './Message';

import PropTypes from 'prop-types';

class ChatList extends React.Component{
    constructor(){
        super();
        this.state = {
            "Messages":[
                {
                    message:"hola",
                    sentByUser:false
                },
                {
                    message:'hi',
                    sentByUser:true
                }
            ]
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(state){
        this.setState(state);
    }

    shouldComponentUpdate(){
        return true;
    }

    render(){
        const {color} = this.props;

        let messages = this.props.messages.map((message,i)=>{
            return(
                <div 
                    className={"ozz-list__item_" + (message.sentByUser? 'user':'bot')}
                    key={`list-item-${i}`}
                >
                    <Message message={message} color={color}/>
                </div>
            )
        });
        

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className="ozz-list" style={{"overflow":"scroll"}}>
                    {messages}
                </div>
            </MuiThemeProvider>
        );
    }
}

ChatList.propTypes = {
    "messages":PropTypes.array.isRequired
}

export default ChatList;