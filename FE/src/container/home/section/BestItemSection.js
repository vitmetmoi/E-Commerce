import React from 'react';
import './BestItemSection.scss'
import ProductCard from './components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
function BestItemSection(props) {
    return (
        <div className='best-item-container'>
            <div className='title'>BEST ITEM</div>
            <div className='section-clothes'>

                <Swiper
                    // install Swiper modules
                    modules={[A11y]}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}

                >
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard></ProductCard>
                    </SwiperSlide>
                </Swiper>

            </div>
        </div>
    );
}

export default BestItemSection;