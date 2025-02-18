import React from 'react';
import './ShoppingCart.scss';
import AdsHome from '../home/AdsHome';
import NavigationHome from '../home/NavigationHome';
import Footer from '../home/Footer';
function ShoppingCart(props) {
    return (
        <>
            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>
            <Footer></Footer>
        </>
    );
}

export default ShoppingCart;