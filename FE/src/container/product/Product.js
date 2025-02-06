import React from 'react';
import './Product.scss';
import NavigationHome from '../home/NavigationHome';
import AdsHome from '../home/AdsHome';
function Product(props) {
    return (
        <div>
            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>

        </div>
    );
}

export default Product;