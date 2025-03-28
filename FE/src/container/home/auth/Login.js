import React, { useState } from 'react';
import './Login.scss'
import Checkbox from '@mui/material/Checkbox';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useLazyLoginQuery } from '../../../store/slice/API/userAPI';
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Link,
    Alert,
    IconButton, Backdrop, CircularProgress
} from '@mui/material';
import NavigationHome from '../NavigationHome';
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../../../store/slice/Reducer/userSlice';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const providers = [{ id: 'credentials', name: 'Email and Password' }];
const BRANDING = {
    logo: (
        <img
            src="https://www.elleman.vn/wp-content/uploads/2018/09/11/logo-thuong-hieu-stussy-3-elle-man.jpg"
            alt="MUI logo"
            style={{ height: 60 }}
        />
    ),
    title: 'MUI',
};

function Login(props) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);
    const theme = useTheme();
    const [loginSerivce, { data, error, isLoading }] = useLazyLoginQuery('', '');
    const [isOpenBackDrop, setIsOpenBackDrop] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isOpenBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <NavigationHome></NavigationHome>

            <div className='login-container'>
                <AppProvider branding={BRANDING} theme={theme}>
                    <SignInPage

                        signIn={async (provider, formData) => {
                            let checkValid = formData.get('tandc')

                            if (checkValid === true || checkValid === 'true') {
                                let query = {
                                    loginAcc: formData.get('email'),
                                    password: formData.get('password')
                                }
                                setIsOpenBackDrop(true);
                                setTimeout(async () => {
                                    let res = await loginSerivce(query);
                                    if (res && res.data && res.data.EC === 0) {
                                        let resData = res.data.DT;

                                        let data = {
                                            id: resData.id ? resData.id : '',
                                            firstName: resData.firstName ? resData.firstName : '',
                                            lastName: resData.lastName ? resData.lastName : '',
                                            email: resData.email ? resData.email : '',
                                            phoneNumber: resData.phoneNumber ? resData.phoneNumber : '',
                                            address: resData.address ? resData.address : '',
                                            gender: resData.gender ? resData.gender : '',
                                            groupId: resData.groupId ? resData.groupId : '',
                                            avatar: resData.avatar ? resData.avatar : '',
                                            birthDay: resData.birthDay ? resData.birthDay : '',
                                            authenticated: true
                                        }
                                        dispatch(setUserData(data))

                                        navigate('/');
                                    }
                                    else {
                                        toast(res.data.EM ? res.data.EM : 'Err from sever!')
                                    }
                                    setIsOpenBackDrop(false);
                                }, 3000);

                            }
                            else {
                                toast('Please read and confirm our T&C!')
                            }

                        }}
                        slots={{
                            title: () => { return (<h4>Sign in to own brand</h4>) },
                            signUpLink: () => {
                                return (
                                    <Link href="/register" variant="body2">
                                        Sign up
                                    </Link>
                                );
                            },
                        }}

                        slotProps={{
                            emailField: { variant: 'standard', autoFocus: false },
                            passwordField: { variant: 'standard' },
                            submitButton: { variant: 'outlined' },
                            rememberMe: {
                                control: (
                                    <Checkbox
                                        name="tandc"
                                        value="true"
                                        color="primary"
                                        sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                    />
                                ),
                                color: 'textSecondary',
                                label: 'I agree with the T&C',
                            },
                        }}
                        providers={providers}
                    />
                </AppProvider>

            </div>
        </>
    );

}

export default Login;