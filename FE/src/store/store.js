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

const reducers = combineReducers({
    user: userReducer,
    shoppingCart: shopingCartReducer,
    system: systemReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [clothesAPI.reducerPath]: clothesAPI.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['userAPI', 'systemAPI', 'system']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userAPI.middleware, clothesAPI.middleware)
    },

})


setupListeners(store.dispatch);

