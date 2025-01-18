import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { useNavigate, Outlet } from 'react-router';


function AuthLayout(props) {
    console.log('render protect layout!');
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    useEffect(() => {
        if (userData.authenticated === false) {
            navigate('/login');
        }
    }, [])
    useEffect(() => {
        if (userData.authenticated === false) {
            navigate('/login');
        }
    }, [userData])
    return (
        <>
            <Outlet />
        </>
    )
}

export default AuthLayout;