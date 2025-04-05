import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './HomeBanner.scss'
function HomeBanner(props) {
    return (
        <div className='home-banner-container'>
            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
            // autoplay={{
            //     delay: 5000,
            //     disableOnInteraction: false,
            // }}
            >

                <SwiperSlide>
                    <div style={{ backgroundImage: "url(" + `https://whoau.com/web/upload/NNEditor/20241004/604bb55812ce7bc39c36914a09b23e6d.jpg` + ")", }}
                        className='banner-cover'>
                        <span className='text-1'>Timeless Adventure</span>
                        <span className='text-2'>Endless Comfort in Every Moment</span>
                        <span className='text-3'>SHOP</span>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: "url(" + `https://culltique.in/cdn/shop/files/posterdesignmockup-2-26_0bf8b966-c4c2-4af9-aae1-fbf889a0449a.jpg?v=1715892315&width=1946` + ")", }}
                        className='banner-cover'>
                        <span className='text-1'>Tell Your Own Story</span>
                        <span className='text-2'>Stussy Spirit</span>
                        <span className='text-3'>SHOP</span>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ backgroundImage: "url(" + `https://whoau.com/web/upload/NNEditor/20241016/8427f4c98cc4bf7892f7760ce4d3101f.jpg` + ")", }}
                        className='banner-cover'>
                        <span className='text-1'>Warmth in every outer</span>
                        <span className='text-2'>Just wear it</span>
                        <span className='text-3'>SHOP</span>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        backgroundPositionY: "15%",
                        backgroundImage: "url(" + `https://doncare-club.com/cdn/shop/files/5_68cd7cdf-4b4b-4dbe-bcc8-f9d7526c85e1.jpg?v=1734677425&width=2400` + ")",
                    }}
                        className='banner-cover'>
                        <span className='text-1'>AFGK X TOMBONIA</span>
                        <span className='text-2'>Puppy Friends</span>
                        <span className='text-3'>Explore The Collection</span>
                    </div>

                </SwiperSlide>

                <SwiperSlide>
                    <div style={{ backgroundImage: "url(" + `https://whoau.com/web/upload/NNEditor/20241212/726a0d37ac5396aa741713f389c6371a.jpg` + ")", }}
                        className='banner-cover'>

                    </div>
                </SwiperSlide>

            </Swiper>
        </div >
    );
}

export default HomeBanner;