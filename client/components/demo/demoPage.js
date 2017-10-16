import React from 'react';
import { connect } from 'react-redux';

import { browserHistory, Link} from 'react-router';

import PropTypes from 'prop-types';

class DemoPage extends React.Component{
    constructor(props){
        super(props);
        this.openContext = this.openContext.bind(this);
        this.openActive  = this.openActive.bind(this);
        this.openKnowledge = this.openKnowledge.bind(this);
    }

    openContext(){
        browserHistory.push('/demos/context');
    }

    openActive(){
        browserHistory.push('/demos/active');
    }

    openKnowledge(){
        browserHistory.push('/demos/knowledge');
    }

    render(){
        document.body.style.backgroundColor = '#F8F8F8';

        return (
            <div className="full">
                <main>
                    <div className="fluid-container">
                        <h4>Demos</h4>

                        <div className="row">
                            <div className="col s3 card">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" src="https://d1wi3kcd7kachl.cloudfront.net/v0.0.2/img/logo_color_full.png"/>
                                </div>
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">Knowledge API<i className="material-icons right">more_vert</i></span>
                                    <button className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}} onClick={this.openKnowledge}>
                                        Open
                                    </button>
                                </div>
                                <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Knowledge API<i className="material-icons right">close</i></span>
                                    <p>Knowledge API let's you add documents like PDF, Word, Websites etc and the chatbot can use the information from these documents to answer questions.</p>
                                </div>
                            </div>
                            <div className="card col s3 offset-s1">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" src="https://d1wi3kcd7kachl.cloudfront.net/v0.0.2/img/logo_color_full.png"/>
                                </div>
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">Context API<i className="material-icons right">more_vert</i></span>
                                    <button className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}} onClick={this.openContext}>
                                        Open
                                    </button>
                                </div>
                                <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Context Management<i className="material-icons right">close</i></span>
                                    <p>Context Management let's the chatbot automatically maintain context and substitute it into messages as and when required. <br/><br/>For eg it can remember the city a user talked about and change what is the weather there? to what is the weather in China?</p>
                                </div>
                            </div>
                            <div className="card col s3 offset-s1">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" src="https://d1wi3kcd7kachl.cloudfront.net/v0.0.2/img/logo_color_full.png"/>
                                </div>
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">Active Learning<i className="material-icons right">more_vert</i></span>
                                    <button className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}} onClick={this.openActive}>
                                        Open
                                    </button>
                                </div>
                                <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Active Learning<i className="material-icons right">close</i></span>
                                    <p>Active Learning helps the bot automatically learn from the incoming conversations without requireing manual retraining.</p>
                                </div>
                            </div>

                            <div className="card col s7 offset-s2">
                                    <div className="card-content">
                                        <span className="card-title">Note:</span>
                                        <p>These services use real time situations or require some data pre-processing (knowledge API) which are hard to simulate in a standalone demo.</p>
                                        <br/>
                                        <p>We have however tried our best to show you how these would work for a real chatbot using our service</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}




export default DemoPage;