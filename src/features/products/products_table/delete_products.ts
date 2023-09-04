import { GridRowId } from '@mui/x-data-grid';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductsState } from 'features/products/products_slice';
import { API_URLs } from 'utils/API';

export const deleteProducts = createAsyncThunk(
    'deleteProducts',
    async (productIds: GridRowId[]) => {
        const requests = productIds.map(productId =>
            axios.delete(
                `${API_URLs.BASE_URL}${API_URLs.PRODUCTS}/${productId}`,
            ),
        );
        const response = await Promise.all(requests);

        return response.map(r => r.data);
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
                products: products,
                isLoading: false,
                totalProducts: products.length,
            };
        })
        .addCase(deleteProducts.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
            };
        });
};
