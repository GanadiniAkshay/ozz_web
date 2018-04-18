import React from 'react';
import { Link } from 'react-router'; 

import ContactForm from './ContactForm';

class ContactPage extends React.Component{
    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        return(
            <div className="fluid-container" style={{'marginTop':'5%'}}>
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <img src="/img/logo_white_full.png" alt="ozz_logo" height="100px" style={{"marginTop":"10px"}}/> 
                        </Link>
                    </div>
                </div>
                <div className="row" style={{'marginTop':'5%'}}>
                    <div className="col s6 offset-s3" style={{'background':'white'}}>
                        <h4 style={{'color':'#ABA0CB','textAlign':'center'}}>Contact Us</h4>
                        <br/>
                        <ContactForm/>
                    </div>
                </div>
            </div>
        )
    }
}



export default ContactPage;