import React, { useEffect, useState } from 'react';
import './ShoppingCart.scss';
import AdsHome from '../home/AdsHome';
import NavigationHome from '../home/NavigationHome';
import Footer from '../home/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useGetClothesDataMutation } from '../../store/slice/API/systemAPI';
import _ from 'lodash'
import { setShoppingCart } from '../../store/slice/Reducer/shoppingCartSilce';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
function ShoppingCart(props) {
    const dispatch = useDispatch();
    const [getClothesService, { data, isLoading }] = useGetClothesDataMutation();
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);
    const [shoppingCartData, setShoppingCartData] = useState('');
    const [tableData, setTableData] = useState('');
    console.log("shop", shoppingCartData)
    console.log("shopCart", shoppingCart)
    console.log('tabledata', tableData)
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
                console.log(item);
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
                        arrDataClothes.map(item2 => {

                            if (item1.clothesId === item2.id) {
                                item2.Color_Sizes.map(item3 => {

                                    if (item3.color === item1.color && item3.size === item1.size && +item3.stock >= item1.total) {

                                        let obj = {
                                            id: item2.id,
                                            name: item2.name,
                                            color: item1.color,
                                            size: item1.size,
                                            total: item1.total,
                                            price: item2.price,
                                            discount: item2.Discounts[0].value,
                                            image: item2.RelevantImages[0].image
                                        }

                                        _tableData.push(obj);
                                    }
                                })
                            }
                        })
                    }, 1000);
                })

                setTableData(_tableData);


            }
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


                <div className='orders-table'>
                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>o</th>
                                <th scope='col'></th>
                                <th scope='col'><font>Product Information</font></th>
                                <th scope='col'></th>
                                <th scope='col'><font>Savings</font></th>
                                <th scope='col'><font>Delivery fee</font></th>
                                <th scope='col'><font>Total</font></th>
                                <th scope='col'><font>Select</font></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tableData && tableData.map(item => {

                                    return (
                                        <>
                                            <tr>
                                                <td>o</td>
                                                <td><img src={item.image}></img></td>
                                                <td>o</td>
                                                <td>o</td>
                                                <td>o</td>
                                                <td>o</td>
                                                <td>o</td>
                                                <td>o</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>

            <Footer></Footer>


        </>
    );
}

export default ShoppingCart;