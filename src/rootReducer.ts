import { combineReducers } from '@reduxjs/toolkit';
import { filterProductsDrawerSlice } from 'features/filter_products_drawer/filter_products_drawer_slice';
import { messagesSlice } from 'features/message/message_slice';
import { addProductModalSlice } from 'features/products/add_product_modal/add_product_modal_slice';
import { getCategoriesSlice } from 'features/products/categories/categories_slice.';
import { getProductsSlice } from 'features/products/products_slice';

export const rootReducer = combineReducers({
    getProducts: getProductsSlice.reducer,
    addProductModal: addProductModalSlice.reducer,
    getCategories: getCategoriesSlice.reducer,
    messages: messagesSlice.reducer,
    filterProductsDrawer: filterProductsDrawerSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
