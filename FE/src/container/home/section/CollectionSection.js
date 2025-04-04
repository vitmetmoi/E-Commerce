import React from 'react';
import './CollectionSection.scss';
import index, { TYPE } from '../../../utils/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LazyLoad from 'react-lazyload';
import { useNavigate } from 'react-router';

function CollectionSection(props) {
    const [checked, setChecked] = React.useState(false);
    const navigate = useNavigate();

    const handleOnClickList = (type, category) => {
        navigate(`/list?type=${type}&category=${category}`);
        window.location.reload();
    }

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div className='collection-container'>

            <Swiper
                modules={[A11y]}
                spaceBetween={30}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}

            >

                <SwiperSlide>
                    <div
                        onClick={() => handleOnClickList('MEN', 'ALL')}
                        className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/33081C47-32A3-4B84-8B46-0C12A2FBCD44.jpg?v=1696244546&width=1800" + ")" }}>
                        <div className='text-group'>
                            <span className='header-text'>MEN COLLECTION</span>
                            <span className='content-text'>Wearable items that anyone can wear</span>
                            <span className='bottom-text'>SHOP</span>
                        </div>
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div
                        onClick={() => handleOnClickList('WOMEN', 'ALL')}
                        className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/6_5f677c63-9c3d-425d-99fd-d53b8aaf6a72.jpg?v=1734677787&width=1800" + ")" }}>
                        <div className='text-group'>
                            <span className='header-text'>WOMEN COLLECTION</span>
                            <span className='content-text'>Add casual charm to a trendy design</span>
                            <span className='bottom-text'>SHOP</span>
                        </div>
                    </div>
                </SwiperSlide>




                <SwiperSlide>
                    <div
                        onClick={() => handleOnClickList('Unisex', 'ACC')}
                        className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/1.jpg?v=1722845591&width=1800" + ")" }}>
                        <div className='text-group'>
                            <span className='header-text'>ACC</span>
                            <span className='content-text'>Add some klitsch to your outfit</span>
                            <span className='bottom-text'>SHOP</span>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>






        </div >
    );
    return (
        <>
            <LazyLoad height={200} once >
                <div className='collection-container'>

                    <Grow in={true}>

                        <div className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/33081C47-32A3-4B84-8B46-0C12A2FBCD44.jpg?v=1696244546&width=1800" + ")" }}>
                            <div className='text-group'>
                                <span className='header-text'>MEN COLLECTION</span>
                                <span className='content-text'>Wearable items that anyone can wear</span>
                                <span className='bottom-text'>SHOP</span>
                            </div>
                        </div>

                    </Grow>
                    <Grow
                        in={true}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1300 } : {})}
                    >
                        <div className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/6_5f677c63-9c3d-425d-99fd-d53b8aaf6a72.jpg?v=1734677787&width=1800" + ")" }}>
                            <div className='text-group'>
                                <span className='header-text'>WOMEN COLLECTION</span>
                                <span className='content-text'>Add casual charm to a trendy design</span>
                                <span className='bottom-text'>SHOP</span>
                            </div>
                        </div>
                    </Grow>

                    {/* Conditionally applies the timeout prop to change the entry speed. */}
                    <Grow
                        in={true}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 2300 } : {})}
                    >
                        <div className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/1.jpg?v=1722845591&width=1800" + ")" }}>
                            <div className='text-group'>
                                <span className='header-text'>ACC</span>
                                <span className='content-text'>Add some klitsch to your outfit</span>
                                <span className='bottom-text'>SHOP</span>
                            </div>
                        </div>
                    </Grow>
                </div>
            </LazyLoad>
        </>
    )

}

export default CollectionSection;