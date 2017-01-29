import React from 'react';

import Navbar from '../navbar/Navbar';

class LearningPage extends React.Component{
    render(){
        return (
            <div>
                <Navbar active="learning_dashboard"/>
                <main>
                    <div className="container">
                        <h1>{this.props.params.botname}</h1>
                    </div>
                </main>
            </div>
        )
    }
}



export default LearningPage;