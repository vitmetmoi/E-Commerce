import { createSlice } from '@reduxjs/toolkit'
import { createUser } from '../../../service/userService'
import { ToastContainer, toast } from 'react-toastify';

const defaultUserData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    avatar: '',
    gender: '',
    groupId: ''
}

const initialState = {
    userData: defaultUserData,

}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        createUser: (state, action) => {
            let userData = action.payload;
        },
        test: (state) => {
            console.log("run test...");
        }
    },
})

export const { setUserData, test } = counterSlice.actions

export default counterSlice.reducer