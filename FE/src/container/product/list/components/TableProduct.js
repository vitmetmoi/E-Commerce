import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useGetClothesDataMutation } from '../../../../store/slice/API/systemAPI';
import { useSearchParams } from 'react-router';
import './TableProduct.scss'
import ProductCard from '../../../home/section/components/ProductCard';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import { useLocation } from 'react-router-dom';
function TableProduct(props) {
    const location = useLocation();
    const [getClothesDataService, { data, isLoading }] = useGetClothesDataMutation()
    const [clothesData, setClothesData] = useState([])
    const [searchParams] = useSearchParams();
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 8
    });

    console.log('clothesData', clothesData)
    console.log('props', props)
    useEffect(() => {
        handleGetClothesData();
    }, [])

    useEffect(() => {
        handleGetClothesData();
    }, [location])

    useEffect(() => {
        if (isLoading === false && data && data.EC === 0 && data.DT) {
            setClothesData(data.DT)
        }
    }, [isLoading])

    useEffect(() => {
        handleGetClothesData();
    }, [pagination])

    useEffect(() => {
        if (props.onFilter) {
            handleGetClothesData();
        }
    }, [props.onFilter])

    const handleGetClothesData = async () => {

        let category = searchParams.get('category')
        let type = searchParams.get('type')
        let keyWord = searchParams.get('keyWord')
        if (category === 'TOP') {
            category = ['T-Shirt', 'Jacket', 'Hoodie', 'Sweater', 'Cardigan'];
        }
        else if (category === 'BOTTOM') {
            category = ['Long-Pants', 'Short', 'Skirt'];
        }
        else if (category === 'ACC') {
            category = ['Shoes', 'Hat', 'Backpack', 'Slides'];
        }
        else if (category === 'SHOES' || category === 'Shoes') {
            category = ['Slides', 'Shoes']
        }
        else if (category === 'ALL') {
            category = ''
        }

        if (type === 'WOMEN') {
            type = ['Women', 'Unisex']
        }
        if (type === 'MEN') {
            type = ['Men', 'Unisex']
        }

        await getClothesDataService({
            type: 'PAGINATION',
            page: pagination.page,
            pageSize: pagination.pageSize,
            color: props.color,
            size: props.size,
            priceRange: props.priceRange,
            clothesType: type ? type : '',
            category: category ? category : '',
            keyWord: keyWord
        });
    }

    const handleChangePagination = (event, value) => {
        setPagination({ page: value, pageSize: pagination.pageSize })
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
        <div className='table-product-container'>

            <div className='list-product'>
                {isLoading === true ?

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>{

                        [...Array(4)].map((x, i) => {
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
                        {clothesData && clothesData.data && clothesData.data.map(item => {
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
                                <>
                                    <ProductCard
                                        mainImage={item.RelevantImages[0].image}
                                        discount={item.Discounts[0].value}
                                        name={item.name}
                                        id={item.id}
                                        price={item.price}
                                        imageArr={swiperImg}
                                        colorArr={colorArr}
                                        isInList={true}
                                    ></ProductCard>
                                </>
                            )
                        })}
                    </>
                }

            </div>


            <div className='pagination-page'>
                {clothesData &&
                    <Pagination
                        showFirstButton
                        showLastButton
                        size='large'
                        count={Math.round(clothesData.rowCount / pagination.pageSize)}
                        defaultPage={1}
                        page={pagination.page}
                        onChange={handleChangePagination}
                        shape="rounded" />
                }
            </div>

        </div>
    );
}

export default TableProduct;