import React from 'react'
import remove from 'lodash/remove'
import { browserHistory, Link } from 'react-router';

import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions';


class Navbar extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            'isBase':true
        }

        this.logout = this.logout.bind(this);
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

    componentDidMount(){
        // Initialize collapse button
        $(".button-collapse").sideNav();
        // Initialize collapsible (uncomment the line below if you use the dropdown variation)
        $('.collapsible').collapsible();
    }

    render(){
        document.body.style.backgroundColor = '#fff';
        var  current_bots = this.props.bots.bots.slice();

        const intents_inactive = (<Link to="/bots" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="intents">Intents<i className="material-icons">speaker_notes</i></Link>);
        const intents_active = (<Link to={"/bots/" + this.props.activeBot.name + "/intents"} className="collapsible-header waves-affect" id="intents">Intents<i className="material-icons">speaker_notes</i></Link>);

        const learning_inactive = (<Link to="/bots" onClick={e => {e.preventDefault()}} className="collapsible-header waves-affect" id="learning">Continuous Learning<i className="material-icons">lightbulb_outline</i></Link>);
        const learning_active = (<Link to={"/bots/" + this.props.activeBot.name + "/learning"} className="collapsible-header waves-affect" id="learning">Continuous Learning<i className="material-icons">lightbulb_outline</i></Link>);

        const settings_inactive = (<Link to="/bots" className="collapsible-header waves-affect" id="settings" onClick={e => {e.preventDefault()}}>Settings<i className="material-icons">settings</i></Link>);
        const settings_active = (<Link to={"/bots/" + this.props.activeBot.name + "/settings"} className="collapsible-header waves-affect" id="settings">Settings<i className="material-icons">settings</i></Link>);
        

    
        for (var i=0;i<current_bots.length;i++){
            if (current_bots[i].name == this.props.activeBot.name){
                current_bots.splice(i,1);
                break;
            }
        }

        const elements = current_bots.map((current_bot) => {
            return (<li key={current_bot.id}>
                        <a href={"/bots/" + current_bot.name + "/learning"} onClick={this.update} >{current_bot.name}</a>
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
                    <a className="collapsible-header waves-affect" id="app"><b>{(this.props.bots.bots.length == 0)? '': this.props.activeBot.name}</b><i className="material-icons">arrow_drop_down</i></a>
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
                                        {intents_active}
                                        <div className="collapsible-body">
                                        </div>
                                    </li>
                                    <li className="bold">
                                        {learning_active}
                                        <div className="collapsible-body">
                                        </div>
                                    </li>
                                    <li className="bold">
                                        {settings_active}
                                        <div className="collapsible-body">
                                        </div>
                                    </li>
                                </ul>
                            </li><br/>
                            <li><div className="divider"></div></li>
                            <li><Link to="/docs/learning">Docs<i className="material-icons">content_paste</i></Link></li>
                            <li><a href="#!" onClick={this.logout}>Logout<i className="material-icons">settings_power</i></a></li>
                        </ul>
                        <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only"><i className="material-icons">menu</i></a>
                    </nav>
            </header>
        );
    }
}

Navbar.propTypes = {
    active:React.PropTypes.string.isRequired,
    logout: React.PropTypes.func.isRequired,
    activeBot: React.PropTypes.object.isRequired,
    bots: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
    return {
        bots: state.bots,
        activeBot: state.activeBot.activeBot
    }
}

export default connect(mapStateToProps, { logout })(Navbar);