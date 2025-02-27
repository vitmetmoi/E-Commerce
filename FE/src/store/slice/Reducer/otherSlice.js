import { createSlice } from '@reduxjs/toolkit'

const defaultAddresssData = {
    provinceData: '',
    districtData: '',
    wardData: ''
}

const initialState = {
    provinceData: '',
    districtData: '',
    wardData: ''
}

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {
        setAddresssDataSlice: (state, action) => {
            console.log('payload', action.payload)
            let type = action.payload.type;
            let data = action.payload.data;
            if (type === 'PROVINCE') {
                state.provinceData = data;
            }
            else if (type === 'DISTRICT') {
                state.districtData = data;
            }
            else if (type === 'WARD') {
                state.wardData = data;
            }
        },
        clearAddresssDataSlice: (state) => {
            state.addresssData = defaultAddresssData
        }
    },
})

export const { setAddresssDataSlice, clearAddresssDataSlice } = otherSlice.actions

export default otherSlice.reducer