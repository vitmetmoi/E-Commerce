import { createSlice } from '@reduxjs/toolkit'

const defaultClothesData = {
    clothesData: [],
    billData: []
}

const initialState = {
    clothesData: [],
    billData: [],
}

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setClothesDataSlice: (state, action) => {
            state.clothesData = action.payload
        },
        setBillDataSlice: (state, action) => {
            console.log('payload', action.payload)
            state.billData = action.payload
        },
        clearBillDataSlice: (state) => {
            state.billData = defaultClothesData.billData
        },
        clearClothesDataSlice: (state) => {
            state.clothesData = defaultClothesData.clothesData
        }
    },
})

export const { setClothesDataSlice, clearClothesDataSlice,
    setBillDataSlice, clearBillDataSlice } = systemSlice.actions

export default systemSlice.reducer