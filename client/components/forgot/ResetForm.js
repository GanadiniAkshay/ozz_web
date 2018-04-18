import React from 'react';
import axios from 'axios';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory, Link } from 'react-router';


class ResetForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password: '',
            password_confirmation:'',
            button:'Reset',
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

        this.setState({'button':'Resetting...'})

        if (this.state.password == ''){
            this.setState({errors:{'password':'Password cannot be empty'},'button':'Reset'});
        }

        if (this.state.password_confirmation == ''){
            this.setState({errors:{'password_confirmation':'Password Confirmation cannot be empty'},'button':'Reset'});
        }

        if (this.state.password != this.state.password_confirmation){
            this.setState({errors:{'password_confirmation':'Passwords must match'},'button':'Reset'});   
        }

        const userData = {
                        'name': this.props.name, 
                        'email': this.props.email, 
                        'password':this.state.password, 
                        'key':this.props.key_id
                        };

        console.log(userData);
        
        axios.put('https://api.ozz.ai/users/'+this.props.email, userData).then(
            (res) => {
                        browserHistory.push('/login')
                     },
            (error) => {console.log(error); this.setState({'button':'Reset'})}
        )
    }

    render(){
        const { errors } = this.state;

        const form = (<form className="col s8 offset-s2" onSubmit={this.onSubmit}>


                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    field="password"
                />

                <TextFieldGroup
                    error={errors.password_confirmation}
                    label="Password Confirmation"
                    onChange={this.onChange}
                    value={this.state.password_confirmation}
                    type="password"
                    field="password_confirmation"
                />

                <div className="form-group">
                    <button className="btn waves-effect waves-light" id="button" style={{'background':'#58488a','color':'white'}}>
                        {this.state.button} <i className="material-icons right">send</i>
                    </button>
                    <br/><br/>
                </div>
            </form>);

        return (
            <div>
                {form}   
            </div>
        )
    }
}


export default ResetForm;