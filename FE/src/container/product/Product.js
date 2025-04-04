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
import MDEditor from '@uiw/react-md-editor';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MyFitSize from './components/MyFitSize';
import Review from './components/Review';

function Product(props) {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [getClothesService, { data, isLoading }] = useGetClothesDataMutation();
    const clothesData = useSelector((state) => state.system.clothesData);
    const [product, setProduct] = useState('');
    const [offset, setOffset] = useState(0);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [isReachedDesBar, setIsReachedDesBar] = useState(false);

    console.log('clothes', product)

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

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

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        });
        let productId = searchParams.get('id')
        let isExist = false;
        clothesData.map(item => { if (item.id === +productId) { isExist = true } })
        if (!_.isEmpty(clothesData) && isExist === true) {

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
    }, [location])

    useEffect(() => {

        if (offset <= 2918 || offset <= '2918') {
            setIsReachedDesBar(false)
        }
        else {
            setIsReachedDesBar(true)
        }
    }, [offset])




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
                            <div className='nav-child'><span className='nav-text'>Payment</span></div>
                            <div className='nav-child'><span className='nav-text'>Size</span></div>
                            <div className='nav-child'><span className='nav-text'>Reviews (0)</span></div>
                        </div>

                        <div className={isShowDetail === false ? 'description-content' : 'description-content show'}>
                            <MDEditor.Markdown
                                source={product && product.Markdowns[0].contentMarkdown}
                                style={{ whiteSpace: 'pre-wrap' }} />
                            <div
                                hidden={isShowDetail}
                                className='hide-content-banner'>
                                <button
                                    onClick={() => setIsShowDetail(!isShowDetail)}
                                    className='show-button'>View more details</button>
                            </div>
                        </div>

                        <div className='asking-content'>

                            <div className='title'>
                                <QuestionAnswerIcon
                                    style={{ fontSize: "35px" }}
                                    className='asking-icon'></QuestionAnswerIcon>
                                <span>Any inquiries regarding the shopping mall will be answered through 1:1 inquiry.</span>
                            </div>
                            <button className='button-asking'>1:1 Contact</button>
                        </div>

                        <div className='payment-information'>
                            <div className='group-info'>
                                <span className='title-1'>Product Payment Information</span>
                                <span className='title-2'>In case of high-value payments, the card company may call you for verification for security reasons. If the verification process determines that the order is not normal, such as the use of a stolen card or an order under someone else's name, the order may be suspended or cancelled at our discretion.  </span>
                            </div>
                        </div>

                        <div className='payment-information child'>
                            <div className='group-info'>
                                <span className='title-1'>Shipping Information</span>
                                <span className='title-2'>Shipping method: Courier
                                    Delivery area: Nationwide
                                    Shipping cost: 2,500
                                    Delivery time: 3 to 7 days
                                    Shipping Information: - Additional charges may apply for mountainous areas or islands.
                                    The products you ordered will be shipped after payment is confirmed. However, depending on the product type, delivery of the product may be slightly delayed.</span>
                            </div>
                        </div>

                        <div className='payment-information child'>
                            <div className='group-info'>
                                <span className='title-1'>Exchange and Return Information</span>
                                <span className='title-2'>
                                    Exchange and Return Address
                                    <br></br>
                                    - [31214] 3rd floor, E-Land Fashion Integrated Logistics Center, 111 Pungse-sandan 3-ro, Pungse-myeon, Dongnam-gu, Cheonan-si, Chungcheongnam- do Cases in
                                    <br></br><br></br>
                                    which exchange and return are possible
                                    <br></br>
                                    - Within 7 days from the date you received the product. However,
                                    in the case of home appliances, if the packaging has been opened or damaged and the product value has been lost, exchange/return is not possible.
                                    <br></br>
                                    - If the content of the product and service you received is different from the content indicated or advertised
                                    or is performed differently, exchange and return are not possible within 3 months from the date you received the product, or within 30 days from the date you became aware of the fact. Cases in
                                    <br></br><br></br>
                                    which exchange and return are not possible
                                    <br></br>
                                    - If the product is lost or damaged due to a cause attributable to the customer. However,
                                    this does not apply if the packaging has been damaged in order to check the contents of the product
                                    <br></br>
                                    - If the packaging has been opened or damaged and the product value has been lost (Example: home appliances, food, records, etc. However   , returns/exchanges due
                                    to defective pixels in laptops, LCD monitors, digital cameras, etc. with liquid crystal displays are subject to the manufacturer's standards.)
                                    <br></br>
                                    - If the value of the product has significantly decreased due to the customer's use or partial consumption. However, in the case of cosmetics, this   only applies if a trial product has been provided.
                                    <br></br>
                                    - If the value of the product has significantly decreased to the extent that resale is difficult due to the passage of time - If the packaging of a product that can be copied has been damaged   (For details, please use the 1:1 E-MAIL consultation of the Customer Satisfaction Center.)
                                    <br></br>
                                    ※ If you change your mind and exchange or return the product, you must pay the return shipping cost.   (Including color exchange, size exchange, etc.)
                                </span>
                            </div>
                        </div>

                        <div className='my-fit-size'>
                            <MyFitSize></MyFitSize>
                        </div>

                        <div className='rating-container'>
                            <Review>

                            </Review>

                        </div>

                    </div>

                </div>


                <div className={isReachedDesBar === false ? 'content-right' : 'content-right reached'}>
                    <OrderSide
                        colorSizeArr={product && product.Color_Sizes}
                        productName={product && product.name}
                        price={product && product.price}
                        discount={product && product.Discounts[0].value}
                        clothesId={product.id}
                        productData={product && product}
                    ></OrderSide>
                </div>


            </div>

            <Footer></Footer>
        </>
    );
}

export default Product;