import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dismissEditProductModal } from 'features/products/edit_product_modal/edit_product_modal_slice';
import {
    Product,
    ProductsState,
    getTotalProducts,
} from 'features/products/products_slice';
import { RootState } from 'rootReducer';
import { API_URLs } from 'utils/API';

export const saveProduct = createAsyncThunk(
    'saveProduct',
    async (product: Product, { dispatch, getState }) => {
        const state = getState() as RootState;

        const totalProducts = getTotalProducts(state);
        const isLocalProduct = product.id > totalProducts;

        if (isLocalProduct) {
            return product;
        }

        const { id, ...payload } = product;
        const response = await axios.patch(
            `${API_URLs.BASE_URL}${API_URLs.PRODUCTS}/${id}`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.status === 200) {
            dispatch(dismissEditProductModal());
        }

        return response.data as Product;
    },
);

export const editProductReducer = (
    builder: ActionReducerMapBuilder<ProductsState>,
) => {
    builder
        .addCase(saveProduct.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(saveProduct.fulfilled, (state, action) => {
            const productIndex = state.products.findIndex(
                item => item.id === action.payload.id,
            );
            const products = [...state.products];
            products[productIndex] = action.payload;

            return {
                ...state,
                _products: products,
                products,
                isLoading: false,
            };
        })
        .addCase(saveProduct.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
            };
        });
};
