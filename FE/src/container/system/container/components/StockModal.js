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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
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

    const handleDeleteTotal = (id) => {
        let _stockData = _.cloneDeep(props.stock);

        _stockData.map((item, index) => {
            if (item.id === id) {
                _stockData.splice(index, 1)
            }
        })
        props.setDataOfStockToChange(_stockData)
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

                    {props && props.stock && props.stock !== 'backdropClick' && props.stock.map(item => {
                        let colorHex = props.asignColor(item.color)
                        return (
                            <>
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                            onClick={() => handleDeleteTotal(item.id)}
                                            edge="end" aria-label="delete">
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
                <div className='text-information '>
                    <Alert severity="info" style={{ width: "100%", height: "100%" }}>
                        <AlertTitle>Important information</AlertTitle>
                        <p></p>
                        <p>
                            * You can click to the largest image to open preview-mode (which will open full screen image).
                        </p>

                        <p>
                            * You can not delete first image beacause it is the Represent Image of the products. The represent image
                            is the first image inside product collection (first element in array image).
                        </p>
                        <p>
                            * In case you willing to delete that product forever, please click to delete button in product's table list.
                        </p>
                        <p>
                            * The system prevents mutating image!
                        </p>
                        <p>
                            For more information please contact : 012 - 345 - 678 - 910
                        </p>
                    </Alert>
                </div>
                <div className='group-button'>
                    <Button
                        onClick={() => props.handleOpenStockModal()}
                        variant="outlined" startIcon={<DeleteIcon />}>
                        Cancel
                    </Button>


                    <Button
                        onClick={() => props.processRowUpdate('', 'STOCK')}
                        variant={props.updateIsLoading === true || props.isLoading === true ? "outlined" : "contained"}
                        endIcon={<SendIcon />}
                        loading={props.updateIsLoading === true || props.isLoading === true ? true : false}
                        loadingPosition="end"
                    >
                        Submit
                    </Button>
                </div>
            </div>

        </div >
    );
};

export default StockModal;