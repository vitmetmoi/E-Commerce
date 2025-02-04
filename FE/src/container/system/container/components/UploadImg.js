import React from 'react';
import './UploadImg.scss';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function UploadImg(props) {
    return (
        <div className='upload-img-container'>
            <PhotoProvider>
                <PhotoView src={`${props && props.prevImg && props.prevImg !== '' ? props.prevImg : (props && props.imgArray && props.imgArray[0])}`}>
                    <div
                        style={{ backgroundImage: "url('" + `${props && props.prevImg && props.prevImg !== '' ? props.prevImg : props && props.imgArray && props.imgArray[0]}` + "')" }}
                        className='prev-image'
                    ></div>
                </PhotoView>
            </PhotoProvider>

            <div className='img-swiper'>
                <Swiper
                    modules={[Navigation, A11y, Autoplay]}
                    spaceBetween={12}
                    slidesPerView={4}
                    navigation

                >
                    {
                        props && props.imgArray && props.imgArray.length > 0 && props.imgArray.map(item => {
                            let objURL = "";

                            return (
                                <SwiperSlide>
                                    <div
                                        onClick={() => props.handleSetPrevImg(item)}
                                        style={{ backgroundImage: "url('" + item + "')" }}
                                        className='relevant-img'>
                                    </div>
                                </SwiperSlide>)


                        })
                    }


                    <SwiperSlide>
                        <div className='add-new-img'>
                            <input
                                type='file'
                                className='img-input'
                                onChange={(event) => props.handleAddImage(event.target.files[0])}
                            >
                            </input>
                            <AddPhotoAlternateIcon
                                color='primary'
                                className='img-icon'
                            >
                            </AddPhotoAlternateIcon>


                        </div>
                    </SwiperSlide>
                </Swiper>

            </div>
        </div>
    );
}

export default UploadImg;