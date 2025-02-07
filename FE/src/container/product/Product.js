import React from 'react';
import './Product.scss';
import NavigationHome from '../home/NavigationHome';
import AdsHome from '../home/AdsHome';
import OrderSide from './components/OrderSide';
import Divider from '@mui/material/Divider';

function Product(props) {
    return (
        <>
            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>


            <div className='product-container'>
                <div className='content-left'>
                    123
                    <div className='group-images'></div>
                    <div className='relevant-products'></div>


                    <div className='additional-container'>
                        <div className='navigation'></div>
                        <div className='markdown'></div>
                        <div className='shipping-detail'></div>
                        <div className='my-fit-size'></div>
                        <div className='rating'></div>
                    </div>

                </div>


                <div className='content-right'>
                    <OrderSide></OrderSide>
                </div>


            </div>
        </>
    );
}

export default Product;