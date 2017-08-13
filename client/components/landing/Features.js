import React from 'react';
import { Link } from 'react-router'; 

export default () => {
    return (
        <div>
          <div className="feature1">
            <div className="container-sml">
              <div className="col-12 text-center">
                <h3 className="heading">
                  Intelligent Filtering
                </h3>
                <p className="paragraph">
                  Ozz looks at your bot's conversations to identify messages that your bot had a&nbsp;trouble understanding.
                </p>
              </div>
            </div>
            <div className="container-lrg centerdevices col-12">
              <div className="browseriphone">
                <div className="iphone">
                  <div className="mask">
                    <img className="mask-img" src="https://d7rkpiptlikiz.cloudfront.net/img/phone.png"/>
                  </div>
                </div>
                <div className="browser">
                  <div className="mask">
                    <img className="mask-img" src="https://d7rkpiptlikiz.cloudfront.net/img/web.png"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature6">
            <div className="container-sml flex">
              <div className="col-12">
                <h3 className="heading">
                  Multiple Platforms
                </h3>
                <p className="paragraph">
                  Ozz supports NLP retraining for multiple platforms like wit.ai, api.ai, Luis (coming soon) and custom NLP (coming soon).
                </p>
              </div>
            </div>
          </div>
          <div className="feature4">
            <div className="container-lrg flex">
              <div className="col-5 centervertical">
                <h3 className="subheading">
                  Easy to Integrate
                </h3>
                <p className="paragraph">
                  Ozz has a simple HTTP API and a node.js SDK to make integration super simple.<br/>With just a few lines of code you will be all set to use ozz.
                </p>
              </div>
              <div className="col-1">
              </div>
              <div className="col-6">
                <div className="sidedevices">
                  <div className="computerwrapper">
                    <div className="computer">
                      <div className="mask">
                        <img className="mask-img" src="https://d7rkpiptlikiz.cloudfront.net/img/code.png"/>
                      </div>
                    </div>
                  </div>
                </div>
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