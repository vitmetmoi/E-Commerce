import { createSlice } from '@reduxjs/toolkit'
import { ToastContainer, toast } from 'react-toastify';



const defaultShoppingCart = {
    clothesId: '',
    color: '',
    size: '',
    total: 0,
}


const initialState = {
    shoppingCart: [],
    shoppingCartData: [],
}

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        setShoppingCart: (state, action) => {
            let data = action.payload;
            let _shoppingCart = state.shoppingCart;
            if (state.shoppingCart[0] === '') { state.shoppingCart.splice(0, 1) }
            if (data) {
                let hasChanged = false;
                data.map(item1 => {
                    let isValid = false;
                    _shoppingCart.map(item2 => {
                        if (item2.clothesId === item1.clothesId && item1.color === item2.color && item1.size === item2.size) {
                            isValid = true;
                            if (item2.total !== item1.total) {
                                item2.total = item1.total;
                                hasChanged = true;
                                return item2;
                            }
                        }
                        else {
                            return item2;
                        }
                    })
                    if (isValid === false) {
                        hasChanged = true;
                        _shoppingCart.push(item1);
                    }
                })
                if (hasChanged === true) {
                    state.shoppingCart = _shoppingCart;
                    toast("Add shopping cart completed!")
                }
                else {
                    toast("Your items exist!")
                }

            }
        },

        setShoppingCartData: (state, action) => {
            state.shoppingCart = action.payload;
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



export const { setShoppingCart, deleteShoppingCart, clearShoppingCartData, setShoppingCartData } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer