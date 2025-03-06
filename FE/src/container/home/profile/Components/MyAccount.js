import React, { useEffect, useState } from 'react';
import './MyAccount.scss';
import Badge from '@mui/material/Badge';
import { alpha, styled } from '@mui/material/styles';
import { IconButton, Backdrop, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import _ from 'lodash'
import { useGetAddresssDataMutation } from '../../../../store/slice/API/otherAPI';
import { setAddresssDataSlice } from '../../../../store/slice/Reducer/otherSlice';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import { useUpdateMutation } from '../../../../store/slice/API/userAPI';
import { toast } from 'react-toastify';
import { setUserData } from '../../../../store/slice/Reducer/userSlice';


function MyAccount(props) {

    const userData = useSelector((state) => state.user.userData);
    const addressData = useSelector((state) => state.other);
    const dispatch = useDispatch();
    const [birthValue, setBirthValue] = useState(dayjs('2025-1-1'));
    const [formState, setFormState] = useState(userData);
    const [isDisabledState, setIsDisabledState] = useState(true);
    const [getAddressService, { data, isLoading }] = useGetAddresssDataMutation();
    const [updateUserService, { isLoading: updateisLoading }] = useUpdateMutation();
    const [isOpenBackDrop, setIsOpenBackDrop] = useState(false);
    console.log('address', addressData);
    console.log('formState', formState);
    console.log('time', birthValue);

    useEffect(() => {
        handleGetAddress();
    }, [])

    useEffect(() => {
        if (userData) {
            setFormState(userData);
            if (userData.birthDay) {
                setBirthValue(dayjs(userData.birthDay))
            }
        }
    }, [userData])

    const handleOnChange = (name, value) => {
        console.log('value', value)
        if (name === 'avatar') {

            let reader = new FileReader();
            reader.readAsDataURL(value);
            setTimeout(() => {
                console.log('img', reader.result)
                let _formState = _.cloneDeep(formState);
                if (_formState) {
                    _formState.avatar = reader.result;
                    setFormState(_formState)
                }
            }, 1000);

        }
        else {
            let _formState = _.cloneDeep(formState);
            if (_formState) {
                _formState[name] = value;
                setFormState(_formState)
            }
        }

    }

    const handleOnChangeAddress = async (name, value) => {
        // console.log('name', name);
        // console.log('value', value)
        if (name === 'provinceId') {
            let res2 = await getAddressService({ A: '2', B: `${value}` });
            if (res2) {
                // console.log("res2 address12", res2.data);
                dispatch(setAddresssDataSlice({ type: 'DISTRICT', data: res2.data.data }))
            }
        }
        else if (name === 'districtId') {
            let res3 = await getAddressService({ A: '3', B: `${value}` });
            if (res3) {
                // console.log("res3 address", res3.data);
                dispatch(setAddresssDataSlice({ type: 'WARD', data: res3.data.data }))
            }
        }

        let _formState = _.cloneDeep(formState);
        if (_formState) {
            _formState.address[name] = value;
            setFormState(_formState);
        }
    }

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
            }
        }

    }


    const handleOnchangeEdit = async () => {
        if (isDisabledState === true) {
            setIsDisabledState(!isDisabledState);
        }
        else {
            let birthData = String(birthValue.get('y')) + '-' + String(+birthValue.get('M') + 1) + '-' + String(birthValue.get('D'));

            let data = {
                ...formState,
                birthDay: birthData
            }

            let res = await updateUserService(data);
            setIsOpenBackDrop(true);

            setTimeout(() => {
                console.log('adjust', res);
                if (res && res.data && res.data.EC === 0) {
                    toast('completed');
                    let userData = {
                        id: formState.id ? formState.id : '',
                        firstName: formState.firstName ? formState.firstName : '',
                        lastName: formState.lastName ? formState.lastName : '',
                        email: formState.email ? formState.email : '',
                        phoneNumber: formState.phoneNumber ? formState.phoneNumber : '',
                        address: formState.address ? formState.address : '',
                        gender: formState.gender ? formState.gender : '',
                        groupId: formState.groupId ? formState.groupId : '',
                        avatar: formState.avatar ? formState.avatar : '',
                        birthDay: formState.birthDay ? formState.birthDay : '',
                        authenticated: true
                    }
                    dispatch(setUserData(userData));
                    setIsDisabledState(!isDisabledState);
                }
                else {
                    toast.error('err')
                }
                setIsOpenBackDrop(false);
            }, 3000);


        }
    }



    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            width: '35px',
            height: '35px',
            borderRadius: '100px',
            left: '50%',
            bottom: '10px',
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <>
            <div className='my-account-container'>


                <div className='title-content'>
                    <h5 className='title'>Personal Information</h5>
                </div>

                <div className='profile-content'>

                    <div className='myAC-content-left'>

                        <div className='change-avt'>
                            <input
                                disabled={isDisabledState}
                                type='file'
                                className={isDisabledState ? 'isDisable' : ''}
                                onChange={(e) => handleOnChange('avatar', e.target.files[0])}
                            />

                            <IconButton
                                className='avt-container'
                                disabled={isDisabledState}
                                aria-label="cart">
                                <StyledBadge
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    badgeContent={<ChangeCircleIcon />} color="primary">
                                    <img className='avt' src={formState.avatar}></img>
                                </StyledBadge>
                            </IconButton>
                        </div>

                        <div className='name-container'>
                            <div className='name'>
                                <label className='name-label' >First Name</label>
                                <input className='customize-input'
                                    id="bootstrap-input"
                                    value={formState.firstName}
                                    onChange={(e) => handleOnChange('firstName', e.target.value)}
                                    disabled={isDisabledState} />
                            </div>

                            <div className='name'>
                                <label className='name-label' >Last Name</label>
                                <input className='customize-input'
                                    id="bootstrap-input"
                                    value={formState.lastName}
                                    onChange={(e) => handleOnChange('lastName', e.target.value)}
                                    disabled={isDisabledState} />
                            </div>

                        </div>

                        <div className='date-container'>

                            <label>
                                Date of Birth
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='date-picker'
                                    // label="Controlled picker"
                                    value={birthValue}
                                    onChange={(newValue) => setBirthValue(newValue)}
                                    disabled={isDisabledState}
                                />
                            </LocalizationProvider>

                        </div>

                        <div className='gender-container'>
                            <label>Gender</label>

                            <RadioGroup
                                row
                                value={formState.gender}
                                onChange={(event) => handleOnChange('gender', event.target.value)}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"

                            >
                                <FormControlLabel
                                    disabled={isDisabledState}
                                    value="Male"
                                    control={<Radio
                                        sx={{
                                            color: '#707070',
                                            '&.Mui-checked': {
                                                color: '#f06e00',
                                            },
                                        }} />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    disabled={isDisabledState}
                                    value="Female"
                                    control={<Radio
                                        sx={{
                                            color: '#707070',
                                            '&.Mui-checked': {
                                                color: '#f06e00',
                                            },
                                        }} />}
                                    label="Female" />
                                <FormControlLabel
                                    disabled={isDisabledState}
                                    value="Other"
                                    control={<Radio
                                        sx={{
                                            color: '#707070',
                                            '&.Mui-checked': {
                                                color: '#f06e00',
                                            },
                                        }}
                                    />}
                                    label="Other" />
                            </RadioGroup>
                        </div>

                        <div className='phone-container'>
                            <label className='name-label' >PhoneNumber</label>
                            <input className='customize-input'
                                id="bootstrap-input"
                                value={formState.phoneNumber}
                                onChange={(e) => handleOnChange('phoneNumber', e.target.value)}
                                disabled={isDisabledState} />
                        </div>

                        <div className='email-container'>
                            <label className='name-label' >Email</label>
                            <input className='customize-input'
                                id="bootstrap-input"
                                value={formState.email}
                                onChange={(e) => handleOnChange('email', e.target.value)}
                                disabled={isDisabledState} />
                        </div>


                        {addressData && addressData.provinceData &&
                            <div className='address-group'>

                                <div className='address-container'>
                                    <label className='name-label' >Province</label>

                                    <Select
                                        value={formState.address && formState.address.provinceId ? formState.address.provinceId : '01'}
                                        onChange={(e) => handleOnChangeAddress('provinceId', e.target.value)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        disabled={isDisabledState}
                                    >
                                        {addressData && addressData.provinceData && addressData.provinceData.map(item => {
                                            return (
                                                <MenuItem value={item.id ? item.id : '0'}>{item.name_en}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                    <FormHelperText>Your province currently</FormHelperText>
                                </div>

                                <div className='address-container'>
                                    <label className='name-label' >District</label>

                                    <Select
                                        value={formState && formState.address && formState.address.districtId ? formState.address.districtId : '01'}
                                        onChange={(e) => handleOnChangeAddress('districtId', e.target.value)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        disabled={isDisabledState}
                                    >
                                        {addressData && addressData.districtData && addressData.districtData.length > 0 && addressData.districtData.map(item => {
                                            return (
                                                <MenuItem value={item.id ? item.id : '0'}>{item.name_en}</MenuItem>
                                            )
                                        })

                                        }

                                    </Select>
                                    <FormHelperText>Your district currently</FormHelperText>
                                </div>

                                <div className='address-container'>
                                    <label className='name-label' >Ward</label>

                                    <Select
                                        value={formState && formState.address && formState.address.wardId ? formState.address.wardId : '01'}
                                        onChange={(e) => handleOnChangeAddress('wardId', e.target.value)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        disabled={isDisabledState}
                                    >
                                        {
                                            addressData && addressData.wardData && addressData.wardData.map(item => {
                                                return (
                                                    <MenuItem value={item.id ? item.id : '0'}>{item.name_en}</MenuItem>
                                                )
                                            })
                                        }

                                    </Select>
                                    <FormHelperText>Your ward currently</FormHelperText>
                                </div>

                            </div>

                        }

                        <div className='note-container'>
                            <label className='name-label' >Additional address information</label>

                            <textarea
                                style={{ height: '100px' }}
                                className='customize-input'
                                value={formState.address.note}
                                onChange={(e) => handleOnChangeAddress('note', e.target.value)}
                                disabled={isDisabledState} />

                        </div>



                    </div>




                    <div className='myAC-content-right'>

                        {isDisabledState === true ?
                            <button
                                onClick={() => handleOnchangeEdit()}
                                className='change-btn'>
                                <RateReviewIcon />
                                <span>Change Profile Information</span>
                            </button>
                            :
                            <button
                                onClick={() => handleOnchangeEdit()}
                                className='change-btn submit'>
                                <RateReviewIcon />
                                <span>Submit</span>
                            </button>
                        }






                    </div>





                </div>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={isOpenBackDrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div >
        </>
    );
}

export default MyAccount;