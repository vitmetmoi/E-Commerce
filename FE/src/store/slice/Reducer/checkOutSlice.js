import { createSlice } from '@reduxjs/toolkit'

const defaultAddresssData = {
    checkOutData: []
}

const initialState = {
    checkOutData: []
}

export const checkOutSlice = createSlice({
    name: 'checkOut',
    initialState,
    reducers: {
        setCheckOutDataSlice: (state, action) => {
            state.checkOutData = action.payload;
        },
        clearCheckOutDataSlice: (state) => {
            state.addresssData = defaultAddresssData
        }
    },
})

export const { setCheckOutDataSlice, clearCheckOutDataSlice } = checkOutSlice.actions

export default checkOutSlice.reducer