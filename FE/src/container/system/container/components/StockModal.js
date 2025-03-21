import './StockModal.scss'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import _ from 'lodash'
// import { NumberField } from '@base-ui-components/react/number-field';
const StockModal = (props) => {
    console.log('props', props);

    const renderText = (color, size, id) => {
        return (
            <>
                <span>{color} {size}</span> <span style={{ color: '#707070', fontSize: '13px' }}>(id: {id})</span>
            </>
        )
    }

    const handleOnChange = (id, value) => {
        if (value < 0) {
            toast.warn('Value is invalid!')
        }
        else {
            let _stockData = _.cloneDeep(props.stock);
            _stockData.map(item1 => {
                if (item1.id === id) {
                    item1.stock = value
                }
                return item1;
            })
            props.setDataOfStockToChange(_stockData)
        }



    }

    const handleOnclickTotal = (type, id) => {
        if (props.stock) {
            let _stockData = _.cloneDeep(props.stock);

            _stockData.map(item1 => {
                if (item1.id === id) {

                    if (type === 'ADD') {
                        item1.stock++;
                    }

                    else if (type === 'SUBTRACT') {
                        if (item1.stock > 1) {
                            item1.stock--;
                        }
                        else {
                            toast('Reached minimum!');
                        }
                    }

                }
                return item1;
            })


            props.setDataOfStockToChange(_stockData)

        }
    }
    return (
        <div className='stock-modal-container'>

            <div className='content-left'>
                <List sx={{ overflowY: 'scroll', height: '100%', width: '100%', bgcolor: 'background.paper' }}>
                    {props && props.stock && props.stock.map(item => {
                        let colorHex = props.asignColor(item.color)
                        return (
                            <>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={item.size}
                                            style={{ backgroundColor: `${colorHex}`, width: '35px', height: '35px' }}
                                            src="/static/images/avatar/2.jpg">
                                        </Avatar >
                                    </ListItemAvatar>
                                    <ListItemText primary={renderText(item.color, item.size, item.id)} />
                                    <div className='total-container'>
                                        <button
                                            onClick={() => handleOnclickTotal('SUBTRACT', item.id)}
                                            className='button-adj'><span>-</span></button>
                                        <input
                                            onChange={(event) => handleOnChange(item.id, event.target.value)}
                                            className='total'
                                            value={item.stock}
                                        ></input>
                                        <button
                                            onClick={() => handleOnclickTotal('ADD', item.id)}
                                            className='button-adj'><span>+</span></button>
                                    </div>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>

                        )
                    })}

                </List>

            </div>

            <div className='content-right'>

            </div>

        </div >
    );
};

export default StockModal;