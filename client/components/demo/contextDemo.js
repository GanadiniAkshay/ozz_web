import React from 'react';
import { connect } from 'react-redux';

import { browserHistory, Link} from 'react-router';
import OzzBase from '../widget/OzzBase';

import PropTypes from 'prop-types';

class ContextDemoPage extends React.Component{
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
                <main>
                    <div className="fluid-container" style={{"height":"100%"}}>
                        <div className="row" style={{"height":"100%"}}>
                            <div className="col s7" style={{"textAlign":"center"}}>
                            <h4>
                                <button className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white',"float":"left","fontSize":"0.5em"}} onClick={this.goHome}>
                                    Go Back
                                </button>
                                Context Management
                            </h4>
                            <OzzBase active={true} config={config} messages={[]} sendMessage={function(){}} json={{}} isDemo={true}/>
                            </div>
                            <div className="col s5" style={{"height":"100%","color":"white","backgroundColor":"black"}}>
                                <h5 style={{"textAlign":"center"}}>Context Management</h5>
                                <p>Context is by far the biggest problem with chatbots.</p>
                                <p>One place where this is the most relavent is in trying to fill forms in a chatbot. There are a 1000 ways to ask for something,
                                   but a tree flow based chatbot, lets you do it only 1 way. Read more about the problem <a href="https://medium.com/assist/theres-a-dozen-ways-to-order-a-coffee-why-do-dumb-bots-only-allow-one-27230542636d" style={{"color":"blue"}}>here</a>
                                </p>   
                                <div className="row">
                                    <div className="col s6">
                                        <p style={{"textAlign":"center"}}>Tree Flow Chatbot</p>
                                        <img src="https://image.ibb.co/hmjPJ6/Screen_Shot_2017_10_16_at_8_06_17_AM.png" width="100%"/>
                                    </div>
                                    <div className="col s6">
                                        <p style={{"textAlign":"center"}}>Real Life</p>
                                        <img src="https://image.ibb.co/dC5QQm/Screen_Shot_2017_10_16_at_8_10_10_AM.png" width="100%"/>
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




export default ContextDemoPage;