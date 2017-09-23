import React from 'react';
import ReactJson from 'react-json-view';

import PropTypes from 'prop-types';


class TestBox extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            'json':{}
        }
    }

    
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }


    render(){
        return (
            <div id="modal1" className="modal modal-fixed-footer">
                <div className="modal-content container" style={{"backgroundColor":"white"}}>
                    <h5 style={{"textAlign":"center"}}>{this.props.activeBot.name} - Test</h5>
                    <br/><br/><br/>
                    <div className="row">
                        <div className="col s5 offset-s4">
                            <ReactJson src={this.props.json} displayDataTypes={false}/>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="row" style={{"marginTop":"0px","top":"0","paddingTop":"0"}}>
                        <div className="input-field col s12" style={{"marginTop":"-10px","top":"0","paddingTop":"0"}}>
                            <input placeholder="Enter Message" id="text" type="text" className="validate" name={this.props.activeBot.bot_guid} onKeyPress={this.props.sendMessage}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TestBox.propTypes = {
    activeBot: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    json: PropTypes.object.isRequired
}



export default TestBox;