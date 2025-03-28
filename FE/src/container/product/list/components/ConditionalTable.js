import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './ConditionalTable.scss';
import Slider from '@mui/material/Slider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import DoneIcon from '@mui/icons-material/Done';
function ConditionalTable(props) {

    const minDistance = 50

    const handleChange1 = (event, newValue, activeThumb) => {
        if (activeThumb === 0) {
            props.handleOnChange('priceRange', [Math.min(newValue[0], props.priceRange[1] - minDistance), props.priceRange[1]]);
        } else {
            props.handleOnChange('priceRange', [props.priceRange[0], Math.max(newValue[1], props.priceRange[0] + minDistance)]);
        }
    };

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

    function valuetext(value) {
        return `${value}$`;
    }

    return (
        <div className='conditional-table-container'>

            <div className='con-item'>
                <div className='content-left'>COLOR</div>
                <div className='content-right'>
                    <div className='color-box'>


                        <div
                            onClick={() => props.handleOnChange('color', 'White')}
                            className='color'
                            style={{ backgroundColor: asignColor('White') }}>
                            {props.color.includes('White') === true && <DoneIcon />}
                        </div>
                        <div
                            onClick={() => props.handleOnChange('color', 'Black')}
                            className='color'
                            style={{ backgroundColor: asignColor('Black') }}>
                            {props.color.includes('Black') === true && <DoneIcon />}
                        </div>
                        <div
                            onClick={() => props.handleOnChange('color', 'Yellow')}
                            className='color'
                            style={{ backgroundColor: asignColor('Yellow') }}>
                            {props.color.includes('Yellow') === true && <DoneIcon />}

                        </div>
                        <div
                            onClick={() => props.handleOnChange('color', 'Red')}
                            className='color'
                            style={{ backgroundColor: asignColor('Red') }}>
                            {props.color.includes('Red') === true && <DoneIcon />}

                        </div>
                        <div
                            onClick={() => props.handleOnChange('color', 'Blue')}
                            className='color'
                            style={{ backgroundColor: asignColor('Blue') }}>
                            {props.color.includes('Blue') === true && <DoneIcon color={'white'} />}

                        </div>
                        <div
                            onClick={() => props.handleOnChange('color', 'Green')}
                            className='color'
                            style={{ backgroundColor: asignColor('Green') }}>
                            {props.color.includes('Green') === true && <DoneIcon color={'white'} />}

                        </div>
                        <div
                            onClick={() => props.handleOnChange('color', 'Grey')}
                            className='color'
                            style={{ backgroundColor: asignColor('Grey') }}>
                            {props.color.includes('Grey') === true && <DoneIcon color={'white'} />}

                        </div>
                        <div
                            onClick={() => props.handleOnChange('color', 'Pink')}
                            className='color'
                            style={{ backgroundColor: asignColor('Pink') }}>
                            {props.color.includes('Pink') === true && <DoneIcon color={'white'} />}

                        </div>
                        <div
                            onClick={() => props.handleOnChange('color', 'Beige')}
                            className='color'
                            style={{ backgroundColor: asignColor('Beige') }}>
                            {props.color.includes('Beige') === true && <DoneIcon color={'white'} />}

                        </div>
                    </div>
                </div>
            </div>

            <div className='con-item'>
                <div className='content-left'>SIZE</div>
                <div className='content-right'>
                    <div className='size-group'>
                        <div onClick={() => props.handleOnChange('size', 'S')}
                            className={props.size.includes('S') ? 'size isSelected' : 'size'}>S</div>
                        <div
                            onClick={() => props.handleOnChange('size', 'M')}
                            className={props.size.includes('M') ? 'size isSelected' : 'size'}>M</div>
                        <div
                            onClick={() => props.handleOnChange('size', 'L')}
                            className={props.size.includes('L') ? 'size isSelected' : 'size'}>L</div>
                        <div
                            onClick={() => props.handleOnChange('size', 'XL')}
                            className={props.size.includes('XL') ? 'size isSelected' : 'size'}>XL</div>
                        <div
                            onClick={() => props.handleOnChange('size', 'XXL')}
                            className={props.size.includes('XXL') ? 'size isSelected' : 'size'}>XXL</div>

                    </div>

                </div>
            </div>

            <div className='con-item'>
                <div className='content-left'>PRICE</div>
                <div className='content-right'>
                    <div className='price-range'>
                        <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={props.priceRange}
                            onChange={handleChange1}
                            valueLabelDisplay="auto"
                            min={0}
                            max={300}
                            getAriaValueText={valuetext}
                            disableSwap
                        />
                        <div className='price-text'>
                            <span className='text'>{props.priceRange[0]} $</span>
                            <span className='text'>{props.priceRange[1]} $</span>
                        </div>
                    </div>



                </div>
            </div>

            <div className='con-item'>
                <div className='content-left'>FILTER</div>
                <div className='content-right'>
                    <button
                        onClick={() => props.handleOnChange('clear')}
                        className='btn1'><RotateLeftIcon style={{ marginRight: '3px' }} />Reload</button>

                    <button
                        onClick={() => props.handleOnChange('onFilter', props.onFilter + 1)}
                        className='btn2'><FilterAltIcon style={{ marginBottom: '3px' }} />On Filter</button>
                </div>
            </div>


        </div>
    );
}

export default ConditionalTable;