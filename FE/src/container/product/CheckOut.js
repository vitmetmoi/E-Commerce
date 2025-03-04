import React, { useEffect, useState } from 'react';
import './CheckOut.scss';
import NavigationHome from '../home/NavigationHome';
import AdsHome from '../home/AdsHome';
import { useSelector, useDispatch } from 'react-redux'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useGetAddresssDataMutation } from '../../store/slice/API/otherAPI';
import { setAddresssDataSlice } from '../../store/slice/Reducer/otherSlice';
import _ from 'lodash'
function CheckOut(props) {
    const defaultFormState = {
        province: '',
        district: '',
        ward: '',
    }
    const userData = useSelector((state) => state.user.userData);
    const addressData = useSelector((state) => state.other);
    const [formState, setFormState] = useState(defaultFormState);
    const dispatch = useDispatch();
    const [getAddressService, { data, isLoading }] = useGetAddresssDataMutation();
    console.log('formState', formState)
    console.log('userData', userData);
    console.log('addressData', addressData);

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
                        checkout
                    </div>

                </div>
            </div>
        </>
    );
}

export default CheckOut;