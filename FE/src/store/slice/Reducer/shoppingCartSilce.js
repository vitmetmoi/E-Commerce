import { createSlice } from '@reduxjs/toolkit'
import { ToastContainer, toast } from 'react-toastify';



const defaultShoppingCart = {
    clothesId: '',
    color: '',
    size: '',
    total: 0,
}

const initialState = {
    shoppingCart: [''],
}

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        setShoppingCartData: (state, action) => {
            state.shoppingCart = action.payload
        },
        deleteShoppingCart: (state, action) => {
            let _shoppingCart = state.shoppingCart;
            if (_shoppingCart) {
                _shoppingCart.map(item => {
                    if (item.clothesId === action.payload.id) {
                        item = action.payload;
                    }
                    return item;
                })
            }

        },
        clearShoppingCartData: (state, action) => {
            state.shoppingCart = [''];
        },
    },
})



export const { setShoppingCartData, deleteShoppingCart, clearShoppingCartData } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer