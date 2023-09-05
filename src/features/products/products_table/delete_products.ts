import { GridRowId } from '@mui/x-data-grid';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    ProductsState,
    getProducts,
    getTotalProducts,
} from 'features/products/products_slice';
import { RootState } from 'rootReducer';
import { API_URLs } from 'utils/API';

export const deleteProducts = createAsyncThunk(
    'deleteProducts',
    async (productIds: GridRowId[], { getState }) => {
        const state = getState() as RootState;

        const totalProducts = getTotalProducts(state);
        const localProductIds = productIds.filter(p => +p > totalProducts);
        const localProducts = getProducts(state).filter(
            p => localProductIds.indexOf(p.id) !== -1,
        );

        const dbProducts = productIds.filter(p => +p <= totalProducts);

        const requests = dbProducts.map(productId =>
            axios.delete(
                `${API_URLs.BASE_URL}${API_URLs.PRODUCTS}/${productId}`,
            ),
        );
        const response = await Promise.all(requests);

        return response.map(r => r.data).concat(localProducts);
    },
);

export const deleteProductsReducer = (
    builder: ActionReducerMapBuilder<ProductsState>,
) => {
    builder
        .addCase(deleteProducts.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(deleteProducts.fulfilled, (state, action) => {
            const ids = action.payload.map(p => p.id);
            const products = state.products.filter(p => !ids.includes(p.id));
            return {
                ...state,
                _products: products,
                products: products,
                isLoading: false,
                lastId: products.length,
            };
        })
        .addCase(deleteProducts.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
            };
        });
};
