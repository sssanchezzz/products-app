import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { filterProducts } from 'features/filter_products_drawer/filter_products_slice';
import { Product, ProductsState } from 'features/products/products_slice';
import { RootState } from 'rootReducer';

export const SORTING_CATEGORIES: SortingCategory[] = ['price', 'rating'];
export type SortingCategory = keyof Pick<Product, 'price' | 'rating' | 'id'>;
export enum SortingTypes {
    ASC = 'asc',
    DESC = 'desc',
}

type SortState = {
    category: SortingCategory;
    order: SortingTypes;
};

const initialState: SortState = {
    category: 'id',
    order: SortingTypes.ASC,
};

export const sortProducts = createAction(
    'SORT_PRODUCTS',
    (category: SortingCategory, order: SortingTypes) => ({
        payload: {
            category,
            order,
        },
    }),
);

export const getSortingCategory = (state: RootState) =>
    state.sortingCriteria.category;

export const getSortingOrder = (state: RootState) =>
    state.sortingCriteria.order;

export const sortingCriteriaReducer = (
    builder: ActionReducerMapBuilder<SortState>,
) => {
    builder.addCase(sortProducts, (state, action) => {
        return {
            ...state,
            category: action.payload.category,
            order: action.payload.order,
        };
    });
};

export const sortProductsReducer = (
    builder: ActionReducerMapBuilder<ProductsState>,
) => {
    builder
        .addCase(sortProducts, (state, action) => {
            const sortedProducts = [...state.products].sort(
                productComparator(
                    action.payload.category,
                    action.payload.order,
                ),
            );

            return {
                ...state,
                products: sortedProducts,
            };
        })
        .addCase(filterProducts.fulfilled, (state, action) => {
            const sortedProducts = [...action.payload.products].sort(
                productComparator(
                    action.payload.category,
                    action.payload.order,
                ),
            );

            return {
                ...state,
                isLoading: false,
                products: sortedProducts,
            };
        });
};

export const sortingCriteriaSlice = createSlice({
    name: 'sortingCriteria',
    initialState: initialState,
    reducers: {},
    extraReducers: sortingCriteriaReducer,
});

const productComparator = <Product>(
    field: keyof Product,
    order: 'asc' | 'desc' = 'asc',
) => {
    return (a: Product, b: Product) => {
        const aValue = a[field];
        const bValue = b[field];

        if (aValue === bValue) {
            return 0;
        }

        if (order === 'asc') {
            return aValue < bValue ? -1 : 1;
        } else {
            return aValue > bValue ? -1 : 1;
        }
    };
};
