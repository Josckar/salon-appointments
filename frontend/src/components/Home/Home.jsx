import React from 'react';
import Intro from './Intro/Intro';
import Services from './Services/Services';
import Schedule from './Schedule/Schedule';

import './Home.css';

const Home = () => {
    return (
        <div>
            <Intro/>
            <Services/>
            <Schedule/>      
        </div>
    );
};

export default Home;
