import React from 'react';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';


import Badge from './Badge';
import CloseIcon from './CloseIcon';
import LaunchIcon from './LaunchIcon';

const cx = classNames;
const presets = {
  default: { stiffness: 330, damping: 20 },
};

class Button extends React.Component{
    constructor(){
        super();

        this.state = {
            stable : false
        }

        this._handleRest = this._handleRest.bind(this);
    }

    componentWillUnmount(){
        this.setState({
            stable: false,
        });
    }

    _handleRest() {
        this.setState({
        stable: true,
        });
    }

    render(){
        const {active, className, count, onClick, color} = this.props;
        const {stable}  = this.state;

        let classes = cx({
            'ozz-button': true,
            'ozz-button--active': active,
        }, className);

        // Add later when dynamic count can be done
        // <Badge active={active} count={count} stable={stable} />

        return(
            <Motion
                defaultStyle={{
                    opacity: 0,
                    scale: 0,
                }}
                style={{
                    opacity: spring(1, presets.default),
                    scale: spring(1, presets.default),
                }}
                onRest={this._handleRest}
            >
            {interpolatingStyles =>
            <button 
                className={classes}
                onClick={onClick || noop}
                style={{
                opacity: interpolatingStyles.opacity,
                transform: `scale(${interpolatingStyles.scale})`,
                background:color
                }}
            >
                
                <LaunchIcon active={active} />
                <CloseIcon active={active} />
            </button>
            }
            </Motion>
        )
    }
};

export default Button;