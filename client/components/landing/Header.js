import React from 'react';
import { Link } from 'react-router'; 

export default () => {
    return (
        <header className="header">
            <div className="container-lrg">
                <div className="col-12 spread">
                    <div>
                        <Link className="logo" to="/"> 
                            OZZ.ai
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
                    <h2 className="paragraph ">
                        Automated Testing<div>Smart Analytics</div><div>Continuous Learning</div>
                    </h2>
                    <div className="ctas">
                        <Link className="ctas-button" to="/signup">
                            Sign Up
                        </Link>
                    </div>
                </div>
                <div className="col-6 sidedevices">
                    <div className="computerwrapper">
                        <div className="computer">
                            <div className="mask">
                                <img className="mask-img" src="img/main.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}