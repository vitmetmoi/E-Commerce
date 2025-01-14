import React from 'react';
import NavigationHome from './NavigationHome.js';
import HomeBanner from './section/HomeBanner';
import AdsHome from './AdsHome.js';
import TheNewDropSection from './section/TheNewDropSection.js';
import CollecSection from './section/CollectionSection.js';
import BestItemSection from './section/BestItemSection.js'
import './Home.scss'
function Home(props) {
    return (
        <>
            <div className='home-container col-12'>
                <AdsHome></AdsHome>
                <NavigationHome></NavigationHome>
                <HomeBanner></HomeBanner>
            </div>

            <div className='home-sections'>
                <div className='sections col-12 mt-5'>
                    <TheNewDropSection></TheNewDropSection>
                </div>
                <div className='secitons col-12 '>
                    <CollecSection></CollecSection>
                </div>
                <div className='secitons col-12'>
                    <BestItemSection></BestItemSection>
                </div>
            </div>

            <div className='first-about-container'>
            </div>
            <div className='second-about-container'>

            </div>
        </>
    );
}

export default Home;