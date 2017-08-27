import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

import { getBots } from '../../actions/botActions';

import Navbar from '../navbar/Navbar';
import TextFieldGroup from '../common/TextFieldGroup';

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
                        browserHistory.push('/bots/'+activeBot.name+'/learning');
                    }else{
                        console.log(activeBot);
                        this.setState({name:activeBot.name,id:activeBot.id,bot_guid:activeBot.bot_guid});
                    }
                }
        );
    } 


    onChange(e){
        if ( e.target.name != 'file'){
            this.setState({ [e.target.name]: e.target.value });
        }else{
            console.log(this.state.bot_guid);
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
        

        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <div className="container full">
                        <h4>Intents</h4>

                        <form className="col s8 offset-s2" id="json" encType="multipart/form-data">
                            <div className="file-field input-field" >
                                <div className="btn waves-effect waves-light" style={{'background':'#58488a','color':'white'}}>
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
                </main>
            </div>
        )
    }
}

IntentsPage.propTypes = {
    activeBot:React.PropTypes.object.isRequired,
    getBots:React.PropTypes.func.isRequired
}


function mapStateToProps(state){
    return {
        activeBot: state.activeBot
    }
}


export default connect(mapStateToProps, { getBots })(IntentsPage);