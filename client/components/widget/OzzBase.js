import React from 'react';
import ReactJson from 'react-json-view';
import {Motion, spring} from 'react-motion';


import OzzHeader from './OzzHeader';
import ChatList  from './ChatList';
import OzzFooter from './OzzFooter';


const presets = {
  default: { stiffness: 330, damping: 20 },
};

class OzzBase extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
        height: 670,
        stable: false,
        }
        
        this._handleRest = this._handleRest.bind(this);
    }

    componentDidMount() {
        const height = jQuery(window).height();
        
        this.setState({
        height: height - (height * 0.2),
        });
    }
  
   componentWillUnmount() {
     this.setState({
      stable: false,
     });
   }

   _handleRest() {
    this.setState({
      stable: true,
    });

    // <ChatList color={config.color}/>
    // <OzzFooter convoId={config.convoId} token={config.token}/>
  }

  render(){
      const { active, config } = this.props;
      const { stable } = this.state;
     
      return (
          <Motion
            defaultStyle={{
                y: 20,
                opacity: 0,
            }}
            style={{
                y: spring(active ? 0 : 20, presets.default),
                opacity: spring(active ? 1 : 0, presets.default),
            }}
            onRest={this._handleRest}
          >
          {interpolatingStyles=>
            <div 
                className={this.props.isDemo? "ozz-base-demo":"ozz-base"}
                style={{
                height: window.innerHeight,
                opacity: interpolatingStyles.opacity,
                transform: `translateY(${interpolatingStyles.y}px)`
                }}
            >
                <OzzHeader active={active} rest={stable} config={config} clearBox={this.props.clearBox}/>
                <div style={{"height":"100%","width":"100%"}} className="row">
                    <div className="col s6" style={{"height":"100%","padding":"0"}}>
                        <ChatList color={config.color} messages={this.props.messages}/>
                        <OzzFooter convoId={config.convoId} token={config.token} sendMessage={this.props.sendMessage}/>
                    </div>
                    <div className="col s6" style={{"height":"100%","backgroundColor":"black"}}>
                        <h6 style={{"color":"white","textAlign":"center"}}>JSON Response</h6>
                        <div style={{"marginLeft":"30%","marginTop":"15%"}}>
                            <ReactJson src={this.props.json} displayDataTypes={false} theme="isotope" enableClipboard={false}/>
                        </div>
                    </div>
                </div>
            </div>
          }
          </Motion>
      );
  }
}

export default OzzBase;
