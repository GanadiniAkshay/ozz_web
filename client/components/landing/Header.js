import React from 'react';
import { Link } from 'react-router'; 

export default () => {
    return (
        <header className="header">
            <div className="container-lrg">
                <div className="col-12 spread">
                    <div>
                        <Link className="logo" to="/">
                            <img src="/img/logo_white_full.png" alt="ozz_logo" height="80px"/> 
                        </Link>
                    </div>
                    <div>
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                        <Link className="nav-link" to="/signup">
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container-lrg flex">
                <div className="col-6 centervertical">
                    <h1 className="heading">
                        Make your Chatbots<div>Smarter</div>
                    </h1>
                    <h2 className="paragraph">
                        Use Continuous Learning to constanly improve your bot's NLP models
                    </h2>
                    <div className="ctas">
                        <Link className="ctas-button" to="/signup">
                            Get Started for Free
                        </Link>
                    </div>
                </div>
                <div className="col-6 sidedevices">
                    <div className="computerwrapper">
                        <div className="computer">
                            <div className="mask">
                                <img className="mask-img" src="img/demo.gif"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}