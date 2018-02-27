import React from 'react';
import ReactJson from 'react-json-view';
import moment from 'moment';
import {Motion, spring} from 'react-motion';

import Button from './Button';
import OzzBase from './OzzBase';

import ChatTest from './ChatTest';

import ChatList  from './ChatList';
import OzzFooter from './OzzFooter';

class Ozz extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            active: false,
            hasTriggered: false,
            config: props.config
        };
    
        this._handleClick = this._handleClick.bind(this);
        this.clearWindow  = this.clearWindow.bind(this);
    }


    componentDidMount() {
        this.mounted = true;
        $(document).mouseup($.proxy(function (e) {
           var container = $("#ozz");

           // if the target of the click isn't the container nor a descendant of the container
           if (!container.is(e.target) && container.has(e.target).length === 0){
                if (this.mounted){
                    this.setState({active:false});
                }
           } 
        },this));
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    clearWindow(){
		this.props.clearBox();
	}

    _handleClick() {
        this.setState({
            active: !this.state.active,
        });
    }

    // {active ? <OzzBase active={active} config={config} messages={this.props.messages} clearBox={this.props.clearBox} sendMessage={this.props.sendMessage} json={this.props.json} isDemo={false}/> : false}

    //             <Button 
    //                 active={active}
    //                 onClick={this._handleClick}
    //                 color={config.color}
    //             />

    render(){
        const {active, config} = this.state;
        var modified = moment(this.props.last_trained).local().fromNow();//format('MMMM Do YYYY, h:mm:ss a');
        const never = (
            <p>Last Trained: Not Trained Yet</p>
        );

        var last_trained = (
            <p>Last Trained: {modified}</p>
        )

        // <ChatList color={config.color} messages={this.props.messages} />
        // <OzzFooter convoId={config.convoId} token={config.token} sendMessage={this.props.sendMessage}/>

        return(
            <div className="ozz" id="ozz">
                <div className="ozz-box">
                    <div className="ozz-heading">
                        <p style={{"marginTop":"2%"}}>Test {this.props.name} <i className="material-icons right" onClick={this.clearWindow.bind(this)} style={{"cursor":"pointer","marginRight":"2%","marginTop":"3%"}}>refresh</i></p>
                        {this.props.last_trained?last_trained:never}
                    </div>
                    <div className="ozz-json">
                        <div style={{"marginLeft":"10%","marginTop":"15%"}}>
                            <ReactJson src={this.props.json} displayDataTypes={false} theme="isotope" enableClipboard={false}/>
                        </div>
                    </div>
                    <div className="ozz-window">
                        <ChatList color={config.color} messages={this.props.messages} />
                        <OzzFooter last_trained={this.props.last_trained} isTraining={this.props.isTraining} convoId={config.convoId} token={config.token} sendMessage={this.props.sendMessage}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ozz;
