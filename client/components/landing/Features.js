import React from 'react';
import { Link } from 'react-router'; 

export default () => {
    return (
        <div>
    <div className="feature3">
      <div className="container-lrg flex">
        <div className="col-4">
          <b className="emoji">
            🤖
          </b>
          <h3 className="subheading">
            Supports Multiple Platforms
          </h3>
          <p className="paragraph-1">
            You can use ozz to retrain models on wit.ai, api.ai, luis.ai (coming soon) and custom models (coming soon).<div>Ozz is also language agnoistic.</div>
          </p>
        </div>
        <div className="col-4">
          <b className="emoji">
            📭
          </b>
          <h3 className="subheading">
            Smart&nbsp;<div>Inbox</div>
          </h3>
          <p className="paragraph-1">
            Apart from just unclassified intents, ozz.ai also looks at the conversation to identify intents that have been misclassified and need to be retrained.
          </p>
        </div>
        <div className="col-4">
          <b className="emoji">
            🖥
          </b>
          <h3 className="subheading">
            Easy to&nbsp;<div>Integrate</div>
          </h3>
          <p className="paragraph-1">
            Ozz makes it simple to integrate the learning tool with simple to use http API and language specific SDKs. It doesn't take more than 5 lines of code.
          </p>
        </div>
      </div>
    </div>
    <div className="feature1">
      <div className="container-sml">
        <div className="col-12 text-center">
          <h3 className="heading">
            Pricing
          </h3>
          <p className="paragraph">
            Ozz is <b>free</b> to use as long as we are in beta. 
            <br/><br/>
            Want a private learning model or have us do the NLP training for you? 
          </p>
          <div className="ctas">
              <Link className="ctas-button" to="/contact" style={{"background":"#ABA0CB","color":"white"}}>
                  Contact Us
              </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}