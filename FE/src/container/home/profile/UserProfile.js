import React from 'react';
import './UserProfile.scss';
import { useSelector, useDispatch } from 'react-redux'
import NavigationHome from '../NavigationHome';

function UserProfile(props) {
    const userData = useSelector((state) => state.user.userData);
    const base64String = btoa(String.fromCharCode(...new Uint8Array(userData.avatar)));
    console.log('rener2', userData);
    return (
        <>
            <NavigationHome></NavigationHome>
            <div>user : {userData.email}</div>
            <img src={`data:image/png;base64,${base64String}`} alt="" />
        </>
    );
}

export default UserProfile;