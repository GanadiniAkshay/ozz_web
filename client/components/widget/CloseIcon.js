import React from 'react';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';

const cx = classNames;
const presets = {
  default: { stiffness: 330, damping: 20 },
};

const CloseIcon = ({ active }) => (
  <Motion 
    defaultStyle={{
      opacity: 0,
      rotate: -45,
      scale: 0,
    }}
    style={{
      opacity: spring(active ? 1 : 0, presets.default),
      rotate: spring(active ? 0 : -45, presets.default),
      scale: spring(active ? 1 : 0, presets.default),
    }}
  >
    {interpolatingStyles =>
      <img 
        alt="Close Icon"
        className="ozz-icon ozz-icon--close"
        src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png"
        style={{
          opacity: interpolatingStyles.opacity,
          transform: `
            rotate(${interpolatingStyles.rotate}deg) 
            scale(${interpolatingStyles.scale})
            translate(-50%, -50%)
          `,
        }} 
      />
    }
  </Motion>
);

export default CloseIcon;