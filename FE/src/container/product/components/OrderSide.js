import React, { useState } from 'react';
import './OrderSide.scss';
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
function OrderSide(props) {

    return (
        <div className='order-side-content'>



            <div className='content-top'>

                <div className='share-icon'>
                    <img
                        style={{ width: '25px', height: '25px' }}
                        src="https://whoau.com/morenvyimg/detail_shere.svg"></img>
                </div>

                <div className='product-name'>
                    Varsity Logo Hoodie
                </div>

                <div className='price-group'>

                    <div className='price-inf noselect'>
                        <span className='discount noselect'>{10}%</span>
                        <span className='price noselect'>100,000</span>
                        <span className='primary-price noselect'>111,111</span>
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
                        #
                    </div>
                </div>

                <div className='group-text'>
                    <div className='label-left'>
                        Size
                    </div>
                    <div className='label-right'>
                        ###
                    </div>
                </div>


            </div>

            <div style={{ margin: '35px 0px' }} className='divider'></div>

            <div className='content-bottom'>


            </div>
        </div>
    );
}

export default OrderSide;