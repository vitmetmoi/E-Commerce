import React from 'react';
import './ProductCard.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router';
function ProductCard(props) {
    let priceAfterDiscouted = 0;
    const navigate = useNavigate();

    if (props.price || props.discount || props.price) {
        priceAfterDiscouted = props.price - ((props.discount / 100) * props.price)
    }

    const handleOnclickProductCard = () => {
        navigate(`/product?id=${props.id}`)
    }

    return (
        <div className={props.isInList === true ? 'product-card-container in-list' : 'product-card-container'}>
            <div className='content-top'>

                <div
                    style={{ backgroundImage: "url(" + `${props.mainImage}` + ")", }}
                    className='main-img'
                >
                </div>
                <div className='relevant-img-swiper'>
                    <Swiper
                        modules={[Navigation, A11y, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                    >
                        {props.imageArr && props.imageArr.map(item => {
                            return (
                                <SwiperSlide>
                                    <div
                                        onClick={() => handleOnclickProductCard()}
                                        style={{ backgroundImage: "url(" + `${item}` + ")", }}
                                        className='relevant-img'>
                                    </div>
                                </SwiperSlide>
                            )

                        })}

                    </Swiper>
                </div>
                <div className='group-color'>
                    {props.colorArr && props.colorArr.map(item => {
                        return (
                            <div className='color' style={{ backgroundColor: `${item}` }}></div>
                        )
                    })}
                </div>

            </div>
            <div
                onClick={() => handleOnclickProductCard()}
                className='content-bottom noselect'>
                <div className='name-container'>
                    <span className={props.isInList === true ? 'name-product noselect in-list' : 'name-product noselect'}>{props.name}</span>
                    <div className='icon-save'><BookmarkBorderIcon></BookmarkBorderIcon></div>
                </div>
                <div className='price-inf noselect'>
                    <span className='discount noselect'>{props.discount}%</span>
                    <span className='price noselect'>{priceAfterDiscouted.toFixed(3)}$</span>
                    <span className='primary-price noselect'>{props.price}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;