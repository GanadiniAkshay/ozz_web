import React from 'react';
import {Link} from 'react-router';

class TosPage extends React.Component{
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
                        <h4 style={{"textAlign":"center"}}>Terms of Service</h4>
                        <div style={{"marginLeft":"50px"}}>
                            <p><b>What is Ozz?</b></p>
                            <p>
                               Ozz.ai is a service that lets you make your chatbots smarter. We provide services for continuous learning,
                               Automated Testing and Analytics<br/>
                               By using all or any part of Ozz you are agreeing to be bound by the following terms and conditions (“Terms of Service”). 
                               Violation of any of the terms below will result in the termination of your Account. You agree to use Ozz at your own risk and subject to the terms set forth below.
                            </p>

                            <p><b>1) Account Terms</b></p>
                            <p>
                                Your use of the Ozz Service and any additional services introduced by us and contained within constitutes acceptance by you of these Terms of Service.
                            </p>

                            <p><b>2) Cancellation</b></p>
                            <p>
                                You may cancel your account at any time. To cancel your account please send an email to admin@ozz.ai
                            </p>

                            <p><b>3) Specific Service Rules</b></p>
                            <p>
                                As a user you agree to not do the following
                                <ol>
                                    <li>Abuse, harass, threaten, stalk, defame or in anyway seek to violate the rights of another user or third party.</li>
                                    <li>Publish or seek to distribute any material or information that is unlawful, harmful, obscene, indecent, libellous, profane, defamatory, racist, or in any other way inappropriate or objectionable.</li>
                                    <li>Encourage illegal activity or activity that violates the rights of other Service users or third parties, whether individuals or organisations.</li>
                                    <li>To pose as another user, third party or organisation employee for the purposes of obtaining user or third party information.</li>
                                    <li>Use any robot, spider, scraper or other technical means to access the Service or any content on the Service.</li>
                                </ol>
                            </p>

                            <p><b>4) Content Ownership</b></p>
                            <p>
                                As a user you retain all ownership rights to content provided by you. <br/>
                                You warrant that any content provided by you does not belong to a third party whose rights have been violated by the content being posted on to the Service. Furthermore if any content is owned by a third party you agree to pay all royalties, fines and settlements owed to that party, without seeking any contribution from us.
                                <br/>
                                If not part of a plan that includes private data models you grant us the permission to use the data collected to improve the service for you as well as the community.
                            </p>

                            <p><b>5) Termination</b></p>
                            <p>
                                We may terminate your user account and all content and materials associated with it at any time where these Terms of Service have been breached. Such termination can be with or without notice. As a user you can choose to terminate your account at any time (subject to any payment plan entered into) and are free to remove any content you have created on termination.
                            </p>

                            <p><b>6) Access and Backups</b></p>
                            <p>
                                We take all reasonable steps to ensure that the Service is available and functioning fully at all times. However, we do not accept any responsibility for "down-time" or poor performance of our servers or infrastructure, or where the Service is unavailable for any other reason, whether within or outside our direct control.
                                <br/>
                                You are solely responsible for backing up any content or data entered onto the Service by you. We strongly recommend that you regularly and completely backup all of your content and data on the Service.
                            </p>

                            <p><b>7) Disclaimer</b></p>
                            <p>
                                We are not responsible for the accuracy of any content on the Service, nor any advertisements placed on the Service.
                                <br/>
                                We are not responsible for any links to third party websites from the Service and the inclusion of any link does not imply an endorsement of a third party website or service by us.
                            </p>

                            <p><b>8) Limitation of Liability</b></p>
                            <p>
                                We shall not be liable for any indirect, consequential, exemplary, incidental, special or punitive damages, including loss of profits.
                            </p>

                            <p><b>9) Indemnity</b></p>
                            <p>
                                You agree to indemnify and hold us and our subsidiaries, affiliates and partners and their respective officers and employees harmless from any loss, fines, fees, liability or claim made by any third party arising from your breach of these Terms of Service whilst using the Service or any other service provided by us.
                            </p>

                            <p><b>10) Privacy</b></p>
                            <p>
                                Use of the Service is also governed by our <Link to="/privacy">Privacy Policy</Link>, which is incorporated into these Terms of Service by this reference.
                            </p>

                            <p><b>11) Severabilty</b></p>
                            <p>
                                The foregoing paragraphs, sub-paragraphs and clauses of these Terms of Service shall be read and construed independently of each other. Should any part of this agreement or its paragraphs, sub-paragraphs or clauses be found invalid it shall not affect the remaining paragraphs, sub-paragraphs and clauses.
                            </p>

                            <p><b>12) Waiver</b></p>
                            <p>
                                Failure by us to enforce any accrued rights under these Terms of Service is not to be taken as or deemed to be a waiver of those rights unless we acknowledge the waiver in writing.
                            </p>

                            <br/><br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TosPage;