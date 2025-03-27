import React, { useEffect, useState } from 'react';
import './BestItemSection.scss'
import ProductCard from './components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useNavigate } from 'react-router';
import { useGetClothesDataMutation } from '../../../store/slice/API/systemAPI';
import Skeleton from '@mui/material/Skeleton';
import _ from 'lodash'
function BestItemSection(props) {

    let navigate = useNavigate();
    const defaultFormState = {
        clothesData: []
    }
    const [formState, setFormState] = useState(defaultFormState)
    const [getClothesDataService, { data, isLoading }] = useGetClothesDataMutation();

    console.log('formState', formState)

    useEffect(() => {
        handleGetClothes();
    }, [])

    useEffect(() => {
        if (isLoading === false && data) {
            handleOnChange('clothesData', data.DT)
        }
    }, [isLoading])

    const handleOnChange = (name, value) => {
        let _formState = _.cloneDeep(formState);
        _formState[name] = value;
        setFormState(_formState)
    }

    const handleGetClothes = async () => {
        await getClothesDataService({ type: 'BEST' })
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
                            {formState.clothesData && formState.clothesData.map(item => {
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

export default BestItemSection;