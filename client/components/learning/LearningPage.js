import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';

import Navbar from '../navbar/Navbar';
import Message from '../message/Message';

import PropTypes from 'prop-types';


class LearningPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name:'',
            id:'',
            nlp_app_secret:'',
            nlp_there:true,
            nlp:'',
            intents:[],
            intent_ids:{},
            messages:[],
            loader:true,
            intent_loader:true
        }

        this.getMessages = this.getMessages.bind(this);
        this.addIntent = this.addIntent.bind(this);
    }

    getMessages(){
        axios.get('https://api.ozz.ai/conversations?bot_id='+this.state.id).then(
            (res) => {
                this.setState({intent_loader:false, messages:res.data['convos']});
            },

            (err) => {console.log(error)}
        )
    }

    addIntent(intent){
        var new_intents = this.state.intents;
        new_intents.push(intent);
        this.setState({intents:new_intents});
        //location.reload();
    }

    componentDidMount(){
        this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = url_path[2].replace('%20',' ');;

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
                        this.setState({id:activeBot.id,name:activeBot.name,nlp:activeBot.nlp_platform,nlp_app_secret:activeBot.nlp_app_secret,loader:false})
                        if (this.state.nlp_app_secret == ''){
                            this.setState({intent_loader:false, nlp_there:false})
                        }else{
                            if (this.state.nlp == 'api'){
                                axios.get('https://api.ozz.ai/api?dat='+this.state.nlp_app_secret).then(
                                    (res) => {
                                        var intent_ids = {};
                                        var intents = [];
                                        for (var i=0;i<res.data.length;i++){
                                            var name = res.data[i].name;
                                            var id = res.data[i].id;
                                            intents.push(name)
                                            intent_ids[name] = id
                                        }
                                        this.getMessages();
                                        this.setState({intents:intents,intent_ids:intent_ids});
                                    },
                                    (error) => {console.log(error)}
                                )
                            } else if (this.state.nlp == 'wit'){
                                axios.get('https://api.ozz.ai/wit?sat='+this.state.nlp_app_secret).then(
                                    (res) => {
                                        var intents = [];
                                        for (var i=0;i<res.data.values.length;i++){
                                            intents.push(res.data.values[i]['value']);
                                        }
                                        this.getMessages();
                                        this.setState({intents:intents});
                                    },
                                    (error) => {console.log(error)}
                                )
                            }
                        }
                    }
                }
        );
    }

    render(){
        const loader = (<img src="https://d1wi3kcd7kachl.cloudfront.net/v0.0.2/img/loader.gif" alt="loader animation" style={{'marginTop':'35%','marginLeft':'45%'}}/>);

        const messages = [];

        for (var i=0;i<this.state.messages.length;i++){
            var current = this.state.messages[i];
            if (current){
                messages.push(<Message id={this.state.id} key={i} identifier={"intent" + i} addIntent={this.addIntent} message={current['message']} intents={this.state.intents} intent_ids={this.state.intent_ids} nlp={this.state.nlp} token={this.state.nlp_app_secret} intent={current['intent']}/>);
            }
        }

        const helper = (
            <div>
                <p>Please update your bots webhook using the new webhook from the settings page. </p>
                <p>Or watch the video below for a detailed demo.</p><br/>
                <div className="video-container">
                    <iframe width="853" height="480" src="https://www.youtube.com/embed/9XfrRJIzGs8" frameBorder="0" allowFullScreen></iframe>
                </div>
            </div>
        )

        const Feed = (
            <div>
                <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}} onClick={this.getMessages}>
                        Refresh <i className="material-icons right">cached</i>
                </button><br/><br/>
                {messages.length == 0? helper:messages}
            </div>
        )


        const show_feed = (<div>
                                {this.state.nlp_there? Feed: Feed}
                            </div>)

        const bot_loaded = (<div>
                                <h2>{this.state.name}</h2>
                                {this.state.intent_loader? loader:show_feed}
                            </div>);
        return (
            <div>
                <Navbar active="learning_dashboard"/>
                <main>
                    <div className="container">
                        {this.state.loader ? loader : bot_loaded}
                    </div>
                </main>
            </div>
        )
    }
}




export default LearningPage;