import React from 'react'
import remove from 'lodash/remove'
import { browserHistory, Link } from 'react-router';

import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions';
import { beginTraining } from '../../actions/trainActions';
import { sendMessage } from '../../actions/testActions';

import TestBox from '../testBox/testbox';
import { config } from '../../config';

import PropTypes from 'prop-types';


class Navbar extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            'isBase':true,
            'trainButton':"Train",
            'json':{}
        }

        this.openSettings = this.openSettings.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.logout = this.logout.bind(this);
        this.startTrain = this.startTrain.bind(this);
    }


    logout(e){
        e.preventDefault();
        this.props.logout();
    }

    componentWillMount(){
        var that = this;
        var current_bots =  this.props.bots.bots;

        if (current_bots.length > 0){
            that.setState({'isBase':false});
        }
    }

    update(){
        this.forceUpdate();
    }

    sendMessage(e){
        var key = e.which || e.keyCode;
        if (key === 13){
            var message = e.target.value;
            var bot_guid = e.target.name;
            e.target.value = "";
            
            var payload = {"q":message,"bot_guid":bot_guid}
            this.props.sendMessage(payload).then(
                () => {
                    this.setState({"json":this.props.json});
            })
        }
    }

    startTrain(e){
        var $toastContent = $('<span>Training   <i class="fa fa-gear fa-spin" style="font-size:24px;margin-top:4%"></i></span>');
        Materialize.toast($toastContent, 30000);
        this.setState({trainButton:"Training..."});

        var payload = {}
        payload['bot_guid'] = this.props.activeBot.bot_guid;
        
        this.props.beginTraining(payload).then(
            () => {
                this.setState({trainButton:"Train"});
                $('.toast').remove()
            }
        )
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
        const context_active = (<Link to={"/bots/" + this.props.activeBot.name + "/context"} className="collapsible-header waves-affect" id="persona">Context<i className="material-icons">blur_on</i></Link>);
        
        const knowledge_inactive = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="persona">Knowledge<i className="material-icons">library_books</i></Link>);
        const knowledge_active = (<Link to={"/bots/" + this.props.activeBot.name + "/knowledge"} className="collapsible-header waves-affect" id="persona">Knowledge<i className="material-icons">library_books</i></Link>);
        
        const analytics_inactive = (<Link to="/bots/" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="persona">Analytics<i className="material-icons">trending_up</i></Link>);
        const analytics_active = (<Link to={"/bots/" + this.props.activeBot.name + "/analytics"} className="collapsible-header waves-affect" id="persona">Analytics<i className="material-icons">trending_up</i></Link>);
        

    
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
                    <a className="collapsible-header waves-affect" id="app"><b>{(this.props.bots.bots.length == 0)? '': this.props.activeBot.name}</b><i className="material-icons">arrow_drop_down</i><i className="material-icons" style={{"float":"right"}} onClick={this.openSettings}>settings</i></a>
                    <div className="collapsible-body">
                        {app_list}
                    </div>
                </li>
            </ul>
        );

        return(
            <header style={{"overflow":"scroll"}}>
                    <nav style={{"background":"#ABA0CB"}}>
                        <ul id="slide-out" className="side-nav fixed">
                            <li>
                                <img src="https://d1wi3kcd7kachl.cloudfront.net/v0.0.2/img/logo_color_full.png" alt="ozz logo" height="80px" style={{"marginLeft":"20%","marginTop":"5%","padding":"0"}}/>
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
                                    <li className="bold">
                                        <a className="collapsible-header waves-effect waves-light modal-trigger" href={(this.props.bots.bots.length == 0)? "#" : "#modal1"}>Test<i className="material-icons">check_circle</i></a>
                                        <div className="collapsible-body">
                                        </div>
                                    </li>
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
                        <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only"><i className="material-icons">menu</i></a>
                    </nav>
                    <TestBox activeBot={this.props.activeBot} sendMessage={this.sendMessage} json={this.state.json}/>
            </header>
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
        json:state.test.json
    }
}

export default connect(mapStateToProps, { logout, beginTraining, sendMessage })(Navbar);