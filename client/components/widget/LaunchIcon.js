import React from 'react';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';

const cx = classNames;
const presets = {
  default: { stiffness: 330, damping: 20 },
};

const LaunchIcon =({active}) => (
    <Motion
        defaultStyle={{
            opacity: 1,
            rotate: 0,
            scale: 1,
        }}
        style={{
            opacity: spring(active ? 0 : 1, presets.default),
            rotate: spring(active ? 45 :0, presets.default),
            scale:  spring(active ? 0 : 1, presets.default)
        }}
    >
    {interpolatingStyles => 
        <p
            className="ozz-icon ozz-icon--launcher"
            style={{
                opacity: interpolatingStyles.opacity,
                transform: `
                    rotate(${interpolatingStyles.rotate}deg)
                    scale(${interpolatingStyles.scale})
                    translate(-50%, -50%)
                `,
            }}
        ><b>Test</b></p>}
    </Motion>
);


export default LaunchIcon;