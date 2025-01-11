import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './AdsHome.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

function AdsHome(props) {
    return (
        <div className='ads-container'>
            <Swiper
                direction={'vertical'}
                modules={[Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="mySwiper"
            >
                <SwiperSlide>115 Wardour Street Soho London, W1F 0UN United Kingdom</SwiperSlide>
                <SwiperSlide>"An attitude, a lifestyle and the way to express yourself"</SwiperSlide>
                <SwiperSlide>~ Happy 15th holiday ~</SwiperSlide>
                <SwiperSlide>Stussy x WHO.AU x AFGK </SwiperSlide>
                <SwiperSlide>Discount 15% all accessory items!</SwiperSlide>
            </Swiper>
        </div>
    );
}

export default AdsHome;