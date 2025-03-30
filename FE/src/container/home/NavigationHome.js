import React, { useEffect, useState } from 'react';
import './NavigationHome.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import './AdsHome.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';


function NavigationHome(props) {
    const shoppingCartData = useSelector((state) => state.shoppingCart.shoppingCart);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [navClass, setNavClass] = useState('nav-sticky');
    const navigate = useNavigate();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const handleScroll = () => {
        const position = window.pageYOffset;
        if (position > 0) {
            setNavClass('nav-fixed')
        }
        else if (position === 0) {
            setNavClass('nav-sticky')
        }
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOnclickLogin = () => {
        navigate('/user/profile');
    }

    const handleOnClickList = (type, category) => {
        navigate(`/list?type=${type}&category=${category}`);
        window.location.reload();
    }

    const handleOnclickLogo = () => [
        navigate('/')
    ]

    return (
        <div className='home-nav-container col-12'>
            <nav className={navClass}>
                <div class="wrapper">

                    <div className='content-left'>
                        <div
                            onClick={() => handleOnclickLogo()}
                            className='logo-container'>
                            <Swiper
                                direction={'vertical'}
                                modules={[Autoplay]}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                className="mySwiper"
                                loop={true}
                            >
                                <SwiperSlide><div className="logo" style={{ backgroundImage: "url(" + "https://www.elleman.vn/wp-content/uploads/2018/09/11/logo-thuong-hieu-stussy-3-elle-man.jpg" + ")" }}></div></SwiperSlide>
                                <SwiperSlide><div className="logo" style={{ backgroundSize: '95%', backgroundImage: "url(" + "https://pbs.twimg.com/profile_images/509047538691743744/brOoco8P_400x400.png" + ")" }}></div></SwiperSlide>
                                <SwiperSlide><div className="logo" style={{ backgroundImage: "url(" + "https://wellbredstore.com/wp-content/uploads/2021/06/A-FEW-GOOD-KIDS-1200-X-630.jpg" + ")" }}></div></SwiperSlide>

                            </Swiper>
                        </div>

                        <ul class="nav-links ms-4">
                            <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
                            <li><a className='hightlight-item' href="#">NEW COLLECTION</a></li>
                            <li><a className='hightlight-item' href="#">SEASON OFF</a></li>

                            <li className='women'>
                                <a href="#" class="desktop-item normal-item">WOMEN</a>

                                <div class="mega-box">
                                    <div className='content'>
                                        <div className='content-left'>
                                            <div className='section section1'>
                                                <ul>
                                                    <li>Timeless Adventure</li>
                                                    <li>AFTER SCHOOL IN CALIFORNIA</li>
                                                    <li>DENIM 1849</li>
                                                </ul>
                                            </div>
                                            <div className='section section2'>
                                                <ul>
                                                    <li onClick={() => handleOnClickList('WOMEN', 'ALL')}>SHOP ALL</li>
                                                    <li onClick={() => handleOnClickList('WOMEN', 'BEST')}>BEST SELLER</li>
                                                    <li onClick={() => handleOnClickList('WOMEN', 'TOP')}>TOP</li>
                                                    <li onClick={() => handleOnClickList('WOMEN', 'BOTTOM')}>BOTTOM</li>
                                                    <li onClick={() => handleOnClickList('WOMEN', 'SLIDES')}>SLIDES</li>
                                                </ul>

                                            </div>
                                        </div>
                                        <div className='content-right'>
                                            <div className='img img1'>
                                                <div className='font-img'>Timeless Adventure</div>
                                            </div>
                                            <div className='img img2'>
                                                <div className='font-img'>AFTER SCHOOL IN CALIFORNIA</div>
                                            </div>
                                            <div className='img img3'>
                                                <div className='font-img'>DENIM 1849</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='men'>
                                <a href="#" class="desktop-item normal-item">MEN</a>

                                <div class="mega-box">
                                    <div className='content'>
                                        <div className='content-left'>
                                            <div className='section section1'>
                                                <ul>
                                                    <li>Timeless Adventure</li>
                                                    <li>AFTER SCHOOL IN CALIFORNIA</li>
                                                    <li>DENIM 1849</li>
                                                </ul>
                                            </div>
                                            <div className='section section2'>
                                                <ul>
                                                    <li onClick={() => handleOnClickList('MEN', 'ALL')}>SHOP ALL</li>
                                                    <li onClick={() => handleOnClickList('MEN', 'BEST')}>BEST SELLER</li>
                                                    <li onClick={() => handleOnClickList('MEN', 'TOP')}>TOP</li>
                                                    <li onClick={() => handleOnClickList('MEN', 'BOTTOM')}>BOTTOM</li>
                                                    <li onClick={() => handleOnClickList('MEN', 'SLIDES')}>SLIDES</li>
                                                </ul>

                                            </div>
                                        </div>
                                        <div className='content-right'>
                                            <div className='img img1'>
                                                <div className='font-img'>Timeless Adventure</div>
                                            </div>
                                            <div className='img img2'>
                                                <div className='font-img'>AFTER SCHOOL IN CALIFORNIA</div>
                                            </div>
                                            <div className='img img3'>
                                                <div className='font-img'>DENIM 1849</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className='acc'>
                                <a href="#" class="desktop-item normal-item">ACC</a>

                                <div class="mega-box">
                                    <div className='content'>
                                        <div className='content-left'>
                                            <div className='section section1'>

                                            </div>
                                            <div className='section section2'>
                                                <ul>
                                                    <li onClick={() => handleOnClickList('WOMEN', 'ALL')}>SHOP ALL</li>
                                                    <li>BEST SELLER</li>
                                                    <li>HAT</li>
                                                    <li>CAP</li>
                                                    <li>BACKPACK</li>
                                                    <li>SLIDES</li>

                                                </ul>

                                            </div>
                                        </div>
                                        <div className='content-right'>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='lookbook'>
                                <a href="#" class="desktop-item normal-item">LOOKBOOK</a>

                                <div class="mega-box">
                                    <div className='content'>
                                        <div className='content-left'>
                                            <div className='section section1'>

                                            </div>
                                            <div className='section section2'>
                                                <ul>
                                                    <li>Timeless Adventure</li>
                                                    <li>AFTER SCHOOL IN CALIFORNIA</li>
                                                    <li>DENIM 1849</li>
                                                </ul>

                                            </div>
                                        </div>
                                        <div className='content-right'>
                                            <div className='img img1'>
                                                <div className='font-img'>Timeless Adventure</div>
                                            </div>
                                            <div className='img img2'>
                                                <div className='font-img'>AFTER SCHOOL IN CALIFORNIA</div>
                                            </div>
                                            <div className='img img3'>
                                                <div className='font-img'>DENIM 1849</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><a className='normal-item about'>ABOUT</a></li>
                            <li className='community'>
                                <a href="#" class="desktop-item normal-item">COMMUNITY</a>

                                <div class="mega-box">
                                    <div className='content'>
                                        <div className='content-left'>
                                            <div className='section section1'>

                                            </div>
                                            <div className='section section2'>
                                                <ul>
                                                    <li>Facebook</li>
                                                    <li>Github</li>
                                                    <li>Instagram</li>
                                                </ul>

                                            </div>
                                        </div>
                                        <div className='content-right'>
                                            <div className='img img-community'>
                                                <div className='font-img'></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><a className='normal-item magazine' >MAGAZINE</a></li>
                        </ul>
                    </div>


                    <div className='nav-icons'>

                        <Tooltip title="Account" arrow>
                            <svg
                                onClick={() => handleOnclickLogin()}
                                className='icon'
                                viewBox="0 0 177 177"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"><path d="M88.5 96C113.353 96 133.5 75.8528 133.5 51C133.5 26.1472 113.353 6 88.5 6C63.6472 6 43.5 26.1472 43.5 51C43.5 75.8528 63.6472 96 88.5 96Z" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path><path d="M6 171C6 129.54 27.9 96 73.5 96H103.5C149.09 96 171 129.54 171 171" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path>
                            </svg>

                        </Tooltip>
                        <Tooltip title="Save" arrow>
                            <svg
                                className='icon'
                                viewBox="0 0 147 180"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.63 5.63V170.63L73.13 140.63L140.63 170.63V5.63H5.63Z" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path>
                            </svg>
                        </Tooltip>
                        <Tooltip title="Search" arrow>
                            <svg
                                className='icon'
                                viewBox="0 0 179 179"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M73.5 141C110.779 141 141 110.779 141 73.5C141 36.2208 110.779 6 73.5 6C36.2208 6 6 36.2208 6 73.5C6 110.779 36.2208 141 73.5 141Z" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path><path d="M171 171L121.2 121.2" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path>
                            </svg>
                        </Tooltip>
                        <Tooltip title="Order" arrow>
                            <StyledBadge
                                onClick={() => { navigate('/order') }}
                                badgeContent={!_.isEmpty(shoppingCartData) && shoppingCartData[0] !== '' ? shoppingCartData.length : 0}
                                // style={{ backgroundColor: '#f06e00' }}
                                color='primary'
                                showZero>
                                <svg
                                    onClick={() => { navigate('/order') }}
                                    className='icon'
                                    viewBox="0 0 162 177"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"><path d="M156 171L148.5 51H13.5L6 171H156Z" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path><path d="M43.5 66V36C43.5 28.0435 46.6607 20.4129 52.2868 14.7868C57.9129 9.16071 65.5435 6 73.5 6H88.5C96.4565 6 104.087 9.16071 109.713 14.7868C115.339 20.4129 118.5 28.0435 118.5 36V66" stroke="#1A1A1A" stroke-width="11.25" stroke-miterlimit="10" stroke-linecap="square"></path>
                                </svg>
                            </StyledBadge>

                        </Tooltip>
                        <Tooltip title="System" arrow>

                            <AcUnitIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => { navigate('/system') }}
                            ></AcUnitIcon>

                        </Tooltip>
                    </div>


                </div>
            </nav >


        </div >
    );
}

export default NavigationHome;