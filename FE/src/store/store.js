import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from './slice/Reducer/userSlice'
import systemReducer from './slice/Reducer/systemSlice'
import { userAPI } from './slice/API/userAPI'
import { clothesAPI } from './slice/API/systemAPI';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import shopingCartReducer from './slice/Reducer/shoppingCartSilce'
import { otherAPI } from './slice/API/otherAPI';
import otherReducer from './slice/Reducer/otherSlice'
import checkOutReducer from './slice/Reducer/checkOutSlice';
import { checkOutAPI } from './slice/API/checkOutAPI';

const reducers = combineReducers({
    user: userReducer,
    shoppingCart: shopingCartReducer,
    system: systemReducer,
    other: otherReducer,
    checkOut: checkOutReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [clothesAPI.reducerPath]: clothesAPI.reducer,
    [otherAPI.reducerPath]: otherAPI.reducer,
    [checkOutAPI.reducerPath]: checkOutAPI.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['userAPI', 'systemAPI', 'system', 'otherAPI', 'checkOutAPI', 'checkOut', 'deepSeekAPI']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userAPI.middleware, clothesAPI.middleware, otherAPI.middleware, checkOutAPI.middleware)
    },

})


setupListeners(store.dispatch);

