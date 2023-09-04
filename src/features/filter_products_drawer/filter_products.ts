import {
    ActionReducerMapBuilder,
    createAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { Product, ProductsState } from 'features/products/products_slice';
import { API_URLs } from 'utils/API';

export const filterProducts = createAsyncThunk(
    'filterProductsByCategory',
    async (payload: {
        category: string;
        brands: string[];
        priceRange: [number, number];
    }) => {
        const { category, brands, priceRange } = payload;
        let response;
        if (category === 'All') {
            response = await axios.get(
                `${API_URLs.BASE_URL}${API_URLs.PRODUCTS}?limit=0`,
            );
        } else {
            response = await axios.get(
                `${API_URLs.BASE_URL}${API_URLs.CATEGORY}/${category}`,
            );
        }
        const products = response.data.products as Product[];

        const rangeProducts = products.filter(
            product =>
                product.price >= priceRange[0] &&
                product.price <= priceRange[1],
        );

        const brandProducts = rangeProducts.filter(
            product => brands.indexOf(product.brand) !== -1,
        );

        return brandProducts;
    },
);

export const filterProductsByPriceRange = createAction(
    'FILTER_PRODUCTS_BY_PRICE_RANGE',
    (from: number, to: number) => ({
        payload: {
            from,
            to,
        },
    }),
);

export const filterProductsByBrands = createAction(
    'FILTER_PRODUCTS_BY_BRANDS',
    (brands: string[]) => ({
        payload: {
            brands,
        },
    }),
);

export const filterProductsReducer = (
    builder: ActionReducerMapBuilder<ProductsState>,
) => {
    builder
        .addCase(filterProductsByBrands, (state, action) => {
            const products = state.products.filter(
                product => action.payload.brands.indexOf(product.brand) !== 0,
            );
            return {
                ...state,
                products,
            };
        })
        .addCase(filterProductsByPriceRange, (state, action) => {
            const products = state.products.filter(
                product =>
                    product.price >= action.payload.from &&
                    product.price <= action.payload.to,
            );
            return {
                ...state,
                products,
            };
        })
        .addCase(filterProducts.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(filterProducts.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                products: action.payload,
            };
        })
        .addCase(filterProducts.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
            };
        });
};
