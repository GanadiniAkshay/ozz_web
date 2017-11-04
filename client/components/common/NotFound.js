import React from 'react';
import { browserHistory, Link } from 'react-router';

class NotFound extends React.Component{
    render(){
        document.body.style.backgroundColor = 'black';
        return (
            <div className="not_found_backgorund">
                <h1 style={{"textAlign":"center","color":"white"}}>404</h1>
                <div style={{"textAlign":"center","color":"white","float":"right","marginRight":"4%","marginTop":"10%"}}>
                    <h5>Even our superhero couldn't find the page.</h5>
                    <br/>
                    Go back to <Link to="/">home</Link>
                </div>
            </div>
        )
    }
}

export default NotFound;