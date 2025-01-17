import React from 'react';
import Login from '../container/home/auth/Login.js';
import Home from '../container/home/Home.js';
import { BrowserRouter, Routes, Route } from "react-router";
import UserRoute from './user/UserRoute.js';
import SystemRoute from './system/SystemRoute.js';
import Register from '../container/home/auth/Register.js'

function RouteIndex(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default RouteIndex;