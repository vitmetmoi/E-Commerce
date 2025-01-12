import React from 'react';
import './ProductCard.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

function ProductCard(props) {
    return (
        <div className='product-card-container'>
            <div className='content-top'>

                <div
                    style={{ backgroundImage: "url(" + `https://cafe24.poxo.com/ec01/whoaukr/p1p7L96QYgpvk7KwZPVnP5cEfrFcGc5MyqaBC8AvzxS2n0w3odzprmZjCtz9mWqtuQgo4heOnmBk9oXP9ZZcSA==/_/web/product/medium/202501/ecc445f768b75a186df24fe1ee31d8dd.jpg` + ")", }}
                    className='main-img'
                >
                </div>
                <div className='relevant-img-swiper'>
                    <Swiper
                        modules={[Navigation, A11y, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                    >
                        <SwiperSlide>
                            <div style={{ backgroundImage: "url(" + `https://cafe24.poxo.com/ec01/whoaukr/p1p7L96QYgpvk7KwZPVnP5cEfrFcGc5MyqaBC8AvzxS2n0w3odzprmZjCtz9mWqtuQgo4heOnmBk9oXP9ZZcSA==/_/web/product/extra/big/202412/87496334b7dc7a8af96ccc29c342ebf6.jpg` + ")", }}
                                className='relevant-img'>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div style={{ backgroundImage: "url(" + `https://cafe24.poxo.com/ec01/whoaukr/p1p7L96QYgpvk7KwZPVnP5cEfrFcGc5MyqaBC8AvzxS2n0w3odzprmZjCtz9mWqtuQgo4heOnmBk9oXP9ZZcSA==/_/web/product/extra/big/202412/589909a02d5dd0ec1a5e9a24a14b3635.jpg` + ")", }}
                                className='relevant-img'>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div style={{ backgroundImage: "url(" + `https://cafe24.poxo.com/ec01/whoaukr/p1p7L96QYgpvk7KwZPVnP5cEfrFcGc5MyqaBC8AvzxS2n0w3odzprmZjCtz9mWqtuQgo4heOnmBk9oXP9ZZcSA==/_/web/product/extra/big/202412/9ec1d015dcf6c67a90662cc49bb92164.jpg` + ")", }}
                                className='relevant-img'>

                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className='group-color'>
                    <div className='color'></div>
                    <div className='color'></div>
                    <div className='color'></div>
                </div>

            </div>
            <div className='content-bottom'>
                <span className='name-product'>[WAU X SQUID GAME] ○△□ Graphic T-Shirt</span>
                <div className='price-inf'>
                    <span className='discount'>5%</span>
                    <span className='price'>28,400</span>
                    <span className='primary-price'>29,900</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;