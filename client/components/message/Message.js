import React from 'react';
import axios from 'axios';
import classnames from 'classnames';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Message extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            button:'Retrain',
            intent:'',
            hidden:"false",
            intents:this.props.intents,
            utterances:[this.props.message],
            error:''
        }

        this.retrain = this.retrain.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.createIntent = this.createIntent.bind(this);
        this.addIntent = this.addIntent.bind(this);
    }

    componentWillMount(){
        this.setState({intent:this.props.intent});
    }

    componentDidMount(){
        var selector = '#' + this.props.identifier
        $(selector).material_select(this.onSelectChange.bind(this));
        var mod_selector = '#modal' + this.props.identifier;
        $(mod_selector).modal();
    }

    onSelectChange(){
       var selector = '#' + this.props.identifier
       var new_intent = $(selector).val();

       if (new_intent == 'new'){
           var selector = '#modal' + this.props.identifier;
           $(selector).modal('open');
       }
       this.setState({intent:new_intent});
    }

    addIntent(e){
        e.preventDefault();

        var selector = "#utterance" + this.props.identifier;

        var new_utterance = $(selector).val();
        $(selector).val("");
        var utterances = this.state.utterances;
        utterances.push(new_utterance);
        this.setState({utterances:utterances});
    }

    createIntent(){
        this.setState({button:'Retraining...'});
        var selector = "#name" + this.props.identifier;
        var name = $(selector).val();
        var flag = true;


        for(var i=0;i<this.state.intents.length;i++){
                if (name == this.state.intents[i]){
                    this.setState({error:'An intent already exists with that name',button:'Retrain'});
                    flag = false;
                    break;
                }
        }

        if (this.props.nlp == 'wit'){
            var url = 'https://api.ozz.ai/wit?sat='+this.props.token;
            var body = {
                    "value":name,
                    "expressions":this.state.utterances
            }

            if (flag){
                axios.post(url,body).then(
                    () => {
                            axios.put('https://api.ozz.ai/conversations?bot_id='+this.props.id,{'message':this.props.message}).then(
                                (res) => {console.log(res.data)},
                                (error) => {console.log(error)}
                            )
                            this.setState({hidden:"true"});
                            this.props.addIntent(name);
                            Materialize.toast('Retrained', 1000, 'rounded'); 
                    },
                    (error) => {
                                this.setState({hidden:"true"});
                                console.log(errors)
                               }
                )
            }
        } else if (this.props.nlp == 'api'){
            var url = 'https://api.ozz.ai/api?dat=' + this.props.token,intent_body,headers;
            var headers = {'headers':{'Authorization':'Bearer ' + this.props.token}};

            var selector = "#response" + this.props.identifier;
            var response = $(selector).val();

            var responses = [{'resetContexts':false,"speech":response}];

            var userSays = [];

            for (var i=0;i<this.state.utterances.length;i++){
                userSays.push({'data':[{'text':this.state.utterances[i]}]});
            }

            var body = {
                "name":name,
                "auto":true,
                "contexts":[],
                "templates":this.state.utterances,
                "userSays":userSays,
                "responses":responses,
            }

            if (flag){
                axios.post(url,body,headers).then(
                    (res) => {
                        axios.put('https://api.ozz.ai/conversations?bot_id='+this.props.id,{'message':this.props.message}).then(
                                (res) => {console.log(res.data)},
                                (error) => {console.log(error)}
                        )
                        this.setState({hidden:"true"});
                        this.props.addIntent(name);
                        Materialize.toast('Retrained', 1000, 'rounded'); 
                    },
                    (error) => {console.log(error)}
                )
            }
        }

        
    }

    retrain(){
        this.setState({button:'Retraining...'});
        
        if (this.props.nlp == 'wit'){
            var url = 'https://api.ozz.ai/wit?intent=' + this.state.intent + '&sat=' + this.props.token;
            var body = {'expression':this.props.message};

            var headers = {'headers':{'Authorization':'Bearer ' + this.props.token}};

            

            axios.put(url,body,headers).then(
                (res) => {
                            axios.put('https://api.ozz.ai/conversations?bot_id='+this.props.id,{'message':this.props.message}).then(
                                (res) => {console.log(res.data)},
                                (error) => {console.log(error)}
                            )
                            this.setState({button:'Retrain',hidden:"true"});
                            Materialize.toast('Retrained', 1000, 'rounded'); 
                },
                (error) => {this.setState({button:'Retrain',hidden:"true"});console.log(error)}
            )
        } else if (this.props.nlp == 'api'){
            var intent_id = this.props.intent_ids[this.state.intent];
            
            var url = "https://api.api.ai/v1/intents/" + intent_id + "?v=20150910"
            var headers = {'headers':{'Authorization':'Bearer ' + this.props.token}};
                        
            axios.get(url,headers).then(
                (res)=>{
                    var intent_body = res.data;
                    
                    intent_body['templates'].push(this.props.message);
                    intent_body['userSays'].push({'data':[{'text':this.props.message}]});
                    
                    axios.put('https://api.ozz.ai/api?intent_id=' + intent_id + '&dat=' + this.props.token,intent_body,headers).then(
                        (res) => {
                            axios.put('https://api.ozz.ai/conversations?bot_id='+this.props.id,{'message':this.props.message}).then(
                                (res) => {console.log(res.data)},
                                (error) => {console.log(error)}
                            )
                            this.setState({button:'Retrain',hidden:"true"});
                            Materialize.toast('Retrained', 1000, 'rounded'); 
                        },
                        (error) => {this.setState({button:'Retrain',hidden:"true"});console.log(error)}
                    )
                },
                (error) => {console.log(error)}
            )
            
        }
    }

    render(){
        
        const options = []

        for (var i=0;i<this.state.intents.length;i++){
            options.push(<option key={this.state.intents[i]} value={this.state.intents[i]} >{this.state.intents[i]}</option>)
        }

        var user_says = []
        for (var i=0;i<this.state.utterances.length;i++){
            user_says.push(<li key={i}>{this.state.utterances[i]}</li>)
        }

        return(
            <div className={classnames("row",{
                "hide":this.state.hidden == "true"
            })}>
                <div className="col s12 m12">
                    <div className="card darken-1">
                        <div className="card-content">
                            <p>{this.props.message}</p>
                        </div>
                        <div className="card-action">
                        <div className="input-field col s12 m6">
                            <select id={this.props.identifier} value={this.state.intent} onChange={this.onSelectChange}>
                                <option>Select Intent</option>
                                {options}
                                <option value="new">Add New Intent</option>
                            </select>
                            <label>Intent</label>
                        </div>
                        <span style={{'color':'red'}}>{this.state.error}</span>
                        <br/>
                        <div>
                            <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}} onClick={this.retrain}>
                                {this.state.button}
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
                    <div id={'modal' + this.props.identifier} className="modal modal-fixed-footer">
                        <div className="modal-content">
                            <h4>Create New Intent</h4>
                            <hr/>
                            <div className="utterances">
                                
                                <form onSubmit={this.addIntent}>
                                    <div className="input-field col s6">
                                        <input id={"name" + this.props.identifier} type="text"/>
                                        <label>Name</label>
                                    </div>
                                    <br/><br/><br/><br/>
                                    {this.props.nlp == 'api'? <div>
                                                                    <div className="input-field col s6">
                                                                        <input id={"response" + this.props.identifier} type="text"/>
                                                                        <label>Response</label>
                                                                    </div>
                                                                </div>:<div></div>}
                                    <br/><br/><br/><br/>
                                    <ul>
                                        <p><b>Utterances</b></p>
                                        {user_says}
                                    </ul>
                                    <div className="input-field col s6">
                                        <input id={"utterance" + this.props.identifier} type="text"/>
                                        <label>Utterance</label>
                                    </div>
                                    <br/><br/><br/><br/>
                                    <div className="form-group">
                                        <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                                         <i className="material-icons">add</i>
                                        </button><br/><br/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a onClick={this.createIntent} className="modal-action modal-close waves-effect waves-green btn-flat">Add</a>
                        </div>
                    </div>
            </div>

            
        )
    }
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
    nlp: PropTypes.string.isRequired,
    token:PropTypes.string.isRequired,
    intents:PropTypes.array.isRequired,
    intent_ids:PropTypes.object.isRequired,
    intent:PropTypes.string.isRequired,
    addIntent:PropTypes.func.isRequired,
    id:PropTypes.number.isRequired
}

export default Message;