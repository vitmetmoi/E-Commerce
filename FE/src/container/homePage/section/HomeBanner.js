import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
function HomeBanner(props) {
    return (
        <div>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
                <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
                <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
                <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
                <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
                <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
            </Swiper>
        </div>
    );
}

export default HomeBanner;