import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductsState } from 'features/products/products_slice';
import { API_URLs } from 'utils/API';

export const searchProducts = createAsyncThunk(
    'productsSearch',
    async (query: string) => {
        const response = await axios.get(
            `${API_URLs.BASE_URL}${API_URLs.PRODUCTS}/search?q=${query}`,
        );

        return response.data.products;
    },
);

export const searchProductsReducer = (
    builder: ActionReducerMapBuilder<ProductsState>,
) => {
    builder
        .addCase(searchProducts.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(searchProducts.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                products: action.payload,
            };
        })
        .addCase(searchProducts.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                products: [],
            };
        });
};
