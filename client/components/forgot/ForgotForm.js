import React from 'react';
import axios from 'axios';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory, Link } from 'react-router';


class ForgotForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            sent:false,
            errors: {}
        }

    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        if (this.state.email == ''){
            this.setState({ errors: {"email":"This field is required"}, sent:false});
        } else{
            const url = 'https://api.ozz.ai/users/'+ this.state.email + '?action=forgot';
            axios.get(url).then( 
                (res) => {this.setState({ errors: {}, sent:true})},
                (error) => {
                    this.setState({ errors: {"email":"No account exists with that email"}, sent:false});}

             );
            this.setState({errors:{},sent:true});
        }
    }

    render(){
        const { errors } = this.state;

        const form = (<form className="col s8 offset-s2" onSubmit={this.onSubmit}>


                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    type="email"
                    field="email"
                />


                <div className="form-group">
                    <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                        Submit <i className="material-icons right">send</i>
                    </button>
                    <br/><br/>
                </div>
            </form>);

        const message = (<div>
                            <p>A password recovery email has been sent to your registered email address. It might take upto 5 minutes for the email to be delivered</p>
                            <br/>
                        </div>);

        return (
            <div>
                {this.state.sent? message: form}   
            </div>
        )
    }
}


export default ForgotForm;