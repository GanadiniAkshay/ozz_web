import React from 'react';
import { Link } from 'react-router'; 

// The image files referred will link to v0.0.1 always as image is not something that is going to change

export default () => {
    return (
        <header className="header">
            <div className="container-lrg">
                <div className="col-12 spread">
                    <div>
                        <Link className="logo" to="/">
                            Ozz
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
                        Add self learning cabability to your bot in under 5 minutes without writing a single line of code.
                    </h2>
                    <div className="ctas">
                        <Link className="ctas-button" to="/signup">
                            Get Started for Free
                        </Link>
                    </div>
                </div>

                
                <div className="col-6 sidedevices">
                   <img width="100%" style={{"marginLeft":"25%"}} src="https://d1wi3kcd7kachl.cloudfront.net/v0.6.10/img/robot.jpg"/>
                </div>
            </div>
        </header>
    )
}