import React, { useEffect } from 'react';
import './TheNewDropSection.scss'
import ProductCard from './components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useLazyGetClothesQuery, useGetClothesQuery } from '../../../store/slice/API/systemAPI';
function TheNewDropSection(props) {
    const { data, isLoading } = useGetClothesQuery();
    const [getClothesService, { data: clothesData }] = useLazyGetClothesQuery()
    useEffect(() => {
        getClothes();
    }, [])

    const getClothes = async () => {
        console.log('test');
        let res = await getClothesService();
        console.log('res new', res)

    }

    useEffect(() => {
        console.log('new drop', data);
    }, [data])


    return (
        <div className='the-new-drop-container'>
            <div className='title'>The New Drop</div>
            <div className='section-clothes'>

                <Swiper
                    // install Swiper modules
                    modules={[A11y]}
                    // spaceBetween={20}
                    // slidesPerView={5}
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

export default TheNewDropSection;