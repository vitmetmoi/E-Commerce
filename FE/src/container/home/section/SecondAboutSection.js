import React from 'react';
import './SecondAboutSection.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro, faLocationDot } from '@fortawesome/free-solid-svg-icons'
function SecondAboutSection(props) {
    return (
        <>
            <div className='group-info-card'>
                <div className='info-card info-border'>
                    <div className="logo" style={{ backgroundImage: "url(" + "https://wellbredstore.com/wp-content/uploads/2021/06/A-FEW-GOOD-KIDS-1200-X-630.jpg" + ")" }}></div>
                    <div className='text-group'>
                        <span className='text-1'>My AFGK STORY</span>
                        <span className='text-2'>The Heritage Of WHO.A.U Is Based On The Pioneering Spirit Of California In 1849</span>
                        <span className='text-3'>DISCOVER</span>
                    </div>
                </div>

                <div className='info-card info-border'>
                    <div className='info-icon'><FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon></div>
                    <div className='text-group'>
                        <span className='text-1'>APP DOWNLOAD</span>
                        <span className='text-2'>Enjoy benefits from the official mall more easily through the mobile app.</span>
                        <span className='text-3'>DOWNLOAD</span>
                    </div>
                </div>

                <div className='info-card'>
                    <div className='info-icon'><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon></div>
                    <div className='text-group'>
                        <span className='text-1'>OFFLINE STORE</span>
                        <span className='text-2'>Check offline stores near your area and get WHO.A.U products faster.</span>
                        <span className='text-3'>SEE MORE</span>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SecondAboutSection;