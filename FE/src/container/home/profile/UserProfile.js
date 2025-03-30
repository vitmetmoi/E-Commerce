import React, { useEffect } from 'react';
import './UserProfile.scss';
import { useSelector, useDispatch } from 'react-redux'
import NavigationHome from '../NavigationHome';
import AdsHome from '../AdsHome';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import BlockIcon from '@mui/icons-material/Block';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useLocation, useSearchParams, useNavigate } from 'react-router';
import MyAccount from './Components/MyAccount';
import MyOrders from './Components/MyOrders';
import ReturnsAndCancel from './Components/ReturnsAndCancel';
import MyRatingAndReviews from './Components/MyRatingAndReviews';
import ChangePassword from './Components/ChangePassword';
import { clearUserData } from '../../../store/slice/Reducer/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

function UserProfile(props) {


    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);


    useEffect(() => {
        console.log('search', location.pathname);
    }, [])
    console.log('user', userData);

    const handleOnClickMenu = (path) => {
        navigate(path);
    }

    const handleLogOut = () => {
        dispatch(clearUserData());
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            width: '12px',
            height: '12px',
            borderRadius: '10px',
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));
    return (
        <>
            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>

            <div className='user-profile-container'>
                <h4 className='profile-header'>Profile</h4>

                <div className='profile-container'>

                    <div className='content-left'>

                        <div className='user-avt'>
                            <div className='avt-container'>

                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <img className='user-avt' src={userData.avatar}></img>
                                </StyledBadge>
                            </div>

                            <div className='name-container'>
                                <span className='text-1'>Hello</span>
                                <span className='text-2'>{userData.firstName} {userData.lastName}</span>
                            </div>
                        </div>

                        <div className='menu'>

                            <div
                                onClick={() => handleOnClickMenu('/user/profile')}
                                className={(location.pathname === '/user/profile' || location.pathname === '/user/my-account') ? 'item active' : 'item'}>
                                <PersonOutlineIcon />
                                <span>My Accounts</span>
                            </div>

                            <div
                                onClick={() => handleOnClickMenu('/user/my-orders')}
                                className={location.pathname === '/user/my-orders' ? 'item active' : 'item'}>
                                <ShoppingCartCheckoutIcon />
                                <span>My Orders</span>
                            </div>

                            <div
                                onClick={() => handleOnClickMenu('/user/returns-cancel')}
                                className={location.pathname === '/user/returns-cancel' ? 'item active' : 'item'}>
                                <BlockIcon />
                                <span>Returns & Cancel</span>
                            </div>

                            <div
                                onClick={() => handleOnClickMenu('/user/my-rating-reviews')}
                                className={location.pathname === '/user/my-rating-reviews' ? 'item active' : 'item'}>
                                <StarBorderIcon />
                                <span>My Rating & Reviews</span>
                            </div>

                            <div
                                onClick={() => handleOnClickMenu('/user/change-password')}
                                className={location.pathname === '/user/change-password' ? 'item active' : 'item'}>
                                <LockResetIcon />
                                <span>Change Password</span>
                            </div>

                            <div
                                onClick={() => handleLogOut()}
                                className='item'>
                                <LogoutIcon />
                                <span>Log Out</span>
                            </div>


                        </div>

                    </div>


                    <div className='content-right'>
                        {(location.pathname === '/user/profile' || location.pathname === '/user/my-account') && <MyAccount />}
                        {(location.pathname === '/user/my-orders') && <MyOrders />}
                        {(location.pathname === '/user/returns-cancel') && <ReturnsAndCancel />}
                        {(location.pathname === '/user/my-rating-reviews') && <MyRatingAndReviews />}
                        {(location.pathname === '/user/change-password') && <ChangePassword />}

                    </div>

                </div>
            </div>

        </>
    );
}

export default UserProfile;