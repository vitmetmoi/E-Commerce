import { createSlice } from '@reduxjs/toolkit'

const defaultAddresssData = {
    QRImage: '',
    clothesData: []
}

const initialState = {
    QRImage: '',
    clothesData: []
}

export const checkOutSlice = createSlice({
    name: 'checkOut',
    initialState,
    reducers: {
        setCheckOutDataSlice: (state, action) => {
            state[action.payload.type] = action.payload.data;
        },
        clearCheckOutDataSlice: (state) => {
            state.clothesData = defaultAddresssData
        }
    },
})

export const { setCheckOutDataSlice, clearCheckOutDataSlice } = checkOutSlice.actions

export default checkOutSlice.reducer