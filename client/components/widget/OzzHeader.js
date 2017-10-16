import React from 'react';
import {Motion, spring} from 'react-motion';

const presets = {
  default: { stiffness: 330, damping: 20 },
};

const OzzHeader = ({ active, rest, config }) => (
  <Motion
    defaultStyle={{
      y: 60,
    }}
    style={{
      y: spring(active && rest ? 60 : 60, presets.default),
    }}
  >
    {interpolatingStyles =>
      <header
        className="ozz-header"
        style={{
          height: interpolatingStyles.y,
          transform: `translate(${interpolatingStyles.height}px)`,
          textAlign: 'center',
          color:'white',
          background:config.color
        }}
      >
      <br/>
      <span style={{"marginBottom":"2%"}}>{config.name} - Test</span>
      <br/>
      </header>
    }
  </Motion>
);

export default OzzHeader;