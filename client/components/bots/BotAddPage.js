import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


import BotAddForm from './BotAddForm';

import { createBot } from '../../actions/botActions';

class BotAddPage extends React.Component{
    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userLoginRequest } = this.props;
        return(
            <div className="fluid-container" style={{'marginTop':'5%'}}>
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <h1 style={{'fontSize':'1.2em'}}><b>OZZ.ai</b></h1>
                        </Link>
                    </div>
                </div>
                <div className="row" style={{'marginTop':'5%'}}>
                    <div className="col s6 offset-s3" style={{'background':'white'}}>
                        <h4 style={{'color':'#ABA0CB','textAlign':'center'}}>Add your bot</h4>
                        <br/>
                        <BotAddForm user={this.props.user} createBot={this.props.createBot}/>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        user : state.auth.user
    };
}

BotAddPage.propTypes = {
    user: React.PropTypes.object.isRequired,
    createBot: React.PropTypes.func.isRequired
}


export default connect(mapStateToProps, {createBot})(BotAddPage);