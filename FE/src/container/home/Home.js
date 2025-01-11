import React from 'react';
import NavigationHome from './NavigationHome.js';
import HomeBanner from './section/HomeBanner';
import AdsHome from './AdsHome.js';

function Home(props) {
    return (
        <div className='home-container col-12'>

            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>
            <HomeBanner></HomeBanner>

        </div>
    );
}

export default Home;