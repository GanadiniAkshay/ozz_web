import React from 'react';
import {Motion, spring} from 'react-motion';


class OzzHeader extends React.Component{
	constructor(props){
		super(props);
	}

	clearWindow(){
		this.props.clearBox();
	}

	render(){
	   const presets = {
  	     default: { stiffness: 330, damping: 20 },
           };
	   
	   return(
		<Motion
		  defaultStyle={{
			  y:60,
		  }}
		  style={{
			  y: spring(this.props.active && this.props.rest ? 60 : 60, presets.default)
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
				background:this.props.config.color
			   }}
			>
			<br/>
				<span style={{"marginBottom":"2%"}}>{this.props.config.name} - Test</span>
				<i className="material-icons right"  onClick={this.clearWindow.bind(this)} style={{"cursor":"pointer"}}>refresh</i> 
			<br/>
			</header>
		}
		</Motion>
	   )
	}
}

export default OzzHeader;
