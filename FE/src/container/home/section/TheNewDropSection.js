import React from 'react';
import './TheNewDropSection.scss'
import ProductCard from './components/ProductCard';

function TheNewDropSection(props) {
    return (
        <div className='the-new-drop-container'>
            <div className='title'>The New Drop</div>
            <div className='section-clothes'>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>

            </div>
        </div>
    );
}

export default TheNewDropSection;