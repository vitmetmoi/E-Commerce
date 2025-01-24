import React, { useState, useEffect } from 'react';
import './ManageAddNewClothes.scss'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import { blue, green, pink, red, yellow } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import _, { size } from 'lodash'
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';



function ManageAddNewClothes(props) {
    const defaultSizeValue = [
        { label: 'S', isSelected: false },
        { label: 'M', isSelected: false },
        { label: 'L', isSelected: false },
        { label: 'XL', isSelected: false },
        { label: 'XXL', isSelected: false }
    ]
    const defaultColorValue = [
        { label: 'White', isSelected: false },
        { label: 'Black', isSelected: false },
        { label: 'Yellow', isSelected: false },
        { label: 'Red', isSelected: false },
        { label: 'Blue', isSelected: false },
        { label: 'Green', isSelected: false }
    ]

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
                        onClick={() => handleDeleteRow(params.id)}
                        aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                )
            },
            width: 100,
        },
    ];

    const [selectedValue, setSelectedValue] = useState('a');
    const [sizeArray, setSizeArray] = useState(defaultSizeValue);
    const [colorArray, setColorArray] = useState(defaultColorValue)
    const [stockValue, setStockValue] = useState('');
    const [stockArray, setStockArray] = useState([])


    const handleChange = (name, order) => {

        if (name === 'size') {
            let _sizeArray = _.cloneDeep(defaultSizeValue);
            _sizeArray[order].isSelected = !_sizeArray[order].isSelected
            setSizeArray(_sizeArray)
        }
        else if (name === 'color') {
            let _colorArray = _.cloneDeep(defaultColorValue);
            _colorArray[order].isSelected = !_colorArray[order].isSelected
            console.log('arr', _colorArray);
            setColorArray(_colorArray)
        }

    }

    const handleAddStockRow = () => {
        let isValid = true;
        let size, color, stock = '';

        sizeArray.map((item) => {
            if (item.isSelected === true) {
                size = item.label;
            }
        })

        colorArray.map((item) => {
            if (item.isSelected === true) {
                color = item.label;
            }
        })
        if (!size || size === '') {
            toast('Missing size value!')
            isValid = false
        }
        if (!color || color === '') {
            toast('Missing color value!')
            isValid = false
        }
        if (!stockValue || stockValue === '') {
            toast('Missing stock value!')
            isValid = false
        }
        else {
            stock = stockValue;
        }
        if (isValid === true) {
            let _stockArray = _.cloneDeep(stockArray);
            let obj = { id: _stockArray.length + 1, size: size, color: color, stock: stockValue }
            _stockArray.push(obj);
            setStockArray(_stockArray);
        }
        else { }

    }

    const handleDeleteRow = (id) => {
        let _stockArray = _.cloneDeep(stockArray);
        stockArray.map((item, index) => {
            if (item.id === id) {
                _stockArray.splice(index, 1)
            }
        })
        setStockArray(_stockArray)
    }




    return (
        <>
            <div className='create-clothes-container'>
                <div className='create-clothes-content'>

                    <div className='header-content'>
                        <div className='content-left'>
                            <div className='title-box'>
                                <AutoAwesomeIcon className='icon'></AutoAwesomeIcon>
                                <span className='title'>Add new product</span>
                            </div>
                        </div>
                        <div className='content-right'>

                            <button className='button-container btn1'>
                                <DoneIcon style={{ fontSize: "130%" }}></DoneIcon>
                                <span>Save draft</span>
                            </button>

                            <button className='button-container'>
                                <DoneIcon style={{ fontSize: "130%" }}></DoneIcon>
                                <span>Add product</span>
                            </button>
                        </div>
                    </div>

                    <div className='body-content'>
                        <div className='box-left'>

                            <span className='title'>General Information</span>
                            <div className='section'>
                                <div className='text-field'>
                                    <label for="exampleInputEmail1" class="form-label section-title">Name Product</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                </div>
                            </div>
                            <div className='section'>
                                <div className='text-field'>
                                    <label for="exampleInputEmail1" class="form-label section-title">Description Product</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div>
                            <div className='section'>
                                <div className='size-group'>
                                    <span className='title'>Size</span>
                                    <span className='description'>Pick avaiable size</span>
                                    <div className='size-container'>
                                        <button
                                            onClick={() => handleChange('size', 0)}
                                            className={sizeArray[0].isSelected ? 'size active' : 'size'}>
                                            S
                                        </button>
                                        <button
                                            onClick={() => handleChange('size', 1)}
                                            className={sizeArray[1].isSelected ? 'size active' : 'size'}>
                                            M
                                        </button>
                                        <button
                                            onClick={() => handleChange('size', 2)}
                                            className={sizeArray[2].isSelected ? 'size active' : 'size'}>
                                            L
                                        </button>
                                        <button
                                            onClick={() => handleChange('size', 3)}
                                            className={sizeArray[3].isSelected ? 'size active' : 'size'}>
                                            XL
                                        </button>
                                        <button
                                            onClick={() => handleChange('size', 4)}
                                            className={sizeArray[4].isSelected ? 'size active' : 'size'}>
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
                                                    checked={colorArray[0].isSelected}
                                                    onClick={() => handleChange('color', 0)}
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
                                                    checked={colorArray[1].isSelected}
                                                    onClick={() => handleChange('color', 1)}
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
                                                    onClick={() => handleChange('color', 2)}
                                                    checked={colorArray[2].isSelected}
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
                                                    onClick={() => handleChange('color', 3)}
                                                    checked={colorArray[3].isSelected}
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
                                                    onClick={() => handleChange('color', 4)}
                                                    checked={colorArray[4].isSelected}
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
                                                    onClick={() => handleChange('color', 5)}
                                                    checked={colorArray[5].isSelected}
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

                                    </div>
                                </div>
                            </div>

                            <div className='section'>
                                <div className='stock-group'>
                                    <span className='title'>Stock</span>
                                    <span className='description'>Create stock for product</span>
                                    <div className='stock-input'>
                                        <TextField
                                            sx={{ marginTop: 2 }}
                                            required
                                            id="outlined-required"
                                            label="Amount"
                                            value={stockValue}
                                            onChange={(event) => setStockValue(event.target.value)}
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
                                        onClick={() => handleAddStockRow()}
                                        startIcon={<KeyboardDoubleArrowDownIcon />}>
                                        Save
                                    </Button>

                                </div>
                            </div>

                            <div className='section'>
                                <DataGrid
                                    rows={stockArray}
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
                        <div className='box-right'>
                            <div className='box-top'></div>
                            <div className='box-child'></div>
                            <div className='box-child'></div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}



export default ManageAddNewClothes;