import React from 'react';
import { connect } from 'react-redux';

import { browserHistory, Link} from 'react-router';
import OzzBase from '../widget/OzzBase';

import PropTypes from 'prop-types';

class KnowledgeDemoPage extends React.Component{
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
                                Knowledge API
                            </h4>
                            <OzzBase active={true} config={config} messages={[]} sendMessage={function(){}} json={{}} isDemo={true}/>
                            </div>
                            <div className="col s5" style={{"height":"100%","color":"white","backgroundColor":"black"}}>
                                <p>Explanation</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}




export default KnowledgeDemoPage;