import React from 'react';
import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-solid-svg-icons'
function Footer(props) {
    return (
        <>
            <div className='footer-container'>
                <div className='footer-content'>

                    <div className='content-top'>

                        <div className='text-left'>
                            <span className='link'>BRAND</span>
                            <span className='link'>EVENT</span>
                            <span className='link'>REVIEW</span>
                            <span className='link'>MEMBERSHIP</span>
                            <span className='link'>STORE</span>
                        </div>

                        <div className='text-right'>
                            <span className='link'>Terms of Use</span>
                            <span className='link'>privacy policy</span>
                            <span className='link'>Frequently Asked Questions</span>
                            <span className='link'>1:1 inquiry</span>
                        </div>
                    </div>

                    <div className='content-center'>
                        <span className='text'>Customer Center: 1670-9620 </span><span className='border-right'></span>
                        <span className='text'>e-mail : whoau@eland.co.kr </span> <span className='border-right'></span>
                        <span className='text'> Operating hours: 10:00 ~ 17:00 (Lunch 12:00 ~ 13:00 / Closed on weekends and public holidays)</span><br></br>
                        <span className='text'>E-Land World Fashion Division</span><span className='border-right'></span>
                        <span className='text'> Business Registration Number: 113-85-19030</span><span className='border-right'></span>
                        <span className='text'>Mail order business report: No. 2005-01053 [Business information confirmation]</span><br></br>
                        <span className='text'>CEO: Dong-ju Jo</span><span className='border-right'></span>
                        <span className='text'>Address: E-Land Gasan-dong Building, 159 Gasan Digital 1-ro, Geumcheon-gu, Seoul (Gasan-dong)</span><span className='border-right'></span>
                        <span className='text'> Personal Information Manager: Dong-ju Jo</span>
                    </div>

                    <div className='content-bottom'>
                        <div className='text-left'>Copyright by Obisidian All Right Reserved. Designed by Bao Duy</div>
                        <div className='text-right'>
                            <div>icon</div>
                            <div>icon</div>
                            <div>icon</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Footer;