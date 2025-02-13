import React, { useEffect, useState } from 'react';
import './Product.scss';
import NavigationHome from '../home/NavigationHome';
import AdsHome from '../home/AdsHome';
import OrderSide from './components/OrderSide';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation, useSearchParams } from 'react-router';
import { useGetClothesDataMutation } from '../../store/slice/API/systemAPI';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import TheNewDropSection from '../home/section/TheNewDropSection';
import Footer from '../home/Footer';

function Product(props) {
    const [searchParams] = useSearchParams();
    const [getClothesService, { data, isLoading }] = useGetClothesDataMutation();
    const clothesData = useSelector((state) => state.system.clothesData);
    const [product, setProduct] = useState('');
    const [offset, setOffset] = useState(0);

    const [isReachedDesBar, setIsReachedDesBar] = useState(false);

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    useEffect(() => {

        if (offset <= 2340 || offset <= '2340') {
            console.log("off", offset)
            setIsReachedDesBar(false)
        }
        else {
            console.log("reached!")
            setIsReachedDesBar(true)
        }
    }, [offset])


    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        });
        let productId = searchParams.get('id')

        if (!_.isEmpty(clothesData)) {

            if (productId) {
                clothesData.map(item => {

                    if (_.isEqual(item.id, +productId)) {
                        console.log('item', item)
                        setProduct(item);
                    }
                })
            }
        }
        else {
            getClothesData();
        }

    }, [])

    const getClothesData = async () => {
        let productId = searchParams.get('id')
        let res = await getClothesService({ type: 'ONE', id: productId });
        if (res && res.data && res.data.EC === 0) {
            console.log('res data', res.data.DT)
            setProduct(res.data.DT)
        }
    }

    return (
        <>
            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>

            <div className='nav-items'>
                <span>Home</span>
                <KeyboardArrowRightIcon />
                <span> Special Exhibition</span>
                <KeyboardArrowRightIcon />
                <span>Best Products</span>
            </div>

            <div className='product-container'>

                <div className='content-left'>


                    <PhotoProvider>
                        <div className='group-images'>
                            {
                                product && product.RelevantImages && product.RelevantImages.map((item, index) => {
                                    return (
                                        <PhotoView key={index} src={item.image}>
                                            <img className='img-1' src={item.image} alt="" />
                                        </PhotoView>
                                    )

                                })
                            }
                        </div>
                    </PhotoProvider>




                    <div className='relevant-products'>
                        <div className='title'>
                            <span className='text-left'>Relevant</span>
                            <span className='text-right'>items</span>
                        </div>
                        <TheNewDropSection
                            slicePerView1={1}
                            slicePerView2={3}
                            slicePerView3={3}>
                        </TheNewDropSection>

                    </div>


                    <div className='additional-container'>

                        <div
                            className={isReachedDesBar === false ? 'navigation' : 'navigation reached'}>
                            <div className='nav-child active'><span className='nav-text'>Description</span></div>
                            <div className='nav-child'><span className='nav-text'>Reviews (0)</span></div>
                            <div className='nav-child'><span className='nav-text'>Size</span></div>
                            <div className='nav-child'><span className='nav-text'>Other</span></div>
                        </div>

                        <div className='markdown'></div>
                        <div className='shipping-detail'></div>
                        <div className='my-fit-size'></div>
                        <div className='rating'></div>
                    </div>

                </div>


                <div className={isReachedDesBar === false ? 'content-right' : 'content-right reached'}>
                    <OrderSide
                        colorSizeArr={product && product.Color_Sizes}
                        productName={product && product.name}
                        price={product && product.price}
                        discount={product && product.Discounts[0].value}
                    ></OrderSide>
                </div>


            </div>

            <Footer></Footer>
        </>
    );
}

export default Product;