import React from 'react';
import {Link} from 'react-router';

class PrivacyPage extends React.Component{
    render(){
        document.body.style.backgroundColor = '#ABA0CB';
        const { userSignupRequest} = this.props;
        return(
            <div className="fluid-container">
                <div className="row">
                    <div className="headingLogo">
                        <Link to="/">
                            <img src="/img/logo_white_full.png" alt="ozz_logo" height="100px" style={{"marginTop":"10px"}}/> 
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="tagline">
                        <h4>Make your chatbots smarter</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s10 offset-s1" style={{'background':'white'}}>
                        <h4 style={{"textAlign":"center"}}>Privacy Policy</h4>
                        <div style={{"marginLeft":"50px"}}>
                            <p><b>1) Our Services</b></p>
                            <p>
                                We only hold the data necessary to offer services provided on our website.
                            </p>

                            <p><b>2) Required Period</b></p>
                            <p>
                                We only hold personal data for as long as necessary. Once data is no longer needed it is deleted from our files.
                            </p>

                            <p><b>3) Data Storage</b></p>
                            <p>
                                For administrative reasons data may be passed to and stored securely with third party service providers located outside the EEA (European Economic Area).
                            </p>


                            <p><b>4) Updates</b></p>
                            <p>
                                We regularly email website news and information updates to those customers who have specifically subscribed to our email service. All subscription emails sent by us contain clear information on how to unsubscribe from our email service.
                            </p>

                            <p><b>5) Our Promise</b></p>
                            <p>
                                We never sell, rent or exchange mailing lists.
                            </p>

                            <p><b>6) Client Side Data</b></p>
                            <p>
                                Our Application stores data in the local cache on your browsers.
                            </p>

                            <p><b>7) Contact Us</b></p>
                            <p>
                                If you have any questions relating to our Privacy Policy please email us at admin@ozz.ai
                            </p>
                            <br/><br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default PrivacyPage;