import React from 'react';
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
    IconButton,
} from '@mui/material';
import NavigationHome from '../NavigationHome';
import Footer from '../Footer';
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
    const navigate = useNavigate();
    return (
        <>
            <NavigationHome></NavigationHome>

            <div className='login-container'>
                <AppProvider branding={BRANDING} theme={theme}>
                    <SignInPage

                        signIn={async (provider, formData) => {
                            let checkValid = formData.get('tandc')
                            console.log('va', checkValid)
                            if (checkValid === true || checkValid === 'true') {
                                let query = {
                                    loginAcc: formData.get('email'),
                                    password: formData.get('password')
                                }
                                let res = await loginSerivce(query);
                                if (res && res.data.EC === 0) {
                                    let resData = res.data.DT;
                                    let data = {
                                        firstName: resData.firstName ? resData.firstName : '',
                                        lastName: resData.lastName ? resData.lastName : '',
                                        email: resData.email ? resData.email : '',
                                        phoneNumber: resData.phoneNumber ? resData.phoneNumber : '',
                                        address: resData.address ? resData.address : '',
                                        gender: resData.gender ? resData.gender : '',
                                        groupId: resData.groupId ? resData.groupId : ''
                                    }
                                    dispatch(setUserData(data))
                                    // toast.success('Login completed!')
                                    navigate('/');
                                }
                                else {
                                    toast(res.data.EM)
                                }
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