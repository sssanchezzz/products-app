import { getSortingOrder } from 'features/header/sort/sort_products';

import {
    ActionReducerMapBuilder,
    createAction,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { getSortingCategory } from 'features/header/sort/sort_products';

import { getFetchedProducts } from 'features/products/products_slice';
import { RootState } from 'store';

type FilterState = {
    priceRange: [number, number] | null;
    category: string | null;
    brands: string[];
};

const initialState: FilterState = {
    priceRange: null,
    category: null,
    brands: [],
};

export const setPriceRange = createAction(
    'SET_PRICE_RANGE',
    (priceRange: [number, number]) => ({
        payload: { priceRange },
    }),
);

export const filterProducts = createAsyncThunk(
    'filterProducts',
    (_, { getState }) => {
        const state = getState();

        const filters = getFilters(state as RootState);
        const products = getFetchedProducts(state as RootState);
        const category = getSortingCategory(state as RootState);
        const order = getSortingOrder(state as RootState);

        if (
            filters.brands.length === 0 &&
            filters.category === null &&
            filters.priceRange === null
        ) {
            return { products, category, order };
        }

        const filteredProducts = products
            .filter(product =>
                filters.brands && filters.brands.length !== 0
                    ? filters.brands.indexOf(product.brand) !== -1
                    : true,
            )
            .filter(product => {
                if (filters.category === 'All' || !filters.category) {
                    return true;
                }
                return product.category === filters.category;
            })
            .filter(product => {
                if (filters.priceRange === null) {
                    return true;
                }

                return (
                    product.price >= filters.priceRange[0] &&
                    product.price <= filters.priceRange[1]
                );
            });

        return { products: filteredProducts, category, order };
    },
);

export const setCategory = createAction('SET_CATEGORY', (category: string) => ({
    payload: { category },
}));

export const setBrands = createAction('SET_BRANDS', (brands: string[]) => ({
    payload: { brands },
}));

export const getFilters = (state: RootState) => state.filterProducts;
export const getFilterPriceRange = (state: RootState) =>
    state.filterProducts.priceRange;
export const getFilterCategory = (state: RootState) =>
    state.filterProducts.category;
export const getFilterBrands = (state: RootState) =>
    state.filterProducts.brands;

export const filterProductsReducer = (
    builder: ActionReducerMapBuilder<FilterState>,
) => {
    builder
        .addCase(setPriceRange, (state, action) => {
            return {
                ...state,
                priceRange: action.payload.priceRange,
            };
        })
        .addCase(setCategory, (state, action) => {
            return { ...state, category: action.payload.category };
        })
        .addCase(setBrands, (state, action) => {
            return {
                ...state,
                brands: action.payload.brands,
            };
        });
};

export const filterProductsSlice = createSlice({
    name: 'filterProducts',
    initialState: initialState,
    reducers: {},
    extraReducers: filterProductsReducer,
});
