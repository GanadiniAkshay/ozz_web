import React from 'react';

export default () => {
    return (
        <header className="header">
            <div className="container-lrg">
                <div className="col-12 spread">
                    <div>
                        <a className="logo">
                            OZZ.ai
                        </a>
                    </div>
                    <div>
                        <a className="nav-link" href="#">
                            Twitter
                        </a>
                        <a className="nav-link" href="#">
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
            <div className="container-lrg flex">
                <div className="col-6 centervertical">
                    <h1 className="heading">
                        Make your Chatbots<div>Smarter</div>
                    </h1>
                    <h2 className="paragraph ">
                        Automated Testing<div>Smart Analytics</div><div>Continuous Learning</div>
                    </h2>
                    <div className="ctas">
                        <a className="ctas-button" href="">
                        Sign Up
                        </a>
                    </div>
                </div>
                <div className="col-6 sidedevices">
                    <div className="computerwrapper">
                        <div className="computer">
                            <div className="mask">
                                <img className="mask-img" src="img/webapp.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}