import React from 'react';
import Login from '../container/home/auth/Login.js';
import Home from '../container/home/Home.js';
import { BrowserRouter, Routes, Route } from "react-router";
import UserRoute from './user/UserRoute.js';
import SystemRoute from './system/SystemRoute.js';
import Register from '../container/home/auth/Register.js'
import AuthLayout from '../container/home/auth/AuthLayout.js';
import UserProfile from '../container/home/profile/UserProfile.js';
import AccountLayout from '../container/home/auth/AccountLayout.js';

function RouteIndex(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes >
                    <Route element={<AccountLayout />}>
                        <Route index element={<Home />}></Route>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />

                        <Route path='user' >
                            <Route element={<AuthLayout />}>
                                <Route path="profile" element={<UserProfile />}></Route>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default RouteIndex;