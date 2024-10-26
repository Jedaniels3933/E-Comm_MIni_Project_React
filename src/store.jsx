import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice';
import productsReducer from './features/product/productsSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        
    },
});

export default store;