import React, { useState, useEffect } from 'react';
import './ManageAddNewClothes.scss'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import _, { size } from 'lodash'
import DoneIcon from '@mui/icons-material/Done';
import { ToastContainer, toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { useCreateClothesMutation } from '../../../store/slice/API/systemAPI';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CircularProgress from '@mui/material/CircularProgress';
import MarkdownEditor from './components/MarkdownEditor';
import Stock from './components/Stock';
import UploadImg from './components/UploadImg';
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
    const [prevImg, setPrevImg] = useState();

    //mutation
    const [createClothesService, { data, isLoading }] = useCreateClothesMutation();

    //Loading 
    const [submitIsLoading, setSubmitIsLoading] = useState(false);


    const handleDeleteImg = () => {
        if (prevImg !== 0 && prevImg) {
            let _imgArray = _.cloneDeep(imgArray);
            _imgArray.splice(prevImg, 1);
            setImgArray(_imgArray)
        }
        else {
            toast('Missing Image!')
        }

    }

    const handleReplaceImg = (img) => {
        if (img) {
            let _imgArray = _.cloneDeep(imgArray);
            let reader = new FileReader();
            reader.readAsDataURL(img);
            setTimeout(() => {
                if (reader.result) {
                    _imgArray[prevImg] = reader.result;
                }
                setTimeout(() => {
                    setImgArray(_imgArray)
                }, 500);
            }, 500);

        }
    }


    const handleChange = (name, order) => {

        if (name === 'size') {
            let _sizeArray = _.cloneDeep(defaultSizeValue);
            _sizeArray[order].isSelected = !_sizeArray[order].isSelected
            setSizeArray(_sizeArray)
        }
        else if (name === 'color') {
            let _colorArray = _.cloneDeep(defaultColorValue);
            _colorArray[order].isSelected = !_colorArray[order].isSelected
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
            var reader = new FileReader();
            reader.readAsDataURL(img);
            setTimeout(() => {
                _imgArray.push(reader.result);
                setImgArray(_imgArray)
            }, 500);

        }

    }

    const handleSetPrevImg = (item) => {
        setPrevImg(item)
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


        setSubmitIsLoading(true);

        setTimeout(async () => {
            let data = {
                name: nameProduct,
                contentMarkdown: contentMarkdown,
                stockData: stockArray,
                imgArray: imgArray,
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

    window.dispatchEvent(new Event("storage"));

    window.addEventListener('storage', () => {
        console.log("Change to local storage!");
        // ...
    })

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
                                        data-bs-theme={localStorage.getItem('toolpad-mode')}
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
                                    <MarkdownEditor
                                        contentMarkdown={contentMarkdown}
                                        setContentMarkDown={setContentMarkDown}
                                    ></MarkdownEditor>
                                </div>
                            </div>

                            <Stock
                                handleDeleteRow={handleDeleteRow}
                                handleChange={handleChange}
                                colorArray={colorArray ? colorArray : ['']}
                                sizeArray={sizeArray ? sizeArray : ['']}
                                stockValue={stockValue}
                                setStockValue={setStockValue}
                                handleAddStockRow={handleAddStockRow}
                                stockArray={stockArray ? stockArray : ['']}
                            ></Stock>



                        </div>
                        <div className='box-right'>


                            <div className='box-top'>
                                <span className='title'>Upload Img</span>

                                <UploadImg
                                    prevImg={prevImg}
                                    imgArray={imgArray}
                                    handleSetPrevImg={handleSetPrevImg}
                                    handleAddImage={handleAddImage}
                                    handleDeleteImg={handleDeleteImg}
                                    handleReplaceImg={handleReplaceImg}
                                ></UploadImg>

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
                                                <ListSubheader>category: TOP</ListSubheader>
                                                <MenuItem value={'T-Shirt'}>T-shirt</MenuItem>
                                                <MenuItem value={'Jacket'}>Jacket</MenuItem>
                                                <MenuItem value={'Hoodie'}>Hoodie</MenuItem>
                                                <MenuItem value={'Sweater'}>Sweater</MenuItem>
                                                <MenuItem value={'Cardigan'}>Cardigan</MenuItem>
                                                <ListSubheader>category: BOTTOM</ListSubheader>
                                                <MenuItem value={'Long-Pants'}>Long pants</MenuItem>
                                                <MenuItem value={'Short'}>Short</MenuItem>
                                                <MenuItem value={'Skirt'}>Skirt</MenuItem>
                                                <ListSubheader>category: ACC</ListSubheader>
                                                <MenuItem value={'Shoes'}>Shoes</MenuItem>
                                                <MenuItem value={'Hat'}>Hat</MenuItem>
                                                <MenuItem value={'Backpack'}>Backpack</MenuItem>
                                                <MenuItem value={'Slides'}>Slides</MenuItem>
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