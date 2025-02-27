import React, { useEffect, useState } from 'react';
import './MyAccount.scss';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { alpha, styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';
import _ from 'lodash'
import GoogleMapReact from 'google-map-react';
import ReactDOM from "react-dom";
import { useGetAddresssDataMutation } from '../../../../store/slice/API/otherAPI';
import { setAddresssDataSlice } from '../../../../store/slice/Reducer/otherSlice';

function MyAccount(props) {

    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const [birthValue, setBirthValue] = useState(dayjs('2025-1-1'));
    const [formState, setFormState] = useState(userData);
    const [isDisabledState, setIsDisabledState] = useState(false);
    const [getAddressService, { data, isLoading }] = useGetAddresssDataMutation();

    useEffect(() => {
        handleGetAddress();
    }, [])

    useEffect(() => {
        if (userData) {
            setFormState(userData);
        }
    }, [userData])

    const handleOnChange = (name, value) => {

        let _formState = _.cloneDeep(formState);
        if (_formState) {
            _formState[name] = value;
            setFormState(_formState)
        }

    }

    const handleGetAddress = async () => {
        console.log("fired");

        let res = await getAddressService({ A: '1', B: '0' });
        if (res) {
            console.log("res address", res.data);
            dispatch(setAddresssDataSlice({ type: 'PROVINCE', data: res.data.data }))
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

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: '#E0E3E7',
            fontSize: 16,
            width: '100%',
            padding: '10px 12px',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px;`,
                borderColor: '#f06e00',
            },
            ...theme.applyStyles('dark', {
                backgroundColor: '#1A2027',
                borderColor: '#2D3843',
            }),
        },
    }));

    // console.log('bor', birthValue)
    // console.log

    return (
        <>
            <div className='my-account-container'>


                <div className='title-content'>
                    <h5 className='title'>Personal Information</h5>
                </div>

                <div className='profile-content'>

                    <div className='content-left'>

                        <div className='change-avt'>
                            <IconButton aria-label="cart">
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
                                <BootstrapInput
                                    id="bootstrap-input"
                                    className='name-field'
                                    value={formState.firstName}
                                    onChange={(e) => handleOnChange('firstName', e.target.value)}
                                    disabled={isDisabledState} />
                            </div>

                            <div className='name'>
                                <label className='name-label' >Last Name</label>
                                <BootstrapInput
                                    id="bootstrap-input"
                                    className='name-field'
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
                            <BootstrapInput
                                id="bootstrap-input"
                                value={formState.phoneNumber}
                                onChange={(e) => handleOnChange('phoneNumber', e.target.value)}
                                disabled={isDisabledState} />
                        </div>

                        <div className='email-container'>
                            <label className='name-label' >Email</label>
                            <BootstrapInput
                                id="bootstrap-input"
                                value={formState.email}
                                onChange={(e) => handleOnChange('email', e.target.value)}
                                disabled={isDisabledState} />
                        </div>


                        <div style={{ height: '100vh', width: '100%' }}>

                        </div>



                    </div>




                    <div className='content-right'>
                        <div className='change-btn'>

                            <RateReviewIcon />
                            <span>Change Profile Information</span>
                        </div>
                    </div>





                </div>
            </div >
        </>
    );
}

export default MyAccount;