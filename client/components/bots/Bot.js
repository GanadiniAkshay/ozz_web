import React from 'react';
import { connect } from 'react-redux';

import { browserHistory, Link} from 'react-router';

import { getBots, setActiveBot, updateBot } from '../../actions/botActions';

import Navbar from '../navbar/Navbar';
import PropTypes from 'prop-types';

class Bot extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            hidden : 'hide'
        }
    }

    componentDidMount(){
        var that = this;
        this.props.getBots().then(
            () => {
                var current_bots =  this.props.bots.bots;
                
                console.log(current_bots);
                if (current_bots.length > 0){
                    var max_time = Math.max.apply(Math, current_bots.map(function(o){return o.used}));
                    var activeBot = current_bots.find(function(o){ return o.used == max_time});

                    this.props.updateBot(activeBot);
                    //browserHistory.push("/bots/" + activeBot.name + "/intents");
                } else{
                    this.setState({hidden:''})
                }
            }
        );
    }

    onClick(){
        browserHistory.push('/bots/add');
    }

    render(){
        return (
            <div className="full">
                <Navbar active="app_new"/>
                <main className={this.state.hidden}>
                    <div className="container full">
                        <br/><br/>
                        <div className="video-container">
                            <iframe width="853" height="480" src="https://www.youtube.com/embed/--2aYhjFwiI" frameBorder="0" allowFullScreen></iframe>
                        </div>
                        <br/>
                        <button onClick={this.onClick} className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                          Add Bot<i className="material-icons right">add</i>
                        </button>
                    </div>
                </main>
            </div>
        )
    }
}


Bot.propTypes = {
    getBots: PropTypes.func.isRequired,
    setActiveBot: PropTypes.func.isRequired,
    updateBot: PropTypes.func.isRequired,
    activeBot: PropTypes.object.isRequired,
    bots: PropTypes.object.isRequired
}

function mapStateToProps(state){
    return {
        bots: state.bots,
        activeBot: state.activeBot
    }
}


export default connect(mapStateToProps, { getBots, setActiveBot, updateBot })(Bot);