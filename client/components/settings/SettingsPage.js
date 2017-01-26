import React from 'react';

import Navbar from '../home/Navbar';

class LearningSettingsPage extends React.Component{
    render(){
        return (
            <div>
                <Navbar active="settings_none"/>
                <main>
                    <div className="container">
                        <h1>{this.props.params.botname}</h1>
                    </div>
                </main>
            </div>
        )
    }
}



export default LearningSettingsPage;