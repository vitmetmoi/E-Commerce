import React from 'react';
import './UserProfile.scss';
import { useSelector, useDispatch } from 'react-redux'
import NavigationHome from '../NavigationHome';

function UserProfile(props) {
    const userData = useSelector((state) => state.user.userData);
    console.log('rener2', userData);
    return (
        <>
            <NavigationHome></NavigationHome>
            <div>user : {userData.email}</div>
        </>
    );
}

export default UserProfile;