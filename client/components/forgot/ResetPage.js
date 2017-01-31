import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'; 

import ResetForm from './ResetForm';

class ResetPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email: '',
            key: ''
        }
    }

    componentWillMount(){
            if (this.props.isAuthenticated){
                browserHistory.push('/bots');
            }

            var email = this.props.location.query['email'];
            var key = this.props.location.query['key'];

            const url = 'https://api.ozz.ai/users/'+ email + '?action=reset&key=' + key;
            axios.get(url).then(
                (res) => {
                    this.setState({'name':res.data.name, 'email':email, 'key':key})
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        return(
            <div className="fluid-container" style={{'marginTop':'5%'}}>
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <img src="/img/logo_white_full.png" alt="ozz_logo" height="100px" style={{"marginTop":"10px"}}/> 
                        </Link>
                    </div>
                </div>
                <div className="row" style={{'marginTop':'5%'}}>
                    <div className="col s6 offset-s3" style={{'background':'white','textAlign':'center'}}>
                        <h4 style={{'color':'#ABA0CB'}}>Reset Password</h4>
                        <br/>
                        <ResetForm name={this.state.name} email={this.state.email} key_id={this.state.key}/>
                    </div>
                </div>
            </div>
        )
    }
}

ResetPage.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
}


function mapStateToProps(state){
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(ResetPage);