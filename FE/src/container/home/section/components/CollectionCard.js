import React, { useEffect, useState } from 'react';
import './CollectionCard.scss';
import { TYPE } from '../../../../utils';

function CollectionCard(props) {
    const [headerText, setHeaderText] = useState('');
    const [contentText, setContentText] = useState('');
    const [backgroundImg, setBackgroundImg] = useState('');

    useEffect(() => {
        if (props.type === TYPE.MEN) {

        }
        if (props.type === TYPE.WOMEN) {

        }
        if (props.type === TYPE.ACCESSORY) {

        }
    }, [])
    return (
        <div className='collection-card-container'>
            <div className='header-text'></div>
            <div className='content-text'></div>
        </div>
    );
}

export default CollectionCard;