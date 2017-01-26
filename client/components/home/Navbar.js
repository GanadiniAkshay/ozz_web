import React from 'react'
import remove from 'lodash/remove'
import { browserHistory, Link } from 'react-router';

import { getBots } from '../../actions/botActions';
import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions';


class Navbar extends React.Component{
    constructor(props){
        super(props);

        var url_path = window.location.pathname.split('/');
        var bot_name = url_path[2];

        this.state = {
            bot_name: bot_name
        }

        this.logout = this.logout.bind(this);
    }


    logout(e){
        e.preventDefault();
        this.props.logout();
    }

    componentWillMount(){
        this.props.getBots(this.state).then(
            () => {
                var current_bots =  this.props.bots.bots;
            }
        );
    }

    componentDidMount(){
        // Initialize collapse button
        $(".button-collapse").sideNav();
        // Initialize collapsible (uncomment the line below if you use the dropdown variation)
        $('.collapsible').collapsible();

        var element_id = this.props.active;
        var top_id = element_id.split('_')[0];

        $('#' + element_id).addClass('active');
        $('#' + top_id).addClass('active');
    }

    render(){
        const active_select = (<a className="collapsible-header active waves-affect" id="app"><b></b><i className="material-icons">arrow_drop_down</i></a>);
        const inactive_select = (<a className="collapsible-header waves-affect" id="app"><b>{this.state.bot_name}</b><i className="material-icons">arrow_drop_down</i></a>);

        var  current_bots = this.props.bots.bots;

    
        for (var i=0;i<current_bots.length;i++){
            if (current_bots[i].name == this.state.bot_name){
                current_bots.splice(i,1);
                break;
            }
        }

        console.log(current_bots);
        const elements = current_bots.map((current_bot) => {
            return (<li key={current_bot.id}>
                        <Link to="#!">{current_bot.name}</Link>
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
                <li className="bold">
                    {this.state.bot_name? inactive_select: active_select}
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
                            <li><Link to="/"><h1 style={{"color":"#ABA0CB"}}>OZZ.ai</h1></Link></li><br/>
                            <li><div className="divider"></div></li>
                            <li>
                                {application_select}
                            </li>
                            <li><div className="divider"></div></li>
                            <li className="no-padding">
                                <ul className="collapsible collapsible-accordion">
                                    <li className="bold">
                                        <a className="collapsible-header waves-affect" id="learning">Continuous Learning<i className="material-icons">speaker_notes</i></a>
                                        <div className="collapsible-body">
                                        <ul>
                                            <li id="learning_dashboard"><Link to={"/bots/" + this.state.bot_name + "/learning"} >Dashboard</Link></li>
                                        </ul>
                                        </div>
                                    </li>
                                    <li className="bold">
                                        <a className="collapsible-header waves-affect" id="testing">Automated Testing<i className="material-icons">done_all</i></a>
                                        <div className="collapsible-body">
                                        <ul>
                                            <li id="testing_dashboard"><Link to={"/bots/" + this.state.bot_name + "/testing"}>Dashboard</Link></li>
                                            <li id="testing_tests"><Link to={"/bots/" + this.state.bot_name + "/testing/test_cases"}>Test Cases</Link></li>
                                            <li id="testing_flows"><Link to={"/bots/" + this.state.bot_name + "/testing/flows"}>Flows</Link></li>
                                        </ul>
                                        </div>
                                    </li>
                                    <li className="bold">
                                        <a className="collapsible-header waves-affect" id="analytics">Analytics<i className="material-icons">insert_chart</i></a>
                                        <div className="collapsible-body">
                                        <ul>
                                            <li id="analytics_dashboard"><Link to={"/bots/" + this.state.bot_name + "/analytics"}>Dashboard</Link></li>
                                            <li id="analytics_takeover"><Link to={"/bots/" + this.state.bot_name + "/analytics/takeover"}>Takeover</Link></li>
                                            <li id="analytics_custom"><Link to={"/bots/" + this.state.bot_name + "/analytics/custom"}>Custom</Link></li>
                                        </ul>
                                        </div>
                                    </li>
                                    <li className="bold">
                                        <Link to={"/bots/" + this.state.bot_name + "/settings"} className="collapsible-header waves-affect" id="settings">Settings<i className="material-icons">settings</i></Link>
                                        <div className="collapsible-body">
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <br/><br/>
                            <li><div className="divider"></div></li>
                            <li><a href="#!">Web Plugin<i className="material-icons">personal_video</i></a></li>
                            <li><a href="#!">Showcase<i className="material-icons">whatshot</i></a></li>
                            <li><a href="#!">Docs<i className="material-icons">content_paste</i></a></li>
                            <li><a href="#!">Account<i className="material-icons">account_box</i></a></li>
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
    getBots: React.PropTypes.func.isRequired,
    bots: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
    return {
        bots: state.bots
    }
}

export default connect(mapStateToProps, { logout, getBots })(Navbar);