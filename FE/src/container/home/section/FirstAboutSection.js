import React from 'react';
import './FirstAboutSection.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useNavigate } from 'react-router';

function FirstAboutSection(props) {
    const navigate = useNavigate();

    const handleOnClickList = (type, category) => {
        navigate(`/list?type=${type}&category=${category}`);
        window.location.reload();
    }

    return (
        <>
            <div className='about-title'>CALIFORNIA SPIRIT</div>
            <div className='about-content'>

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
                            className='about-card'>
                            <div className='top-content' style={{ backgroundImage: "url(" + "https://doncare-club.com/cdn/shop/files/1_0000709f-33fc-4d84-a236-37557efc6bac.jpg?v=1724132780&width=1080" + ")" }}></div>
                            <div className='bottom-content'>
                                <span className='text-1'>Benefit by member level</span>
                                <span className='text-2'>SEE MORE</span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            onClick={() => handleOnClickList('WOMEN', 'ALL')}
                            className='about-card'>
                            <div className='top-content' style={{ backgroundImage: "url(" + "https://whoau.com/web/upload/NNEditor/20240919/ed4dc178b5fe374ddf162c0a1c4ff7d9.jpg" + ")" }}></div>
                            <div className='bottom-content'>
                                <span className='text-1'>What's new on Doncare</span>
                                <span className='text-2'>SEE MORE</span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            onClick={() => handleOnClickList('ALL', 'CATEGORY')}
                            className='about-card'>
                            <div className='top-content' style={{ backgroundImage: "url(" + "https://whoau.com/web/upload/NNEditor/20240715/1fd22e3a30a001ebaec1ef87c0a313ff.jpg" + ")" }}></div>
                            <div className='bottom-content'>
                                <span className='text-1'>Best review of the month</span>
                                <span className='text-2'>SEE MORE</span>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>



            </div>
        </>
    );
}

export default FirstAboutSection;