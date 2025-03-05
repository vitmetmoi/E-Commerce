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
function CheckOut(props) {
    const defaultFormState = {
        province: '',
        district: '',
        ward: '',
    }
    const userData = useSelector((state) => state.user.userData);
    const addressData = useSelector((state) => state.other);
    const checkOutData = useSelector((state) => state.checkOut.checkOutData);
    const [formState, setFormState] = useState(defaultFormState);
    const dispatch = useDispatch();
    const [getAddressService, { data, isLoading }] = useGetAddresssDataMutation();
    const [openMoreInfo, setOpenMoreInfo] = useState(false);

    console.log('formState', formState)
    console.log('userData', userData);
    console.log('addressData', addressData);
    console.log('checkOutData', checkOutData);
    console.log('dayjs', dayjs())
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

    const handleTime = (addDays) => {
        let time = [];

        let _dayjs = dayjs().add(addDays, 'day');
        console.log('day', _dayjs)
        time.push(_dayjs.get('y'));
        time.push(_dayjs.get('M') + 1);
        time.push(_dayjs.get('D'));
        return (
            <>
                <span> {time[2]}</span>/<span>{time[1]}</span>/<span>{time[0]}</span>
            </>
        );
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
                                <th><span>Amount</span></th>
                                <th><span>Summary</span></th>
                            </thead>

                            <tbody>
                                {
                                    checkOutData && checkOutData.map(item => {
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
                                                        <span>{item.total}</span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='col-right'>
                                                        {(item.total * (+item.price)).toFixed(3)}$
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
                            <input placeholder='Notice to seller...'></input>
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
                                        <span className='sub-text'>In case products are delivered from foreign : {handleTime(3)} to {handleTime(30)}</span>
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

                </div>
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