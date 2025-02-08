import React, { useEffect, useState } from 'react';
import './OrderSide.scss';
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

function OrderSide(props) {

    let priceAfterDiscouted = 0;
    const navigate = useNavigate();

    if (props.price || props.discount || props.price) {
        priceAfterDiscouted = props.price - ((props.discount / 100) * props.price)
    }

    const [defaultColorArr, setDefaultColorArr] = useState([]);
    const [defaultSizeArr, setDefaultSizeArr] = useState([]);
    const [colorArr, setColorArr] = useState([]);
    const [sizeArr, setSizeArr] = useState([]);
    const [sizeIsDisabled, setSizeIsDisabled] = useState(true);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        if (props && props.colorArr && props.sizeArr) {
            let colorArr = []
            let sizeArr = []
            props.colorArr.map(item => {
                let obj = {
                    color: item,
                    colorRgb: asignColor(item),
                    isSelected: false
                }
                colorArr.push(obj);
            })

            props.sizeArr.map(item => {
                let obj = {
                    size: item,
                    isSelected: false
                }
                sizeArr.push(obj);
            })

            setColorArr(colorArr);
            setSizeArr(sizeArr);
            setDefaultSizeArr(sizeArr);
            setDefaultColorArr(colorArr);

        }
    }, [props.colorArr, props.sizeArr])

    useEffect(() => {
        if (colorArr) {
            let isSelected = false;

            colorArr.map(item => {
                if (item.isSelected === true) {
                    isSelected = true;
                }
            })

            setSizeIsDisabled(!isSelected)
        }
    }, [colorArr])


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
                        <span className='price noselect'>{priceAfterDiscouted}</span>
                        <span className='primary-price noselect'>{props.price}</span>
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
                                    <div
                                        onClick={() => handleOnChange('COLOR', index)}
                                        className='color'
                                        style={{
                                            backgroundColor: `${item.colorRgb}`

                                        }}>

                                    </div>
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
                                        disabled={sizeIsDisabled}>{item.size}</button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className='group-orders'>
                    {orderList && orderList.map((item, index) => {
                        return (
                            <div className='order'>
                                <div className='content-left'>
                                    <span className='product-name'></span>
                                    <span className='color-size'></span>
                                </div>
                                <div className='content-right'>
                                    <div className='total'>{item.total}</div>
                                    <span className='sumary-price'>{props.price * item.total}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>


            </div>

            <div style={{ margin: '35px 0px' }} className='divider'></div>

            <div className='content-bottom'>


            </div>
        </div>
    );
}

export default OrderSide;