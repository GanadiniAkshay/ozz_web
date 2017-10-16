import React from 'react';
import {Motion, spring} from 'react-motion';

import Button from './Button';
import OzzBase from './OzzBase';

import ChatTest from './ChatTest';

class Ozz extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            active: false,
            hasTriggered: false,
            config: props.config
        };
    
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount() {}

    _handleClick() {
        this.setState({
            active: !this.state.active,
        });
    }

    render(){
        const {active, config} = this.state;

        return(
            <div className="ozz">
                {active ? <OzzBase active={active} config={config} messages={this.props.messages} sendMessage={this.props.sendMessage} json={this.props.json} isDemo={false}/> : false}

                <Button 
                    active={active}
                    onClick={this._handleClick}
                    color={config.color}
                />
            </div>
        )
    }
}

export default Ozz;