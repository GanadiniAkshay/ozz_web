import React from 'react';
import { connect } from 'react-redux';

import { browserHistory, Link} from 'react-router';
import OzzBase from '../widget/OzzBase';

import PropTypes from 'prop-types';

class ActiveDemoPage extends React.Component{
    constructor(props){
        super(props);
        this.goHome = this.goHome.bind(this);
    }

    goHome(){
        browserHistory.push('/demos');
    }

    render(){
        document.body.style.backgroundColor = '#F8F8F8';
        const config = {
            name: "Demo",
            'color':'#58488a',
            'token':'YKUKHHEn4vY.cwA.c8g.NKBFH6f8Y7u6ztJRHLrokp1ZgiRWdVcie_zyfZb0bGk'
        }
        return (
            <div className="full">
                <main style={{"paddingLeft":"100"}}>
                    <div className="fluid-container" style={{"height":"100%"}}>
                        <div className="row" style={{"height":"100%"}}>
                            <div className="col s7" style={{"textAlign":"center"}}>
                            <h4>
                                <button className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white',"float":"left","fontSize":"0.5em"}} onClick={this.goHome}>
                                    Go Back
                                </button>
                                Active Learning
                            </h4>
                            <iframe width="100%" height="515" src="https://www.youtube.com/embed/YSTQS0KW8vw" frameborder="0" allowfullscreen style={{"zIndex":"100"}}></iframe>
                            </div>
                            <div className="col s5" style={{"height":"100%","color":"white","backgroundColor":"black"}}>
                                <h5 style={{"textAlign":"center"}}>Active Learning</h5>
                                <p>Active Learning uses reinforcement from users to retrain the models automatically</p>
                                <br/><br/>
                                <p>The challenge in this is to not ask user to rephrase but ask a Yes/No confirmation by coming up with a good guess</p>
                                <br/>
                                <p>We do this using 3 ways</p>
                                <ol>
                                    <li><b>Context</b> - The first and the biggest thing we look at is context. What are other things the user talked about, do they mention a time or a place, what intents use time and place etc</li>
                                    <li><b>Semantic Similarty</b> - The next step is to look at semantic similarity both in the words used and the sentence structure.</li>
                                    <li><b>Statistical Analysis</b> - We look at the previous messages and the logs and see what message do users generally send at this point.</li>
                                </ol>
                                <br/><br/><br/>
                                <p>The learning is initially only on a <b>seperate model</b> for the particular user and once there is <b>enough confidence</b> across multiple child models we merge it with parent model. This is to prevent abuse by users trying to game the learning</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}




export default ActiveDemoPage;