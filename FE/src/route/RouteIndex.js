import React from 'react';
import Login from '../container/home/auth/Login.js';
import Home from '../container/home/Home.js';
import { BrowserRouter, Routes, Route } from "react-router";
import Register from '../container/home/auth/Register.js'
import AuthLayout from '../container/home/auth/AuthLayout.js';
import UserProfile from '../container/home/profile/UserProfile.js';
import AccountLayout from '../container/home/auth/AccountLayout.js';
import SystemLayout from '../container/home/auth/SystemLayout.js';
import SystemHome from '../container/system/SystemHome.js';
import Product from '../container/product/Product.js';
import ShoppingCart from '../container/product/ShoppingCart.js';
import CheckOut from '../container/product/CheckOut.js';
import ListAllProduct from '../container/product/list/ListAllProduct.js';
function RouteIndex(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes >
                    <Route element={<AccountLayout />}>
                        <Route index element={<Home />}></Route>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="product" element={<Product></Product>}></Route>
                        <Route path="order" element={<ShoppingCart></ShoppingCart>}></Route>
                        <Route path="list" element={<ListAllProduct />}></Route>
                        <Route path='user' >
                            <Route element={<AuthLayout />}>
                                <Route path="checkout" element={<CheckOut></CheckOut>}></Route>
                                <Route path="profile" element={<UserProfile />}></Route>
                                <Route path="my-account" element={<UserProfile />}></Route>
                                <Route path="my-orders" element={<UserProfile />}></Route>
                                <Route path="returns-cancel" element={<UserProfile />}></Route>
                                <Route path="my-rating-reviews" element={<UserProfile />}></Route>
                                <Route path="change-password" element={<UserProfile />}></Route>
                            </Route>
                        </Route>

                        <Route path='system'>
                            <Route element={<SystemLayout />}>
                                <Route index element={<SystemHome />}></Route>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default RouteIndex;