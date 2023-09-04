import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteProductsReducer } from 'features/products/products_table/delete_products';
import { searchProductsReducer } from 'features/header/search_field/search_products';
import { API_URLs } from 'utils/API';
import { createProductReducer } from 'features/products/add_product_modal/create_product_form/create_product_slice';
import { sortProductsReducer } from 'features/header/sort/sort_products';
import { filterProductsReducer } from 'features/filter_products_drawer/filter_products';

type NullableNumberTuple = [number | null, number | null];

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
    totalProducts: number;
    priceRange: NullableNumberTuple;
    productBrands: string[];
    isFetching: boolean;
};

export const productsState: ProductsState = {
    isLoading: false,
    products: [],
    totalProducts: 0,
    priceRange: [null, null],
    productBrands: [],
    isFetching: false,
};

export const getIsLoading = (state: any): boolean =>
    state.getProducts.isLoading;

export const getIsFetchingProducts = (state: any): boolean =>
    state.getProducts.isFetching;

export const getProducts = (state: any): Product[] =>
    state.getProducts.products;

export const getTotalProducts = (state: any): number =>
    state.getProducts.totalProducts;

export const getPriceRange = (state: any): [number, number] =>
    state.getProducts.priceRange;

export const getProductBrands = (state: any): string[] =>
    state.getProducts.productBrands;

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
                totalProducts: action.payload.total,
                priceRange: findPriceRange(action.payload.products),
                productBrands: findProductBrands(action.payload.products),
                isFetching: false,
            };
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            return productsState;
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
        sortProductsReducer(builder);
        filterProductsReducer(builder);
    },
});

const findPriceRange = (products: Product[]): NullableNumberTuple => {
    return findMinMax(products.map(product => product.price));
};

const findMinMax = (array: number[]): NullableNumberTuple => {
    if (array.length === 0) {
        return [null, null];
    }

    return array.reduce<[number, number]>(
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
