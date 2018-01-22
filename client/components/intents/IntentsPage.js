import React from 'react';
import moment from 'moment';
import axios from 'axios';

import Navbar from '../navbar/Navbar';
import FolderTable from './FolderTable';

class IntentsPage extends React.Component{
    render(){
        return (
            <div className="full">
                <Navbar active="settings_none"/>
                <main>
                    <FolderTable/>
                </main>
            </div>
        )
    }
}

export default IntentsPage;