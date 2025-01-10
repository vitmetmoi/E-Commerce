import React from 'react';
import './NavigationHome.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
function NavigationHome(props) {
    return (
        <div className='home-nav-container col-12'>
            <nav className=''>
                <div class="wrapper">
                    <div className="logo"></div>

                    <ul class="nav-links ms-4">
                        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
                        <li><a className='hightlight-item' href="#">NEW COLLECTION</a></li>
                        <li><a className='hightlight-item' href="#">SEASON OFF</a></li>

                        <li className='women'>
                            <a href="#" class="desktop-item normal-item">WOMEN</a>
                            <input type="checkbox" id="showMega"></input>
                            <label for="showMega" class="mobile-item">Mega Menu</label>
                            <div class="mega-box">
                                <div class="content">
                                    <div class="row">
                                        <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt=""></img>
                                    </div>
                                    <div class="row">
                                        <header>Design Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Graphics</a></li>
                                            <li><a href="#">Vectors</a></li>
                                            <li><a href="#">Business cards</a></li>
                                            <li><a href="#">Custom logo</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Email Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Personal Email</a></li>
                                            <li><a href="#">Business Email</a></li>
                                            <li><a href="#">Mobile Email</a></li>
                                            <li><a href="#">Web Marketing</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Security services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Site Seal</a></li>
                                            <li><a href="#">VPS Hosting</a></li>
                                            <li><a href="#">Privacy Seal</a></li>
                                            <li><a href="#">Website design</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className='men'>
                            <a href="#" class="desktop-item normal-item">MEN</a>
                            <input type="checkbox" id="showMega"></input>
                            <label for="showMega" class="mobile-item">Mega Menu</label>
                            <div class="mega-box">
                                <div class="content">
                                    <div class="row">
                                        <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt=""></img>
                                    </div>
                                    <div class="row">
                                        <header>Design Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Graphics</a></li>
                                            <li><a href="#">Vectors</a></li>
                                            <li><a href="#">Business cards</a></li>
                                            <li><a href="#">Custom logo</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Email Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Personal Email</a></li>
                                            <li><a href="#">Business Email</a></li>
                                            <li><a href="#">Mobile Email</a></li>
                                            <li><a href="#">Web Marketing</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Security services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Site Seal</a></li>
                                            <li><a href="#">VPS Hosting</a></li>
                                            <li><a href="#">Privacy Seal</a></li>
                                            <li><a href="#">Website design</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className='acc'>
                            <a href="#" class="desktop-item normal-item">ACC</a>
                            <input type="checkbox" id="showMega"></input>
                            <label for="showMega" class="mobile-item">Mega Menu</label>
                            <div class="mega-box">
                                <div class="content">
                                    <div class="row">
                                        <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt=""></img>
                                    </div>
                                    <div class="row">
                                        <header>Design Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Graphics</a></li>
                                            <li><a href="#">Vectors</a></li>
                                            <li><a href="#">Business cards</a></li>
                                            <li><a href="#">Custom logo</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Email Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Personal Email</a></li>
                                            <li><a href="#">Business Email</a></li>
                                            <li><a href="#">Mobile Email</a></li>
                                            <li><a href="#">Web Marketing</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Security services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Site Seal</a></li>
                                            <li><a href="#">VPS Hosting</a></li>
                                            <li><a href="#">Privacy Seal</a></li>
                                            <li><a href="#">Website design</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className='lookbook'>
                            <a href="#" class="desktop-item normal-item">LOOKBOOK</a>
                            <input type="checkbox" id="showMega"></input>
                            <label for="showMega" class="mobile-item">Mega Menu</label>
                            <div class="mega-box">
                                <div class="content">
                                    <div class="row">
                                        <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt=""></img>
                                    </div>
                                    <div class="row">
                                        <header>Design Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Graphics</a></li>
                                            <li><a href="#">Vectors</a></li>
                                            <li><a href="#">Business cards</a></li>
                                            <li><a href="#">Custom logo</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Email Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Personal Email</a></li>
                                            <li><a href="#">Business Email</a></li>
                                            <li><a href="#">Mobile Email</a></li>
                                            <li><a href="#">Web Marketing</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Security services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Site Seal</a></li>
                                            <li><a href="#">VPS Hosting</a></li>
                                            <li><a href="#">Privacy Seal</a></li>
                                            <li><a href="#">Website design</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li><a className='normal-item about' href="#">ABOUT</a></li>
                        <li>
                            <a href="#" class="desktop-item normal-item">COMMUNITY</a>
                            <input type="checkbox" id="showMega"></input>
                            <label for="showMega" class="mobile-item">Mega Menu</label>
                            <div class="mega-box">
                                <div class="content">
                                    <div class="row">
                                        <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt=""></img>
                                    </div>
                                    <div class="row">
                                        <header>Design Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Graphics</a></li>
                                            <li><a href="#">Vectors</a></li>
                                            <li><a href="#">Business cards</a></li>
                                            <li><a href="#">Custom logo</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Email Services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Personal Email</a></li>
                                            <li><a href="#">Business Email</a></li>
                                            <li><a href="#">Mobile Email</a></li>
                                            <li><a href="#">Web Marketing</a></li>
                                        </ul>
                                    </div>
                                    <div class="row">
                                        <header>Security services</header>
                                        <ul class="mega-links">
                                            <li><a href="#">Site Seal</a></li>
                                            <li><a href="#">VPS Hosting</a></li>
                                            <li><a href="#">Privacy Seal</a></li>
                                            <li><a href="#">Website design</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li><a className='normal-item magazine' href="#">MAGAZINE</a></li>
                    </ul>

                    <div className='nav-icons'>
                        {/* <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> */}
                        <svg
                            className='icon'
                            viewBox="0 0 177 177"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"><path d="M88.5 96C113.353 96 133.5 75.8528 133.5 51C133.5 26.1472 113.353 6 88.5 6C63.6472 6 43.5 26.1472 43.5 51C43.5 75.8528 63.6472 96 88.5 96Z" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path><path d="M6 171C6 129.54 27.9 96 73.5 96H103.5C149.09 96 171 129.54 171 171" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path></svg>
                        <svg
                            className='icon'
                            viewBox="0 0 147 180"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.63 5.63V170.63L73.13 140.63L140.63 170.63V5.63H5.63Z" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path>
                        </svg>
                        <svg
                            className='icon'
                            viewBox="0 0 179 179"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M73.5 141C110.779 141 141 110.779 141 73.5C141 36.2208 110.779 6 73.5 6C36.2208 6 6 36.2208 6 73.5C6 110.779 36.2208 141 73.5 141Z" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path><path d="M171 171L121.2 121.2" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path>
                        </svg>
                        <svg
                            className='icon'
                            viewBox="0 0 162 177"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"><path d="M156 171L148.5 51H13.5L6 171H156Z" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path><path d="M43.5 66V36C43.5 28.0435 46.6607 20.4129 52.2868 14.7868C57.9129 9.16071 65.5435 6 73.5 6H88.5C96.4565 6 104.087 9.16071 109.713 14.7868C115.339 20.4129 118.5 28.0435 118.5 36V66" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path>
                        </svg>
                    </div>
                </div>
            </nav>


        </div>
    );
}

export default NavigationHome;