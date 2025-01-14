import React from 'react';
import './CollectionSection.scss';
import index, { TYPE } from '../../../utils/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
function CollectionSection(props) {
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
                    <div className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/6_5f677c63-9c3d-425d-99fd-d53b8aaf6a72.jpg?v=1734677787&width=1800" + ")" }}>
                        <div className='text-group'>
                            <span className='header-text'>WOMEN COLLECTION</span>
                            <span className='content-text'>Add casual charm to a trendy design</span>
                            <span className='bottom-text'>SHOP</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/33081C47-32A3-4B84-8B46-0C12A2FBCD44.jpg?v=1696244546&width=1800" + ")" }}>
                        <div className='text-group'>
                            <span className='header-text'>MEN COLLECTION</span>
                            <span className='content-text'>Wearable items that anyone can wear</span>
                            <span className='bottom-text'>SHOP</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='collection-card' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/1.jpg?v=1722845591&width=1800" + ")" }}>
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
}

export default CollectionSection;