import React from 'react';

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        const messages = [
            {message: 'First message', sentByUser: true},
            {message: 'Second message', sentByUser: false},
            {message: 'Third message', sentByUser: false},
            {message: 'Fourth message', sentByUser: true},
            {message: 'Fifth message', sentByUser: true}
        ];
        this.state = {messages}

        console.log(this.props);
    }
    get styles() {
        return {
            fromMessage: {
                maxWidth: '70%',
                backgroundColor: '#6e5baa',
                color: '#FFF',
                marginLeft: 'auto',
                marginRight: 0
            },
            toMessage: {
                maxWidth: '70%',
                backgroundColor: '#EEE'
            }
        }
    }
    set styles(val) {}

    renderMessages() {
        return this.state.messages.map(message => (
            <div className="card" style={message.sentByUser? this.styles.fromMessage: this.styles.toMessage} key={message.message}>
                <div className="card-content" style={{padding: 10}}>
                    <p>{message.message}</p>
                </div>
            </div>
        ));
    }

    render() {
        return <div className="card" style={{height: '100%'}}>
            <hr style={{marginBottom: 15}}/>
            <div className="card-content" style={{backgroundColor: '#', padding: 15, height: '100%'}}>
                {this.renderMessages()}
            </div>
        </div>
    }
}