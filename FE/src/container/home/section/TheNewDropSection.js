import React, { useEffect, useState } from 'react';
import './TheNewDropSection.scss'
import ProductCard from './components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useGetClothesDataMutation } from '../../../store/slice/API/systemAPI';
function TheNewDropSection(props) {

    const [getClothesData, {
        data,
        isFetching,
        isLoading,
    }] = useGetClothesDataMutation({ type: 'NEW', id: 0 });

    const [clothesData, setClothesData] = useState('');

    useEffect(() => {
        getClothes();
    }, [])

    const getClothes = async () => {
        let params = { type: 'NEW', id: 0 }
        let res = '';
        res = await getClothesData(params);
        console.log('res', res);
        if (res && res.data && res.data.EC === 0) {
            setClothesData(res.data.DT)
        }


    }

    const asignColor = (color) => {
        let colorRgb = '';
        if (color === 'White') {
            colorRgb = '#f5f5f5'
        }
        else if (color === 'Black') {
            colorRgb = '#424242';
        }
        else if (color === 'Yellow') {
            colorRgb = '#fff176';
        }
        else if (color === 'Red') {
            colorRgb = '#e53935';
        }
        else if (color === 'Blue') {
            colorRgb = '#35baf6';
        }
        else if (color === 'Green') {
            colorRgb = '#4caf50';
        }
        else if (color === 'Grey') {
            colorRgb = '#9e9e9e';
        }
        else if (color === 'Pink') {
            colorRgb = '#ed4b82'
        }
        else if (color === 'Beige') {
            colorRgb = '#fff0db'
        }
        else {
            colorRgb = '#f5f5f5'
        }
        return colorRgb;
    }


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
                    {clothesData && clothesData.map(item => {
                        console.log('item', item);
                        let swiperImg = [];
                        item.RelevantImages.map((item, index) => {
                            index !== 0 && swiperImg.push(item.image)
                        })
                        let colorArr = [];

                        item.Color_Sizes.map(item => {
                            let color = item.color;
                            let colorRgb = asignColor(color);
                            if (!colorArr.includes(colorRgb)) {
                                colorArr.push(colorRgb);
                            }

                        })
                        return (
                            <SwiperSlide>
                                <ProductCard
                                    mainImage={item.RelevantImages[0].image}
                                    discount={item.Discounts[0].value}
                                    name={item.name}
                                    price={item.price}
                                    imageArr={swiperImg}
                                    colorArr={colorArr}
                                ></ProductCard>
                            </SwiperSlide>
                        )
                    })}


                </Swiper>

            </div>
        </div>
    );
}

export default TheNewDropSection;