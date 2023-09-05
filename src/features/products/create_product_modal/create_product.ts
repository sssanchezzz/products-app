import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dismissCreateProductModal } from 'features/products/create_product_modal/create_product_modal_slice';
import {
    Product,
    ProductsState,
    getLastId,
} from 'features/products/products_slice';

import { RootState } from 'rootReducer';
import { API_URLs } from 'utils/API';

export const createProduct = createAsyncThunk(
    'createProduct',
    async (product: Partial<Product>, { dispatch, getState }) => {
        const state = getState() as RootState;
        const lastId = getLastId(state);

        const response = await axios.post(
            `${API_URLs.BASE_URL}${API_URLs.ADD_PRODUCT}`,
            { ...product, id: lastId + 1 },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.status === 200) {
            dispatch(dismissCreateProductModal());
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
                    { ...action.payload, id: state.lastId + 1 },
                ],
                isLoading: false,
                lastId: state.lastId + 1,
            };
        })
        .addCase(createProduct.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
            };
        });
};
