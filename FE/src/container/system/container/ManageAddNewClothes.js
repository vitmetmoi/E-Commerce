import React, { useState, useEffect } from 'react';
import './ManageAddNewClothes.scss'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import { amber, blue, green, grey, pink, red, yellow } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import _, { size } from 'lodash'
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import MDEditor from '@uiw/react-md-editor';
import { useCreateClothesMutation } from '../../../store/slice/API/systemAPI';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CircularProgress from '@mui/material/CircularProgress';
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
        { label: 'Green', isSelected: false },
        { label: 'Grey', isSelected: false },
        { label: 'Pink', isSelected: false },
        { label: 'Beige', isSelected: false },
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
    const [nameProduct, setNameProduct] = useState('')
    const [contentMarkdown, setContentMarkDown] = useState("");
    const [sizeArray, setSizeArray] = useState(defaultSizeValue);
    const [colorArray, setColorArray] = useState(defaultColorValue)
    const [stockArray, setStockArray] = useState([])
    const [imgArray, setImgArray] = useState([]);
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');


    const [stockValue, setStockValue] = useState('');
    const [prevImg, setPrevImg] = useState(imgArray[0]);

    //mutation
    const [createClothesService, { data, isLoading }] = useCreateClothesMutation();

    //Loading 
    const [submitIsLoading, setSubmitIsLoading] = useState(false);

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
            console.log(_stockArray);
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

    const handleAddImage = (img) => {
        if (img) {
            let _imgArray = _.cloneDeep(imgArray);
            _imgArray.push(img);
            setImgArray(_imgArray)
        }

    }

    const handleSetPrevImg = (item) => {
        let img = '';
        if (item) {
            img = URL.createObjectURL(item);
        }

        if (img) {
            setPrevImg(img)
        }

    }

    const handleClearData = () => {
        setNameProduct('');
        setContentMarkDown('');
        setStockArray([]);
        setImgArray([]);
        setPrevImg('');
        setPrice('');
        setDiscount('');
        setCategory('')
        setType('');
        setStockValue('');
        setColorArray(defaultColorValue);
        setSizeArray(defaultSizeValue);
    }

    const handleSubmit = async () => {

        let imgDataArray = [];

        imgArray.map(item => {
            let reader = new FileReader();
            reader.readAsDataURL(item);
            setTimeout(() => {
                if (reader && reader.result) {
                    imgDataArray.push(reader.result)
                }
            }, 500);

        })

        setSubmitIsLoading(true);

        setTimeout(async () => {
            let data = {
                name: nameProduct,
                contentMarkdown: contentMarkdown,
                stockData: stockArray,
                imgArray: imgDataArray,
                price: price,
                discount: discount,
                category: category,
                type: type
            }

            let res = await createClothesService(data);
            if (res && res.data && res.data.EC === 0) {
                toast.success(res.data.EM)
            }
            else {
                toast(res && res.data && res.data.EM ? res.data.EM : "error!")
            }

        }, 4000);

        setTimeout(() => {
            setSubmitIsLoading(false);
        }, 5000);

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

                            <div className='button'>
                                <button
                                    onClick={() => handleClearData()}
                                    className='button-container btn1'>
                                    <AutorenewIcon style={{ fontSize: "130%" }}></AutorenewIcon>
                                    <span>Resest</span>
                                </button>
                            </div>

                            <div className='button'>
                                <button
                                    onClick={() => handleSubmit()}
                                    className='button-container'>
                                    {
                                        submitIsLoading === false ?
                                            <>
                                                <DoneIcon style={{ fontSize: "130%" }}></DoneIcon>
                                                <span>Add product</span>
                                            </>
                                            :
                                            <CircularProgress style={{ height: "30px", width: "30px" }}></CircularProgress>
                                    }


                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='body-content'>
                        <div className='box-left'>

                            <span className='title'>General Information</span>
                            <div className='section'>
                                <div className='text-field'>
                                    <label for="exampleInputEmail1" class="form-label section-title">Name Product</label>
                                    <input
                                        // data-bs-theme="dark"
                                        value={nameProduct}
                                        type="email"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        ria-describedby="emailHelp"
                                        onChange={(event) => setNameProduct(event.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className='section'>
                                <div className='text-field'>
                                    <label for="exampleInputEmail1" class="form-label section-title">Description Product</label>
                                    <div
                                    // data-color-mode="dark"  
                                    >
                                        <MDEditor
                                            value={contentMarkdown}
                                            onChange={setContentMarkDown}
                                        />
                                    </div>


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

                                        <div className='color'>
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio
                                                    onClick={() => handleChange('color', 6)}
                                                    checked={colorArray[6].isSelected}
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
                                                    onClick={() => handleChange('color', 7)}
                                                    checked={colorArray[7].isSelected}
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
                                                    onClick={() => handleChange('color', 8)}
                                                    checked={colorArray[8].isSelected}
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
                            <div className='box-top'>
                                <span className='title'>Upload Img</span>

                                <PhotoProvider>
                                    <PhotoView src={`${prevImg && prevImg !== '' ? prevImg : (imgArray && imgArray[0] && URL.createObjectURL(imgArray[0]))}`}>
                                        <div
                                            style={{ backgroundImage: "url(" + `${prevImg && prevImg !== '' ? prevImg : (imgArray && imgArray[0] && URL.createObjectURL(imgArray[0]))}` + ")" }}
                                            className='prev-image'
                                        ></div>
                                    </PhotoView>
                                </PhotoProvider>

                                <div className='img-swiper'>
                                    <Swiper
                                        modules={[Navigation, A11y, Autoplay]}
                                        spaceBetween={12}
                                        slidesPerView={4}
                                        navigation

                                    >
                                        {
                                            imgArray && imgArray.length > 0 && imgArray.map(item => {

                                                return (
                                                    <SwiperSlide>
                                                        <div
                                                            onClick={() => handleSetPrevImg(item)}
                                                            style={{ backgroundImage: "url(" + `${URL.createObjectURL(item)}` + ")", }}
                                                            className='relevant-img'>
                                                        </div>
                                                    </SwiperSlide>)
                                            })
                                        }


                                        <SwiperSlide>
                                            <div className='add-new-img'>
                                                <input
                                                    type='file'
                                                    className='img-input'
                                                    onChange={(event) => handleAddImage(event.target.files[0])}
                                                >
                                                </input>
                                                <AddPhotoAlternateIcon
                                                    color='primary'
                                                    className='img-icon'
                                                >
                                                </AddPhotoAlternateIcon>


                                            </div>
                                        </SwiperSlide>
                                    </Swiper>

                                </div>
                            </div>
                            <div className='box-child'>
                                <span className='title'>Price & Discount</span>
                                <div className='price-discount-container'>
                                    <div className='price'>
                                        <InputLabel htmlFor="standard-adornment-amount">Base pricing</InputLabel>
                                        <Input
                                            value={price}
                                            onChange={(event) => setPrice(event.target.value)}
                                            id="standard-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                    </div>
                                    <div className='discount'>
                                        <InputLabel htmlFor="standard-adornment-amount">Discount</InputLabel>
                                        <Input
                                            value={discount}
                                            onChange={(event) => setDiscount(event.target.value)}
                                            id="standard-adornment-amount"
                                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='box-child'>
                                <span className='title'>Category & Type</span>
                                <div className='category-type-container'>
                                    <div className='category'>

                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="grouped-select">Category</InputLabel>
                                            <Select
                                                value={category}
                                                onChange={(event) => setCategory(event.target.value)}
                                                id="grouped-select"
                                                label="Grouping">
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <ListSubheader>Category 1</ListSubheader>
                                                <MenuItem value={'Out-Wear'}>Out-Wear</MenuItem>
                                                <MenuItem value={'Hoodie'}>Hoodie</MenuItem>
                                                <MenuItem value={'Sweater'}>Sweater</MenuItem>
                                                <ListSubheader>Category 2</ListSubheader>
                                                <MenuItem value={'T-shirt'}>T-shirt</MenuItem>
                                                <ListSubheader>Category 3</ListSubheader>
                                                <MenuItem value={'Bottom'}>Bottom</MenuItem>
                                                <ListSubheader>Category 4</ListSubheader>
                                                <MenuItem value={'Accessory'}>Accessory</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </div>
                                    <div className='type'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Age"
                                                value={type}
                                                onChange={(event) => setType(event.target.value)}
                                            >
                                                <MenuItem value={'Men'}>Men</MenuItem>
                                                <MenuItem value={'Women'}>Women</MenuItem>
                                                <MenuItem value={'Unisex'}>Unisex</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div >

        </>
    );
}



export default ManageAddNewClothes;