import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


import BotAddForm from './BotAddForm';

import { createBot } from '../../actions/botActions';
import PropTypes from 'prop-types';

class BotAddPage extends React.Component{
    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userLoginRequest } = this.props;
        return(
            <div className="fluid-container" style={{'marginTop':'5%'}}>
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.26/img/logo_white_full.png" alt="ozz_logo" height="80px" />
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
    user: PropTypes.object.isRequired,
    createBot: PropTypes.func.isRequired
}


export default connect(mapStateToProps, {createBot})(BotAddPage);