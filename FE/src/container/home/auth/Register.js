import React, { useState } from 'react';
import './Register.scss';
import { useTheme } from '@mui/material/styles';
import { useRegisterMutation } from '../../../store/slice/API/userAPI';
import {
    Button,
    FormControl,
    FormControlLabel,
    Checkbox,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Link,
    Alert,
    IconButton,
    Card,
    Typography,
    Box,
    FilledInput,
    Input, Select, MenuItem, Avatar, Backdrop, CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavigationHome from '../NavigationHome';
import _ from 'lodash';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Register(props) {
    const defaultInputValue = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        gender: '',
        avatar: '',
        groupId: 3
    }
    const [showPassword, setShowPassword] = useState(false)
    const [inputValue, setInputValue] = useState(defaultInputValue);
    const [img, setImg] = useState('');
    const [imgBase64, setImgBase64] = useState('');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [registerService, { data, isLoading }] = useRegisterMutation('');
    const [isOpenBackDrop, setIsOpenBackDrop] = useState(false);
    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleOnchangeInput = (value, name) => {
        let _inputValue = _.cloneDeep(inputValue);
        _inputValue[name] = value;
        setInputValue(_inputValue);

    }

    const handleSubmit = async () => {


        let data = {
            firstName: inputValue.firstName ? inputValue.firstName : '',
            lastName: inputValue.lastName ? inputValue.lastName : '',
            email: inputValue.email ? inputValue.email : '',
            phoneNumber: inputValue.phoneNumber ? inputValue.phoneNumber : '',
            gender: inputValue.gender ? inputValue.gender : '',
            groupId: inputValue.groupId ? inputValue.groupId : 3,
            password: inputValue.password ? inputValue.password : '',
            avatar: imgBase64 ? imgBase64 : ''
        }

        setIsOpenBackDrop(true);

        setTimeout(async () => {
            let res = await registerService(data);
            if (res && res.data && res.data.EC === 0) {
                toast.success(res.data.EM);
                navigate('/login')
            }
            else {
                toast.error(res.data.EM);
            }
            setIsOpenBackDrop(false);
        }, 3000);


    }

    const handleOnChangeImg = (img) => {

        let reader = new FileReader();
        reader.readAsDataURL(img[0]);
        setTimeout(() => {
            if (reader && reader.result) {
                console.log("test file:", reader.result)
                setImgBase64(reader.result);
            }
        }, 1000);
        let urlImg = URL.createObjectURL(img[0]);
        setImg(urlImg);

    }

    const theme = useTheme();
    return (
        <>
            <NavigationHome></NavigationHome>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isOpenBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className='register-container'>
                <Card className='register-content' variant="outlined">

                    <Typography fontSize='180%' variant="h4" gutterBottom marginTop='25px'>
                        Sign up to own brand
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Create new account
                    </Typography>
                    <Box
                        component="form"
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}
                    >

                        <div className='form-row'>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                    required
                                    id="standard-required"
                                    label="First name"
                                    variant="standard"
                                    value={inputValue.firstName}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'firstName')}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Last name"
                                    variant="standard"
                                    value={inputValue.lastName}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'lastName')}
                                />
                            </FormControl>
                        </div>

                        <div className='form-row'>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Email"
                                    variant="standard"
                                    value={inputValue.email}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'email')}
                                />
                            </FormControl>
                        </div>

                        <div className='form-row'>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                    required
                                    id="standard-required"
                                    label="PhoneNumber"
                                    variant="standard"
                                    value={inputValue.phoneNumber}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'phoneNumber')}
                                />
                            </FormControl>
                        </div>

                        <div className='form-row'>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={inputValue.password}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'password')}
                                    endAdornment={
                                        <InputAdornment sx={{ marginRight: 1 }} position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>

                        <div className='form-row'>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inputValue.gender}
                                    label="Gender"
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'gender')}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Other'}>Other</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl style={{ border: '1px solid rgba(0,0,0,0.1)', marginTop: '10%' }} fullWidth sx={{ m: 1 }} variant="standard">
                                {img ? <img
                                    src={img}
                                    alt={'avatar'}
                                    loading="lazy"
                                    onClick={() => { setImg('') }}
                                    style={{ cursor: 'pointer' }}
                                /> : <Button
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                    tabIndex={-1}
                                    endIcon={<AccountCircleIcon
                                        style={{ fontSize: '38px' }}
                                    ></AccountCircleIcon>}
                                >
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(event) => handleOnChangeImg(event.target.files)}
                                        multiple
                                    />
                                </Button>}

                            </FormControl>
                        </div>


                        <div className='form-row'>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <Button
                                    onClick={() => handleSubmit()}
                                    sx={{ marginTop: 2 }}
                                    variant="outlined">Sign up
                                </Button>
                            </FormControl>
                        </div>
                        <div className='form-row'>
                            <FormControl fullWidth sx={{}} variant="standard">
                                <Alert severity="info">After submit, make sure that all information is validated !</Alert>
                            </FormControl>
                        </div>
                    </Box>
                </Card>
            </div>

        </>
    );
}

export default Register;