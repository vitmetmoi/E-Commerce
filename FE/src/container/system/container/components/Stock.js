import React from 'react';
import './Stock.scss'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import { amber, blue, green, grey, pink, red, yellow } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import _, { size } from 'lodash'
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
function Stock(props) {


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'size',
            headerName: 'Size',
            width: 185,
            editable: true,
        },
        {
            field: 'color',
            headerName: 'Color',
            width: 185,
            editable: true,
        },

        {
            field: 'stock',
            headerName: 'Stock',
            width: 100,
        },
        {
            field: 'actions',
            headerName: '',
            type: 'actions',
            renderCell: (params) => {
                return (
                    <IconButton
                        onClick={() => props.handleDeleteRow(params.id)}
                        aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                )
            },
            width: 100,
        },
    ];

    return (
        <div className='stock-container'>
            <div className='section'>
                <div className='size-group'>
                    <span className='title'>Size</span>
                    <span className='description'>Pick avaiable size</span>
                    <div className='size-container'>
                        <button
                            onClick={() => props.handleChange('size', 0)}
                            className={props && props.sizeArray && props.sizeArray[0].isSelected ? 'size active' : 'size'}>
                            S
                        </button>
                        <button
                            onClick={() => props.handleChange('size', 1)}
                            className={props && props.sizeArray && props.sizeArray[1].isSelected ? 'size active' : 'size'}>
                            M
                        </button>
                        <button
                            onClick={() => props.handleChange('size', 2)}
                            className={props && props.sizeArray && props.sizeArray[2].isSelected ? 'size active' : 'size'}>
                            L
                        </button>
                        <button
                            onClick={() => props.handleChange('size', 3)}
                            className={props && props.sizeArray && props.sizeArray[3].isSelected ? 'size active' : 'size'}>
                            XL
                        </button>
                        <button
                            onClick={() => props.handleChange('size', 4)}
                            className={props && props.sizeArray && props.sizeArray[4].isSelected ? 'size active' : 'size'}>
                            XXL
                        </button>
                    </div>
                </div>
                <div className='color-group'>
                    <span className='title'>Color</span>
                    <span className='description'>Pick avaiable color</span>
                    <div className='color-container'>
                        <div className='color'>
                            <FormControlLabel

                                control={<Radio
                                    checked={props && props.colorArray && props.colorArray[0].isSelected}
                                    onClick={() => props.handleChange('color', 0)}
                                    value={''}
                                    sx={{
                                        color: 'white',
                                        '&.Mui-checked': {
                                            color: 'white',
                                        },
                                    }}
                                />}
                                label="White" />

                        </div>
                        <div className='color'>
                            <FormControlLabel

                                control={<Radio
                                    checked={props && props.colorArray && props.colorArray[1].isSelected}
                                    onClick={() => props.handleChange('color', 1)}
                                    value={''}
                                    sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                />}
                                label="Black" />
                        </div>
                        <div className='color'>
                            <FormControlLabel

                                control={<Radio
                                    onClick={() => props.handleChange('color', 2)}
                                    checked={props && props.colorArray && props.colorArray[2].isSelected}
                                    value={''}
                                    sx={{
                                        color: yellow[800],
                                        '&.Mui-checked': {
                                            color: yellow[600],
                                        },
                                    }}
                                />}
                                label="Yellow" />
                        </div>
                        <div className='color'>
                            <FormControlLabel
                                value="female"

                                control={<Radio
                                    onClick={() => props.handleChange('color', 3)}
                                    checked={props && props.colorArray && props.colorArray[3].isSelected}
                                    value={''}
                                    sx={{
                                        color: red[800],
                                        '&.Mui-checked': {
                                            color: red[600],
                                        },
                                    }}
                                />}
                                label="Red" />
                        </div>
                        <div className='color'>
                            <FormControlLabel
                                value="female"

                                control={<Radio
                                    onClick={() => props.handleChange('color', 4)}
                                    checked={props && props.colorArray && props.colorArray[4].isSelected}
                                    value={''}
                                    sx={{
                                        color: blue[800],
                                        '&.Mui-checked': {
                                            color: blue[600],
                                        },
                                    }}
                                />}
                                label="Blue" />
                        </div>
                        <div className='color'>
                            <FormControlLabel
                                value="female"
                                control={<Radio
                                    onClick={() => props.handleChange('color', 5)}
                                    checked={props && props.colorArray && props.colorArray[5].isSelected}
                                    value={''}
                                    sx={{
                                        color: green[800],
                                        '&.Mui-checked': {
                                            color: green[600],
                                        },
                                    }}
                                />}
                                label="Green" />
                        </div>

                        <div className='color'>
                            <FormControlLabel
                                value="female"
                                control={<Radio
                                    onClick={() => props.handleChange('color', 6)}
                                    checked={props && props.colorArray && props.colorArray[6].isSelected}
                                    value={''}
                                    sx={{
                                        color: grey[800],
                                        '&.Mui-checked': {
                                            color: grey[600],
                                        },
                                    }}
                                />}
                                label="Grey" />
                        </div>

                        <div className='color'>
                            <FormControlLabel
                                value="female"
                                control={<Radio
                                    onClick={() => props.handleChange('color', 7)}
                                    checked={props && props.colorArray && props.colorArray[7].isSelected}
                                    value={''}
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        },
                                    }}
                                />}
                                label="Pink" />
                        </div>

                        <div className='color'>
                            <FormControlLabel
                                value="female"
                                control={<Radio
                                    onClick={() => props.handleChange('color', 8)}
                                    checked={props && props.colorArray && props.colorArray[8].isSelected}
                                    value={''}
                                    sx={{
                                        color: amber[100],
                                        '&.Mui-checked': {
                                            color: amber[200],
                                        },
                                    }}
                                />}
                                label="Beige" />
                        </div>


                    </div>
                </div>
            </div>

            <div className='section' style={{ marginTop: '50px' }}>
                <div className='stock-group'>
                    <span className='title'>Stock</span>
                    <span className='description'>Create stock for product</span>
                    <div className='stock-input'>
                        <TextField
                            sx={{ marginTop: 2 }}
                            required
                            id="outlined-required"
                            label="Amount"
                            value={props.stockValue}
                            onChange={(event) => props.setStockValue(event.target.value)}
                        />
                    </div>
                </div>
                <div className='submit-group'>
                    <span className='title'>Submit stock</span>
                    <span className='description'>Push product stock to store</span>

                    <Button
                        sx={{ marginTop: 3 }}
                        variant="outlined"
                        loading={false}
                        loadingPosition="start"
                        onClick={() => props.handleAddStockRow()}
                        startIcon={<KeyboardDoubleArrowDownIcon />}>
                        Save
                    </Button>

                </div>
            </div>


            <div className='section'>
                <DataGrid
                    rows={props.stockArray}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    sx={{ marginTop: 2 }}

                />
            </div>
        </div>
    );
}

export default Stock;