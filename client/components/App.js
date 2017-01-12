import React from 'react';
import Header from './landing/Header';
import Features from './landing/Features';
import SocialProof from './landing/SocialProof';
import Footer from './landing/Footer';

class App extends React.Component {
    render(){
        document.body.style.backgroundColor = 'white';
        return (
            <div className="fluid-container">
                <Header />
                <Features/>
                <SocialProof />
                <Footer />
            </div>
        );
    }
}

export default App;