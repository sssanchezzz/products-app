import { RootState } from 'store';
import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteProductsReducer } from 'features/products/products_table/delete_products';
import { searchProductsReducer } from 'features/header/search_field/search_products';
import { API_URLs } from 'utils/API';
import { createProductReducer } from 'features/products/create_product_modal/create_product';
import { sortProductsReducer } from 'features/header/sort/sort_products';
import { filterProducts } from 'features/filter_products_drawer/filter_products_slice';
import { editProductReducer } from 'features/products/edit_product_modal/edit_product';

type NumberTuple = [number, number];

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    images: string[];
    rating: number;
    stock: number;
    category: string;
    brand: string;
};

export type ProductsState = {
    isLoading: boolean;
    products: Product[];
    _products: Product[];
    lastId: number;
    priceRange: NumberTuple | null;
    productBrands: string[];
    isFetching: boolean;
    totalProducts: number;
};

export const productsState: ProductsState = {
    isLoading: false,
    _products: [],
    products: [],
    lastId: 0,
    priceRange: null,
    productBrands: [],
    isFetching: false,
    totalProducts: 0,
};

export const getIsLoading = (state: any): boolean =>
    state.getProducts.isLoading;

export const getIsFetchingProducts = (state: RootState): boolean =>
    state.getProducts.isFetching;

export const getProducts = (state: RootState): Product[] =>
    state.getProducts.products;

export const getFetchedProducts = (state: RootState): Product[] =>
    state.getProducts._products;

export const getLastId = (state: RootState): number => state.getProducts.lastId;

export const getPriceRange = (state: RootState): NumberTuple | null =>
    state.getProducts.priceRange;

export const getProductBrands = (state: RootState): string[] =>
    state.getProducts.productBrands;

export const getTotalProducts = (state: RootState): number =>
    state.getProducts.totalProducts;

export const fetchProducts = createAsyncThunk('products', async () => {
    const response = await axios.get(
        `${API_URLs.BASE_URL}${API_URLs.PRODUCTS}?limit=0`,
    );

    return response.data;
});

const fetchProductsReducer = (
    builder: ActionReducerMapBuilder<ProductsState>,
) => {
    builder
        .addCase(fetchProducts.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
                isFetching: true,
            };
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            return {
                isLoading: false,
                products: action.payload.products,
                _products: action.payload.products,
                lastId: action.payload.total,
                priceRange: findPriceRange(action.payload.products),
                productBrands: findProductBrands(action.payload.products),
                isFetching: false,
                totalProducts: action.payload.total,
            };
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            return productsState;
        })
        .addCase(filterProducts.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })

        .addCase(filterProducts.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                products: state._products,
            };
        });
};

export const getProductsSlice = createSlice({
    name: 'getProducts',
    initialState: productsState,
    reducers: {},
    extraReducers: builder => {
        fetchProductsReducer(builder);
        deleteProductsReducer(builder);
        searchProductsReducer(builder);
        createProductReducer(builder);
        editProductReducer(builder);
        sortProductsReducer(builder);
    },
});

const findPriceRange = (products: Product[]): NumberTuple | null =>
    findMinMax(products.map(product => product.price));

const findMinMax = (array: number[]): NumberTuple | null => {
    if (array.length === 0) {
        return null;
    }

    return array.reduce<NumberTuple>(
        (acc, currentValue) => {
            const [min, max] = acc;
            return [Math.min(min, currentValue), Math.max(max, currentValue)];
        },
        [array[0], array[0]],
    );
};

const findProductBrands = (products: Product[]): string[] =>
    products
        .map(p => p.brand)
        .filter((product, index, array) => array.indexOf(product) === index);
