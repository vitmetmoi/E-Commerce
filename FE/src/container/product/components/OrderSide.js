import React, { useEffect, useState } from 'react';
import './OrderSide.scss';
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux'
import { setShoppingCart } from '../../../store/slice/Reducer/shoppingCartSilce';
import { setCheckOutDataSlice } from '../../../store/slice/Reducer/checkOutSlice';
import { useGetClothesDataMutation } from '../../../store/slice/API/systemAPI';

function OrderSide(props) {

    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    let priceAfterDiscouted = 0;
    const navigate = useNavigate();

    if (props.price || props.discount || props.price) {
        priceAfterDiscouted = props.price - ((props.discount / 100) * props.price)
    }
    const [getClothesService, { data, isLoading }] = useGetClothesDataMutation();
    const [defaultColorArr, setDefaultColorArr] = useState([]);
    const [defaultSizeArr, setDefaultSizeArr] = useState([]);
    const [colorArr, setColorArr] = useState([]);
    const [sizeArr, setSizeArr] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [orderTotal, setOrderTotal] = useState(0);


    useEffect(() => {
        if (props && props.colorSizeArr) {
            let colorArr = []
            let sizeArrBefore = []
            let sizeArr = []
            props.colorSizeArr.map(item => {
                let colorIsIncludes = false;
                let sizeIsIncludes = false;

                if (colorArr && sizeArr) {
                    colorArr.map(item1 => { if (item1.color === item.color) { colorIsIncludes = true } })
                    sizeArrBefore.map(item1 => { if (item1 === item.size) { sizeIsIncludes = true } })
                }

                if (colorIsIncludes === false) {

                    let obj = {
                        color: item.color,
                        colorRgb: asignColor(item.color),
                        isSelected: false
                    }

                    colorArr.push(obj);
                }

                if (sizeIsIncludes === false) {


                    let index = asignSizeOrder(item.size);
                    sizeArrBefore[index] = item.size;
                }
            })

            sizeArrBefore.map((item, index) => {
                if (item) {
                    let obj = {
                        size: item,
                        isSelected: false,
                        isDisable: true,
                    }
                    sizeArr.push(obj)
                }
            })

            setColorArr(colorArr);
            setSizeArr(sizeArr);
            setDefaultSizeArr(sizeArr);
            setDefaultColorArr(colorArr);

        }
    }, [props.colorSizeArr])

    useEffect(() => {
        if (colorArr) {

            let _sizeArr = _.cloneDeep(sizeArr);

            colorArr.map(item1 => {
                if (item1.isSelected === true) {

                    _sizeArr.map(item2 => {
                        props.colorSizeArr.map(item3 => {
                            if (item3.color === item1.color && item3.size === item2.size) {
                                return item2.isDisable = false;
                            }
                        })
                    })

                    setSizeArr(_sizeArr);
                }
            })
        }
    }, [colorArr])

    useEffect(() => {
        if (orderList && props && props.price) {
            let sum = 0;
            let total = 0;
            orderList && orderList.map(item => {
                sum = sum + (item.total * priceAfterDiscouted);
                total = total + item.total
            })
            setOrderTotal(total);
            setOrderPrice(sum);
        }
    }, [orderList])


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

    const asignSizeOrder = (size) => {

        if (size === 'S') {
            return 0;
        }
        if (size === 'M') {
            return 1;
        }
        if (size === 'L') {
            return 2;
        }
        if (size === 'XL') {
            return 3;
        }
        if (size === 'XXL') {
            return 4;
        }

    }

    const handleOnChange = (name, index) => {

        if (name === 'COLOR') {
            setSizeArr(defaultSizeArr)
            let _colorArr = _.cloneDeep(colorArr);
            _colorArr.map((item, indexArr) => {

                if (indexArr === index) {
                    _colorArr[index].isSelected = !_colorArr[index].isSelected;
                }

                else {
                    return item.isSelected = false
                }

            })

            setColorArr(_colorArr);
        }

        else if (name === 'SIZE') {

            let _sizeArr = _.cloneDeep(sizeArr);
            _sizeArr.map((item, indexArr) => {
                if (indexArr === index) {
                    _sizeArr[index].isSelected = true;
                }
                else {
                    return item.isSelected = false
                }
            })
            setSizeArr(_sizeArr);
            pushOrderListItem(_sizeArr);
            console.log('order list', orderList);
        }
    }

    const pushOrderListItem = (_sizeArr) => {
        let _orderList = _.cloneDeep(orderList);
        let color = '';
        let size = '';

        colorArr.map(item => {
            if (item.isSelected === true) {
                color = item.color
            }
        })

        _sizeArr.map(item => {
            if (item.isSelected === true) {
                size = item.size
            }
        })

        if (validateOrderList(color, size) === true) {
            let obj = {
                color: color,
                size: size,
                total: 1,
            }
            _orderList.push(obj);
            setOrderList(_orderList)
        }
        else {
            toast('Product recently is exist !')
        }

    }

    const validateOrderList = (color, size) => {
        let isValid = true;

        orderList.map(item => {
            if (item.color === color && item.size === size) {
                isValid = false;
            }
        })

        return isValid;
    }

    const handleOnclickTotal = (type, index) => {
        let order = orderList[index];
        let _orderList = _.cloneDeep(orderList);

        if (type === 'ADD') {
            if (props.colorSizeArr) {


                props.colorSizeArr.map(item => {
                    console.log('hy1', item)
                    if (item.color === order.color && item.size === order.size) {
                        if ((order.total) === item.stock) {
                            toast('Out of stock!')
                        }
                        else {
                            order.total = order.total + 1;
                        }
                    }
                })

                _orderList[index] = order;
                setOrderList(_orderList);

            }
        }

        else if (type === 'SUBTRACT') {
            if (order.total === 1) {
                toast('Total reached minimum !')
            }
            else {
                order.total = order.total - 1;
                _orderList[index] = order;
                setOrderList(_orderList);
            }
        }

    }


    const handleDeleteOrder = (index) => {
        let _orderList = _.cloneDeep(orderList)
        _orderList.splice(index, 1);
        setOrderList(_orderList)
    }

    const handleShoppingCartButton = () => {
        // console.log('data', orderList);
        // console.log("clothes", props.clothesId);
        let data = [];
        if (orderList) {
            orderList.map(item => {
                let obj = {
                    clothesId: props.clothesId,
                    color: item.color,
                    size: item.size,
                    total: item.total
                }
                data.push(obj);
            })

            dispatch(setShoppingCart(data));
        }
    }

    const handlePurchaseButton = async () => {
        console.log('userData', userData)
        if (userData && userData.authenticated === true) {
            let clothesData = []
            let data = [];

            if (props.productData) {
                orderList.map(item => {
                    let colorSizeId = '';
                    props.productData.Color_Sizes.map(item2 => {
                        if (item2.color === item.color && item2.size === item.size) {
                            colorSizeId = item2.id
                        }
                    })
                    let obj = {
                        clothesId: props.clothesId,
                        color: item.color,
                        size: item.size,
                        total: item.total,
                        category: props.productData.category,
                        colorSizeId: colorSizeId,
                        image: props.productData.RelevantImages[0].image,
                        name: props.productData.name,
                        price: props.productData.price,
                        type: props.productData.type,
                        discount: props.productData.Discounts[0].value

                    }
                    data.push(obj);
                })
            }
            console.log('data to shop', data)
            dispatch(setCheckOutDataSlice({ type: 'clothesData', data: data }))

            navigate('/user/checkout')
        }
        else {
            navigate('/login');
        }
    }

    return (

        <div className='order-side-content'>


            <div className='content-top'>

                <div className='share-icon'>
                    <img
                        style={{ width: '25px', height: '25px' }}
                        src="https://whoau.com/morenvyimg/detail_shere.svg"></img>
                </div>

                <div className='product-name'>
                    {props.productName}
                </div>

                <div className='price-group'>

                    <div className='price-inf noselect'>
                        <span className='discount noselect'>{props.discount}%</span>
                        <span className='price noselect'>{priceAfterDiscouted.toFixed(3)}</span>
                        <span className='primary-price noselect'>{props && props.price && props.price}</span>
                    </div>

                    <div className='coupon-down'>

                        <span className='label-text'>Coupon down</span>

                        <div className='discount'>10%</div>
                    </div>
                </div>

            </div>



            <div style={{ margin: '35px 0px', opacity: '0.5' }} className='divider'></div>



            <div className='content-mid'>

                <div className='group-text'>
                    <div className='label-left'>
                        Benefit Information
                    </div>
                    <div className='label-right'>
                        Card interest free
                    </div>
                </div>
                <div className='group-text'>
                    <div className='label-left'>
                        New Member Benefits
                    </div>
                    <div className='label-right'>
                        Welcome coupon pack issued immediately upon new registration
                    </div>
                </div>

                <div className='group-text'>
                    <div className='label-left'>
                        Savings
                    </div>
                    <div className='label-right'>
                        540p (1%)
                    </div>
                </div>

                <div className='group-text'>
                    <div className='label-left'>
                        Delivery fee
                    </div>
                    <div className='label-right'>
                        25.000đ <span style={{ opacity: '0.5' }}>(Free on purchases over 500,000đ)</span>
                    </div>
                </div>

                <div style={{ margin: '15px 0px', opacity: '0.5' }} className='divider'></div>

                <div className='group-text'>
                    <div className='label-left'>
                        Color
                    </div>
                    <div className='label-right'>

                        <div className='group-color'>
                            {colorArr && colorArr.map((item, index) => {

                                return (
                                    <IconButton
                                        style={{ fontSize: '120%', padding: '5px' }}
                                    >
                                        <div
                                            onClick={() => handleOnChange('COLOR', index)}
                                            className='color'
                                            style={{
                                                backgroundColor: `${item.colorRgb}`

                                            }}>

                                        </div>
                                    </IconButton>

                                )
                            })}

                            {colorArr && colorArr.map((item, index) => {
                                if (item.isSelected === true) {

                                    return (
                                        <div
                                            style={{ opacity: '0.5' }}
                                        >
                                            ({item.color})
                                        </div>
                                    )
                                }

                            })}
                        </div>

                    </div>
                </div>

                <div className='group-text'>
                    <div style={{ paddingTop: '12px' }} className='label-left'>
                        Size
                    </div>
                    <div className='label-right'>
                        <div className='group-size'>
                            {sizeArr && sizeArr.map((item, index) => {

                                return (
                                    <button
                                        onClick={() => handleOnChange('SIZE', index)}
                                        className={item.isSelected ? 'size active' : 'size'}
                                        disabled={item.isDisable}>{item.size}</button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className='group-orders'>
                    {orderList && orderList.map((item, index) => {
                        return (
                            <div className='order'>

                                <div className='left-info'>
                                    <span className='product-name'>{index + 1}. {props.productName}</span>
                                    <span className='color-size'>( {item.color} / {item.size} )</span>
                                </div>

                                <div className='right-info'>

                                    <div className='total-container'>
                                        <button
                                            onClick={() => handleOnclickTotal('SUBTRACT', index)}
                                            className='button-adj'><span>-</span></button>
                                        <span className='total'>{item.total}</span>
                                        <button
                                            onClick={() => handleOnclickTotal('ADD', index)}
                                            className='button-adj'><span>+</span></button>
                                    </div>

                                    <span className='sumary-price'>{(props.price * item.total).toFixed(3)}$</span>

                                    <div className='remove-ele' >
                                        <IconButton
                                            style={{ fontSize: '120%', cursor: 'pointer' }}
                                            onClick={() => handleDeleteOrder(index)}
                                        >
                                            <RemoveCircleOutlineOutlinedIcon></RemoveCircleOutlineOutlinedIcon>

                                        </IconButton>

                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>


            </div>

            <div style={{ margin: '35px 0px', border: '1px solid rgba(0,0,0,0.3)' }} className='divider'></div>

            <div className='content-bottom'>

                <div className='total-price'>
                    <span className='total-title'>Total product price</span>
                    <div className='group-price'>
                        <span className='price'>{orderPrice.toFixed(3)} $</span>
                        <span className='total'>({orderTotal} pices)</span>
                    </div>
                </div>

                <div className='group-button'>
                    <button className='button btn1'>Product of interest</button>
                    <button
                        className='button btn2'
                        onClick={() => handleShoppingCartButton()}
                    >Shopping Cart</button>
                    <button
                        onClick={() => handlePurchaseButton()}
                        className='button btn3'>Purchase</button>
                </div>

                <Swiper
                    // install Swiper modules
                    modules={[A11y, Pagination, Autoplay]}
                    pagination={{
                        clickable: true,
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                >

                    <SwiperSlide>
                        <div style={{ backgroundImage: "url(" + `https://whoau.com/web/upload/NNEditor/20241004/604bb55812ce7bc39c36914a09b23e6d.jpg` + ")", }}
                            className='banner-cover'>
                        </div>

                    </SwiperSlide>

                    <SwiperSlide>
                        <div style={{ backgroundImage: "url(" + `https://culltique.in/cdn/shop/files/posterdesignmockup-2-26_0bf8b966-c4c2-4af9-aae1-fbf889a0449a.jpg?v=1715892315&width=1946` + ")", }}
                            className='banner-cover'>

                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{ backgroundImage: "url(" + `https://whoau.com/web/upload/NNEditor/20241016/8427f4c98cc4bf7892f7760ce4d3101f.jpg` + ")", }}
                            className='banner-cover'>

                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{
                            backgroundPositionY: "15%",
                            backgroundImage: "url(" + `https://doncare-club.com/cdn/shop/files/5_68cd7cdf-4b4b-4dbe-bcc8-f9d7526c85e1.jpg?v=1734677425&width=2400` + ")",
                        }}
                            className='banner-cover'>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide>
                        <div style={{ backgroundImage: "url(" + `https://whoau.com/web/upload/NNEditor/20241212/726a0d37ac5396aa741713f389c6371a.jpg` + ")", }}
                            className='banner-cover'>

                        </div>
                    </SwiperSlide>

                </Swiper>



            </div>

        </div>
    );
}

export default OrderSide;