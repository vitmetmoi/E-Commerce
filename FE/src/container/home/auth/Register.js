import React, { useState } from 'react';
import './Register.scss';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
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
    Input, Select, MenuItem, Avatar
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavigationHome from '../NavigationHome';
import _ from 'lodash';



function Register(props) {
    const defaultInputValue = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        gender: '',
        avatar: '',
        address: ''
    }
    const [showPassword, setShowPassword] = useState(false)
    const [inputValue, setInputValue] = useState(defaultInputValue);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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

    const handleSubmit = () => {
        console.log('submit', inputValue);
    }


    const theme = useTheme();
    return (
        <>
            <NavigationHome></NavigationHome>
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

                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <IconButton>
                                    <Avatar
                                        src="/images/example.jpg"
                                        style={{
                                            margin: "10px",
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    >
                                    </Avatar>
                                </IconButton>
                            </FormControl>
                        </div>

                        <div className='form-row'>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                    id="standard-helperText"
                                    label="Address"
                                    helperText="Enter your excactly addresss"
                                    variant="standard"
                                    value={inputValue.address}
                                    onChange={(event) => handleOnchangeInput(event.target.value, 'address')}
                                />
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