import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

import { getBots } from '../../actions/botActions';
import { getIntents } from '../../actions/intentActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

import IntentCard from './IntentCard';
import PropTypes from 'prop-types';

class IntentsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id:'',
            bot_guid:'',
            name:'',
            json_button: 'Import JSON',
            button:'save',
            disabled:true,
            loader:true,
            errors:{}
        }

         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        this.props.getBots(this.state).then(
                () => {
                    var current_bots = this.props.bots.bots;

                    var url_path = window.location.pathname.split('/');
                    var bot_name = url_path[2].replace('%20',' ');

                    var activeBot = current_bots.find(function(o){ return o.name == bot_name});

                    if (!activeBot){
                        activeBot = current_bots[0];
                        browserHistory.push('/bots/'+activeBot.name+'/intents');
                    }else{
                        this.setState({name:activeBot.name,id:activeBot.id,bot_guid:activeBot.bot_guid});

                        this.props.getIntents(this.state).then(
                            () => {
                                this.setState({loader:false})
                            }
                        )
                    }
                }
        );
    }
    
    


    onChange(e){
        if ( e.target.name != 'file'){
            this.setState({ [e.target.name]: e.target.value });
        }else{
            this.setState({ errors: {}, json_button:"Imported" });

            //create new formdata object
            var token = localStorage.getItem('jwtToken');
            var form_data = new FormData($('#json')[0]);
            var bot_guid  = this.state.bot_guid;
            $.ajax({
                type: 'POST',
                url: '/upload/' + bot_guid,
                headers:{'Authorization':'Bearer ' + token},
                data: form_data,
                contentType: false,
                processData: false,
                dataType: 'json'
            }).done(function(data, textStatus, jqXHR){
                console.log(data);
            }).fail(function(data){
                alert('error!');
            });
        }
    }


    onSubmit(e){
        this.setState({ errors: {}, button:"saving..." });
        e.preventDefault();

        // const {isValid, errors } = this.validate(this.state);

        // if (!isValid){
        //     this.setState({errors:errors, button:'Add'});
        // } else{
        //     var bot_obj = {}

        //     bot_obj['id'] = this.state.id;
        //     bot_obj['name'] = this.state.name;

        //     var url = '/bots/' + this.state.id;
        //     axios.put(url,bot_obj).then(
        //         (res) => {
        //             this.setState({button:'save'});

        //             Materialize.toast('Saved', 2000, 'rounded'); 
        //         },
        //         (error) => {console.log(error);this.setState({button:'save'})}
        //     )
        // }
    }

    render(){
        const { errors } = this.state;
        const current_intents = this.props.activeIntents.activeIntents;

        const loader = (<img src="https://d1wi3kcd7kachl.cloudfront.net/v0.0.2/img/loader.gif" alt="loader animation" style={{'marginTop':'15%','marginLeft':'25%'}}/>);

        const intents = current_intents.map((current_intent) => {
            return (
                <div key={current_intent.name}>
                    <IntentCard  intent={current_intent.name} utterances={current_intent.utterances} responses={current_intent.responses} 
                        calls={current_intent.calls}/>
                </div>
            )
        })

        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <div className="container">
                        <h4>Intents</h4>

                        <div>
                            <form className="col s8 offset-s2" id="json" encType="multipart/form-data">
                                <div className="file-field input-field" >
                                    <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}}>
                                        <span>Add Intent</span>
                                    </div>
                                    <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white','float':'right'}}>
                                        <span>{this.state.json_button}</span>
                                        <input 
                                            type="file" 
                                            id="jsfile"
                                            onChange={this.onChange} 
                                            name="file"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className="container full">
                        {this.state.loader? loader: intents}
                    </div>
                </main>
                
            </div>
        )
    }
}

IntentsPage.propTypes = {
    activeBot:PropTypes.object.isRequired,
    getBots:PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        bots:state.bots,
        activeBot: state.activeBot,
        activeIntents: state.activeIntents
    }
}


export default connect(mapStateToProps, { getBots, getIntents })(IntentsPage);