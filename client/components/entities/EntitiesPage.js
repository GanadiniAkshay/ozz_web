import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

import { getBots } from '../../actions/botActions';
import { getEntities, addEntity, removeEntity } from '../../actions/entityActions'; 

import EntityCard from './EntityCard';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

import PropTypes from 'prop-types';

class EntitiesPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id:'',
            bot_guid:'',
            name:'',
            activeEntities:[],
            int_button: 'Add',
            button:'save',
            disabled:true,
            loader:true,
            errors:{}
        }

        this.addKeyEntity = this.addKeyEntity.bind(this);
        this.addEntity = this.addEntity.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
    }

    componentDidMount(){
        this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = decodeURI(url_path[2]);

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
                        this.setState({name:activeBot.name,id:activeBot.id,bot_guid:activeBot.bot_guid});
                        this.props.getEntities(this.state).then(
                            () => {
                                this.setState({loader:false,activeEntities:this.props.activeEntities.activeEntities})
                            }
                        )
                    }
                }
        );

        $(document).ready(function(){
            // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
        });
    }

    addEntity(e){
        var entity_name = document.getElementById('entity').value;
        this.setState({int_button:"Adding..."});

        var payload = {};
        
        payload['name'] =  entity_name;
        payload['bot_guid'] = this.state.bot_guid;
        payload['examples'] = {};

        this.props.addEntity(payload).then(
            () => {
                this.setState({int_button:"Add", activeEntities:this.props.activeEntities.activeEntities});
                //browserHistory.push('/bots/'+ this.state.name +'/intents/'+ intent_name);
            }
        )

        $('#entity_form').modal('close');
    }

    addKeyEntity(e){
        var key = e.which || e.keyCode;
        
        if (key && key == 13){
            var entity_name = document.getElementById('entity').value;
            entity_name = entity_name.toLowerCase();
            this.setState({int_button:"Adding..."});
    
            var payload = {};
    
            payload['name'] =  entity_name;
            payload['bot_guid'] = this.state.bot_guid;
            payload['examples'] = {};

            this.props.addEntity(payload).then(
                () => {
                    this.setState({int_button:"Add", activeEntities:this.props.activeEntities.activeEntities});
                    //browserHistory.push('/bots/'+ this.state.name +'/intents/'+ intent_name);
                }
            )

            $('#entity_form').modal('close');
        }
    }

    deleteEntity(e){
        var button = e.currentTarget;
        var values = button.attributes.name.value.split('|*|*|');

        var name = values[0];
        var index = values[1];
        
        var payload = {};
        
        payload['entity'] =  name;
        payload['bot_guid'] = this.state.bot_guid;
        payload['index'] = index;

        $("#deleteModal"+name).modal('close');
        this.props.removeEntity(payload).then(
            () => {
                this.setState({activeEntities:this.props.activeEntities.activeEntities});
            }
        )
    }

    render(){
        const { errors } = this.state;
        const current_entities = this.state.activeEntities;
        
        const loader = (<img src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/loader.gif" alt="loader animation" style={{'marginTop':'15%','marginLeft':'25%'}}/>);

        const entities = current_entities.map((current_entity,index) => {
            return (
                <div key={index}>
                    <EntityCard  index={index} entity={current_entity.name} num_examples={current_entity.num_examples} onRemove={this.deleteEntity}/>
                </div>
            )
        })
        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <div className="container">
                        <h4>Entities</h4>

                        <div>
                            <form className="col s8 offset-s2" id="json" encType="multipart/form-data">
                                <div className="file-field input-field" >
                                    <a className="waves-effect waves-light btn modal-trigger" href="#entity_form" style={{'background':'#58488a','color':'white'}}>Add Entity</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="entity_form" className="modal">
                        <div className="modal-content">
                            <h4>Add Entity</h4>
                            <div className="input-field col s12">
                                <input id="entity" type="text" onKeyPress={this.addKeyEntity}/>
                                <label htmlFor="entity">Entity Name</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a className="waves-effect waves-green btn-flat" onClick={this.addEntity}>{this.state.int_button}</a>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className="container full">
                        {this.state.loader? loader: entities}
                    </div>
                </main>
                
            </div>
        )
    }
}

EntitiesPage.propTypes = {
    activeBot:PropTypes.object.isRequired,
    getBots:PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        bots:state.bots,
        activeBot: state.activeBot,
        activeEntities: state.activeEntities
    }
}


export default connect(mapStateToProps, { getBots, getEntities, addEntity, removeEntity})(EntitiesPage);