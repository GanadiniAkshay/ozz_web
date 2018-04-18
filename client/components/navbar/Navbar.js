import React from 'react'
import remove from 'lodash/remove'
import axios from 'axios';
import { browserHistory, Link } from 'react-router';

import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions';
import { beginTraining } from '../../actions/trainActions';
import { sendMessage, clearBox } from '../../actions/testActions';
import { updateBot } from '../../actions/botActions';
import Request from 'axios-request-handler';

import Ozz from '../widget/Ozz';
import { config } from '../../config';

import PropTypes from 'prop-types';


class Navbar extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            'isBase':true,
            'trainButton':"Train",
            'isTraining':false,
            'trainStarted':false,
            'lastTrained':null,
            'json':{},
            'messages':[]
        }

        this.openSettings = this.openSettings.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.logout = this.logout.bind(this);
        this.startTrain = this.startTrain.bind(this);
        this.clearBox = this.clearBox.bind(this);
    }


    logout(e){
        e.preventDefault();
        this.props.logout();
    }

    componentWillMount(){
        var that = this;
        var current_bots =  this.props.bots.bots;

        if (current_bots.length > 0){
            that.setState({'isBase':false,'json':this.props.json,'messages':this.props.messages});
        }
    }

    update(){
        this.forceUpdate();
    }

    sendMessage(e){
        var message = $('#message-bar').val();
        var bot_guid = this.props.activeBot.bot_guid;
        $('#message-bar').val("");

        var payload = {"q":message,"bot_guid":bot_guid}
        this.props.sendMessage(payload).then(
            () => {
                this.setState({"json":this.props.json,"messages":this.props.messages});
        })
    }

    clearBox(){
        this.props.clearBox();
        this.setState({"json":{},"messages":[]})
    }
    
    startTrain(e){
        var $toastContent = $('<span>Added to Queue</span>');
        Materialize.toast($toastContent, 2000);
        this.setState({trainButton:"Training...",isTraining:true});

        var payload = {}
        payload['bot_guid'] = this.props.activeBot.bot_guid;

        axios.get(config.url + '/train/' + payload.bot_guid).then( res => {
            const data = res.data;
            this.pollStatus(data.job_id);
        });

        // this.props.beginTraining(payload).then(
        //     () => {
        //         this.setState({trainButton:"Train"});
        //         $('.toast').remove()
        //     }
        // )
    }


    pollStatus(job_id){
        var url = "/status/" + job_id;
        if (config.url == 'http://localhost:5000/api'){
            console.log('here');
            url = "http://localhost:5000/status/" + job_id;
        }
        console.log(url)
        const trainer = new Request(url);

        var flag = false;

        trainer.poll(5000).get((response) => {
            var status = response.data.status;

            console.log(response.data);

            if (status == 'started'){
                if (this.state.trainStarted == false){
                    var $toastContent = $('<span>Training Started</span>');
                    Materialize.toast($toastContent, 2000);

                    this.setState({trainStarted:true});
                }
            }

            if (status == 'finished'){
                var waitUntil = new Date().getTime() + 5000;
                while(new Date().getTime() < waitUntil) true;
                
                var $toastContent = $('<span>Training Completed</span>');
                Materialize.toast($toastContent, 2000);

                var now = new Date();
                this.setState({lastTrained:now});

                console.log(response.data.result);
                //console.log(this.props.activeBot);

                var result = response.data.result;
                var bot = this.props.activeBot;
                bot['words'] = result["words"]
                bot['active_model'] = result['active_model']
                bot['last_trained'] = new Date();
                bot['train_time'] = result["train_time"]
                this.props.updateBot(bot);
                this.setState({trainButton:"Train",isTraining:false,trainStarted:false});
                return false;
            }
            // you can cancel polling by returning false
        });
    }

    openSettings(e){
        browserHistory.push("/bots/" + this.props.activeBot.name + "/settings");
    }

    componentDidMount(){
        // Initialize collapse button
        $(".button-collapse").sideNav();
        // Initialize collapsible (uncomment the line below if you use the dropdown variation)
        $('.collapsible').collapsible();
        $('.modal').modal();

        this.setState({'lastTrained':this.props.activeBot.last_trained});
    }

    render(){
        document.body.style.backgroundColor = '#F8F8F8';
        var  current_bots = this.props.bots.bots.slice();

        const intents_inactive = (<Link to="/bots" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="learning">Intents<i className="material-icons">speaker_notes</i></Link>);
        const intents_active = (<Link to={"/bots/" + this.props.activeBot.name + "/intents"} className="collapsible-header waves-affect" id="intents">Intents<i className="material-icons">speaker_notes</i></Link>);
        
        const entities_inactive = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="entities">Entities<i className="material-icons">aspect_ratio</i></Link>);
        const entities_active = (<Link to={"/bots/" + this.props.activeBot.name + "/entities"} className="collapsible-header waves-affect" id="entities">Entities<i className="material-icons">aspect_ratio</i></Link>);
        
        const persona_inactive = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="persona">Persona<i className="material-icons">tag_faces</i></Link>);
        const persona_active = (<Link to={"/bots/" + this.props.activeBot.name + "/persona"} className="collapsible-header waves-affect" id="persona">Persona<i className="material-icons">tag_faces</i></Link>);
        
        const learning_inactive = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="persona">Learning<i className="material-icons">lightbulb_outline</i></Link>);
        const learning_active = (<Link to={"/bots/" + this.props.activeBot.name + "/learn"} className="collapsible-header waves-affect" id="persona">Learning<i className="material-icons">lightbulb_outline</i></Link>);
        
        const context_inactive = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="persona">Context<i className="material-icons">blur_on</i></Link>);
        const context_active = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="persona">Context<i className="material-icons">blur_on</i></Link>);
        
        const knowledge_inactive = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="persona">Knowledge<i className="material-icons">library_books</i></Link>);
        const knowledge_active = (<Link to={"/bots/" + this.props.activeBot.name + "/knowledge"} className="collapsible-header waves-affect" id="persona">Knowledge<i className="material-icons">library_books</i></Link>);
        
        const analytics_inactive = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="persona">Analytics<i className="material-icons">trending_up</i></Link>);
        const analytics_active = (<Link to={"/bots/" + this.props.activeBot.name + "/analytics"} className="collapsible-header waves-affect" id="persona">Analytics<i className="material-icons">trending_up</i></Link>);
        
        if (this.props.activeBot.name){
            var config_name = this.props.activeBot.name;
        }else{
            var config_name = "Ozz"
        }

        const config = {
            name: config_name,
            'color':'#58488a',
            'token':'YKUKHHEn4vY.cwA.c8g.NKBFH6f8Y7u6ztJRHLrokp1ZgiRWdVcie_zyfZb0bGk'
        }
    
        for (var i=0;i<current_bots.length;i++){
            if (current_bots[i].name == this.props.activeBot.name){
                current_bots.splice(i,1);
                break;
            }
        }

        const elements = current_bots.map((current_bot) => {
            return (<li key={current_bot.id}>
                        <a href={"/bots/" + current_bot.name + "/intents"} onClick={this.update} >{current_bot.name} </a>
                    </li>)
        });

        const app_list = (
            <ul>
                {elements}
                <li><hr/></li>
                <li id="app_new"><Link to="/bots/add">Add new bot<i className="material-icons">add</i></Link></li>
            </ul>
        );
        
        const application_select = (
            <ul className="collapsible collapsible-accordion">
                <li className="bold no-padding">
                    <a className="collapsible-header waves-affect" id="app"><b>{(this.props.bots.bots.length == 0)? '': this.props.activeBot.name}</b><i className="material-icons">arrow_drop_down</i><i className="material-icons" style={{"float":"right","margin":"0","padding":"0"}} onClick={this.openSettings}>settings</i></a>
                    <div className="collapsible-body">
                        {app_list}
                    </div>
                </li>
            </ul>
        );

        return(
            <div>
                <ul id="slide-out" className="side-nav fixed" style={{"width":"220px"}}>
                    <li>
                        <img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/logo_color_full.png" alt="ozz logo" height="80px" style={{"marginLeft":"10%","marginTop":"5%","padding":"0"}}/>
                    </li>
                    <li><div className="divider"></div></li>
                    <li className="no-padding">
                        {application_select}
                    </li>
                    <li><div className="divider"></div></li>
                    <li className="no-padding">
                        <ul>
                            <li className="bold">
                                {(this.props.bots.bots.length == 0)? intents_inactive : intents_active}
                                <div className="collapsible-body">
                                </div>
                            </li>
                            <li className="bold">
                                {(this.props.bots.bots.length == 0)? entities_inactive : entities_active}
                                <div className="collapsible-body">
                                </div>
                            </li>
                            <li className="bold">
                                {(this.props.bots.bots.length == 0)? context_inactive : context_active}
                                <div className="collapsible-body">
                                </div>
                            </li>
                            <li className="bold">
                                {(this.props.bots.bots.length == 0)? learning_inactive : learning_active}
                                <div className="collapsible-body">
                                </div>
                            </li>
                            <li className="bold">
                                {(this.props.bots.bots.length == 0)? persona_inactive : persona_active}
                                <div className="collapsible-body">
                                </div>
                            </li>
                            <li className="bold">
                                {(this.props.bots.bots.length == 0)? knowledge_inactive : knowledge_active}
                                <div className="collapsible-body">
                                </div>
                            </li>
                            <li className="bold">
                                {(this.props.bots.bots.length == 0)? analytics_inactive : analytics_active}
                                <div className="collapsible-body">
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li><div className="divider"></div></li>
                    <li className="no-padding">
                        <ul>
                            <li className="bold" onClick={(this.props.bots.bots.length == 0)? "" : this.startTrain} >
                                <Link className="collapsible-header waves-affect" id="train">{this.state.trainButton}<i className="material-icons">build</i></Link>
                                <div className="collapsible-body">
                                </div>
                            </li>
                            <li><div className="divider"></div></li>
                            <li className="bold">
                                <Link className="collapsible-header waves-affect" id="logout">Account<i className="material-icons">account_circle</i></Link>
                                <div className="collapsible-body">
                                </div>
                            </li>
                            <li className="bold" onClick={this.logout}>
                                <Link className="collapsible-header waves-affect" id="logout">Logout<i className="material-icons">settings_power</i></Link>
                                <div className="collapsible-body">
                                </div>
                            </li>
                        </ul>
                    </li><br/>
                </ul>
                <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only" style={{"position":"relative","zIndex":3,"color":"white","top":"45px"}}><i className="material-icons">menu</i></a>
                <Ozz name={this.props.activeBot.name} last_trained={this.props.activeBot.last_trained} config={config} messages={this.state.messages} clearBox={this.clearBox} sendMessage={this.sendMessage} json={this.state.json} isTraining={this.state.isTraining}></Ozz>
            </div>
        );
    }
}

Navbar.propTypes = {
    active:PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    activeBot: PropTypes.object.isRequired,
    bots: PropTypes.object.isRequired
}

function mapStateToProps(state){
    return {
        bots: state.bots,
        activeBot: state.activeBot.activeBot,
        json:state.test.json,
        messages: state.test.messages
    }
}

export default connect(mapStateToProps, { logout, beginTraining, sendMessage, clearBox, updateBot })(Navbar);
