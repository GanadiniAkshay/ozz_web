import React from 'react';
import { connect } from 'react-redux';

import { getBots } from '../../actions/botActions';
import { browserHistory} from 'react-router';

import Navbar from '../home/Navbar';

class Bot extends React.Component{
    constructor(props){
        super(props);
    }


    componentWillMount(){
        this.props.getBots(this.state).then(
            () => {
                var current_bots = this.props.bots.bots;
                if (current_bots.length > 0){
                    browserHistory.push('/bots/'+current_bots[0].name+'/learning');
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
    bots: React.PropTypes.object.isRequired
}

function mapStatetoProps(state){
    return {
        bots: state.bots
    };
}

export default connect(mapStatetoProps, { getBots })(Bot);