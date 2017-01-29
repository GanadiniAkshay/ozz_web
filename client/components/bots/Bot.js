import React from 'react';
import { connect } from 'react-redux';

import { browserHistory} from 'react-router';

import { getBots, setActiveBot, updateBot } from '../../actions/botActions';

import Navbar from '../navbar/Navbar';

class Bot extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        var that = this;
        this.props.getBots().then(
            () => {
                var current_bots =  this.props.bots.bots;
                
                if (current_bots.length > 0){
                    that.setState({'isBase':false});

                    
                    var max_time = Math.max.apply(Math, current_bots.map(function(o){return o.used}));
                    var activeBot = current_bots.find(function(o){ return o.used == max_time});

                    console.log(current_bots);

                    this.props.setActiveBot(activeBot);
                    this.props.updateBot(activeBot);
                    browserHistory.push("/bots/" + activeBot.name + "/learning");
                }
            }
        );
    }

    render(){
        return (
            <div>
                <Navbar active="app_new"/>
                <h1>Bots</h1>
            </div>
        )
    }
}


Bot.propTypes = {
    getBots: React.PropTypes.func.isRequired,
    setActiveBot: React.PropTypes.func.isRequired,
    updateBot: React.PropTypes.func.isRequired,
    activeBot: React.PropTypes.object.isRequired,
    bots: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
    return {
        bots: state.bots,
        activeBot: state.activeBot
    }
}


export default connect(mapStateToProps, { getBots, setActiveBot, updateBot })(Bot);