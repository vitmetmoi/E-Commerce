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
import Skeleton from '@mui/material/Skeleton';
import { useSelector, useDispatch } from 'react-redux'
import { setClothesDataSlice } from '../../../store/slice/Reducer/systemSlice';
import _ from 'lodash'
function TheNewDropSection(props) {
    const dispatch = useDispatch()
    const [getClothesData, { data }] = useGetClothesDataMutation({ type: 'NEW', id: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const clothes = useSelector((state) => state.system.clothesData)
    const [clothesData, setClothesData] = useState('');

    console.log('clothesData', clothesData)

    useEffect(() => {

        getClothes();
        // setClothesData(clothes)
    }, [])


    const getClothes = async () => {
        let params = { type: 'NEW', id: 0 }
        let res = '';
        setIsLoading(true);
        res = await getClothesData(params);

        if (res && res.data && res.data.EC === 0) {
            setClothesData(res.data.DT)
            setIsLoading(false);
            dispatch(setClothesDataSlice(res.data.DT))
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

            <div className='section-clothes'>

                <Swiper
                    // install Swiper modules
                    modules={[A11y]}
                    // spaceBetween={20}
                    // slidesPerView={5}
                    breakpoints={{
                        640: {
                            slidesPerView: props.slicePerView1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: props.slicePerView2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: props.slicePerView3,
                            spaceBetween: 0,
                        },
                    }}

                >
                    {isLoading === true ?
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>{

                            [...Array(props.slicePerView3)].map((x, i) => {
                                return (
                                    <div className='skeleton-container'>
                                        <Skeleton variant="rectangular" width={'100%'} height={310} />
                                        <Skeleton height={40} />
                                        <Skeleton width="60%" height={40} />
                                    </div>
                                )
                            }

                            )

                        }


                        </div>
                        :
                        <>
                            {clothesData && clothesData.map(item => {
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
                                            id={item.id}
                                            price={item.price}
                                            imageArr={swiperImg}
                                            colorArr={colorArr}
                                        ></ProductCard>
                                    </SwiperSlide>
                                )
                            })}
                        </>
                    }



                </Swiper>

            </div>
        </div>
    );
}

export default TheNewDropSection;