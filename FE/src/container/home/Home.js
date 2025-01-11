import React from 'react';
import NavigationHome from './NavigationHome.js';
import HomeBanner from './section/HomeBanner';
import AdsHome from './AdsHome.js';
import TheNewDropSection from './section/TheNewDropSection.js';
function Home(props) {
    return (
        <>
            <div className='home-container col-12'>

                <AdsHome></AdsHome>
                <NavigationHome></NavigationHome>
                <HomeBanner></HomeBanner>
            </div>
            <div className='home-sections col-12 mt-5'>
                <TheNewDropSection></TheNewDropSection>
            </div>
        </>
    );
}

export default Home;