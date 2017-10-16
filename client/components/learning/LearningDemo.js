import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../navbar/Navbar';
import { browserHistory, Link} from 'react-router';

import PropTypes from 'prop-types';

class LearningDemoPage extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        document.body.style.backgroundColor = '#F8F8F8';

        return (
            <div className="full">
                <Navbar active="app_new"/>
                <main>
                    <div className="container">
                        <h4>Active Learning</h4>

                        <div className="row">
                            <div className="col s6 offset-s3 card">
                                <div className="card-content">
                                    <p>Active Learning will help your bot automatically learn without manual retrain</p>
                                    <br/>
                                    <span className="card-title activator grey-text text-darken-4">Turn Active Learning</span>
                                    <div className="switch">
                                        <label>
                                        Off
                                        <input type="checkbox"/>
                                        <span className="lever"></span>
                                        On
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}




export default LearningDemoPage;