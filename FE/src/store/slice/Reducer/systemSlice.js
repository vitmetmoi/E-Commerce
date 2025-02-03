import { createSlice } from '@reduxjs/toolkit'

const defaultClothesData = {
    clothesData: []
}

const initialState = {
    clothesData: [],
}

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setClothesDataSlice: (state, action) => {
            console.log('payload', action.payload)
            state.clothesData = action.payload
        },
        clearClothesDataSlice: (state) => {
            state.clothesData = defaultClothesData
        }
    },
})

export const { setClothesDataSlice, clearClothesDataSlice } = systemSlice.actions

export default systemSlice.reducer