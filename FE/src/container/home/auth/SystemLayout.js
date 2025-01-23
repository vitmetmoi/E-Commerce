import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { useNavigate, Outlet } from 'react-router';
import { GROUPID } from '../../../utils';
function SystemLayout(props) {
    console.log('render protect layout!');
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    useEffect(() => {
        if (userData && userData.authenticated && userData.authenticated === false) {
            navigate('/login');
        }
        if (userData && userData.groupId && userData.groupId === GROUPID.USER) {
            navigate('/');
        }
    }, [])
    useEffect(() => {
        if (userData && userData.authenticated === false) {
            navigate('/login');
        }
    }, [userData])
    return (
        <>
            <Outlet />
        </>
    )
}

export default SystemLayout;