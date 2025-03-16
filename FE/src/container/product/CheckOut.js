import React, { useEffect, useState } from 'react';
import './CheckOut.scss';
import NavigationHome from '../home/NavigationHome';
import AdsHome from '../home/AdsHome';
import { useSelector, useDispatch } from 'react-redux'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useGetAddresssDataMutation } from '../../store/slice/API/otherAPI';
import { setAddresssDataSlice } from '../../store/slice/Reducer/otherSlice';
import _ from 'lodash';
import dayjs from 'dayjs'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import { useGetQRImageMutation } from '../../store/slice/API/checkOutAPI';
import Footer from '../home/Footer';
import { setCheckOutDataSlice } from '../../store/slice/Reducer/checkOutSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCreateBillMutation, useGetBillMutation } from '../../store/slice/API/userAPI';
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
// require('dotenv').config()
function CheckOut(props) {

    const defaultFormState = {
        province: '',
        district: '',
        ward: '',
        note: '',
        billStatus: 'Pending',
    }

    const userData = useSelector((state) => state.user.userData);
    const addressData = useSelector((state) => state.other);
    const checkOutData = useSelector((state) => state.checkOut);
    const [formState, setFormState] = useState(defaultFormState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [getAddressService, { data, isLoading }] = useGetAddresssDataMutation();
    const [getBillService, { }] = useGetBillMutation()
    const [createBillService, { }] = useCreateBillMutation();
    const [getQRImageService, { }] = useGetQRImageMutation();
    const [openMoreInfo, setOpenMoreInfo] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [QRImage, setQRImage] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [paymentMethod, setPaymentMethod] = useState('RECEIVED')
    const [bankingDHId, setBankingDHId] = useState();

    //debug console

    console.log('formState', formState)
    console.log('userData', userData);
    console.log('addressData', addressData);
    console.log('checkOutData', checkOutData);
    // console.log('dayjs', dayjs())
    // console.log('env', process.env.PORT)
    useEffect(() => {
        handleGetAddress();
    }, [])

    const handleGetAddress = async () => {

        if (userData.address.provinceId === 0) {
            let res1 = await getAddressService({ A: '1', B: '0' });
            if (res1) {
                // console.log("res1 address", res1.data);
                dispatch(setAddresssDataSlice({ type: 'PROVINCE', data: res1.data.data }))
            }
        }
        else if (userData.address.provinceId !== 0) {

            let res2 = await getAddressService({ A: '2', B: `${userData.address.provinceId}` });
            let res3 = await getAddressService({ A: '3', B: `${+userData.address.districtId}` });
            if (res2) {
                // console.log("res1 address", res2.data);
                dispatch(setAddresssDataSlice({ type: 'DISTRICT', data: res2.data.data }))
            }
            if (res3) {
                // console.log("res2 address", res3.data);
                dispatch(setAddresssDataSlice({ type: 'WARD', data: res3.data.data }))
                syncAddress();
            }
        }

    }

    const syncAddress = () => {
        let _formState = _.cloneDeep(formState);
        if (addressData && addressData.provinceData) {
            addressData.provinceData.map(item => {
                if (item.id === userData.address.provinceId) {
                    _formState.province = item;
                }
            })
        }

        if (addressData && addressData.districtData) {
            addressData.districtData.map(item => {
                if (item.id === userData.address.districtId) {
                    _formState.district = item;
                }
            })
        }

        if (addressData && addressData.wardData) {
            addressData.wardData.map(item => {
                if (item.id === userData.address.wardId) {
                    _formState.ward = item;
                }
            })
        }
        setFormState(_formState);
    }

    const handleOnChange = (name, value) => {
        let _formState = _.cloneDeep(formState);
        _formState[name] = value;
        setFormState(_formState);
    }

    const handleTime = (addDays) => {
        let time = [];

        let _dayjs = dayjs().add(addDays, 'day');
        // console.log('day', _dayjs)
        time.push(_dayjs.get('y'));
        time.push(_dayjs.get('M') + 1);
        time.push(_dayjs.get('D'));
        return (
            <>
                <span> {time[2]}</span>/<span>{time[1]}</span>/<span>{time[0]}</span>
            </>
        );
    }

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleOpenPayMentModal = async () => {
        setOpenPayment(!openPayment);

        if (openPayment === false) {

            let billRes = await handleCreateBill(paymentMethod);

            if (billRes && billRes.data && billRes.data.EC === 0) {

                let res = await getQRImageService({
                    acc: '0383984836',
                    bank: 'MBBank',
                    amount: '2000', // change if necessary
                    template: 'qronly',
                    des: 'DH' + billRes.data.DT,
                    download: 'false',
                });
                handleOnChange('billStatus', 'Pending');
                await createAutoGetBill('ONE', billRes.data.DT)

                if (res) {
                    console.log('res qr', res.data);
                    dispatch(setCheckOutDataSlice({ type: 'QRImage', data: res.data }))
                    handleSetQRImg(res.data);
                }

            }

        }

    }

    const handleSubmit = async () => {
        let billRes = await handleCreateBill(paymentMethod);
        if (billRes && billRes.data) {
            toast('Order completed!')
            navigate('/')
        }
    }

    const handleSetQRImg = (data) => {
        var reader = new FileReader();
        reader.readAsDataURL(data);

        setTimeout(() => {
            let srcValue = reader.result;
            console.log('img', srcValue);
            setQRImage(srcValue);
        }, 1000);

    }

    const calcSumPrice = () => {
        let sum = 0;
        checkOutData && checkOutData.clothesData.map(item => {
            sum = sum + (+(item.total * (+item.price - (item.price * (item.discount / 100)))).toFixed(3));
        })

        return sum.toFixed(3);
    }

    const handleCreateBill = async (type) => {

        let currentTime = dayjs().get('year') + '/' + dayjs().get('month') + '/' + dayjs().get('date') + '/' + dayjs().get('hour') + '/' + dayjs().get('minute') + '/' + dayjs().get('second')

        let colorSizeData = []
        if (checkOutData && checkOutData.clothesData) {
            checkOutData.clothesData.map(item => {
                let obj = {}
                obj.colorSizeId = item.colorSizeId;
                obj.total = item.total;
                colorSizeData.push(obj)
            })
        }


        let billData = {
            time: currentTime,
            userId: userData.id,
            amount: calcSumPrice(),
            note: formState.note,
            colorSizeData: colorSizeData,
            type: type
        }

        console.log('billData', billData)

        let res = await createBillService(billData);
        if (res && res.data) {
            setBankingDHId(res.data.DT)
            return res
        }
    }

    const rendererCountDown = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>Time out!</span>;
        } else {
            // Render a countdown
            return <span>( QR will be expired in: {zeroPad(minutes)}:{zeroPad(seconds)} )</span>;
        }
    };

    const createAutoGetBill = async (type, id) => {
        let intervalBillId = setInterval(() => GetBillApi(type, id), 5000);

        setTimeout(() => {
            clearInterval(intervalBillId);
        }, 300000);


    }

    const GetBillApi = async (type, id) => {
        let res = await getBillService({ type: type, id: id });
        if (res && res.data) {
            handleOnChange('billStatus', res.data.DT.status);
        }
    }

    return (
        <>
            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>

            <div className='check-out-container'>
                <div className='check-out-content'>

                    <div className='address-container'>
                        <div className='horizone-line'></div>
                        <div className='address-content'>
                            <div className='location'>
                                <LocationOnIcon />
                                <span>Address for received product</span>
                            </div>
                            <div className='address'>
                                <span className='add-left'>{userData.firstName} {userData.lastName} ( {userData.phoneNumber} )</span>
                                <span className='add-right'> {userData.address.note}, {formState.ward.full_name_en}, {formState.district.full_name_en}, {formState.province.full_name_en}</span>
                                <div className='default'>Default</div>
                            </div>
                        </div>
                    </div>

                    <div className='checkout-side'>

                        <table>
                            <thead>
                                <th> <h5>Product</h5></th>
                                <th> </th>
                                <th><span>Price</span></th>
                                <th><span>Discount</span></th>
                                <th><span>Amount</span></th>
                                <th><span>Summary</span></th>
                            </thead>

                            <tbody>
                                {
                                    checkOutData && checkOutData.clothesData && checkOutData.clothesData.map(item => {
                                        return (
                                            <tr>

                                                <td>
                                                    <div className='product'>
                                                        <img className='img' src={item.image}></img>
                                                        <div>
                                                            <span>{item.name}</span>
                                                            <div className='default'>Order item</div>
                                                        </div>
                                                    </div>

                                                </td>

                                                <td>
                                                    <div className='gap'>
                                                        type: {item.type}, {item.category}
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='col-right'>
                                                        <span >{item.price}$</span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='col-right'>
                                                        <span>{item.discount}%</span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='col-right'>
                                                        <span>{item.total}</span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='col-right'>
                                                        {(item.total * (+item.price - (item.price * (item.discount / 100)))).toFixed(3)}$
                                                    </div>
                                                </td>

                                            </tr>
                                        );
                                    })
                                }


                            </tbody>
                        </table>
                    </div>

                    <div className='sumary-section'>

                        <div className='content-left'>
                            <label>Message: </label>
                            <input
                                onChange={(event) => handleOnChange('note', event.target.value)}
                                placeholder='Notice to seller...'></input>
                        </div>

                        <div className='content-right'>
                            <ul>
                                <li>
                                    <div className='inf-left'>
                                        <span>Delivery fee: </span>
                                    </div>
                                    <div className='inf-right'>
                                        <span className='main-text'>0$ (Free)</span>
                                        <span className='sub-text'>Recieved product between : {handleTime(3)} to {handleTime(7)}</span>
                                        <span className='sub-text'>In case products are delivered from foreign : {handleTime(7)} to {handleTime(30)}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className='inf-left'>
                                        <span>Jointly checked</span>

                                    </div>
                                    <div className='inf-right'>

                                        <HelpOutlineIcon
                                            onClick={() => setOpenMoreInfo(!openMoreInfo)}
                                            className='icon'
                                        ></HelpOutlineIcon>


                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className='voucher-section'>
                        <div className='content-left'>
                            <DiscountIcon className='icon'></DiscountIcon>
                            <span>AFGK x Who.AU x Stussy Voucher</span>
                        </div>
                        <div className='content-right'>
                            <button>Use my voucher!</button>
                        </div>
                    </div>

                    <div className='payment-section'>
                        <div className='section1'>
                            <h4>Payment</h4>

                            <div className='menu' >


                                <Button
                                    id="basic-button"
                                    aria-controls={openMenu ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openMenu ? 'true' : undefined}
                                    onClick={handleClickMenu}
                                >
                                    {paymentMethod === 'RECEIVED'
                                        ?
                                        <span>Pay after received</span>
                                        :
                                        <span>Pay via banking</span>
                                    }

                                </Button>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={() => setAnchorEl(null)}
                                    style={{
                                        // position: 'relative'
                                    }}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => setPaymentMethod('RECEIVED')}>Pay after received</MenuItem>
                                    <MenuItem onClick={() => setPaymentMethod('BANKING')}>Pay via banking</MenuItem>

                                </Menu>

                            </div>

                        </div>
                        <div className='section2'>
                            <div className='price-container'>
                                <div className='info-section'>
                                    <div className='left'>Summary price </div>
                                    <div className='right'>{calcSumPrice()}$</div>
                                </div>

                                <div className='info-section'>
                                    <div className='left'>Delivery fee </div>
                                    <div className='right'>0$</div>
                                </div>

                                <div className='info-section'>
                                    <div className='left'>Amount to be paid</div>
                                    <div className='right'>{calcSumPrice()}$</div>
                                </div>

                            </div>

                        </div>
                        <div className='section3'>

                            <button className='btn1'>Continue Shopping</button>

                            {
                                paymentMethod === 'RECEIVED' ?
                                    <button
                                        onClick={() => handleSubmit()}
                                        className='btn2'>
                                        Order Now
                                    </button>
                                    :
                                    <button
                                        onClick={() => handleOpenPayMentModal()}
                                        className='btn2'>
                                        Open Banking
                                    </button>

                            }



                        </div>
                    </div>

                </div>

                <Footer></Footer>

                <Dialog
                    open={openPayment}
                    onClose={() => setOpenPayment(!openPayment)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    keepMounted={false}
                >
                    <DialogTitle
                        style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
                        id="alert-dialog-title">
                        {"Guide for payment via banking"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div class="dialog-qr-box">

                                <div className='content-left'>

                                    <span className='header-title'>Method 1: Open your banking app and scan QR</span>

                                    <div className='waiting'>
                                        <span>Status: </span>
                                        {
                                            QRImage ?

                                                <div>
                                                    {
                                                        formState.billStatus === 'Done' ?
                                                            <div>
                                                                <Alert severity="success">Payment successful !.</Alert>
                                                            </div>
                                                            :
                                                            <div>
                                                                <CircularProgress
                                                                    style={{ marginRight: '10px' }}
                                                                    size="20px" />

                                                                <Countdown
                                                                    date={Date.now() + 300000}
                                                                    renderer={rendererCountDown}

                                                                />
                                                            </div>

                                                    }

                                                </div>


                                                : ''
                                        }

                                    </div>


                                    <div className='qr-container'>
                                        <img src={QRImage ? QRImage : ''}></img>
                                    </div>
                                    <span>List bank supports paying via QR code</span>
                                    <img
                                        className='img-banks'
                                        src='https://tttctt.1cdn.vn/2022/01/01/5.jpg'
                                    // src='https://www.netstars.vn/wp-content/uploads/2021/05/partner-2.png'
                                    ></img>

                                </div>

                                <div className='content-right'>
                                    <span className='header-title'>Method 2: Paying manual with informations</span>

                                    <img
                                        className='mbbank'
                                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Logo_MB_new.png/1200px-Logo_MB_new.png'>
                                    </img>

                                    <span className='header-title'>Bank name: MB Bank</span>

                                    <div className='inf-container'>
                                        <div className='info-section'>
                                            <div className='left'>Name: </div>
                                            <div className='right'>LO BAO DUY</div>
                                        </div>

                                        <div className='info-section'>
                                            <div className='left'>Account number: </div>
                                            <div className='right'>0383984836</div>
                                        </div>

                                        <div className='info-section'>
                                            <div className='left'>Amount: </div>
                                            <div className='right'>{calcSumPrice()}$</div>
                                        </div>

                                        <div className='info-section'>
                                            <div className='left'>Description: </div>
                                            <div className='right'>DH{bankingDHId}</div>
                                        </div>
                                    </div>

                                    <Alert variant="outlined" severity="info">Notice: Please keeps description for system vertify your bill</Alert>


                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>

                </Dialog>

            </div>



            <Dialog
                open={openMoreInfo}
                onClose={() => setOpenMoreInfo(!openMoreInfo)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
                    id="alert-dialog-title">
                    {"When will I be charged?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div class="dialog-box">
                            <ul style={{ marginTop: '30px' }} >
                                <li style={{ marginTop: '7px' }}>Orders with a value of less than 3,000,000 VND (order value without Voucher Shopee, Shopee Xu, and shipping fee) will not be charged.</li>
                                <li style={{ marginTop: '7px' }}>Orders do NOT contain products in the "not charging" category.</li>
                                <li style={{ marginTop: '7px' }}>Orders are NOT delivered by Viettel Post, VN Post, VN Tien Giang, Kien Nguyen Delivery, or other delivery channels.</li>
                                <li style={{ marginTop: '7px' }}>The user MUST NOT have any signs of abusing the program or Shopee's policies.</li>
                            </ul>
                        </div>
                    </DialogContentText>
                </DialogContent>

            </Dialog>



        </>
    );
}

export default CheckOut;