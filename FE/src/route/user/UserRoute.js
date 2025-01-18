import React from 'react';
import { Route, Routes } from "react-router"

import UserProfile from '../../container/home/profile/UserProfile';
function UserRoute(props) {
    return (
        <>
            <Routes>
                <Route path="/profile" element={<UserProfile />}></Route>
            </Routes >
        </>

    );
}

export default UserRoute;