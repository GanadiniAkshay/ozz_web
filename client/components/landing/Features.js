import React from 'react';
import { Link } from 'react-router'; 

export default () => {
    return (
        <div>
          <div className="feature5">
            <div className="container-sml text-center">
              <div className="col-12">
                <h3 className="heading">
                  Learn from conversations
                </h3>
              </div>
            </div>
            <div className="container-lrg flex">
              <div className="col-5 centervertical">
                <div className="steps">
                  <h3 className="subheading">
                    Self Learn
                  </h3>
                  <p className="paragraph">
                    Your bots learn from conversations and keep getting smarter with time.<br/>You have control to review and edit anything learnt by your bot.
                  </p>
                </div>
                <div className="steps">
                  <h3 className="subheading">
                    Local Memory
                  </h3>
                  <p className="paragraph">
                    The learning is initially local to the user.<br/>Once a similar thing has been learnt locally by multiple user sessions, it gets learnt globally.
                  </p>
                </div>
                <div className="steps">
                  <h3 className="subheading">
                    Collective Learn
                  </h3>
                  <p className="paragraph">
                    Your models are constantly retrained with the knowledge acquired by all public bots on ozz.
                  </p>
                </div>
              </div>
              <div className="col-1">
              </div>
              <div className="col-6">
                <div className="sidedevices">
                  <div className="iphones">
                    <div className="iphone">
                      <div className="mask">
                        <img className="mask-img" src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/learn2.png"/>
                      </div>
                    </div>
                    <div className="iphone iphone__2">
                      <div className="mask">
                        <img className="mask-img" src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/learn1.png"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature4">
            <div className="container-lrg flex">
              <div className="col-5 centervertical">
                <h3 className="subheading">
                  Pre-trained Scripts
                </h3>
                <p className="paragraph">
                  Ozz uses a deep learning model that enables your bot to have generic conversations without any effort from you.
                </p>
              </div>
              <div className="col-1">
              </div>
              <div className="col-6">
                <div className="sidedevices">
                  <div className="iphones">
                    <div className="iphone">
                      <div className="mask">
                        <img className="mask-img" src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/pre2.png"/>
                      </div>
                    </div>
                    <div className="iphone iphone__2">
                      <div className="mask">
                        <img className="mask-img" src="https://d1wi3kcd7kachl.cloudfront.net/v0.10.22/img/pre1.png"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feature3">
            <div className="container-lrg flex">
            <div className="col-4">
                <h3 className="subheading">
                  Continuous Testing
                </h3>
                <p className="paragraph">
                  Run scheduled automated tests and use a combination of human + AI to expand your test cases.
                </p>
              </div>
              <div className="col-4">
                <h3 className="subheading">
                  Cloud Functions
                </h3>
                <p className="paragraph">
                  Extend your bots to handle new cases by creating a dynamic response by writing a function in programming language of your choice.
                </p>
              </div>
              <div className="col-4">
                <h3 className="subheading">
                  Botlink - Bot Referrals
                </h3>
                <p className="paragraph">
                  Link to other bots to handle different or new use cases and get paid for these referrals.
                </p>
              </div>
            </div>
          </div>
        </div>
    )
}