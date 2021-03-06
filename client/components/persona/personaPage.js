import React from 'react';
import { connect } from 'react-redux';
import {  updateBot } from '../../actions/botActions';

import Navbar from '../navbar/Navbar';
import { browserHistory, Link} from 'react-router';

import PropTypes from 'prop-types';

import {config} from '../../config';

class PersonaPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            "millenial":false,
            "average":false,
            "professional":false
        }

        this.changeMillenial = this.changeMillenial.bind(this);
        this.changeAverage = this.changeAverage.bind(this);
        this.changeProfessional = this.changeProfessional.bind(this);
        this.importMillenial = this.importMillenial.bind(this);
        this.importAvg = this.importAvg.bind(this);
        this.importProfessional = this.importProfessional.bind(this);
    }

    componentWillMount(){
        var persona = this.props.activeBot.persona;

        var millenial = false;
        var average = false;
        var professional = false;

        if (persona == 1){
            millenial = !millenial;
        }else if (persona == 2){
            average = !average;
        }else if (persona == 3){
            professional = !professional;
        }

        this.setState({"millenial":millenial,"average":average,"professional":professional});
    }

    changeMillenial(e){
        var current_millenial = this.state.millenial;
        this.setState({"millenial":!current_millenial,"average":false,"professional":false});

        var bot = this.props.activeBot;

        if (!current_millenial){
            bot.persona = 1;
        }else{
            bot.persona = -1;
        }

        this.props.updateBot(bot);
    }

    changeAverage(e){
        var current_average = this.state.average;
        this.setState({"millenial":false,"average":!current_average,"professional":false});

        var bot = this.props.activeBot;
        
        if (!current_average){
            bot.persona = 2;
        }else{
            bot.persona = -1;
        }

        this.props.updateBot(bot);
    }

    changeProfessional(e){
        var current_professional = this.state.professional;
        this.setState({"millenial":false,"average":false,"professional":!current_professional});

        var bot = this.props.activeBot;
        
        if (!current_professional){
            bot.persona = 3;
        }else{
            bot.persona = -1;
        }

        this.props.updateBot(bot);
    }

    importMillenial(){
        var bot_guid = this.props.activeBot.bot_guid;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + '/import/' + bot_guid + "/millenial",
            "method": "GET",
            "headers": {
              "Cache-Control": "no-cache",
              "Authorization": "Bearer " + localStorage.jwtToken
            }
          }
          
        $.ajax(settings).done(function (response) {
            document.getElementById('millenial_button').innerText = "Imported";
        });
    }

    importAvg(){
        document.getElementById('avg_button').innerText = "Imported";
        var bot_guid = this.props.activeBot.bot_guid;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + '/import/' + bot_guid + "/average",
            "method": "GET",
            "headers": {
              "Cache-Control": "no-cache"
            }
          }
          
        $.ajax(settings).done(function (response) {
        console.log(response);
        });
    }

    importProfessional(){
        document.getElementById('professional_button').innerText = "Imported";
        var bot_guid = this.props.activeBot.bot_guid;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + '/import/' + bot_guid + "/professional",
            "method": "GET",
            "headers": {
              "Cache-Control": "no-cache"
            }
          }
          
        $.ajax(settings).done(function (response) {
        console.log(response);
        });
    }
    
    render(){
        document.body.style.backgroundColor = '#F8F8F8';

        return (
            <div className="full">
                <Navbar active="app_new"/>
                <main>
                    <div className="container"> 
                        <h4>Persona</h4>

                        <div className="row">
                            <div className="col s4 card" style={{"minHeight":"650px","maxHeight":"650px"}}>
                                <div className="card-content" style={{"textAlign":"center"}}>
                                    <h4>Millenial</h4>
                                    <img src="https://robohash.org/PJO.png?set=set1&size=150x150"/>
                                    <p>A millenial persona uses internet lingo, gifs, emojis. It also uses sarcasm, jokes and pop culture references to respond to queries</p>
                                    <br/>
                                    <span className="card-title activator grey-text text-darken-4">Use Millenial Persona</span>
                                    <div className="switch">
                                        <label>
                                        No
                                        <input type="checkbox" checked={this.state.millenial} onChange={this.changeMillenial}/>
                                        <span className="lever"></span>
                                        Yes
                                        </label>
                                    </div>
                                    <br/>
                                    <button id="millenial_button" style={{'background':'#58488a','color':'white'}} onClick={this.importMillenial}>Import</button>
                                </div>
                            </div>
                            <div className="col s4 card" style={{"minHeight":"650px","maxHeight":"650px"}}>
                                <div className="card-content" style={{"textAlign":"center"}}>
                                    <h4>Average Joe</h4>
                                    <img src="https://robohash.org/IGX.png?set=set1&size=150x150"/>
                                    <p>A millenial persona uses internet lingo, gifs, emojis. It also uses sarcasm, jokes and pop culture references to respond to queries</p>
                                    <br/>
                                    <span className="card-title activator grey-text text-darken-4">Use Average Joe Persona</span>
                                    <div className="switch">
                                        <label>
                                        No
                                        <input type="checkbox" checked={this.state.average} onChange={this.changeAverage}/>
                                        <span className="lever"></span>
                                        Yes
                                        </label>
                                    </div>
                                    <br/>
                                    <button id="avg_button" style={{'background':'#58488a','color':'white'}} onClick={this.importAvg}>Import</button>
                                </div>
                            </div>
                            <div className="col s4 card" style={{"minHeight":"650px","maxHeight":"650px"}}>
                                <div className="card-content" style={{"textAlign":"center"}}>
                                    <h4>Professional</h4>
                                    <img src="https://robohash.org/5K6.png?set=set2&size=150x150"/>
                                    <p>A millenial persona uses internet lingo, gifs, emojis. It also uses sarcasm, jokes and pop culture references to respond to queries</p>
                                    <br/>
                                    <span className="card-title activator grey-text text-darken-4">Use Professional Persona</span>
                                    <div className="switch">
                                        <label>
                                        No
                                        <input type="checkbox" checked={this.state.professional} onChange={this.changeProfessional}/>
                                        <span className="lever"></span>
                                        Yes
                                        </label>
                                    </div>
                                    <br/>
                                    <button id="professional_button" style={{'background':'#58488a','color':'white'}} onClick={this.importProfessional}>Import</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

PersonaPage.propTypes = {
    updateBot: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        activeBot: state.activeBot.activeBot
    }
}

export default connect(mapStateToProps, { updateBot })(PersonaPage);
