import React from 'react';
import './UserProfile.scss';
import { useSelector, useDispatch } from 'react-redux'
import NavigationHome from '../NavigationHome';

function UserProfile(props) {
    const userData = useSelector((state) => state.user.userData);
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(userData.avatar)));
    console.log('rener2', userData);
    return (
        <>
            <NavigationHome></NavigationHome>
            <div>user : {userData.email}</div>
            <img width={100} height={100} src={`data:image/png;base64,${userData && userData.avatar}`} alt="" />
        </>
    );
}

export default UserProfile;