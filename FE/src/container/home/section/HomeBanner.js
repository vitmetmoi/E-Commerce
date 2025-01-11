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
                modules={[Navigation, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
            // loop={true}

            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false,
            // }}
            >
                <SwiperSlide><img src="https://whoau.com/web/upload/NNEditor/20241212/726a0d37ac5396aa741713f389c6371a.jpg"></img></SwiperSlide>
                <SwiperSlide><img src="https://culltique.in/cdn/shop/files/posterdesignmockup-2-26_0bf8b966-c4c2-4af9-aae1-fbf889a0449a.jpg?v=1715892315&width=1946"></img></SwiperSlide>
                <SwiperSlide><img src="https://whoau.com/web/upload/NNEditor/20241016/8427f4c98cc4bf7892f7760ce4d3101f.jpg"></img></SwiperSlide>
                <SwiperSlide><img src="https://cdn.mykiot.vn/2023/03/1678271046c0cc899a718902b1b84ff3d5571c1d48.jpg"></img></SwiperSlide>
                <SwiperSlide><img src="https://whoau.com/web/upload/NNEditor/20241004/604bb55812ce7bc39c36914a09b23e6d.jpg"></img></SwiperSlide>

                {/* <SwiperSlide>
                    <iframe width="100%" height="100%"
                        src="https://www.youtube.com/embed/GMAZpAKkFwA"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen></iframe>
                </SwiperSlide> */}

            </Swiper>
        </div>
    );
}

export default HomeBanner;