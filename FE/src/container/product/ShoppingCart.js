import React, { useEffect } from 'react';
import './ShoppingCart.scss';
import AdsHome from '../home/AdsHome';
import NavigationHome from '../home/NavigationHome';
import Footer from '../home/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useGetClothesDataMutation } from '../../store/slice/API/systemAPI';
import _ from 'lodash'
import { setShoppingCart, setShoppingCartData } from '../../store/slice/Reducer/shoppingCartSilce';

function ShoppingCart(props) {
    const dispatch = useDispatch();
    const [getClothesService, { data, isLoading }] = useGetClothesDataMutation();
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);
    const shoppingCartData = useSelector((state) => state.shoppingCart.shoppingCartData);
    // console.log("shop", shoppingCartData)
    useEffect(() => {
        if (_.isEmpty(shoppingCartData) || shoppingCartData[0] === '') {
            if (shoppingCart && !_.isEmpty(shoppingCart)) {
                getClothes();
            }
        }
    }, [])

    const getClothes = async () => {
        let arrId = [];
        console.log('shop cart', shoppingCart);
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
        console.log('arr id', arrId)

        if (arrId) {

            let arrDataClothes = [];
            arrId.map(async (item) => {
                console.log(item);
                let res = await getClothesService({ type: 'ONE', id: item });
                if (res && res.data && res.data.EC === 0) {
                    arrDataClothes.push(res.data.DT);
                }
            })
            if (arrDataClothes && isLoading === false) {
                console.log('dt', arrDataClothes)

                dispatch(setShoppingCartData(arrDataClothes));
            }
        }

    }

    return (
        <>
            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>
            <Footer></Footer>

            <div className='shopping-cart-container'>

            </div>
        </>
    );
}

export default ShoppingCart;