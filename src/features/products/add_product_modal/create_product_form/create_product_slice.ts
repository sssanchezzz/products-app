import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dismissAddProductModal } from 'features/products/add_product_modal/add_product_modal_slice';
import { Product, ProductsState } from 'features/products/products_slice';

import { RootState } from 'rootReducer';
import { API_URLs } from 'utils/API';

export const createProduct = createAsyncThunk(
    'createProduct',
    async (product: Partial<Product>, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await axios.post(
            `${API_URLs.BASE_URL}${API_URLs.ADD_PRODUCT}`,
            { ...product, id: state.getProducts.totalProducts + 1 },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.status === 200) {
            dispatch(dismissAddProductModal());
        }

        return response.data;
    },
);

export const createProductReducer = (
    builder: ActionReducerMapBuilder<ProductsState>,
) => {
    builder
        .addCase(createProduct.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            return {
                ...state,
                products: [
                    ...state.products,
                    { ...action.payload, id: state.totalProducts + 1 },
                ],
                isLoading: false,
                totalProducts: state.totalProducts + 1,
            };
        })
        .addCase(createProduct.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
            };
        });
};
