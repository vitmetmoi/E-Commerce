import React, { useEffect, useState } from 'react';
import './ShoppingCart.scss';
import AdsHome from '../home/AdsHome';
import NavigationHome from '../home/NavigationHome';
import Footer from '../home/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useGetClothesDataMutation } from '../../store/slice/API/systemAPI';
import _ from 'lodash'
import { setShoppingCart, deleteShoppingCart, clearShoppingCartData } from '../../store/slice/Reducer/shoppingCartSilce';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Icon, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';
import { useNavigate } from 'react-router';
import { setCheckOutDataSlice } from '../../store/slice/Reducer/checkOutSlice';

function ShoppingCart(props) {
    const dispatch = useDispatch();
    const [getClothesService, { data, isLoading }] = useGetClothesDataMutation();
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);
    const [shoppingCartData, setShoppingCartData] = useState('');
    const [tableData, setTableData] = useState('');
    const [isSelectAll, setIsSelectAll] = useState(true);
    const navigate = useNavigate();
    console.log("shop", shoppingCartData)
    console.log("shopCart", shoppingCart)
    console.log('tableData', tableData);
    useEffect(() => {

        if (_.isEmpty(shoppingCartData) || shoppingCartData[0] === '') {
            if (shoppingCart && !_.isEmpty(shoppingCart)) {
                getClothes();
            }
        }
    }, [])

    const getClothes = async () => {
        let arrId = [];
        shoppingCart.map(item1 => {
            let isExist = false;
            arrId.map(item2 => {
                if (item1.clothesId === item2) {
                    isExist = true;
                }
            })
            if (isExist === false) {
                arrId.push(item1.clothesId);
            }
        })

        if (arrId) {

            let arrDataClothes = [];

            arrId.map(async (item) => {

                let res = await getClothesService({ type: 'ONE', id: item });
                if (res && res.data && res.data.EC === 0 && res.data.DT) {
                    arrDataClothes.push(res.data.DT);
                }
            })

            if (arrDataClothes) {
                setShoppingCartData(arrDataClothes);
                let _tableData = [];

                shoppingCart.map(item1 => {

                    setTimeout(() => {
                        arrDataClothes.map((item2, index2) => {

                            if (item1.clothesId === item2.id) {
                                item2.Color_Sizes.map((item3, index3) => {

                                    if (item3.color === item1.color && item3.size === item1.size && +item3.stock >= item1.total) {
                                        console.log('item2', item2);
                                        let obj = {
                                            id: _tableData.length,
                                            isSelected: true,
                                            clothesId: item2.id,
                                            name: item2.name,
                                            color: item1.color,
                                            size: item1.size,
                                            total: item1.total,
                                            price: item2.price,
                                            discount: item2.Discounts[0].value,
                                            image: item2.RelevantImages[0].image,
                                            colorSizeId: item3.id,
                                            type: item2.type,
                                            category: item2.category,
                                            stock: +item3.stock
                                        }

                                        _tableData.push(obj);
                                    }
                                })
                            }
                        })
                    }, 1000);
                })

                setTimeout(() => {
                    setTableData(_tableData);
                }, 1000);

            }
        }

    }
    const handleSelecAll = () => {

        let _tableData = _.cloneDeep(tableData);
        if (_tableData) {
            _tableData.map(item => {
                if (isSelectAll === false) {
                    item.isSelected = true;
                    return item;
                }
                else {
                    item.isSelected = false;
                    return item;
                }
            })
        }
        setTableData(_tableData);
        setIsSelectAll(!isSelectAll);
    }

    const hanleIsSelected = (id) => {
        let _tableData = _.cloneDeep(tableData);
        if (_tableData) {
            _tableData.map(item => {

                if (item.id === id) {
                    item.isSelected = !item.isSelected;
                    return item;
                }
            })
        }
        setTableData(_tableData);
    }

    const handleOnclickTotal = (type, id) => {
        if (tableData) {
            let _tableData = _.cloneDeep(tableData);

            _tableData.map(item1 => {
                if (item1.id === id) {

                    if (type === 'ADD') {
                        if (item1.total < item1.stock) {
                            item1.total++;
                        }
                        else {
                            toast('Out of stock!');
                        }
                    }

                    else if (type === 'SUBTRACT') {
                        if (item1.total > 1) {
                            item1.total--;
                        }
                        else {
                            toast('Reached minimum!');
                        }
                    }

                }
                return item1;
            })

            setTableData(_tableData);

        }
    }

    const caculateFinallyPrice = (type) => {
        if (tableData) {
            let sum = 0;
            if (type === 'BARE') {
                tableData.map(item => {
                    if (item.isSelected === true) {

                        let price = +item.price * item.total;
                        sum = price + sum;
                    }
                })
                return sum.toFixed(3);
            }
            else if (type === 'DISCOUNT') {

                tableData.map(item => {
                    if (item.isSelected === true) {
                        let price = (+item.price * (item.discount / 100)) * item.total;
                        sum = sum + price;
                    }
                })
                return sum.toFixed(3);
            }
            else if (type === 'AFTER_DISCOUNT') {
                tableData.map(item => {
                    if (item.isSelected === true) {
                        let price = (+item.price - (+item.price * (item.discount / 100))) * item.total;
                        sum = sum + price;
                    }
                })
                return sum.toFixed(3);
            }
        }
    }

    const handleDeleteItems = (type) => {

        if (type === 'ALL') {
            dispatch(clearShoppingCartData())
            setTableData('');
        }
        else {
            if (tableData) {
                let _tableData = _.cloneDeep(tableData);

                _tableData = _tableData.filter((item, index) => {
                    if (item.isSelected === true) {
                        dispatch(deleteShoppingCart(item.id));
                    }
                    return item.isSelected === true;
                })

                setTableData(_tableData);


            }
        }
    }

    const handleOnClickOrder = () => {
        if (tableData && tableData.length > 0) {
            let clothesData = []
            tableData.map(item => {
                if (item.isSelected === true) {
                    let obj = {};
                    delete item.isSelected;
                    obj = {
                        ...item
                    }
                    clothesData.push(obj);
                }

            })
            console.log('tableData', clothesData)

            dispatch(setCheckOutDataSlice({ type: 'clothesData', data: clothesData }))
            navigate('/user/checkOut');
        }
        else {
            toast('Your shopping cart is empty!')
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

            <div className='shopping-cart-container'>

                <h2 className='header'>
                    <font>Shopping Cart</font>
                </h2>

                {isLoading === true || !tableData || tableData.length === 0 ?
                    ''
                    :
                    <div className='orders-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col' >
                                        <IconButton
                                            onClick={() => { handleSelecAll() }}>
                                            <div className={isSelectAll === true ? 'action-box active' : 'action-box'}>
                                                <div className='round'></div>
                                            </div>
                                        </IconButton>

                                    </th>
                                    <th scope='col'></th>
                                    <th scope='col'><font>Product Information</font></th>
                                    <th scope='col'></th>
                                    <th scope='col'><font>Savings</font></th>
                                    <th scope='col'><font>Delivery fee</font></th>
                                    <th scope='col'><font>Price</font></th>
                                    <th scope='col'><font>Select</font></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    tableData && tableData.map(item => {

                                        return (
                                            <>
                                                <tr>
                                                    <td>
                                                        <div className='action-content'>
                                                            <IconButton
                                                                onClick={() => hanleIsSelected(item.id)}
                                                            >
                                                                <div className={item.isSelected === true ? 'action-box active' : 'action-box'}>
                                                                    <div className='round'></div>
                                                                </div>
                                                            </IconButton>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <img width={100} height={133} src={item.image}></img>
                                                    </td>
                                                    <td>
                                                        <div className='infor-group'>
                                                            <font className='name'>{item.name}</font>
                                                            <font className='relevant'>[{item.color} / {item.size}]</font>
                                                        </div>


                                                    </td>
                                                    <td>
                                                        <div className='total-container'>
                                                            <button
                                                                onClick={() => handleOnclickTotal('SUBTRACT', item.id)}
                                                                className='button-adj'><span>-</span></button>
                                                            <span className='total'>{item.total}</span>
                                                            <button
                                                                onClick={() => handleOnclickTotal('ADD', item.id)}
                                                                className='button-adj'><span>+</span></button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='discount'>
                                                            <font>{item.discount}%</font>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <div className='delivery'>
                                                            <font>Free</font>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='price'>
                                                            <font>{item.price}$</font>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='select-group'>

                                                            <button className='btn-top'>Order now</button>

                                                            <div className='btn-bottom'>
                                                                <IconButton>
                                                                    <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                                                                </IconButton>
                                                                <IconButton>
                                                                    <BookmarkBorderIcon></BookmarkBorderIcon>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>

                }



                <div className="sum-price">
                    <font>Product purchase amount</font> <strong>{caculateFinallyPrice('BARE')}$</strong>
                    <font> + Shipping cost 0 (free) </font> <font> - Product discount amount</font> <strong>{caculateFinallyPrice('DISCOUNT')}$</strong>
                    <font> = Total </font><strong>{caculateFinallyPrice('AFTER_DISCOUNT')}$</strong>
                </div>

                <div className='options-container'>
                    <button
                        onClick={() => handleDeleteItems('SELECTED')}
                    >Delete selected items</button>
                    <div className='btn-right'>
                        <button>Print a quote</button>
                        <button
                            onClick={() => handleDeleteItems('ALL')}
                        >Empty cart</button>
                    </div>
                </div>

                <div className='table-final'>
                    <table>
                        <thead>
                            <tr>
                                <th scope='col'><font>Total product price</font></th>
                                <th scope='col'></th>
                                <th scope='col'><font>Total shipping cost</font></th>
                                <th scope='col'></th>
                                <th scope='col'><font>Total discount amount</font></th>
                                <th scope='col'></th>
                                <th scope='col'><font>Amount to be paid</font></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope='col' className='price-row'>
                                    <strong>{caculateFinallyPrice('BARE')}$</strong>
                                </td>
                                <td scope='col'>
                                    <LocalShippingIcon style={{ color: '#909090' }} />
                                </td>
                                <td scope='col' className='price-row'>
                                    <strong>0$</strong></td>
                                <td scope='col'><LocalOfferIcon style={{ color: '#909090' }} />
                                </td>
                                <td scope='col' className='price-row'>
                                    <strong>{caculateFinallyPrice('DISCOUNT')}$</strong>
                                </td>
                                <td scope='col'><ShoppingCartCheckoutIcon /></td>
                                <td scope='col' className='price-row'>
                                    <strong className='final-price'>{caculateFinallyPrice('AFTER_DISCOUNT')}$</strong>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                <div className='submit-group'>
                    <button className='btn1'>Continue Shopping</button>
                    <button
                        onClick={() => handleOnClickOrder()}
                        className='btn2'>Order All Products
                    </button>
                </div>

                <div className='informations'>

                    <div className='head-title'>Shopping Cart Usage Guide</div>

                    <div className='scripts-group'>
                        <div className='script'>
                            <LooksOneIcon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            International shipping products and domestic shipping products cannot be paid for together, so please pay for each shopping cart separately.
                        </div>

                        <div className='script'>
                            <LooksTwoIcon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            For products eligible for overseas delivery, you can add them to the domestic delivery cart and then move them to the overseas delivery cart to make payment.
                        </div>
                        <div className='script'>
                            <Looks3Icon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            If you want to change the quantity of the product you selected, change the quantity and then click the [Change] button.
                        </div>
                        <div className='script'>
                            <Looks4Icon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            You can continue shopping by clicking the [Continue Shopping] button.
                        </div>
                        <div className='script'>
                            <Looks5Icon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            You can use the shopping cart and wish list to order only the products you want or register them as wish lists.
                        </div>
                        <div className='script'>
                            <Looks6Icon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            The file attachment option will be replaced with the last uploaded file when adding the same product to the shopping cart.
                        </div>
                    </div>

                    <div className='head-title header2'>Interest-free installment plan usage guide</div>
                    <div className='scripts-group'>


                        <div className='script'>
                            <LooksOneIcon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            To receive the interest-free installment benefit for each product, select only the interest-free installment products and click the [Order] button to order/pay.
                        </div>

                        <div className='script'>
                            <LooksTwoIcon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            If you click the [Order All Products] button, an order/payment will be made for all selected products in the shopping cart, regardless of category.
                        </div>
                        <div className='script'>
                            <Looks3Icon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            However, if you order/pay for all products, you will not be able to receive the interest-free installment benefit for each product.
                        </div>
                        <div className='script'>
                            <Looks4Icon style={{ fontSize: '20px', marginRight: '5px', color: '#707070', opacity: '0.5' }} />
                            Interest-free installment products are displayed in a separate interest-free installment product area in the shopping cart, and shipping costs are displayed based on interest-free installment products.
                            Actual shipping costs are applied based on the products ordered together, so please refer to the shipping cost information at the bottom of the order form.
                        </div>


                    </div>

                </div>



            </div>

            <Footer></Footer>

        </>
    );
}

export default ShoppingCart;