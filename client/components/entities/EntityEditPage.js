import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

import { getBots } from '../../actions/botActions';
import { getExamples, addExample, removeExample, addSyn, removeSyn } from '../../actions/entityActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

import PropTypes from 'prop-types';


class EntityEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id:'',
            bot_guid:'',
            name:'',
            button:'save',
            activeEntities:{},
            examples:[],
            disabled:true,
            loader:true,
            errors:{}
        }

        this.onExampleAdd = this.onExampleAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSynAdd = this.onSynAdd.bind(this);
        this.onSynRemove = this.onSynRemove.bind(this);
    }

    componentDidMount(){
        this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = decodeURI(url_path[2]);
                    var entity_name = decodeURI(url_path[4]);

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
                        this.setState({name:entity_name,id:activeBot.id,bot_guid:activeBot.bot_guid});

                        this.props.getExamples(this.state).then(
                            () => {
                                this.setState({examples:this.props.examples.examples});
                            }
                        )
                    }
                }
        );
    }

    onExampleAdd(e){
        e.preventDefault();
        var new_example = document.getElementById('example').value;
        document.getElementById('example').value = "";

        var payload = {};
        payload['bot_guid'] = this.state.bot_guid;
        payload['name'] = this.state.name;
        payload['new_example'] = new_example;

        console.log(payload);

        this.props.addExample(payload).then(
            () => {
                this.setState({examples:this.props.examples.examples});
            }
        )
    }

    onRemove(e){
        var old_example = e.target.id;

        var payload = {};
        payload['bot_guid'] = this.state.bot_guid;
        payload['name'] = this.state.name;
        payload['old_example'] = old_example;

        this.props.removeExample(payload).then(
            () => {
                this.setState({examples:this.props.examples.examples});
            }
        )
    }

    onSynAdd(e){
        var key = e.which || e.keyCode;
        if (key === 13){
            console.log("Adding " + e.target.value + ' for ' + e.target.name);
            var payload = {};
            payload['bot_guid'] = this.state.bot_guid;
            payload['name'] = this.state.name;
            payload['example'] = e.target.name;
            payload['synonym'] = e.target.value;

            e.target.value = "";

            this.props.addSyn(payload).then(
                () => {
                    this.setState({examples:this.props.examples.examples});
                }
            )
        }
    }

    onSynRemove(e){
        var values = e.target.id.split('|*|*|')

        var example = values[0];
        var synonym = values[1];
        var index = this.state.examples[example].indexOf(synonym);
        console.log("Deleting " + values[1] + " from " + values[0] + " at index " + index);

        var payload = {}
        payload['bot_guid'] = this.state.bot_guid;
        payload['name'] = this.state.name;
        payload['example'] = example;
        payload['synonym'] = synonym;
        payload['index'] = index;

        this.props.removeSyn(payload).then(
            () => {
                this.setState({examples:this.props.examples.examples});
            }
        )
    }

    render(){
        const { errors } = this.state;
        const current_entities = this.state.activeEntities;
        const name = this.state.name;

        const examples = Object.entries(this.state.examples);
        const loader = (<img src="https://d1wi3kcd7kachl.cloudfront.net/v0.6.10/img/loader.gif" alt="loader animation" style={{'marginTop':'15%','marginLeft':'25%'}}/>);

        const list = examples.map((example,index)=>{
            const synonyms = example[1].map((synonym, index) => {
                return (
                    <div className="chip"  key={index}>
                        {synonym}
                        <i className="close material-icons" id={example[0] + '|*|*|' +synonym} onClick={this.onSynRemove}>close</i>
                    </div>   
                )
            });

            return (
                <li className="collection-item hoverize" key={index} style={{"padding":0,"margin":0,"height":"100%"}}>  
                    <div className="row" style={{"padding":0,"margin":0,"height":"100%"}}>
                        <div className="col s3" style={{"height":"100%","paddingTop":"2%"}}>
                            <p style={{"textAlign":"center"}}>{example[0]}</p>
                        </div>
                        <div className="col s8">
                            <input type="text" style={{"width":"35%"}} name={example[0]} placeholder="Add Synonym" onKeyPress={this.onSynAdd}/>
                            {synonyms}
                        </div>
                        <div className="col s1" style={{"height":"100%","paddingTop":"2%"}}>
                            <i className="material-icons" id={example[0]} style={{"cursor":"pointer"}} onClick={this.onRemove}>delete</i>
                        </div>
                    </div>
                </li>
            )
        });

        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <div>
                        <div className="container">
                            <h3>
                                <div className="input-field-none">
                                    <input type="text" value={name} style={{"fontSize":"1em","display":"inline"}}/>
                                </div>
                            </h3>
                            <div>
                                <form autoComplete="off" className="col s8 offset-s2" id="json" encType="multipart/form-data" onSubmit={this.onExampleAdd}>
                                    <div className="input-field">
                                        <input id="example" type="text" placeholder="Add Example"/>
                                    </div>
                                    <div className="file-field input-field" >
                                        <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white','float':'right','marginTop':'-2%'}} onClick={this.onExampleAdd}>
                                            <span>Add Example</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br/><br/><br/>
                        <div className="container" style={{"height":"100%"}}>
                            <div className="row" style={{"padding":0,"margin":0,"height":"100%"}}>
                                <ul className="collection" style={{"padding":0,"margin":0,"height":"100%"}}>
                                    {list}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
                
            </div>
        )
    }

}

EntityEditPage.propTypes = {
    activeBot:PropTypes.object.isRequired,
    getBots:PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        bots:state.bots,
        activeBot: state.activeBot,
        activeEntities: state.activeEntities,
        examples:state.examples
    }
}


export default connect(mapStateToProps, { getBots, getExamples, addExample, removeExample, addSyn, removeSyn })(EntityEditPage);