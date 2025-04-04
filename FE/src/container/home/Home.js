import React, { useEffect } from 'react';
import NavigationHome from './NavigationHome.js';
import HomeBanner from './section/HomeBanner';
import AdsHome from './AdsHome.js';
import TheNewDropSection from './section/TheNewDropSection.js';
import CollecSection from './section/CollectionSection.js';
import BestItemSection from './section/BestItemSection.js';
import FirstAboutSection from './section/FirstAboutSection.js';
import SecondAboutSection from './section/SecondAboutSection.js';
import Footer from './Footer.js';
import './Home.scss'
import ChatSupport from './complication/ChatSupport.js';


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
                    <div className='title-1'>The New Drop</div>
                    <TheNewDropSection
                        slicePerView1={1}
                        slicePerView2={3}
                        slicePerView3={5}
                    ></TheNewDropSection>
                </div>
                <div className='secitons col-12 '>
                    <CollecSection></CollecSection>
                </div>
                <div className='secitons col-12'>
                    <BestItemSection
                        slicePerView1={1}
                        slicePerView2={3}
                        slicePerView3={5}
                    ></BestItemSection>
                </div>
            </div>

            <div className='first-about-container'>
                <FirstAboutSection></FirstAboutSection>
            </div>
            <div className='second-about-container'>
                <SecondAboutSection></SecondAboutSection>
            </div>

            <Footer></Footer>

            <div className=''>
                <ChatSupport></ChatSupport>
            </div>

        </>
    );
}

export default Home;