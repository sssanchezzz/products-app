import { combineReducers } from '@reduxjs/toolkit';
import { filterProductsDrawerSlice } from 'features/filter_products_drawer/filter_products_drawer_slice';
import { filterProductsSlice } from 'features/filter_products_drawer/filter_products_slice';
import { sortingCriteriaSlice } from 'features/header/sort/sort_products';
import { messagesSlice } from 'features/message/message_slice';
import { createProductModalSlice } from 'features/products/create_product_modal/create_product_modal_slice';
import { getCategoriesSlice } from 'features/products/categories/categories_slice.';
import { getProductsSlice } from 'features/products/products_slice';
import { editProductModalSlice } from 'features/products/edit_product_modal/edit_product_modal_slice';

export const rootReducer = combineReducers({
    getProducts: getProductsSlice.reducer,
    createProductModal: createProductModalSlice.reducer,
    editProductModal: editProductModalSlice.reducer,
    getCategories: getCategoriesSlice.reducer,
    messages: messagesSlice.reducer,
    filterProductsDrawer: filterProductsDrawerSlice.reducer,
    filterProducts: filterProductsSlice.reducer,
    sortingCriteria: sortingCriteriaSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
